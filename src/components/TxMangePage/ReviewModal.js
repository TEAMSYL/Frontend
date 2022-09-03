import React from 'react';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import CircularProgress from '@mui/material/CircularProgress';
import Rating from '@mui/material/Rating';
import { styled } from '@mui/system';
import { Avatar, Box, Button, Fab, Grid, MenuItem, Modal, Select, Stack, TextField, Typography } from '@mui/material';
import productApi from '../../api/Product.tsx';

const RowName = styled(Typography)({
    fontSize: '20px',
    fontWeight: '400',
    paddingBottom: '5px',
});

const ReviewModal = ({open, onClose, request}) => {
    const [rate, setRate] = React.useState(0);
    const [text, setText] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [registSuccess, setRegistSuccess] = React.useState(false);
    const [registFail, setRegistFail] = React.useState(false);
    
    const closeModal = () => {
        setRate(0);
        setText("");
        onClose();
    };

    const handleRegist = async () => {
        console.log(request);
        if (text === "") {
            alert("내용을 입력하세요!");
            return;
        }
        
        // 등록하는 api 호출
        try {
            const resultText = await productApi.postReview(request.product.id, rate, text);
            alert(resultText);
            closeModal();
            return;
        } catch (error) {
            console.log(error);
            alert("실패하였습니다. 다시 시도 해주세요.");
        }
        
    };

    return (
        <>
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
                    >거래 후기</Typography>
                    <Typography 
                        sx={{ 
                            fontSize: '15px', 
                            paddingBottom: '10px',
                        }}
                    >거래는 만족스러우셨나요?솔직한 후기를 공유하세요!<br/>후기는 수정이 불가하니 신중히 작성해주세요!</Typography>
                    <Grid container rowSpacing={1} sx={{ paddingBottom: '30px'}}>
                        <Grid item xs={12}>
                            <RowName>상품명</RowName>
                            <Typography sx={{ color: "#666666"}}>{request && request.product.productName}</Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <RowName>별점</RowName>
                            <Rating 
                                value={rate}
                                onChange={(e, newValue) => {
                                    setRate(newValue);
                                }}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <RowName>내용</RowName>
                            <Box sx={{ width: '100%'}}>
                            <TextField
                                focused
                                fullWidth
                                multiline
                                rows={5}
                                size="small"
                                placeholder="내용을 입력하세요"
                                onChange={(e) => setText(e.target.value)}
                            />
                            </Box>
                        </Grid>
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
                                onClick={!registSuccess && handleRegist}
                            >
                                {   
                                        loading ? <CircularProgress size={20} sx={{ color: '#757575'}}/> :
                                        !loading && !registFail && !registSuccess ? <Typography sx={{ fontSize: '14px', color: '#212121'}}>등 록</Typography> :
                                        registSuccess && !registFail ? (<><CheckIcon sx={{ color: '#03C75A'}}/><Typography sx={{ fontSize: '14px', color: '#212121'}}>완료</Typography></>) : 
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
        </>
    );
};

export default ReviewModal;