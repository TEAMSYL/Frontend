import { Box } from '@mui/material';
import styled from 'styled-components'
const ProductCall = ({ }) => {
  return (
    <Box>
        <ProductAsk>
            <ProductAskTitle>
                상품문의 
                <span>0</span>
            </ProductAskTitle>
            <ProductAskInputArea>
                <ProductAskInputDiv>
                    <textarea placeholder="상품문의 입력" />
                </ProductAskInputDiv>
                <ProductAskInputConfirm>
                <InputLength>0 / 100</InputLength>
                <ConfirmButton>
                    등록
                </ConfirmButton>
                </ProductAskInputConfirm>
            </ProductAskInputArea>
        </ProductAsk>
        <ProductAskList>
        </ProductAskList>
    </Box>  
  );
};

const Comments = styled.div`
    padding-top: 25px;
`

const ProductAskList = styled.div`
    margin-top: 10px;
`
const ConfirmButton = styled.button`
    border: 1px solid rgb(238, 238, 238);
    height: 32px;
    display: flex;
    align-items: center;
    padding: 0px 20px;
    font-size: 13px;
    color: rgb(136, 136, 136);
    img{
        margin-right: 4px;
        width:15px;
        height: 16px;
    }
`

const InputLength = styled.div`
    margin-left: 10px;
    font-size: 12px;
    color: rgb(136, 136, 136);
`

const ProductAskInputConfirm = styled.div`
    display: flex;
    width: 95%;
    height: 50px;
    align-items: center;
    justify-content: space-between;
    padding: 0px 10px;
`
const ProductAskInputDiv = styled.div`
    width: 94%;
    padding: 20px;
    height: 80px;
    border-bottom: 1px solid rgb(238, 238, 238);
    textarea{
        width: 95%;
    height: 100%;
    resize: none;
    font-size: 13px;
    line-height: 1.5;
    }
`

const ProductAskInputArea = styled.div`
    border-right: 1px solid rgb(238, 238, 238);
    border-bottom: 1px solid rgb(238, 238, 238);
    border-left: 1px solid rgb(238, 238, 238);
`

const ProductAsk = styled.div`
  margin-top: 10px;
`;
const ProductAskTitle = styled.div`
    padding: 24px 0px 15px;
    font-size: 18px;
    border-bottom: 1px solid rgb(238, 238, 238);
    span{
        color: rgb(247, 47, 51)
    }
`
export default ProductCall;