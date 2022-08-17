import { Avatar, Box, Button, Fab, Grid, MenuItem, Modal, Select, Stack, TextField, Typography } from '@mui/material';
import React from 'react';
import { styled } from '@mui/system';
import CircularProgress from '@mui/material/CircularProgress';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import transactionApi from '../../api/Transaction.tsx';
import SelectInput from '@mui/material/Select/SelectInput';
import axios from 'axios';
import { API_KEY } from '../../config/config';

const RowName = styled(Typography)({
    width: '85%',
    lineHeight: '180%',
    hegith: '100%',
    textAlignLast: 'justify',
    fontSize: '20px',
    fontWeight: '400',
    textAlign: 'justify',
});

const RowContent = styled(Typography)({
    fontSize: '16px',
    fontWeight: '300',
    height: '100%',
    lineHeight: '200%',
})

const ReturnModal = ({open, onClose, request, fetchProducts}) => {
    const [companyCode, setCompanyCode] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const [fail, setFail] = React.useState(false);
    const [companys, setCompanys] = React.useState([]);
    const [trackingNumber, setTrackinNumber] = React.useState("");
    const [infoText, setInfoText] = React.useState("송장 번호 조회 후 등록버튼을 눌러주세요.");

    const [returnLoading, setReturnLoading] = React.useState(false);
    const [returnSuccess, setReturnSuccess] = React.useState(false);
    const [returnFail, setReturnFail] = React.useState(false);

    React.useEffect(() => {
        async function fetchCompanys() {
            const response = await axios.get(`http://info.sweettracker.co.kr/api/v1/companylist?t_key=${API_KEY.DELIVERY_TRACKING_KEY}`);
            setCompanys(response.data.Company);
        };

        fetchCompanys();
    }, []);

    const close = () => {
        setCompanyCode("");
        setLoading(false);
        setSuccess(false);
        setFail(false);
        setReturnLoading(false);
        setReturnSuccess(false);
        setReturnFail(false);
        setTrackinNumber("");
        setInfoText("");
        onClose();
    };

    const handleInquire = async () => {
        if (companyCode === "") {
            setInfoText("택배사를 선택하세요!");
            setFail(true);
        }
        if (trackingNumber === "") {
            setInfoText("송장 번호를 입력하세요!");
            setFail(true);
            return;
        }

        async function checkInvoice() {
            const response = await axios.get(`http://info.sweettracker.co.kr/api/v1/trackingInfo?t_key=${API_KEY.DELIVERY_TRACKING_KEY}&t_code=${companyCode}&t_invoice=${trackingNumber}`);
            console.log(response);
            return response.data;
        }
        
        setLoading(true);
        setInfoText("조회 중...");
        const data = await checkInvoice();
        setLoading(false);

        if (data.status == false) {
            setInfoText(data.msg);
            setSuccess(false);
            setFail(true);
            return;
        } else if (data.result === 'Y'){
            setSuccess(true);
            setFail(false);
            setInfoText("조회 성공");
            return;
        } else {
            setSuccess(false);
            setFail(true);
            setInfoText("존재하지 않는 운송장 번호입니다.");
            return;
        }
    };

    const handleReturn = async () => {
        if (success == false) {
            setInfoText("운송장 조회를 완료해주세요");
            return;
        }

        setReturnLoading(true);
        setInfoText("진행 중...");
        console.log(request);
        const response = await transactionApi.returnProduct(trackingNumber, request.id, companyCode);
        

        if (response.status === 200) {
            await fetchProducts();
            setInfoText("반품이 완료되었습니다.");
            setReturnLoading(false);
            setReturnSuccess(true);
            setReturnFail(false);
        } else {
            setInfoText("실패하였습니다. 다시 시도해주세요.");
            setReturnLoading(false);
            setReturnSuccess(false);
            setReturnFail(true);
        }
    };

    const closeModal = () => {
        setLoading(false);
        close();
    };

    return (
        <Modal
            open={open}
            onClose={closeModal}
        >   
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '420px',
                    //height: '510px',
                    bgcolor: '#F7F7F7',
                    boxShadow: 5,
                    borderRadius: '10px',
                }}
            >
                <Stack sx={{ padding: '20px'}}>
                    <Typography 
                        sx={{ 
                            fontSize: '30px', 
                            fontWeight: '500',
                            marginBottom: '20px',
                            paddingBottom: '10px',
                            borderBottom: '1px solid #EDEDED',
                        }}
                    >반품 하기</Typography>
                    <Grid container rowSpacing={1} sx={{ paddingBottom: '30px'}}>
                        <Grid item xs={12} sx={{ paddingBottom: '10px'}}>
                            발송 후 운송장 번호를 등록하여 반품이 가능합니다!
                        </Grid>
                        <Grid item xs={3}>
                            <RowName>택 배 사</RowName>
                        </Grid>
                        <Grid item xs={9}>
                            <Select
                                size="small"
                                value={companyCode}
                                onChange={(e) => {
                                    setCompanyCode(e.target.value);
                                }}
                                sx={{
                                    width: '100%'
                                }}
                                MenuProps={{
                                    PaperProps: { sx: { maxHeight: 250}}
                                }}
                            >
                                {companys.slice(0,16).map((company) => {
                                    return (<MenuItem value={company.Code}>{company.Name}</MenuItem>);
                                })}
                                
                            </Select>
                        </Grid>

                        <Grid item xs={3}>
                            <RowName>송장 번호</RowName>
                        </Grid>
                        <Grid item xs={7}>
                            <Box sx={{ width: '95%'}}>
                            <TextField
                                disabled={success}
                                fullWidth
                                size="small"
                                placeholder="송장번호를 입력하세요"
                                onChange={(e) => setTrackinNumber(e.target.value)}
                            />
                            </Box>
                        </Grid>
                        <Grid item xs={2}>
                            <Button
                                disableFocusRipple
                                disableTouchRipple
                                onClick={success ? ()=>{} : handleInquire}
                                sx={{
                                    color: '#FFFFFF',
                                    width: '100%',
                                    height: '100%',
                                    //marginLeft: '5px',
                                    backgroundColor: (
                                        loading? "#757575" : 
                                        success ? "#03C75A" :
                                        fail ? "#FF5055" : "#757575" 
                                    ),
                                    '&:hover' : {
                                        backgroundColor: (
                                            loading? "#757575" :
                                            success ? "#03C75A" :
                                            fail ? "#FF5055" : "#757575" 
                                        )
                                    }
                                }}
                            >
                                {loading && (
                                    <CircularProgress size={25} sx={{ color: "#FFFFFF"}}/>
                                )}
                                {!loading && success && (  
                                    <CheckIcon/>
                                )}
                                {!loading && fail && (
                                    <ClearIcon/>
                                )}
                                {!loading && !success && !fail && (
                                    "조회"
                                )}
                            </Button>
                        </Grid>
                        
                        <Typography 
                            align="right"
                            paddingTop="20px"
                            sx={{ 
                                width: '100%',
                                color: (
                                    loading || returnLoading ? '#757575' :
                                    fail || returnFail ? '#D80C18' :
                                    success || returnSuccess ? '#03C75A': '#212121')
                            }}
                        >
                        {infoText}
                        </Typography>

                        <div style={{ display: 'flex', justifyContent: 'end', width: '100%', paddingTop: '20px'}}>
                            <Button
                                disableTouchRipple
                                sx={{
                                    width: '100px',
                                    color: '#212121',
                                    backgroundColor: 'transparent',
                                    border: "0.5px solid #C3C2CC",
                                    height: "30px",
                                    "&:hover": {
                                        backgroundColor: "transparent",
                                    },
                                    marginRight: '10px',
                                }}
                                onClick={!returnSuccess && handleReturn}
                            >
                                {   
                                        returnLoading ? <CircularProgress size={20} sx={{ color: '#757575'}}/> :
                                        !returnLoading && !returnFail && !returnSuccess ? <Typography sx={{ fontSize: '14px', color: '#212121'}}>반 품</Typography> :
                                        returnSuccess && !returnFail ? (<><CheckIcon sx={{ color: '#03C75A'}}/><Typography sx={{ fontSize: '14px', color: '#212121'}}>완료</Typography></>) : 
                                        (<><ClearIcon sx={{ color: "#FF5055"}}/><Typography sx={{ fontSize: '14px', color: '#212121'}}>실패</Typography></>)
                                }
                            </Button>
                            <Button
                                disableTouchRipple
                                sx={{
                                    width: '100px',
                                    color: "#FFFFFF",
                                    background: '#FF5055',
                                    //border: "0.5px solid #FF5055",
                                    height: "30px",
                                    "&:hover": {
                                        backgroundColor: "#FF5055",
                                    },
                                }}
                                onClick={closeModal}
                                disabled={loading}
                            >닫 기</Button>
                        </div>
                    </Grid>    
                </Stack>
            </Box>
        </Modal>
    );
};

export default ReturnModal;