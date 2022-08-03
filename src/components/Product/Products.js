import {
  Table,
  AppBar,
  Box,
  Button,
  createTheme,
  Grid,
  Stack,
  Tab,
  Tabs,
  ThemeProvider,
  Typography,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";
import {
  ProductImg,
  ProductName,
  ProductCategory,
  ProductPrice,
  ProductDescription,
} from "./RegistTabComponents";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import imageCompression from "browser-image-compression";
import ClearIcon from "@mui/icons-material/Clear";
import productApi from "../../api/Product.tsx";
import RequestsDialog from './RequestsDialog';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { LegendToggleSharp } from '@mui/icons-material';

const theme = createTheme({
  palette: {
    primary: {
      main: "#FF646B",
    },
  },
  typography: {
    fontFamily: "Noto Sans CJK KR",
  },
});

const StyledBox = styled(Box)`
  font-size: 14px;
  width: 1024px;
  padding: 32px 0;
  border-bottom: 1px solid #dcdbe4;
`;

export const ManageTab = (props) => {
  const navigate = useNavigate();
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [ dialogOpen, setDialogOpen ] = React.useState(false);
  const [ clickedProduct, setClickedProduct] = React.useState();

  const handleDialogOpen = (product) => {
    console.log(product);
    setClickedProduct(product);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const [myProducts, setMyProducts] = React.useState([]);
  const RowCell = styled(TableCell)`
    text-align: center;
  `;

  // 서버로부터 나의 상품 정보 가져오기 (작성필요 7.20)
  const fetchProducts = async () => {
    const useProducts= [];
    try {
      await productApi.getUserProducts().then( (response) => {
        const productsData = response.data;;
        console.log('productData: ',productsData);
        setMyProducts(productsData);
      });
    } catch(error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    fetchProducts();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeBtn = (product) => {
    navigate('/modify', { state: { product: product}});
  };

  // 삭제하기 버튼 눌렀을 때의 핸들러
  const handleRemoveProductBtn = async (product) => {
    try {
      const result = productApi.deleteProduct(product.id.toString());
      if (result) {
        alert('성공적으로 상품이 제거되었습니다.');
        fetchProducts(); 
      } else {
        alert('제거에 실패하였습니다. 다시 시도해주세요!');
      }
    } catch (error) {
      console.log(error);
      alert('제거에 실패하였습니다. 다시 시도해주세요!');
    }
  };

  const handleImgClick = (product) => {
    let productId = product.id;
    navigate(`/detail/${productId}`);
  };

  const handleMoveToManage = (product) => {
    // 거래 상세 페이지로 이동시킴
  };
  
  const getProductState = (state) => {
    let status = "";
    if (state === 'before' || state === 'requested') {
      status = "판매중";
    } else if (state === 'permitted') {
      status = "거래중";
    }
    return status;
  };

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
      label: "상태",
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
      id: "curDate",
      numeric: false,
      label: "최근 수정일",
      width: "12%",
    },
    {
      id: "buttons",
      numeric: false,
      label: "기능",
      width: "10%",
    },
  ];

  return (
    <div
      hidden={props.value !== props.index}
      style={{
        fontFamily: "Noto Sans CJK KR",
        paddingBottom: "100px",
      }}
    >
      <Stack
        sx={{
          display: "flex",
          minWidth: "1024px",
          minHeight: "50vw",
          alignItems: "center",
        }}
      >
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
              { value: 20, label: "20개씩" },
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
                              "&:hover": {
                                cursor: 'pointer'
                              }
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
                                  backgroundColor: '#FAFAFD',
                              }}
                              onClick={() => handleImgClick(product)}
                          />
                        </Box>
                      </RowCell>
                      <RowCell>{
                        `${getProductState(product.status)}`
                      }</RowCell>
                      <RowCell sx={{ color: "#0072E6", fontWeight: "600" }}>
                        {product.productName}
                      </RowCell>
                      <RowCell>{product.price}ETH</RowCell>
                      <RowCell>{product.updatedAt.slice(0,10)}</RowCell>
                      <RowCell>
                        <Stack spacing={1}>
                          { (product.status !== 'permitted') &&
                            <>
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
                              onClick={() => handleChangeBtn(product)}
                            >수정하기</Button>
                            <Button
                              sx={{
                                border: "0.5px solid #C3C2CC",
                                height: "30px",
                                "&:hover": {
                                  backgroundColor: "#ededed",
                                },
                              }}
                              disableTouchRipple
                              onClick={() => handleRemoveProductBtn(product)}
                            >삭제하기</Button>
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
                              onClick={() => handleDialogOpen(product)}
                            >구매요청</Button>
                            </>
                          }
                          { (product.status === 'permitted') &&
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
                              onClick={() => handleMoveToManage(product)}
                            >거래관리</Button>
                            </>
                          }
                        </Stack>
                      </RowCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
      <RequestsDialog
        open={dialogOpen}
        onClose={handleDialogClose}
        product={clickedProduct}
      />
    </div>
  );
};

