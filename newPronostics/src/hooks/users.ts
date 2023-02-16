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
}
