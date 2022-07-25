import { Stack } from '@mui/material';
import React from 'react';
import { PaginationTable } from './styledComponents';
import productApi from "../../api/Product.tsx";

const Purchase = () => {
    const [ products, setProducts ] = React.useState([]);

    const fetchProducts = async () => {
        const useProducts= [];
        try {
            await productApi.getUserProducts().then( (response) => {
                const productsData = response.data;;
                setProducts(productsData);
            });
        } catch(error) {
            console.log(error);
        }
    };

    React.useEffect(() => {
        fetchProducts();
    }, []);
    return (
        <Stack sx={{ width: '1024px'}}>
            <PaginationTable myProducts={products}></PaginationTable>
        </Stack>
    );
};

export default Purchase;