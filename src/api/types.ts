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
