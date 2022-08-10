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
    fontSize: '15px',
    fontWeight: '300',
    height: '100%',
    lineHeight: '200%',
})

const CompleteModal = ({open, onClose, request, fetchProducts}) => {
    const [loading, setLoading] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const [fail, setFail] = React.useState(false);

    const closeModal = () => {
        setLoading(false);
        onClose();
    };

    const handleComplete = () => {
        setLoading(true);
        
    };

    React.useEffect(() => {
        console.log(request);
    }, []);

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
                    >구매확정</Typography>
                    <Grid container rowSpacing={1} sx={{ paddingBottom: '30px'}}>
                        <Grid item xs={12}>
                            {"상품은 잘 받으셨나요?"}
                        </Grid>
                        <Grid item xs={12}>
                            <Typography color="#F72F33" sx={{ marginTop: '15px'}}>주의 사항</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <ul style={{ margin: 0 }}>
                                <li><RowContent>구매 확정 후에는 되돌릴 수 없습니다.</RowContent></li>
                                <li><RowContent>확정 후 구매자에게 입금한 금액이 전달됩니다.</RowContent></li>
                                <li><RowContent>상품금액을 초과하여 입금한 경우 확정 후 반환됩니다.</RowContent></li>
                            </ul>
                        </Grid>
                    </Grid>
                    
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
                            //onClick={()=}
                            disabled={loading || success}
                        ><Typography sx={{ fontSize: '14px', color: (success || fail ? '#FFFFFF' : '#212121')}}>{success ? '완 료' : fail ? '실 패' : '확 정'}</Typography></Button>
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

export default CompleteModal;