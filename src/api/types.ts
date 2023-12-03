export interface User {
  name: string;
  username: string;
  age: string;
  sex: string;
  phone: string;
  address: string;
}

export interface Admin {
  username: string;
  phone: string;
  email: string;
}

export interface Category {
  id?: number;
  name: string;
  remark: string;
}


export interface Book {
  id?: number;
  name: string;
  description: string;
  publishDate: string;
  author: string;
  publisher: string;
  category: string;
  bookNo: string;
  createtime?: string;
  updatetime?: string;
  cover: string;
  categories?:string[];
}