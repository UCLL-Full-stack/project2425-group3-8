import UserService from "@services/userService";
import router from "next/router";
import { useState } from "react";

const LoginForm: React.FC = () => {

    const [email, setMail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const[statusText, setStatusText] = useState('');

    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>, 
        mail: string, 
        password: string
    ) => {
        event.preventDefault();
    
        try {
            const user = await UserService.loginUser(mail, password);
            if (user) {
                sessionStorage.setItem("loggedInUser", JSON.stringify(user));
                setStatusText('logged in')
                setTimeout(() => {
                    router.push("/");
                  }, 2000);
            }
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("An unexpected error occurred");
            }
        }
    };
    
    

    return (
        <>
            <div >
                <form onSubmit={(event) => handleSubmit(event, email, password)} className=" mt-16 space-y-4 bg-gray-300 p-8 rounded-lg  border-2 border-black shadow-lg w-96  ">
                    <div>
                        <label className="text-xl font-medium ">
                            Email:
                            <input className="border-2 border-black rounded-md focus:outline-none focus:ring-1 focus:ring-black p-2 w-full " type='text' name='email' value={email} onChange={(event) => setMail(event.target.value)} />
                        </label>
                    </div>
                    <div>
                        <label className="text-xl font-medium">
                            Password:
                            <input className=" border-2 border-black rounded-md focus:outline-none focus:ring-1 focus:ring-black p-2 w-full" type='password' name='password' value={password} onChange={(event) => setPassword(event.target.value)} />
                        </label>
                    </div>
                    <div className="text-xl font-medium flex justify-center">
                        <button type="submit" className=" bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                            Log in
                        </button>
                    </div>
                    <p className="text-red-500">{error}</p>
                    <p className="text-green-500">{statusText}</p>
                </form>
            </div>

        </>
    )
}

export default LoginForm
