import { Stack } from '@mui/material';
import React from 'react';
import transactionApi from '../../api/Transaction.tsx';
import { PurchaseTable } from './styledComponents';

const Purchase = () => {
    const [ transactions, setTransactions ] = React.useState([]);

    const fetchProducts = async () => {
        try {
            const requests = await transactionApi.getPermittedPurchases();
            setTransactions(requests);
        } catch (error) {
            console.log(error);
        }
    };

    React.useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <Stack sx={{ width: '1024px' }}>
            <PurchaseTable requests={transactions}></PurchaseTable>
        </Stack>
    );
};

export default Purchase;