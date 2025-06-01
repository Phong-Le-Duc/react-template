import { Form, useNavigate } from "react-router"
import { z } from "zod/v4";
import { useState } from "react";

const contactSchema = z.object({
    name: z.string().min(2, "Name is required"),
    email: z.email(),
    message: z.string().min(1, "Message is required") //.optional() metoden så det ikke er et krav at udfylde feltet hvis det er.
})

export default function Contact() {
    const [errors, setErrors] = useState({});
    const navigate = useNavigate()

    async function handleSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());
        console.log("Form submitted:", data);

        const result = contactSchema.safeParse(data)

        if (!result.success) {
            const errors = z.treeifyError(result.error)
            console.log(errors);
            setErrors(errors.properties)
        } else {
            setErrors({})

            const response = await fetch("https://jsonplaceholder.typicode.com/users", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(result.data)
            })

            // .then(res => {
            //     console.log("data was sent!!!");
            //     if (res.ok) navigate("/")
            // })

            if (!response.ok) {
                throw new Error(("Could not save data"))
            }
            console.log("data was sent!!!");
            navigate("/")
        }





        // fetch... method post
    }

    return (
        <>
            <h1>Contact</h1>
            <Form method="post" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input type="text" name="name" placeholder="Name" />
                    <p>{errors && errors?.name?.errors[0]}</p>
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="email" name="email" placeholder="Email" />
                    <p>{errors && errors?.email?.errors[0]}</p>
                </div>
                <div>
                    <label htmlFor="message">Message:</label>
                    <textarea name="message" placeholder="Message"></textarea>
                    <p>{errors && errors?.message?.errors[0]}</p>
                </div>
                <button type="submit">Submit</button>
            </Form>
        </>
    )
}