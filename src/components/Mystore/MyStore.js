import { Box, Avatar, Button } from '@mui/material';
import React from 'react';
import { useParams } from "react-router-dom";
import userApi from '../../api/User.tsx';
import MystoreBody from './MystoreBody'
import MystoreBottom from './MystoreBottom'
const Mystore = ()=> {
    const [userId, setUserId] = React.useState();

    const fetchUser = async () => {
        const user = await userApi.getUser();
        return user;
    };

    React.useEffect(() => {
        const user = fetchUser().then((user) => {
            setUserId(user.id);
        });

    }, []);

    return (
        <Box>
            <MystoreBody></MystoreBody>
            <MystoreBottom userId ={userId}></MystoreBottom>
        </Box>
    );
};

export default Mystore;