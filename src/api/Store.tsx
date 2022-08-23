import axios from "axios"

async function getStoreInfo(userId: string){
    try{
        const response = await axios.get(`http://localhost:8001/store/${userId}`)
        return response; 
    }catch(error){
        console.log(error);
    }
}

async function setStoreInfo(userId: string, data: FormData){
    try{
        await axios.post(
            `http://localhost:8001/store/${userId}`,
            data,
            {withCredentials: true }
          );
    }catch(error){
        console.log(error);
    }
}

async function plusSellCount(userId: string){
    try{
        await axios.patch(
            `http://localhost:8001/store/${userId}`,
            )
    }catch(error){
        console.log(error);
    }
}

const storeApi = {
    setStoreInfo,
    getStoreInfo,
    plusSellCount
};

export default storeApi;