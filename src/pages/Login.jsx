import { Form } from "react-router"
import { useAuth } from "../contexts/AuthContext"

export default function Login() {

    const { login } = useAuth()

    async function handleLogin(event) {
        event.preventDefault();
        console.log(event.target.password.value);
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData);

        console.log(data);

        // valider Her...!

        const response = await fetch("https://dummyjson.com/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })

        const userData = await response.json()

        login(userData.accessToken)

        console.log(userData);


    }

    return (
        <Form onSubmit={handleLogin}>
            <div className="formgroup">
                <label htmlFor="username">Username</label>
                <input type="text" name="username" id="username" />
            </div>
            <div className="formgroup">
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" />
            </div>
            <button type="submit">Log in</button>
        </Form>
    )
}