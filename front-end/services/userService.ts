import { User } from "@types";

const getUserByMail = async (email: string, password: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "An unexpected error occurred");
    }

    return await response.json();
};


const loginUser = async (email: string, password: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "An unexpected error occurred");
    }

    return await response.json();
};

const registerUser = async (user: User) =>{
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/register`, {
        method:'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    })

    if(!response.ok){
        const error = await response.json()
        throw new Error(error.message || 'An unexpected error occurred')
    }
    return await response.json()
}

const getUserByJustMail = async (email: string) => {
    const user = sessionStorage.getItem('loggedInUser');
    let item = null;
    if (user) {
        item = JSON.parse(user);
    }
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/email/${email}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + item.token  },
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "An unexpected error occurred");
    }

    return await response.json();
}

const getUsers = async () => {
    const user = sessionStorage.getItem('loggedInUser');
    let item = null;
    if (user) {
        item = JSON.parse(user);
    }
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/all`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + item.token },
    });

    return await response.json();
}

const UserService = {
    getUserByMail,
    loginUser,
    registerUser,
    getUserByJustMail,
    getUsers
};

export default UserService;
