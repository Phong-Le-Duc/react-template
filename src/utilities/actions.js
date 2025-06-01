import { redirect } from "react-router";
import { z } from "zod/v4";

const contactSchema = z.object({
    name: z.string().min(2, "Name is required"),
    email: z.email(),
    message: z.string().min(1, "Message is required") //.optional() metoden så det ikke er et krav at udfylde feltet hvis det er.
})


export async function handleSubmit({ request }) {

    // const formData = new FormData(event.target);
    const formData = await request.formData();
    const data = Object.fromEntries(formData.entries());
    console.log("Form submitted:", data);

    const result = contactSchema.safeParse(data)

    if (!result.success) {
        const errors = z.treeifyError(result.error)
        console.log(errors);
        return errors.properties
    }

    const response = await fetch("https://jsonplaceholder.typicode.com/users", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(result.data)
    })

    if (!response.ok) {
        throw new Error(("Could not save data"))
    }
    console.log("data was sent!!!");
    redirect("/")
}