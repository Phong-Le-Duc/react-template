import { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router";
import { useQuery } from "@tanstack/react-query";



export default function List() {

const users = useLoaderData();




    // const [usrs, setUsrs] = useState(null);
    // const [isLoading, setIsLoading] = useState(true);

    // const query = useQuery({
    //     queryKey: ['users'],
    //     queryFn: () => fetch("https://jsonplaceholder.typicode.com/users")
    //         .then(response => response.json())
    // });

   
    

    // useEffect(() => {
    //     fetch("https://jsonplaceholder.typicode.com/users")
    //         .then(response => response.json())
    //         .then(result => setUsrs(result))
    //         .finally(() => setIsLoading(false))
    // }, []);

    // if(isLoading) {
    //     return (<p>Loading...</p>)
    // }
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