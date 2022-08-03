import { styled } from "@mui/material/styles";
import { Box, Dialog, DialogTitle, TableBody, TableCell, Stack, TableContainer, TableHead, TableRow, Button, TablePagination, Table, Typography } from '@mui/material';
import React from 'react';
import { AddBoxSharp } from '@mui/icons-material';
import transactionApi from '../../api/Transaction.tsx';
import { useNavigate } from 'react-router-dom';

const headCells = [
    {   
        id: 'requester',
        label: '요청자',
        width: '35%'
    },
    {   
        id: 'date',
        label: '요청일',
        width: '35%'
    },
    {
        id: 'options',
        label: '기능',
        width: '30%'
    }
];
    
const TableBodyCell = styled(TableCell)`
    text-align: center;
`;

const RequestsDialog = (props) => {
    const { onClose, open, product } = props;
    const [ requests, setRequests ] = React.useState([]); 
    const [ rowsPerPage, setRowPerPage ] = React.useState(5);
    const [ page, setPage ] = React.useState(0);
    const naivgate = useNavigate();

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    };

    const handleChangeRowsPerPage = (event) => {
        setRowPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleAcceptBtn = async (request) => {
        console.log('request:', request);
        if (window.confirm(`${request.nick} 님의 요청을 수락하시겠습니까?`)) {
            // 서버로 request 수락 되었고 이외의 요청 remove 하도록 요청
            const response = await transactionApi.permit(request.productId, request.buyerId);
            
            if (response.status === 200) {
                alert('요청 수락이 완료되었습니다.');
                onClose();
            } else {
                alert(response.data);
            }
        } else {

        }
    };

    const handleRejectBtn = async (request) => {
        console.log('request: ', request);
        const response = await transactionApi.refuse(request.id);
        console.log(response);
        if (response.status == 200) {
            alert("제거에 성공했습니다.");
            const newRequests = await fetchRequests();
            setRequests(newRequests);
        } else {
            alert("제거에 실패하였습니다.");
        }
    };

    // 상품에 대한 구매요청 fetch 해오는 function
    const fetchRequests = async () => {
        const requests = await transactionApi.getRequestsToProduct(String(product.id));
        if (requests) {
            return requests;
        } else {
            alert('요청정보 로딩에 실패했습니다!');
            handleClose();
        }
        // 작성 필요
    };

    React.useEffect(() => {
        fetchRequests().then((result) =>
            setRequests(result)
        );
    }, [product]);

    const handleClose = () => {
        onClose();
    };

    return (
        <Dialog onClose={handleClose} open={open}
        >
            <DialogTitle fontSize='26px'>구매 요청</DialogTitle>
            <Box sx={{ display: 'flex', justifyContent: 'center', width: '500px'}}>
                <TablePagination
                    count={requests.length}
                    rowsPerPageOptions={[
                        { value: 5, label: '5개씩' },
                        { value: 3, label: '3개씩' }
                    ]}
                    rowsPerPage={rowsPerPage}
                    labelRowsPerPage={""}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', paddingBottom: '15%'}}>
                <TableContainer sx={{ width: '90%' }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {headCells.map((cell) => (
                                    <TableCell
                                        key={cell.id}
                                        align={'center'}
                                        label={cell.label}
                                        width={cell.width}
                                    >
                                        {cell.label}
                                    </TableCell>
                                ))}
                            </TableRow>    
                        </TableHead>
                        <TableBody sx={{ width: '100%' }}>
                            {requests.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((request) => (
                                <TableRow>
                                    <TableBodyCell>
                                        <Typography
                                            sx={{ 
                                                '&:hover': {
                                                    cursor: 'pointer',
                                                }
                                            }}
                                            onClick={() => naivgate(`/mystore/${request.User.id}`)}>
                                                {request.User.nick}
                                        </Typography>
                                    </TableBodyCell>
                                    <TableBodyCell>
                                        {request.createdAt.slice(0, 10)}<br/>
                                        {request.createdAt.slice(11, 16)}
                                    </TableBodyCell>
                                    <TableBodyCell>
                                        <Stack spacing={1}>
                                            <Button
                                                sx={{
                                                    color: "#0072E6",
                                                    border: "0.5px solid #C3C2CC",
                                                    height: "30px",
                                                    "&:hover": {
                                                        backgroundColor: "#ededed",
                                                    },
                                                }}
                                                onClick={() => handleAcceptBtn(request)}
                                                disableTouchRipple
                                            >
                                                수락하기
                                            </Button>
                                            <Button
                                                sx={{
                                                    border: "0.5px solid #C3C2CC",
                                                    height: "30px",
                                                    "&:hover": {
                                                        backgroundColor: "#ededed",
                                                    },
                                                }}
                                                onClick={() => handleRejectBtn(request)}
                                                disableTouchRipple
                                            >
                                                거절하기
                                            </Button>
                                        </Stack>
                                    </TableBodyCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Dialog>
    );
};

export default RequestsDialog;