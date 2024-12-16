import { useState } from "react"
import { User } from "@types";
import UserService from "@services/userService";
import router from "next/router";
import { useTranslation } from "next-i18next";

const RegisterForm: React.FC = () => {
    const [firstName, setFirstName] = useState<string>("")
    const [lastName, setLastName] = useState("")
    const [phoneNumber, setPhoneNumber] = useState<string>("")
    const [email, setEMail] = useState("")
    const [password, setPassword] = useState<string>("")
    const [tempPassword, setTempPassword] = useState<string>("")

    const [error, setError] = useState('');
    const [statusText, setStatusText] = useState('')
    const { t } = useTranslation();


    const validate = (): string => {
        if (
            !firstName &&
            !lastName &&
            !phoneNumber &&
            !email &&
            !password &&
            !tempPassword
        ) {
            return t("register.errorMessage1")
        }

        else if (tempPassword != password) {
            return t("register.errorMessage2")
        }
        return ''
    }

    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>,
    ) => {
        setError('')
        event.preventDefault();
        setError(validate())
        const user: User = {
            fullName: `${firstName} ${lastName}`,
            phoneNumber: phoneNumber,
            email: email,
            password: password,
            role: "visitor"
        };

        try{
            const response = await UserService.registerUser(user)
            console.log(response)
            if(response){
                sessionStorage.setItem("loggedInUser", JSON.stringify(response));
                setStatusText('registerd user')
                setTimeout(() => {
                    router.push("/");
                }, 2000);
            }
        }catch(error){
            if(error instanceof Error){
                setError(t('register.errorMessage1'))
            } else{
                setError('An unexpected error occurred')
            }
        }
}


return (
    <div>
        <form onSubmit={(event) => handleSubmit(event)} className="mt-16 space-y-4 bg-gray-300 p-8 rounded-lg  border-2 border-black shadow-lg w-96">
            <div>
                <label className="text-xl font-medium">
                {t("register.firstName")}
                    <input className="border-2 border-black rounded-md focus:outline-none focus:ring-1 focus:ring-black p-2 w-full " type="text" name="firstName" value={firstName} onChange={(event) => setFirstName(event.target.value)} />
                </label>
            </div>
            <div>
                <label className="text-xl font-medium">
                {t("register.lastName")}
                    <input className="border-2 border-black rounded-md focus:outline-none focus:ring-1 focus:ring-black p-2 w-full " type="text" name="lastName" value={lastName} onChange={(event) => setLastName(event.target.value)} />
                </label>
            </div>
            <div>
                <label className="text-xl font-medium">
                {t("register.email")}
                    <input className="border-2 border-black rounded-md focus:outline-none focus:ring-1 focus:ring-black p-2 w-full " type="text" name="email" value={email} onChange={(event) => setEMail(event.target.value)} />
                </label>
            </div>
            <div>
                <label className="text-xl font-medium">
                {t("register.phoneNumber")}
                    <input className="border-2 border-black rounded-md focus:outline-none focus:ring-1 focus:ring-black p-2 w-full" type="tel" name="phoneNumber" value={phoneNumber} onChange={(event) => setPhoneNumber(event.target.value)} />
                </label>
            </div>
            <div>
                <label className="text-xl font-medium">
                {t("register.password")}
                    <input className="border-2 border-black rounded-md focus:outline-none focus:ring-1 focus:ring-black p-2 w-full" type="password" name="password" value={password} onChange={(event) => setPassword(event.target.value)} />
                </label>
            </div>
            <div>
                <label className="text-xl font-medium">
                {t("register.repeatPassword")}
                    <input className="border-2 border-black rounded-md focus:outline-none focus:ring-1 focus:ring-black p-2 w-full" type="password" name="tempPassword" value={tempPassword} onChange={(event) => setTempPassword(event.target.value)} />
                </label>
            </div>
            <div className="text-xl font-medium flex justify-center">
                <button type="submit" className=" bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                {t("register.register")}
                </button>
            </div>

            <p className="text-red-500">{error}</p>
            <p className="text-green-500">{statusText}</p>
        </form>
    </div>
)
}

export default RegisterForm