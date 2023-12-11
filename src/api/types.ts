export interface User {

  
  id?:undefined
  name: string;
  username: string;
  age: string;
  sex: string;
  phone: string;
  address: string;
  account:number
  score: number;
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
  score:number
  nums:number
  categories?: string[];
}

export interface Borrow {
  id?: number;
  bookName: string;
  bookNo: string;
  publishDate: string;
  userNo: string;
  userName: string;
  userPhone: string;
  score: number;
  createtime?: string;
  updatetime?: string;
  nums?:number
  account:number
  days:number
}
