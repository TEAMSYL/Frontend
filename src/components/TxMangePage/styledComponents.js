import { AppBar, Box, Button, Grid, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { styled } from "@mui/material/styles";
import { useLocation, useNavigate } from 'react-router-dom';
import transactionApi from '../../api/Transaction.tsx';
import InfoModal from './InfoModal';
import TrackingNumModal from './TrackingNumModal';
import CompleteModal from './CompleteModal';
import ReturnModal from './ReturnModal';

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

export const SellTable = ({ requests, fetchRequests }) => {
    const [ rowsPerPage , setRowsPerPage ] = React.useState(5);
    const [ page, setPage ] = React.useState(0);
    const [ trackingNumModalOpen, setTrackingNumModalOpen ] = React.useState(false);
    const [ requestToModal, setReqeustToModal ] = React.useState(requests[0]);
    const navigate = useNavigate();

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    
    const openTrackingNumModal = (request) => {
        setReqeustToModal(request);
        setTrackingNumModalOpen(true);
    };

    const closeTrackingNumModal = () => {
        setTrackingNumModalOpen(false);
    };

    const handleCancelBtn = async (request) => {
        //const response = await transactionApi.cancel(String(request.id));
    };

    const getTxStatusText = (txState) => {
        let stateText;
        switch(txState) {
            case 0:
                stateText = '입금 전';
                break;
            case 1:
                stateText = '입금완료';
                break;
            case 2:
                stateText = '배송시작';
                break;
            default:
                stateText = '이외상태';
                break;
        }
        return stateText;
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
                                                    src={request.thumbnail} 
                                                    style={{ 
                                                        position: 'absolute',
                                                        display: 'block',
                                                        minWidth: '100%',
                                                        minHeight: '100%',
                                                        objectFit: 'contain',
                                                        borderBottom: '1px solid #E6E5EF',
                                                        backgroundColor: '#FAFAFD'
                                                    }}
                                                    onClick={() => navigate(`/detail/${request.id}`)}
                                                />
                                            </Box>
                                        </RowCell>
                                        <RowCell>
                                            {getTxStatusText(request.txState)}
                                        </RowCell>
                                        <RowCell sx={{ color: "#0072E6", fontWeight: "600" }}>
                                            {request.productName}
                                        </RowCell>
                                        <RowCell>{request.price}ETH</RowCell>
                                        <RowCell>
                                            <Typography
                                                onClick={()=> navigate(`/mystore/${request.Transaction.buyerId}`)}
                                                sx={{ 
                                                    fontSize: '16px',
                                                    '&:hover': { cursor: 'pointer'}
                                                }}
                                            >{request.buyer.nick}</Typography>
                                        </RowCell>
                                        <RowCell>
                                            <Stack spacing={1}>
                                                { (request.txState !== 2) && 
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
                                                }
                                                { (request.txState === 1) &&
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
                                                        onClick={() => openTrackingNumModal(request)}
                                                    >송장 입력
                                                    </Button>
                                                }
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
            { requests.length > 0 &&
                (
                    <TrackingNumModal
                        open={trackingNumModalOpen}
                        onClose={closeTrackingNumModal}
                        request={requestToModal}
                        fetchRequests={fetchRequests}
                    />
                )
            }
            
        </Stack>
    );
};

export const PurchaseTable = ({ requests, fetchProducts }) => {
    const [ rowsPerPage , setRowsPerPage ] = React.useState(5);
    const [ page, setPage ] = React.useState(0);
    const [ infoModalOpen, setInfoModalOpen ] = React.useState(false);
    const [ completeModalOpen, setCompleteModalOpen ] = React.useState(false);
    const [ returnModalOpen, setReturnModalOpen ] = React.useState(false);
    const [ requestToModal, setReqeustToModal ] = React.useState(requests[0]);


    const navigate = useNavigate();

    const openInfoModal = (request) => {
        setReqeustToModal(request);
        setInfoModalOpen(true);
    };

    const closeInfoModal = () => {
        setInfoModalOpen(false);
    };

    const openCompleteModal = (request) => {
        setReqeustToModal(request);
        setCompleteModalOpen(true);
    };

    const closeCompleteModal = () => {
        setCompleteModalOpen(false);
    };

    const openReturnModal = (request) => {
        setReqeustToModal(request);
        setReturnModalOpen(true);
    };

    const closeReturnModal = () => {
        setReturnModalOpen(false);
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    
    const handleCancelBtn = async (request) => {
        //const response = await transactionApi.cancel(String(request.id));
    };

    const getTxStatusText = (txState) => {
        let stateText;
        switch(txState) {
            case 0:
                stateText = '입금 전';
                break;
            case 1:
                stateText = '입금완료';
                break;
            case 2:
                stateText = '배송시작';
                break;
            case 3:
                stateText = '거래취소';
                break;
            case 4:
                stateText = '거래완료';
                break;
            default:
                stateText = '이외상태';
                break;
        }
        return stateText;
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
            label: "판매자",
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
                <div>진행 중인 구매 거래가 없습니다.</div>
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
                                                    '&:hover': {
                                                        cursor: 'pointer'
                                                    }
                                                }}
                                            >
                                                <img 
                                                    src={request.product.thumbnail} 
                                                    style={{ 
                                                        position: 'absolute',
                                                        display: 'block',
                                                        minWidth: '100%',
                                                        minHeight: '100%',
                                                        objectFit: 'contain',
                                                        borderBottom: '1px solid #E6E5EF',
                                                        backgroundColor: '#FAFAFD'
                                                    }}
                                                    onClick={() => navigate(`/detail/${request.id}`)}
                                                />
                                            </Box>
                                        </RowCell>
                                        <RowCell>
                                            {getTxStatusText(request.txState)}
                                        </RowCell>
                                        <RowCell sx={{ color: "#0072E6", fontWeight: "600" }}>
                                            {request.product.productName}
                                        </RowCell>
                                        <RowCell>{request.product.price}ETH</RowCell>
                                        <RowCell>
                                            <Typography
                                                onClick={()=> navigate(`/mystore/${request.Transaction.buyerId}`)}
                                                sx={{ 
                                                    fontSize: '16px',
                                                    '&:hover': { cursor: 'pointer'}
                                                }}
                                            >{request.seller.nick}</Typography>
                                        </RowCell>
                                        <RowCell>
                                            <Stack spacing={1}>
                                                { (request.txState < 2) && 
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
                                                }
                                                { (request.txState === 0) &&
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
                                                       onClick={() => openInfoModal(request)}
                                                    >입금 하기
                                                    </Button>
                                                }
                                                { (request.txState === 2) &&
                                                    <>
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
                                                        onClick={() => openCompleteModal(request)}
                                                    >확정 하기
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
                                                        onClick={() => openReturnModal(request)}
                                                    >반품 하기
                                                    </Button>
                                                    </>
                                                }
                                                { (request.txState === 4) &&
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
                                                        //onClick={() => openCompleteModal(request)}
                                                    >후기 등록
                                                    </Button>
                                                }
                                        </Stack>
                                    </RowCell>
                                </TableRow>
                            );
                            })}
                            </TableBody>
                    </Table>
                </TableContainer>
                { 
                    requests.length > 0 && 
                    <>
                    <InfoModal 
                        open={infoModalOpen}
                        onClose={closeInfoModal}
                        request={requestToModal}
                        fetchProducts={fetchProducts}
                    />
                    <CompleteModal
                        open={completeModalOpen}
                        onClose={closeCompleteModal}
                        request={requestToModal}
                        fetchProducts={fetchProducts}
                    />
                    <ReturnModal
                        open={returnModalOpen}
                        onClose={closeReturnModal}
                        request={requestToModal}
                        fetchProducts={fetchProducts}
                    />
                    </>
                }
                </>
            )}
        </Stack>
    );
};