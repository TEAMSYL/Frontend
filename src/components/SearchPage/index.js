import { Box, Grid, Stack, Typography } from '@mui/material';
import React from 'react'
import { useLocation } from 'react-router-dom';
import productApi from '../../api/Product.tsx';
import { Container, ProductsSection, MainSection, InfoBar, SortButton, NoResultCase, Palette, ProductCell, Pagination } from './StyledComponents';

const SearchPage = () => {
    const location = useLocation();
    const [ products, setProducts ] = React.useState([]);
    // const [ searchKeyWord, setSearKeyWord ] = React.useState('test');
    const [ page, setPage ] = React.useState();
    const [ totalPage, setTotalPage ] = React.useState();
    const [ sortBtnState, setSortBtnState ] = React.useState([true, false, false]);

    const PRODUCTS_PER_PAGE = 30;
    
    const [ searchKeyword, setSearchKeyword ] = React.useState(location.state.searchKeyword); 

    const fetchproducts = async() => {
        const products = await productApi.searchProducts(location.state.searchKeyword);
        return products;
    };

    // 최신순 버튼 클릭 핸들러
    const handleTimeSort = () => {
        const newSortBtnState = [true, false, false];
        setSortBtnState(newSortBtnState);
        // // 
        // const tempProducts = products.sort(function (productA, productB) {
        //     return productA
        // });

    };

    // 저가순 버튼 클릭 핸들러
    const handlePriceAsc = () => {
        const newSortBtnState = [false, false, true];
        setSortBtnState(newSortBtnState);
    };

    // 고가순 버튼 클릭 핸들러
    const handlePriceDsc = () => {
        const newSortBtnState = [false, true, false];
        setSortBtnState(newSortBtnState);
    };


    React.useEffect(() => {
        setSearchKeyword(location.state.searchKeyword);
        fetchproducts()
        .then((data) => {
            setProducts(data);
            setTotalPage(Math.ceil(data.length/PRODUCTS_PER_PAGE));
            setPage(1);
        });
    }, [location]);

    return (
        <Container>
            <MainSection>
                <InfoBar>
                    <Box display='flex' alignItems='center'>
                        <Typography  fontSize='20px' color={Palette.text_red} display='inline-block'>{searchKeyword}</Typography>
                        <Typography  fontSize='20px' color={Palette.text_black} display='inline-block'>&nbsp; 의 검색결과 </Typography>
                        <Typography  fontSize='20px' color={Palette.text_grey} display='inline-block'>&nbsp;{products.length}개</Typography>
                    </Box>
                    <Box>
                        <SortButton isSelect={sortBtnState[0]} onClick={handleTimeSort}>최신순</SortButton>
                        <SortButton isSelect={sortBtnState[1]} onClick={handlePriceDsc}>고가순</SortButton>
                        <SortButton isSelect={sortBtnState[2]} onClick={handlePriceAsc}>저가순</SortButton>
                    </Box>
                </InfoBar>
                <ProductsSection>
                    {products.length === 0 && (
                        <NoResultCase>
                            <Stack
                                spacing={2} 
                                width='50%'
                                display='flex' alignItems='center'
                            >
                                <Typography fontSize={24} color={Palette.text_red}>{searchKeyword}</Typography>
                                <Typography fontSize={19} fontWeight={500} color={Palette.text_black}>에 대한 결과가 존재하지 않습니다.</Typography>
                                <Stack
                                    spacing={1}
                                    width='100%'
                                    display='flex' alignItems='center'
                                    paddingTop='20px'
                                    borderTop={`1px solid ${Palette.border_grey}`}
                                >
                                    <Typography fontSize={14} color={Palette.text_black}>- 검색어의 철자를 확인하세요.</Typography>
                                    <Typography fontSize={14} color={Palette.text_black}>- 띄어쓰기를 다르게 하여 시도하세요.</Typography>
                                    <Typography fontSize={14} color={Palette.text_black}>- 보다 일반적인 키워드로 검색하세요.</Typography>
                                </Stack>
                            </Stack>
                        </NoResultCase>
                    )}
                    {products.length != 0 && (
                        <>
                            <Grid container spacing={2}>
                                {products.slice( (page -1) * PRODUCTS_PER_PAGE, page * PRODUCTS_PER_PAGE)
                                .map((product) => (
                                    <Grid item xs={2.4}>
                                        <ProductCell product={product}/>
                                    </Grid>
                                ))}
                            </Grid>
                            <Pagination page={page} totalPage={totalPage} setPage={setPage}/>
                        </>
                    )}
                </ProductsSection>
            </MainSection>
        </Container>
    );

};

export default SearchPage;