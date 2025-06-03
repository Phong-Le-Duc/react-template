
import queryClient from "../queryClient";
import { redirect } from "react-router";

export async function getUsers() {

    const token = sessionStorage.getItem("token")

    if (!token) redirect("/login")

    return queryClient.fetchQuery({
        queryKey: ['users'],
        queryFn: async function () {
            const response = await fetch("https://jsonplaceholder.typicode.com/users");
            if (!response.ok) {
                throw new Error({ message: 'Den er helt gal' });
            }

            return response.json();
        }

    });
}

export async function getUser({ params }) {
    const { id } = params;
    return queryClient.fetchQuery({
        queryKey: ['user', id],
        queryFn: async function () {
            const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
            if (!response.ok) {
                throw new Error({ message: 'Den er helt gal' });
            }
            return response.json();
        }
    });
}