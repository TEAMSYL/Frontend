import { Stack } from '@mui/material';
import React from 'react';
import { SellTable } from './styledComponents';
import productApi from "../../api/Product.tsx";
import transactionApi from '../../api/Transaction.tsx';

const Sell = () => {
    const [ requests, setRequests ] = React.useState([]);

    // const fetchProducts = async () => {
    //     const useProducts= [];
    //     try {
    //         await productApi.getUserProducts().then( (response) => {
    //             const productsData = response.data;;
    //             setProducts(productsData);
    //         });
    //     } catch(error) {
    //         console.log(error);
    //     }
    // };

    const fetchRequests = async () => {
        try {
            await transactionApi.getPermittedRequests().then((response) => {
                console.log('response Data:', response);
                setRequests(response);
            });
        } catch (error) {
            console.log(error);
        }
    };

    React.useEffect(() => {
        //fetchProducts();
        fetchRequests();
    }, []);


    return (
        <Stack sx={{ width: '1024px'}}>
            <SellTable requests={requests}/>
        </Stack>
    );
};

export default Sell;