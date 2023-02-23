import { useState } from "react";

import axios from "axios";
import { emit } from "process";

export function useUsers() {
const [users, setUsers] = useState<User[]>([]);

    const getAllUsers = async () => {
    const response = await axios({
            method: "get",
        url: "http://localhost:3000/api/users",
        data: {}
    });
    setUsers(response.data);
    };

    const createOneUser = async (user: User) => {
    const response = await axios({
            method: "post",
            url: "http://localhost:3000/api/users/register",
            data: user
        });
        const newUsers = [user, ...users];
        //alert("User created successfully");
        setUsers(newUsers);
    };

    const loginUser = async (email?: string, password?: string) => {
        let i : number = 0;
        users.map((user) => {
            if(user.email === email && user.password === password){
                //localStorage.setItem("user", JSON.stringify(user));
                //window.location.href = "/home";
                i = 1;
            } else {
                i = 2;
            }
        });
        return i;
        
    };
        

    return { users, getAllUsers, createOneUser, loginUser };
}


export interface User {
    email?: string,
    firstName?: string,
    lastName?: string,
    password?: string,
    favoriteTeam?: string
    role?: string
    numberPoints?: number
}
