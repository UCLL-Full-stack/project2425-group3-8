import { useState } from "react"

const RegisterForm: React.FC = () => {
    const [firstName, setFirstName] = useState<string>("")
    const [lastNmae, setLastName] = useState("")
    const [phoneNumber, setPhoneNumber] = useState<string>("")
    const [email, setEMail] = useState("")
    const [password, setPassword] = useState<string>("")

    const register = () => {

    }

    return (
        <div>
            <form>
                <div>
                    <label>
                        FirstName:
                        <input type="text" name="email" value={firstName} onChange={(event) => setFirstName(event.target.value)} />
                    </label>
                    <label>
                        LastName:
                        <input type="text" name="email" value={lastNmae} onChange={(event) => setLastName(event.target.value)} />
                    </label>

                    <label>
                        Email:
                        <input type="text" name="email" value={email} onChange={(event) => setEMail(event.target.value)} />
                    </label>
                </div>
            </form>
        </div>
    )
}

export default RegisterForm