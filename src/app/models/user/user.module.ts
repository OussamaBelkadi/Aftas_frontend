export interface User  {
  name: string;
  email: string;
  password: string;
  address: string;
  roles: string;
}

export interface UserResponse  {
  id: number;
  name: string;
  email: string;
  password: string;
  address: string;
  roles: string;
}

export interface validateAccountDto{
  userEmail: string
  valid: boolean
}

export interface loginRequest{
  email: string;
  password: string
}