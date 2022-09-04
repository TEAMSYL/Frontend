import { Box } from '@mui/material';
import styled from 'styled-components';
const CATEGORY = [
  'ix',
  '디지털기기',
  '가구',
  '책',
  '티켓/음반',
  '의류',
  '스포츠용품',
  '반려동물용품',
  '생활용품',
  '식물',
  '뷰티/미용',
  '게임',
  '기타',
];
const ProductInfo = ({
  product: { id, status, productName, price, category, content },
}) => {
  return (
    <div>
      <ProductInfoBody>
        <InfoTitle>상품정보</InfoTitle>
        <InfoContnet>{content}</InfoContnet>
        <Blank />
        <ProductInfoContent></ProductInfoContent>
        <ProductInfoMore>
          <Location>
            <ProductInfoMoreTtitle>거래지역</ProductInfoMoreTtitle>
            <ProductInfoMoreDetail>부산대학교</ProductInfoMoreDetail>
          </Location>
          <Category>
            <ProductInfoMoreTtitle>카테고리</ProductInfoMoreTtitle>
            <ProductInfoMoreDetail>
              <span>{CATEGORY[category]}</span>
            </ProductInfoMoreDetail>
          </Category>
          <Tag>
            <ProductInfoMoreTtitle>상품태그</ProductInfoMoreTtitle>
            <ProductInfoMoreDetail>
              <span>어떤 태그?</span>
            </ProductInfoMoreDetail>
          </Tag>
        </ProductInfoMore>
      </ProductInfoBody>
    </div>
  );
};

const InfoTitle = styled.div`
  font-size: 18px;
  padding: 24px 0px 16px;
  border-bottom: 1px solid rgb(238, 238, 238);
`;

const InfoContnet = styled.div`
  font-size: 20px;
  font-style: solid;
`;

const ProductInfoBody = styled.div``;
const Blank = styled.div`
  margin-top: 30px;
`;
const ProductInfoContent = styled.div`
  white-space: pre-wrap;
  margin: 40px 0px;
  line-height: 1.5;
`;
const ProductInfoMore = styled.div`
  padding: 20px 0px;
  border-top: 1px solid rgb(238, 238, 238);
  border-bottom: 1px solid rgb(238, 238, 238);
  display: flex;
`;
const Location = styled.div`
  width: 341px;
  border-right: 1px solid rgb(238, 238, 238);
`;
const ProductInfoMoreTtitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
  font-size: 13px;
  color: rgb(178, 178, 178);
  img {
    margin-right: 7px;
  }
`;
const ProductInfoMoreDetail = styled.div`
  font-size: 13px;
  color: rgb(102, 102, 102);
  padding: 0px 15px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  line-height: 1.5;
  min-height: 19px;
`;

const Category = styled.div`
  width: 341px;
  border-right: 1px solid rgb(238, 238, 238);
`;
const Tag = styled.div`
  border-right: 0px;
  width: 341px;
`;
export default ProductInfo;
