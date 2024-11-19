const getUserByMail = async (email: string, password: string) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email,
                password
            })
        })
    }catch(error){
        return await error
    }


}

const UserService = {
    getUserByMail,
}

export default UserService 