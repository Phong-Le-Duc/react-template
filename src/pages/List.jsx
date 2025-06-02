import { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../contexts/AuthContext";


export default function List() {
    const users = useLoaderData();

    // her login context
    const { token } = useAuth();

    console.log(token);
    // login slut



    return (

        <ul>
            {users.map(user => (
                <li key={user.id}>
                    <Link to={`/list/${user.id}`}>{user.name}</Link>
                </li>
            ))}
        </ul>

    )
}