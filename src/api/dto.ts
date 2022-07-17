export interface IProduct {
  id: number;
  productName: string;
  content: string;
  price: number;
  category: string;
}
export interface ISetProduct {
  productName: string;
  content: string;
  price: number;
  category: string;
  imgUrls: Array<string>;
}
export interface ITransactionRequest {
  productId: number;
  price: number;
}

export interface ISignUp {
  nick: string;
  email: string;
  password: string;
}

export interface ISignIn {
  email: string;
  password: string;
}
