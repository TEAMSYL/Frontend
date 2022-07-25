import { AppBar, Box, Button, Grid, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from '@mui/material';
import React from 'react';
import { ProductCell, Palette } from '../SearchPage/StyledComponents';
import { styled } from "@mui/material/styles";

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
                        //navigate('/products/regist');
                    }}
                    sx={{
                        fontWeight: '400',
                        //color: `${useLocation().pathname == '/products/regist' ? '#FF50558' : '#212121'}`,
                        '&:hover': {
                        backgroundColor: 'transparent',
                        }
                    }}
                >판매</Button>
                <Button
                    disableTouchRipple
                    onClick={() => {
                        //navigate('/products/manage');
                    }}
                    sx={{
                        fontWeight: '400',
                        marginLeft: '30px',
                        //color: `${useLocation().pathname == '/products/manage' ? '#FF50558' : '#212121'}`,
                        '&:hover': {
                            backgroundColor: 'transparent',
                        }
                    }}
                >구매</Button>
            </div>
        </AppBar>
    );
}

export const PaginationTable = ({ myProducts }) => {
    const [ rowsPerPage , setRowsPerPage ] = React.useState(5);
    const [ page, setPage ] = React.useState(0);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    
    const RowCell = styled(TableCell)`
    text-align: center;
    `;

    const headCells = [
        {
            id: "img",
            numeric: false,
            label: "사진",
            width: "20%",
        },
        {
            id: "state",
            numeric: false,
            label: "진행상태",
            width: "20%",
        },
        {
            id: "name",
            numeric: false,
            label: "제목",
            width: "20%",
        },
        {
            id: "price",
            numeric: true,
            label: "가격",
            width: "20%",
        },
        {
            id: "buttons",
            numeric: false,
            label: "기능",
            width: "20%",
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
            {myProducts.length < 1 && (
                <div>등록한 상품이 존재하지 않거나 진행 중인 판매 거래가 없습니다.</div>
            )}
            <Box
                sx={{
                display: "flex",
                justifyContent: "center",
                width: "1024px",
                margin: "40px 0 32px",
                }}
            >
                <TablePagination
                    count={myProducts.length}
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
                    {myProducts
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((product, index) => {
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
                                                src={product.ProductImgs[0].imgUrl} 
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
                                        {product.status === 'before' ? '판매중' : '이외의 상태'}
                                    </RowCell>
                                    <RowCell sx={{ color: "#0072E6", fontWeight: "600" }}>
                                        {product.productName}
                                    </RowCell>
                                    <RowCell>{product.price}ETH</RowCell>
                                    <RowCell>
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
                                                disableTouchRipple
                                                //onClick={() => handleChangeBtn(product)}
                                            >수정하기
                                            </Button>
                                            <Button
                                                sx={{
                                                    border: "0.5px solid #C3C2CC",
                                                    height: "30px",
                                                    "&:hover": {
                                                        backgroundColor: "#ededed",
                                                    },
                                                }}
                                                disableTouchRipple
                                                //onClick={() => handleRemoveProductBtn(product)}
                                            >삭제하기
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
                                            >구매요청
                                            </Button>
                                    </Stack>
                                </RowCell>
                            </TableRow>
                        );
                        })}
                        </TableBody>
                </Table>
            </TableContainer>
        </Stack>
    );
};