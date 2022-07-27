import { styled } from "@mui/material/styles";
import { Box, Dialog, DialogTitle, TableBody, TableCell, Stack, TableContainer, TableHead, TableRow, Button, TablePagination, Table } from '@mui/material';
import React from 'react';
import { AddBoxSharp } from '@mui/icons-material';
import transactionApi from '../../api/Transaction.tsx';

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

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    };

    const handleChangeRowsPerPage = (event) => {
        setRowPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleAcceptBtn = (request) => {
        if (window.confirm(`${request.nick} 님 외의 요청은 모두 거절됩니다. 수락하시겠습니까?`)) {
            // 서버로 request 수락 되었고 이외의 요청 remove 하도록 요청
            
            onClose();
            // 거래 진행 보여주는 페이지로 navigation
        } else {

        }
    };

    const handleRejectBtn = (request) => {
        // 서버로 거절 요청 보냄
        // 거절 요청 처리 완료후
        //setRequests([]);
    };

    // 상품에 대한 구매요청 fetch 해오는 function
    const fetchRequests = async () => {
        const requests = transactionApi.getRecievedRequest();

        // test data로 setting
        const testData = [
            {   
                id: '1',
                nick: 'test',
                date: '2018-12-12',
            },
            {   
                id: '2',
                nick: 'hello1',
                date: '2018-12-12',
            },
            {   
                nick: 'hello1',
                date: '2018-12-12',
            },
        ];
        return testData;
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
                                    <TableBodyCell>{request.nick}</TableBodyCell>
                                    <TableBodyCell>{request.date}</TableBodyCell>
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
                                                onClick={handleRejectBtn}
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