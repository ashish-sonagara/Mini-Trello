export interface User {
    email : string;
    password : string;
    name : string;
    role : Role ;
}

type Role = '' |'Admin' | 'User' | 'Developer';

export interface AuthUser {
    email : string ;
    name : string ; 
    role : string ;
}