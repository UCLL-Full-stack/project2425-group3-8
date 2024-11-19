const getUserByMail = async (email: string, password: string) => {
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`,{
        method: 'POST',
        headers:{'Content-Type': 'application/json'},
        body: JSON.stringify({
            email,
            password
        })
    })
}

const UserService = {
    getUserByMail,
}

export default UserService 