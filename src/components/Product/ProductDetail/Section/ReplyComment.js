import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';
import { Box } from '../../../../../node_modules/@mui/material/index';
import userApi from '../../../../api/User.tsx';

const ReplyComment = ({ cmt, commentList, refreshFunction, product, user }) => {
  const [userNick, setUserNick] = useState('');
  const [comment, setComment] = useState('');

  useEffect(() => {
    const { comment, buyerId, productId } = cmt;
    userApi.getUserNick(buyerId).then(data => {
      setUserNick(data);
    });
    setComment(comment);
  }, []);

  return (
    <CommentDiv>
      <CommentWrapper>
        <SubdirectoryArrowRightIcon></SubdirectoryArrowRightIcon>
        <Box>
          <CommentHeader>
            <UserName>{userNick}</UserName>
          </CommentHeader>
          <CommentContent>{comment}</CommentContent>
        </Box>
      </CommentWrapper>
    </CommentDiv>
  );
};

const CommentContent = styled.div`
  margin-bottom: 20px;
  line-height: 1.5;
  white-space: pre-wrap;
`;
const CommentWrapper = styled.div`
  display: flex;
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

export default ReplyComment;