export const RegistTab = (props) => {
  const formdata = new FormData();
  const navigate = useNavigate();
  const [imgFiles, setImgFiles] = React.useState([]); // 업로드한 이미지 파일들
  let name = "";
  const setName = (_name) => {
    name = _name;
  };
  const [category, setCategory] = React.useState("noraml"); // 카테고리
  let price = ""; // 가격
  const setPrice = (_price) => {
    price = _price;
  };
  let description = ""; // 설명
  const setDescription = (_description) => {
    description = _description;
  };

  const handleSubmit = async () => {
    // 등록하기 버튼 누를 경우 실행되는 함수
    if (imgFiles.length < 1) {
      // 이미지 파일 등록 안된 경우
      // 이미지 파일 등록하는 component로 화면 이동하고 등록하라고 알림
      alert("이미지를 입력하세요!");
      return;
    }
    if (name === "") {
      // 제목 안적은 경우
      alert("제목을 입력하세요!");
      return;
    }
    if (category === "") {
      alert("카테고리를 입력하세요!");
      return;
    }
    if (price <= 0) {
      alert("가격을 입력하세요!");
      return;
    }
    if (description === "") {
      alert("설명을 입력하세요!");
      return;
    }

    //imgFiles.map((img) => formdata.append("productImgs", img.file));
    //const imgUrls = await productApi.setProductImages(formdata);
    // 모든 입력을 완료한 경우 api를 통해 product data를 서버로 전달
    const productData = {
      content: description,
      category: "test",
      price: price,
      productName: name
    };

    const data = new FormData();
    data.append("data", JSON.stringify(productData));
    data.append("thumbnail", imgFiles[0].file);
    console.log('data:', data);
    const { productId } = await productApi.setProduct(data);

    imgFiles.map((img, idx) =>
      formdata.append("productImgs", img.file, `file_${idx}`)
    );
    const result = await productApi.setProductImages(formdata, productId);

    if (result) {
      alert("상품 등록에 성공했습니다.");
      navigate('/products/manage');
    } else {
      alert("상품 등록에 실패하였습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div
      style={{ fontFamily: "Noto Sans CJK KR" }}
    >
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            minWidth: "1024px",
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
                  display: "flex",
                  alignItems: "center",
                  borderBottom: "3px solid #1E1D29",
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
                  상품 정보
                </Typography>
                <Typography sx={{}} color={"primary"} fontSize={"16px"}>
                  *필수항목
                </Typography>
              </StyledBox>
              <RegistTabContent
                name={name}
                setName={setName}
                setCategory={setCategory}
                setDescription={setDescription}
                setImgFiles={setImgFiles}
                setPrice={setPrice}
                imgFiles={imgFiles}
              />
            </Stack>
          </Box>
        </Box>

        <Box
          sx={{
            position: "sticky",
            bottom: "0",
            display: "flex",
            justifyContent: "center",
            height: "90px",
            borderTop: "1px solid #EEEEEE",
            backgroundColor: "#FAFAFD",
          }}
        >
          <Box
            sx={{
              width: "1024px",
              display: "flex",
              alignItems: "center",
              justifyContent: "end",
            }}
          >
            <Button
              sx={{
                width: "160px",
                height: "60px",
                backgroundColor: "#FF5058",
                "&:hover": {
                  backgroundColor: "#FF3A44",
                },
              }}
              onClick={handleSubmit}
            >
              <Typography color={"white"} fontSize={"20px"}>
                등록하기
              </Typography>
            </Button>
          </Box>
        </Box>
      </ThemeProvider>
    </div>
  );
};

const RegistTabContent = (props) => {
  const rowNames = ["상품 이미지", "제목", "카테고리", "가격", "설명"];
  console.log("이미지 파일들", props.imgFiles);
  const rowContents = [
    <ProductImg imgFiles={props.imgFiles} setImgFiles={props.setImgFiles} />,
    <ProductName name={props.name} setName={props.setName} />,
    <ProductCategory setCategory={props.setCategory} />,
    <ProductPrice setPrice={props.setPrice} />,
    <ProductDescription setDescription={props.setDescription} />,
  ];

  const componentList = rowNames.map((name, index) => {
    return (
      <StyledBox>
        <Grid container>
          <Grid item xs={2} sx={{ display: "flex", alignItems: "center" }}>
            <Typography sx={{}} fontSize={"18px"} color={"#212121"}>
              {name}
            </Typography>
            <Typography sx={{ color: "#FF646B" }}>&nbsp;&nbsp;*</Typography>
          </Grid>
          <Grid item xs={8}>
            {rowContents[index]}
          </Grid>
        </Grid>
      </StyledBox>
    );
  });
  return <>{componentList}</>;
};

export const Products = () => {
  const navigate = useNavigate();
  return (
    <ThemeProvider theme={theme}>
      <Stack
        sx={{
          display: 'flex',
          alignItems: 'center',
          minWidth: '1024px',
        }}
      >
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
                navigate('/products/regist');
              }}
              sx={{
                fontWeight: '400',
                color: `${useLocation().pathname == '/products/regist' ? '#FF50558' : '#212121'}`,
                '&:hover': {
                  backgroundColor: 'transparent',
                }
              }}
            >상품 등록
            </Button>
            <Button
              disableTouchRipple
              onClick={() => {
                navigate('/products/manage');
              }}
              sx={{
                fontWeight: '400',
                marginLeft: '30px',
                color: `${useLocation().pathname == '/products/manage' ? '#FF50558' : '#212121'}`,
                '&:hover': {
                  backgroundColor: 'transparent',
                }
              }}
            >
              상품 관리
            </Button>
          </div>
          
        </AppBar>
        <Stack sx={{ width: "1024px" }}>
          <Outlet/>
        </Stack>
      </Stack>
    </ThemeProvider>
  );
};
