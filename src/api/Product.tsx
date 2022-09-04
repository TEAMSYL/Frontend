import axios from 'axios';

async function getProducts() {
  try {
    const response = await axios.get(`http://localhost:8001/product`);
    console.log('상품 목록:', response.data);
    return await response.data;
  } catch (error) {
    console.log(error);
  }
}
async function getCategoryProducts(categoryId) {
  try {
    const response = await axios.get(
      `http://localhost:8001/product/category/${categoryId}`,
    );
    console.log('상품 목록:', response.data);
    return await response.data;
  } catch (error) {
    console.log(error);
  }
}

async function getUserProducts() {
  try {
    const response = await axios.get(`http://localhost:8001/product/seller`, {
      withCredentials: true,
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
}

async function getProductsByUserId(userId: string) {
  try {
    const response = await axios.get(
      `http://localhost:8001/product/user/${userId}`,
      { withCredentials: true },
    );
    console.log('getProductsByUserId response: ', response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

async function getProduct(id: string | undefined) {
  try {
    const response = await axios.get(`http://localhost:8001/product/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

async function getProductDetail(id: string | undefined) {
  console.log('id:', id);
  try {
    const response = await axios.get(
      `http://localhost:8001/product/detail?id=${id}`,
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

async function setProduct(data: FormData) {
  try {
    const response = await axios.post('http://localhost:8001/product', data, {
      headers: {
        'Content-Type': 'multipart/form-data; charset=UTF-8',
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

async function setProductImages(data: FormData, productId) {
  try {
    const response = await axios.post(
      `http://localhost:8001/product/images/${productId}`,
      data,
      {
        headers: {
          'Content-Type': 'multipart/form-data; charset=UTF-8',
        },
        withCredentials: true,
      },
    );
    console.log('이미지 api 응답', response);
    if (response.status == 201) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function deleteProduct(id: string | undefined) {
  try {
    const response = await axios.delete(`http://localhost:8001/product/${id}`, {
      withCredentials: true,
    });
    console.log('상품 삭제 response: ', response);
    if (response.data == '완료' && response.status == 200) {
      // 삭제에 성공한 경우
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function searchProducts(keyWord: string) {
  keyWord = encodeURIComponent(keyWord);
  try {
    const response = await axios.get(
      `http://localhost:8001/product/search?searchword=${keyWord}`,
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

async function getReviews() {
  try {
    const response = await axios.get('http://localhost:8001/product/review', {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

async function postReview(productId: number, rate: number, text: string) {
  try {
    const response = await axios.post(
      `http://localhost:8001/product/review`,
      {
        productId: productId,
        rate: rate,
        text: text,
      },
      {
        withCredentials: true,
      },
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}
async function getComment(productId: Number) {
  try {
    const response = await axios.get(
      `http://localhost:8001/product/comment/${productId}`,
      {
        withCredentials: true,
      },
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
async function postComment(data: FormData) {
  try {
    console.log(data);
    const response = await axios.post(
      `http://localhost:8001/product/comment`,
      data,
      {
        withCredentials: true,
      },
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

const productApi = {
  getProducts,
  getCategoryProducts,
  getProduct,
  setProduct,
  deleteProduct,
  setProductImages,
  getUserProducts,
  getProductDetail,
  searchProducts,
  getProductsByUserId,
  postReview,
  getReviews,
  postComment,
  getComment,
};

export default productApi;
