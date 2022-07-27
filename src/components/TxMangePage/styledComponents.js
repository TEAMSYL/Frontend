import { AppBar, Box, Button, Grid, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { styled } from "@mui/material/styles";
import { useLocation, useNavigate } from 'react-router-dom';

export const Container = ({ children}) => {
    return (
        <Stack
            sx={{
                alignItems: 'center'        
            }}
        >{children}
        </Stack>
    )
};

export const PageName = ({ pageName }) => {
    return (
        <Box sx={{ 
            //borderBottom: '3px solid #1E1D29',
            width: '100vw',
            display: 'flex',
            justifyContent: 'center'
        }}>
            <Box
                sx={{
                    fontSize: '14px',
                    width: '1024px',
                    padding: '32px 0 0',
                }}
            >
                <Typography
                    sx={{
                      marginRight: "30px",
                      marginLeft: "5px",
                      color: "#212121",
                      fontSize: "26px",
                      fontWeight: 500,
                    }}
                >
                    {pageName}
                </Typography>
            </Box>
        </Box>
    );
};

export const Tab = () => {
    const navigate = useNavigate();
    const [ isSellTab, setIsSellTab] = React.useState(true);

    return (
        <AppBar
            position="static"
            sx={{
                backgroundColor: "transparent",
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: "70px",
                boxShadow: 0,
                borderBottom: "1px solid #EDEDED",
            }}
        >
            <div style={{ width: '1024px',}}>
                <Button
                    disableTouchRipple
                    onClick={() => {
                        setIsSellTab(true);
                        navigate('/transaction/manage/sell');
                    }}
                    sx={{
                        fontWeight: '400',
                        color: `${useLocation().pathname == '/transaction/manage/sell' ? '#FF5055' : '#212121'}`,
                        '&:hover': {
                        backgroundColor: 'transparent',
                        }
                    }}
                >판매</Button>
                <Button
                    disableTouchRipple
                    onClick={() => {
                        setIsSellTab(false);
                        navigate('/transaction/manage/purchase');
                    }}
                    sx={{
                        fontWeight: '400',
                        marginLeft: '30px',
                        color: `${useLocation().pathname == '/transaction/manage/purchase' ? '#FF5055' : '#212121'}`,
                        '&:hover': {
                            backgroundColor: 'transparent',
                        }
                    }}
                >구매</Button>
            </div>
        </AppBar>
    );
}

export const SellTable = ({ requests }) => {
    const [ rowsPerPage , setRowsPerPage ] = React.useState(5);
    const [ page, setPage ] = React.useState(0);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    
    const handleCancelBtn = (request) => {
        // api로 취소 요청
    };

    const RowCell = styled(TableCell)`
    text-align: center;
    `;

    const headCells = [
        {
            id: "img",
            numeric: false,
            label: "사진",
            width: "18%",
        },
        {
            id: "state",
            numeric: false,
            label: "진행상태",
            width: "12.5%",
        },
        {
            id: "name",
            numeric: false,
            label: "제목",
            width: "30%",
        },
        {
            id: "price",
            numeric: true,
            label: "가격",
            width: "17.5%",
        },
        {
            id: "buyer",
            numeric: false,
            label: "구매자",
            width: "12%"
        },
        {
            id: "buttons",
            numeric: false,
            label: "기능",
            width: "10%",
        }
    ];

    return (
        <Stack
            sx={{
                display: "flex",
                minWidth: "1024px",
                minHeight: "50vw",
                alignItems: "center",
            }}
        >
            {requests.length < 1 && (
                <div>진행 중인 판매 거래가 없습니다.</div>
            )}
            {requests.length > 0 && (
                <>
                <Box
                    sx={{
                    display: "flex",
                    justifyContent: "center",
                    width: "1024px",
                    margin: "40px 0 32px",
                    }}
                >
                    <TablePagination
                        count={requests.length}
                        rowsPerPageOptions={[
                            { value: 5, label: "5개씩" },
                            { value: 10, label: "10개씩" },
                        ]}
                        rowsPerPage={rowsPerPage}
                        labelRowsPerPage={""}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowPerPage}
                    />
                </Box>
                <TableContainer sx={{ width: 1024 }}>
                    <Table  padding='none'>
                        <TableHead
                            sx={{
                                backgroundColor: "#FAFAFD",
                                borderTop: "0.5px solid black",
                            }}
                        >
                            <TableRow>
                                {headCells.map((cell) => (
                                    <TableCell
                                        key={cell.id}
                                        align={"center"}
                                        label={cell.label}
                                        sx={{
                                            width: `${cell.width}`,
                                            fontWeight: "600",
                                            height: "20px",
                                            padding: 1,
                                            borderTop: "0.5px solid black",
                                            borderBottom: "0.5px solid black",
                                        }}
                                    >
                                        {cell.label}
                                    </TableCell>
                                ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {requests
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((request, index) => {
                                return (
                                    <TableRow>
                                        <RowCell>
                                            <Box
                                                sx={{
                                                    position: 'relative',
                                                    display: 'block',
                                                    overflow: 'hidden',
                                                    width: '100%',
                                                    paddingBottom: '100%',
                                                }}
                                            >
                                                <img 
                                                    src={request.ProductImgs[0].imgUrl} 
                                                    style={{ 
                                                        position: 'absolute',
                                                        display: 'block',
                                                        minWidth: '100%',
                                                        minHeight: '100%',
                                                        objectFit: 'contain',
                                                        borderBottom: '1px solid #E6E5EF',
                                                        backgroundColor: '#FAFAFD'
                                                    }}
                                                />
                                            </Box>
                                        </RowCell>
                                        <RowCell>
                                            {request.status === 'before' ? '판매중' : '이외의 상태'}
                                        </RowCell>
                                        <RowCell sx={{ color: "#0072E6", fontWeight: "600" }}>
                                            {request.productName}
                                        </RowCell>
                                        <RowCell>{request.price}ETH</RowCell>
                                        <RowCell>구매자</RowCell>
                                        <RowCell>
                                            <Stack spacing={1}>
                                                <Button
                                                    sx={{
                                                        color: "#FFFFFF",
                                                        background: '#FF5055',
                                                        //border: "0.5px solid #FF5055",
                                                        height: "30px",
                                                        "&:hover": {
                                                            backgroundColor: "#FF5055",
                                                        },
                                                    }}
                                                    disableTouchRipple
                                                    onClick={() => handleCancelBtn(request)}
                                                >거래 취소
                                                </Button>
                                                <Button
                                                    sx={{
                                                        color: "#212121",
                                                        border: "0.5px solid #C3C2CC",
                                                        height: "30px",
                                                        "&:hover": {
                                                            backgroundColor: "#ededed",
                                                        },
                                                    }}
                                                    disableTouchRipple
                                                   //onClick={() => handleDialogOpen(product)}
                                                >송장 입력
                                                </Button>
                                        </Stack>
                                    </RowCell>
                                </TableRow>
                            );
                            })}
                            </TableBody>
                    </Table>
                </TableContainer>
                </>
            )}
        </Stack>
    );
};
