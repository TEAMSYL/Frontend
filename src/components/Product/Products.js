import { Table, AppBar, Box, Button, createTheme, Grid, Stack, Tab, Tabs, ThemeProvider, Typography, TableContainer, TableHead, TableRow, TableCell, TableBody, TablePagination } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';
import {  ProductImg, ProductName, ProductCategory, ProductPrice, ProductDescription} from './RegistTabComponents';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import imageCompression from 'browser-image-compression';
import ClearIcon from '@mui/icons-material/Clear';

const theme = createTheme({
    palette: {
        primary: {
            main: '#FF646B'
        }
    },
    typography: {
      fontFamily: "Noto Sans CJK KR",
    },
});

const StyledBox = styled(Box)`
    font-size: 14px;
    width: 1024px;
    padding: 32px 0;
    border-bottom: 1px solid #DCDBE4;
`;

const ManageTab = (props) => {
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const RowCell = styled(TableCell)`
        text-align: center;
    `;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };


    const rows = [
        {   
            _id: '', // number
            _img: 'test', // 미정(s3 저장 링크 or 파일 원본)
            _name: 'name1', // 제목
            _state: '판매중', // 거래 상태 (ex 판매중, 거래 완료, 거래진행중)
            _price: '100',  // 가격. wei 단위(bignumber)가 아니라 eth 단위로 변환한 값
            _curDate: '2921', // 최근 상품정보 수정한 날짜 
        },
        {
            _img: 'test',
            _name: 'name1',
            _state: '판매중',
            _price: '100',
            _curDate: '2921', 
        },
        {
            _img: 'test',
            _name: 'ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ',
            _state: '판매중',
            _price: '100',
            _curDate: '2921', 
        },
        {
            _img: 'test',
            _name: 'name1',
            _state: '판매중',
            _price: '100',
            _curDate: '2921', 
        },
        {
            _img: 'test',
            _name: 'name1',
            _state: '판매중',
            _price: '100',
            _curDate: '2921', 
        },
    ];

    const headCells = [
        {
            id: 'img',
            numeric: false,
            label: '사진',
            width: '18%', 
        },
        {
            id: 'state',
            numeric: false,
            label: '상태',
            width: '10%'
        },
        {
            id: 'name',
            numeric: false,
            label: '제목',
            width: '35%'
        },
        {
            id: 'price',
            numeric: true,
            label: '가격',
            width: '15%'
        },
        {
            id: 'curDate',
            numeric: false,
            label: '최근 수정일',
            width: '12%'
        }, 
        {
            id: 'buttons',
            numeric: false,
            label: '기능',
            width: '10%'
        }
    ];

    return (
        <div
            hidden={props.value !== props.index}
            style={{
                fontFamily: 'Noto Sans CJK KR',
                paddingBottom: '100px',
            }}
        >   
            <Stack
                sx={{
                    display: 'flex',
                    minWidth: '1024px',
                    minHeight: '50vw',
                    alignItems: 'center'

                }}
            >   
                <Box sx={{ display: 'flex', justifyContent: 'center', width: '1024px', margin: '40px 0 32px'}}>
                    <TablePagination
                        count={rows.length}
                        rowsPerPageOptions={[
                            { value: 5, label: '5개씩'},
                            { value: 10, label: '10개씩'},
                            { value: 20, label: '20개씩'}    
                        ]}
                        rowsPerPage={rowsPerPage}
                        labelRowsPerPage={''}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowPerPage}
                    />
                </Box>
                <TableContainer sx={{ width: 1024}}>
                    <Table>
                        <TableHead
                            sx={{
                                backgroundColor: '#FAFAFD',
                                borderTop: '0.5px solid black',
                            }}
                        >
                            <TableRow>
                                {headCells.map((cell) => (
                                    <TableCell
                                        key={cell.id}
                                        align={'center'}
                                        label={cell.label}
                                        sx={{
                                            width: `${cell.width}`,
                                            fontWeight: '600',
                                            height: '20px',
                                            padding: 1,
                                            borderTop: '0.5px solid black',
                                            borderBottom: '0.5px solid black'
                                        }}
                                    >
                                        {cell.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index) => {
                                return (
                                    <TableRow>
                                        <RowCell>{row._img}</RowCell>
                                        <RowCell>{row._state}</RowCell>
                                        <RowCell sx={{ color: '#0072E6', fontWeight: '600'}}>{row._name}</RowCell>
                                        <RowCell>{row._price} ETH</RowCell>
                                        <RowCell>{row._curDate}</RowCell>
                                        <RowCell>
                                            <Stack spacing={1}>
                                                <Button
                                                    sx={{
                                                        color: '#0072E6',
                                                        border: '0.5px solid #C3C2CC',
                                                        height: '30px',
                                                        '&:hover': {
                                                            backgroundColor: '#ededed'
                                                        }
                                                    }}
                                                    disableTouchRipple
                                                >수정하기</Button>
                                                <Button
                                                    sx={{
                                                        border: '0.5px solid #C3C2CC',
                                                        height: '30px',
                                                        '&:hover': {
                                                            backgroundColor: '#ededed'
                                                        }
                                                    }}
                                                    disableTouchRipple
                                                >삭제하기</Button>
                                            </Stack>
                                            
                                        </RowCell>
                                    </TableRow>
                                )
                            })
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Stack>
        </div>
    );
};

