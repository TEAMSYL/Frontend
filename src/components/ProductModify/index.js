import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ContentNameSection } from '../commonComponents';

const Palette = {
    text_black: '#212121',
    border_light_grey: '#dcdbe4',
};

const Container = ({children}) => {
    return (
        <Box sx={{ width: '100vw', minWidth: '1024px', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            {children}
        </Box>
    );
};

const ContentSection = ({ formInput, setFormInput }) => {
    return (
        <>
            <Image formInput={formInput} setFormInput={setFormInput}></Image>
            <Name formInput={formInput} setFormInput={setFormInput}></Name>
            <Category formInput={formInput} setFormInput={setFormInput}></Category>
            <Price formInput={formInput} setFormInput={setFormInput}></Price>
            <Description formInput={formInput} setFormInput={setFormInput}></Description>
        </>
    );
};

const InputSectionLayout = ({children, sectionName}) => {
    return (
        <Box sx={{padding: '32px 0', borderBottom: `1px solid ${Palette.border_light_grey}` }} >
            <Grid container>
                <Grid item xs={2}>
                    <Typography fontSize={"18px"} color={Palette.text_black}>{sectionName}</Typography>
                </Grid>
                <Grid item xs={8} display='flex' alignItems='center'>
                    {children}
                </Grid>
            </Grid>
        </Box>   
    );
};

const Image = ({ formInput, setFormInput }) => {
    const sectionName = '상품 이미지'
    return (
        <InputSectionLayout sectionName={sectionName}>
            <Typography>등록한 이미지 수정 기능은 아직 지원되지 않습니다.</Typography>
        </InputSectionLayout>
    );
};

const Name = ({ formInput, setFormInput }) => {
    const sectionName = '제목'
    const maxLen = 40;
    console.log('formInput: ', formInput)
    return (
        <InputSectionLayout sectionName={sectionName}>
            <TextField hiddenLabel size='small'
                defaultValue={formInput.productName}
                placeholder="상품 제목을 입력해주세요. (최대 40자)"
                inputProps={{ maxLength: maxLen}}
                style={{ width: 500}}
                onChange={(e) => setFormInput((formInput) => ({...formInput, ...{ productName: e.target.value }}))}
            />
            <Typography marginLeft='15px'>{formInput.productName.length} / 40</Typography>
        </InputSectionLayout>
    );
};

const Category = ({ formInput, setFormInput }) => {
    const sectionName = '카테고리'
    return (
        <InputSectionLayout sectionName={sectionName}>
            <Typography>{formInput.category}</Typography>
        </InputSectionLayout>
    );
};

const Price = ({ formInput, setFormInput }) => {
    const sectionName = '가격'
    return (
        <InputSectionLayout sectionName={sectionName}>
            <TextField hiddenLabel size='small'
                defaultValue={formInput.price}
                placeholder="숫자만 입력해주세요"
                style={{ width: 200}}
                onChange={(e) => setFormInput((formInput) => ({...formInput, ...{ price: e.target.value}}))}
            />
            <Typography marginLeft='15px'>ETH</Typography>
        </InputSectionLayout>
    );
};

const Description = ({ formInput, setFormInput }) => {
    const sectionName = '설명'
    const maxLen = 2000;
    return (
        <InputSectionLayout sectionName={sectionName}>
            <div>
                <TextField  hiddenLabel size='small' multiline rows={6}
                    defaultValue={formInput.content}
                    placeholder='상품 설명을 입력해주세요. (최대 2000자)'
                    style={{ width: 700 }}
                    inputProps={{ maxLength: maxLen }}
                />
                <div style={{ display: 'flex', justifyContent: 'end', marginTop: '10px'}}>
                    <Typography>{formInput.content.length} / 2000</Typography>
                </div>
            </div>
        </InputSectionLayout>
    );
};

const SubmitBtnSection = ({onClick}) => {
    return (
        <div style={{
            width: '100%',
            position: "sticky",
            bottom: "0",
            display: "flex",
            justifyContent: "center",
            height: "90px",
            borderTop: "1px solid #EEEEEE",
            backgroundColor: "#FAFAFD",
        }}>
            <div style={{
                width: "1024px",
                display: "flex",
                alignItems: "center",
                justifyContent: "end",
            }}>
                <Button sx={{
                    width: "160px",
                    height: "60px",
                    backgroundColor: "#FF5058",
                    "&:hover": {
                      backgroundColor: "#FF3A44",
                    },
                    }}
                    onClick={onClick}
                >
                    <Typography color={"white"} fontSize={"20px"}>
                        수정하기
                    </Typography>
                </Button>
            </div>
        </div>
    );
};

const ProductModify = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [ formInput, setFormInput ] = useState(location.state.product);

    useEffect(() => {
        console.log(formInput); 
    }, []);
    const handleSubmit = async () => {
        // 입력 validity 확인
        if ( formInput.productName.length < 1) {
            alert('제목을 입력하세요!');
            return;
        } else if (formInput.category.length < 1) {
            alert('카테코리를 입력하세요!');
            return;
        } else if (formInput.price.length < 1){
            alert('가격을 입력하세요');
            return;
        } else if (formInput.content.length < 1){
            alert('상품 설명을 입력하세요!');
            return;
        }

        alert('상품 정보 수정이 완료되었습니다.');
        navigate(-1);
    };

    return (
        <Container>
            <Box width='1024px' paddingBottom='90px'>
                <ContentNameSection name={'상품 정보 수정'}/>
                <ContentSection formInput={formInput} setFormInput={setFormInput}></ContentSection>
            </Box>
            <SubmitBtnSection onClick={handleSubmit}></SubmitBtnSection>
        </Container>
    );
};

export default ProductModify;