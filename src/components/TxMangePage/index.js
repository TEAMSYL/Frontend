import { Stack } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Container, PageName, Tab } from './styledComponents';

const TxManagePage = () => {
    return (
        <Container>
            <PageName pageName={'거래 관리'}/>
            <Tab/>
            <Outlet/>
        </Container>
    );
};

export default TxManagePage;