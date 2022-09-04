import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';
import productApi from '../../../../api/Product.tsx';
import {
  Button,
  Box,
  IconButton,
} from '../../../../../node_modules/@mui/material/index';
import userApi from '../../../../api/User.tsx';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import ReplyComment from './ReplyComment';
const Comment = ({ cmt, commentList, refreshFunction, product, user }) => {
  const [userNick, setUserNick] = useState('');
  const [id, setId] = useState(0);
  const [comment, setComment] = useState('');
  const [newComment, setNewComment] = useState('');
  const [toggle, setToggole] = useState(false);
  useEffect(() => {
    const { id, comment, buyerId, productId } = cmt;
    userApi.getUserNick(buyerId).then(data => {
      setUserNick(data);
    });
    setComment(comment);
    setId(id);
  }, []);
  const clickHandler = () => {
    setToggole(!toggle);
  };
  const clickCommentHandler = () => {
    console.log(id);
    if (newComment != '' && id != undefined) {
      const data = {
        comment: newComment,
        productId: product.id,
        buyerId: user.id,
        responseTo: cmt.id,
      };
      refreshFunction(data);
      productApi.postComment(data).then(res => {
        console.log(res);
      });
      setNewComment('');
      setToggole(!toggle);
    }
  };
  return (
    <CommentDiv>
      <CommentWrapper>
        <CommentHeader>
          <UserName>{userNick}</UserName>
        </CommentHeader>
        <Box sx={{ display: 'flex' }}>
          <CommentContent>{comment}</CommentContent>
          <IconButton sx={{ marginLeft: 'auto' }} onClick={clickHandler}>
            <ChatBubbleIcon />
          </IconButton>
        </Box>
      </CommentWrapper>
      <ProductAskList>
        <Comments>
          {commentList.map(
            (_cmt, i) =>
              _cmt.responseTo == cmt.id && <ReplyComment key={i} cmt={_cmt} />,
          )}
        </Comments>
      </ProductAskList>
      {toggle && (
        <ProductAskInputArea>
          <ProductAskInputDiv>
            <textarea
              placeholder="대댓글을 작성해주세요."
              value={newComment}
              onChange={e => {
                setNewComment(e.target.value);
              }}
            />
          </ProductAskInputDiv>
          <ProductAskInputConfirm>
            <InputLength>{newComment.length} / 100</InputLength>
            <ConfirmButton onClick={clickCommentHandler}>등록</ConfirmButton>
          </ProductAskInputConfirm>
        </ProductAskInputArea>
      )}
    </CommentDiv>
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
  height: 40px;
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

const CommentContent = styled.div`
  margin-bottom: 20px;
  line-height: 1.5;
  white-space: pre-wrap;
`;
const CommentWrapper = styled.div`
  width: 100%;
  border-bottom: 1px solid rgb(238, 238, 238);
`;

const CommentDiv = styled.div`
  // display: flex;
  width: 100%;
`;
const CommentHeader = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  color: rgb(136, 136, 136);
  margin-bottom: 10px;
  align-items: center;
`;
const UserName = styled.div`
  font-weight: 700;
`;
const Time = styled.div`
  font-size: 13px;
  color: rgb(204, 204, 204);
`;

export default Comment;