const Products = () => {
    const RegistTab = (props) => {
        const [ imgFiles, setImgFiles ] = React.useState([]); // 업로드한 이미지 파일들
        let name = '';
        const setName = (_name) => { name = _name; }
        const [ category, setCategory ] = React.useState('noraml'); // 카테고리
        let price = ''; // 가격
        const setPrice = (_price) => { price = _price}; 
        let description = '' // 설명
        const setDescription = (_description) => {
            description = _description;
        }

        const handleSubmit = () => { // 등록하기 버튼 누를 경우 실행되는 함수
            if (imgFiles.length < 1) { // 이미지 파일 등록 안된 경우
                // 이미지 파일 등록하는 component로 화면 이동하고 등록하라고 알림
                alert("이미지를 입력하세요!");
                return;
            }
            if (name === '') { // 제목 안적은 경우
                alert("제목을 입력하세요!");
                return;
            }
            if (category === '') {
                alert("카테고리를 입력하세요!");
                return;
            }
            if (price <= 0) {
                alert("가격을 입력하세요!");
                return;
            }
            if (description === '') {
                alert('설명을 입력하세요!');
                return;
            }

            // 모든 입력을 완료한 경우 api를 통해 product data를 서버로 전달
            console.log(name);
            console.log(price);
            console.log(description);
            console.log(imgFiles);
        };

        return (
            <div hidden={props.value !== props.index} style={{fontFamily: 'Noto Sans CJK KR'}}> 
                <ThemeProvider theme={theme}>
                    <Box
                        sx= {{
                            display: 'flex',
                            justifyContent: 'center',
                            minWidth: '1024px'
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                width: "1024px",
                            }}
                        >
                            <Stack>
                                <StyledBox
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        borderBottom: '3px solid #1E1D29'
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            marginRight: '30px',
                                            marginLeft: '5px',
                                            color: '#212121',
                                            fontSize: '26px',
                                            fontWeight: 500
                                        }}
                                    >상품 정보</Typography>
                                    <Typography
                                        sx={{
                                        }}
                                        color={'primary'}
                                        fontSize={'16px'}
                                    >*필수항목</Typography>
                                </StyledBox>
                                <RegistTabContent
                                    name={name} setName={setName}
                                    setCategory={setCategory}
                                    setDescription={setDescription}
                                    setImgFiles={setImgFiles}
                                    setPrice={setPrice}
                                    imgFiles={imgFiles} setImgFiles={setImgFiles}
                                />
                            </Stack>
                        </Box>
                    </Box>
                    
                    <Box 
                        sx={{ 
                            position: 'sticky',
                            bottom: '0',
                            display: 'flex', 
                            justifyContent: 'center',
                            height: '90px',
                            borderTop: '1px solid #EEEEEE',
                            backgroundColor: '#FAFAFD'
                        }}
                    >
                        <Box 
                            sx={{ 
                                width: '1024px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'end'
                            }}
                        >
                            <Button
                                sx={{ 
                                    width: '160px', height: '60px', backgroundColor: '#FF5058',
                                    '&:hover': {
                                        backgroundColor: '#FF3A44'
                                    }
                                }}
                                onClick={handleSubmit}
                            >
                                <Typography color={'white'} fontSize={'20px'}>등록하기</Typography>
                            </Button>
                        </Box>
                    </Box>
                </ThemeProvider>
            </div>
        );  
    };

    const RegistTabContent = (props) => {
        const rowNames = ['상품 이미지', '제목', '카테고리', '가격', '설명'];
        const rowContents = [
            <ProductImg 
                imgFiles={props.imgFiles} setImgFiles={props.setImgFiles}
            />, 
            <ProductName 
                name={props.name} setName={props.setName}
            />, 
            <ProductCategory 
                setCategory={props.setCategory}
            />, 
            <ProductPrice 
                setPrice={props.setPrice}
            />, 
            <ProductDescription 
                setDescription={props.setDescription}
            />];

        const componentList = rowNames.map((name, index) => {
            return (
                <StyledBox
                >
                    <Grid container>
                        <Grid item xs={2} sx={{display: 'flex', alignItems:'center'}}>
                            <Typography
                                sx={{
    
                                }}
                                fontSize={'18px'}
                                color={'#212121'}
                            >
                                {name}
                            </Typography>
                            <Typography sx={{color: '#FF646B'}}>&nbsp;&nbsp;*</Typography>
                        </Grid>
                        <Grid item xs={8}>
                            {rowContents[index]}
                        </Grid>
                    </Grid>
                </StyledBox>)
        });
        return (<>{componentList}</>);
    };

    const [ value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const a11yProps = (index) => {
      return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
      };
    };

    return (
        <ThemeProvider theme={theme}>
            <Box
                sx={{
                    display: 'flex',
                    
                    flexDirection: 'column'
                }}
            >   
                <AppBar
                    position='static'
                    sx={{
                        backgroundColor: 'transparent',
                        height: '70px',
                        display: 'flex',
                        justifyContent: 'center',
                        minWidth: '1024px',
                        alignItems: 'center',
                        boxShadow: 0,
                        borderBottom: '1px solid #EDEDED',
                    }}
                >
                    <Tabs 
                        value={value} onChange={handleChange}
                        sx={{
                            width: '1024px'
                        }}
                        TabIndicatorProps={{
                            style: {
                                backgroundColor: 'transparent',
                            }
                        }}
                    >
                        <Tab label="상품 등록" {...a11yProps(0)} disableTouchRipple/>
                        <Tab label="상품 관리" {...a11yProps(1)} disableTouchRipple/>
                    </Tabs>
                </AppBar>
                
                <RegistTab value={value} index={0} 
                ></RegistTab>
                <ManageTab value={value} index={1}>
                </ManageTab>
                <Stack sx={{width: '1024px'}}>
                </Stack>
                
            </Box>
        </ThemeProvider>
        
    );
};

export default Products;