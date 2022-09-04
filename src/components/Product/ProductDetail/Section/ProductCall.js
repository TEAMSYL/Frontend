import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import styled from 'styled-components';
import productApi from '../../../../api/Product.tsx';
import Comment from './Comment';

const ProductCall = ({ product, user }) => {
  const [comment, setComment] = useState('');
  const [commentList, setCommentList] = useState([]);
  useEffect(() => {
    productApi.getComment(product.id).then(datas => {
      setCommentList(datas);
    });
  }, []);
  const refreshFunction = newComment => {
    setCommentList(commentList.concat(newComment));

    console.log(commentList);
  };
  const clickHandler = async () => {
    if (comment != '') {
      console.log(user);
      const data = {
        comment: comment,
        productId: product.id,
        buyerId: user.id,
        responseTo: 0,
      };
      productApi.postComment(data).then(res => {
        const data = {
          id: res,
          comment: comment,
          productId: product.id,
          buyerId: user.id,
          responseTo: 0,
        };
        refreshFunction(data);
      });
      setComment('');
    }
  };
  return (
    <Box>
      <ProductAsk>
        <ProductAskTitle>
          상품문의
          <span>{commentList.length}</span>
        </ProductAskTitle>
        <ProductAskInputArea>
          <ProductAskInputDiv>
            <textarea
              placeholder="상품문의 입력"
              value={comment}
              onChange={e => {
                setComment(e.target.value);
              }}
            />
          </ProductAskInputDiv>
          <ProductAskInputConfirm>
            <InputLength>{comment.length} / 100</InputLength>
            <ConfirmButton onClick={clickHandler}>등록</ConfirmButton>
          </ProductAskInputConfirm>
        </ProductAskInputArea>
      </ProductAsk>
      <ProductAskList>
        <Comments>
          {commentList.map(
            (cmt, i) =>
              !cmt.responseTo && (
                <Comment
                  key={i}
                  cmt={cmt}
                  commentList={commentList}
                  refreshFunction={refreshFunction}
                  product={product}
                  user={user}
                />
              ),
          )}
        </Comments>
      </ProductAskList>
    </Box>
  );
};

const Comments = styled.div`
  padding-top: 25px;
`;

const ProductAskList = styled.div`
  margin-top: 10px;
`;
const ConfirmButton = styled.button`
  border: 1px solid rgb(238, 238, 238);
  height: 32px;
  display: flex;
  align-items: center;
  padding: 0px 20px;
  font-size: 13px;
  color: rgb(136, 136, 136);
  img {
    margin-right: 4px;
    width: 15px;
    height: 16px;
  }
`;

const InputLength = styled.div`
  margin-left: 10px;
  font-size: 12px;
  color: rgb(136, 136, 136);
`;

const ProductAskInputConfirm = styled.div`
  display: flex;
  width: 95%;
  height: 50px;
  align-items: center;
  justify-content: space-between;
  padding: 0px 10px;
`;
const ProductAskInputDiv = styled.div`
  width: 94%;
  padding: 20px;
  height: 80px;
  border-bottom: 1px solid rgb(238, 238, 238);
  textarea {
    width: 95%;
    height: 100%;
    resize: none;
    font-size: 13px;
    line-height: 1.5;
  }
`;

const ProductAskInputArea = styled.div`
  border-right: 1px solid rgb(238, 238, 238);
  border-bottom: 1px solid rgb(238, 238, 238);
  border-left: 1px solid rgb(238, 238, 238);
`;

const ProductAsk = styled.div`
  margin-top: 10px;
`;
const ProductAskTitle = styled.div`
  padding: 24px 0px 15px;
  font-size: 18px;
  border-bottom: 1px solid rgb(238, 238, 238);
  span {
    color: rgb(247, 47, 51);
  }
`;
export default ProductCall;
