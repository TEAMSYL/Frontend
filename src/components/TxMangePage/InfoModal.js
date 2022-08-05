import { Avatar, Box, Button, Fab, Grid, Modal, Stack, Typography } from '@mui/material';
import React from 'react';
import { styled } from '@mui/system';
import CircularProgress from '@mui/material/CircularProgress';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import transactionApi from '../../api/Transaction.tsx';
import SelectInput from '@mui/material/Select/SelectInput';

const RowName = styled(Typography)({
    width: '70%',
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

const InfoModal = ({open, onClose, request, fetchProducts}) => {
    const [loading, setLoading] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const [fail, setFail] = React.useState(false);

    const handlePayment = async () => {
        setLoading(true);
        const response = await transactionApi.makePayment(request.id);
        // function timeout(delay) {
        //     return new Promise( res => setTimeout(res, delay) );
        // }
        // await timeout(2000);
        //setSuccess(true);
        setLoading(false);
        if (response.status === 200) {
            setSuccess(true);
            fetchProducts();
        } else {
            setFail(true);
        }
    };

    const closeModal = () => {
        setLoading(false);
        onClose();
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
                    >입금 하기</Typography>
                    <Grid container rowSpacing={1} sx={{ paddingBottom: '30px'}}>
                        <Grid item xs={3}>
                            <RowName>상 품 명</RowName>
                        </Grid>
                        <Grid item xs={9}>
                            <RowContent>{(request !== undefined)? request.product.productName : ''}</RowContent>
                        </Grid>
                    
                        <Grid item xs={3}>
                            <RowName>판 매 자</RowName>
                        </Grid>
                        <Grid item xs={9}>
                            <RowContent>{(request !== undefined)? request.seller.nick : ''}</RowContent>
                        </Grid>
                    
                        <Grid item xs={3}>
                            <RowName>가 격</RowName>
                        </Grid>
                        <Grid item xs={9}>
                            <RowContent>{(request !== undefined)? request.product.price: ''} ETH</RowContent>
                        </Grid>
                    </Grid>
                    
                    <div style={{ fontSize: '16px', fontWeight: '200', paddingBottom: '20px'}}>
                        {success && '결재가 완료되었습니다.'}
                        {fail && '결재에 실패하였습니다. 다시 시도해주세요.'}
                        {loading && '결재 진행중'}
                        {!success && !fail && !loading && '결재 정보를 확인하시고 확인 버튼을 눌러주세요.'}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'end'}}>
                        { loading && (
                            <CircularProgress
                                size={30}
                                sx={{ marginRight: '10px'}}
                            />   
                        )}
                        { (success || fail) && (
                            <Avatar 
                                sx={{
                                    width: 30,
                                    height: 30,
                                    backgroundColor: (success ? '#47A74B' : '#F72F33'),
                                    marginRight: '10px',
                                }}
                            >
                                {success && (<CheckIcon sx={{ color: '#FFFFFF' }}/>)}
                                {fail && (<ClearIcon sx={{ color: '#FFFFFF' }}/>)}
                            </Avatar>
                        )}
                        <Button 
                            disableTouchRipple
                            sx={{
                                width: '100px',
                                color: (success ? '#FFFFFF' : '#212121'),
                                backgroundColor: (success ? '#47A74B' : 
                                                  fail ? '#F72F33' : 'transparent'),
                                border: (success || fail ? 'none' : "0.5px solid #C3C2CC"),
                                height: "30px",
                                "&:hover": {
                                    backgroundColor: (success ? '#47A74B' : fail ? '#F72F33' : "transparent"),
                                },
                                marginRight: '10px',
                            }}
                            onClick={handlePayment}
                            disabled={loading || success}
                        ><Typography sx={{ fontSize: '14px', color: (success || fail ? '#FFFFFF' : '#212121')}}>{success ? '완 료' : fail ? '실 패' : '결 재'}</Typography></Button>
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
                </Stack>
            </Box>
        </Modal>
    );
};

export default InfoModal;