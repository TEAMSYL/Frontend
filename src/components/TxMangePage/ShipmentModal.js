import { Avatar, Box, Button, Fab, Grid, Modal, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import React from 'react';
import { styled } from '@mui/system';
import CircularProgress from '@mui/material/CircularProgress';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import transactionApi from '../../api/Transaction.tsx';
import SelectInput from '@mui/material/Select/SelectInput';
import { TramRounded } from '@mui/icons-material';

const RowName = styled(Typography)({
    width: '70%',
    heigth: '100%',
    lineHeight: '200%',
    fontSize: '16px',
    fontWeight: '400',
    textAlign: 'center',
});

const RowContent = styled(Typography)({
    fontSize: '16px',
    fontWeight: '300',
    height: '100%',
    lineHeight: '200%',
})

const headCells = [
    {
        id: 'time',
        label: "시간",
        width: '20%'
    }, 
    {
        id: 'location',
        label: "현재위치",
        width: '20%'
    }, 
    {
        id: 'kind',
        label: "내용",
        width: '20%'
    }, 
    {
        id: 'telno',
        label: "연락처",
        width: '20%'
    }, 
    {
        id: 'telno2',
        label: "기사 연락처",
        width: '20%'
    }
];

const ShipmentModal = ({open, onClose, request, fetchProducts}) => {
    const [loading, setLoading] = React.useState(true);
    const [success, setSuccess] = React.useState(false);
    const [fail, setFail] = React.useState(false);
    const [failMsg, setFailMsg] = React.useState("");
    const [ trackingInfo, setTrackingInfo ] = React.useState({});

    const handlePayment = async () => {
    };

    React.useEffect(() => {
        async function fetchInfo() {
            setLoading(true);
            const response = await transactionApi.getTrackingInfo(request.id);
            
            if (response.status !== 200) {
                console.log(response);
                setSuccess(false);
                setFail(true);
                setFailMsg(response.data);
                setLoading(false);
                return;
            } 

            console.log(response.data);
            setTrackingInfo(response.data);
            setLoading(false);
            setSuccess(true);
            setFail(false);
            
        };

        fetchInfo();
    }, [request]);

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
                    width: '700 px',
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
                    >배송 조회</Typography>
                    { loading && <CircularProgress/> }
                    { fail &&
                        <Typography sx={{ textAlign: 'center', color: '#FF5055', padding: '100px 0 100px'}}>
                            {failMsg}
                        </Typography>
                    }
                    { success &&
                        <>
                        <Grid container rowSpacing={1} sx={{ paddingBottom: '30px'}}>
                            <Grid item xs={2}>
                                <RowName>송장 번호</RowName>
                            </Grid>
                            <Grid item xs={10}>
                                <RowContent>{trackingInfo.trackingNumber}</RowContent>
                            </Grid>
                        
                            <Grid item xs={2}>
                                <RowName>현재 상태</RowName>
                            </Grid>
                            <Grid item xs={10}>
                                <RowContent>{trackingInfo.complete ? "배송 완료" : "배송중"}</RowContent>
                            </Grid>
                        </Grid>
                        <TableContainer sx={{ border: '1px solid #E2E2E2'}}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        { headCells.map((headCell) => 
                                            (
                                                <TableCell
                                                    key={headCell.id}
                                                    align={"center"}
                                                    label={headCell.label}
                                                    sx={{
                                                        width: `${headCell.width}`,
                                                    }}
                                                >
                                                    {headCell.label}
                                                </TableCell>
                                            )
                                        )}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    { trackingInfo.trackingDetails.map((info) => {
                                        return (
                                            <TableRow>
                                                <TableCell sx={{ textAlign: 'center'}}>
                                                    {info.timeString}
                                                </TableCell>
                                                <TableCell sx={{ textAlign: 'center'}}>
                                                    {info.where}
                                                </TableCell>
                                                <TableCell sx={{ textAlign: 'center'}}>
                                                    {info.kind}
                                                </TableCell>
                                                <TableCell sx={{ textAlign: 'center'}}>
                                                    {info.telno}
                                                </TableCell>
                                                <TableCell sx={{ textAlign: 'center'}}>
                                                    {info.telno2}
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        </>
                    }
                </Stack>
            </Box>
        </Modal>
    );
};

export default ShipmentModal;