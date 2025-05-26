import { useEffect, useState } from "react";
import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";



export default function List() {

    // const [usrs, setUsrs] = useState(null);
    // const [isLoading, setIsLoading] = useState(true);

    const {data, isLoading} = useQuery({
        queryKey: ['users'],
        queryFn: () => fetch("https://jsonplaceholder.typicode.com/users")
            .then(response => response.json())
    });

       
        

    // useEffect(() => {
    //     fetch("https://jsonplaceholder.typicode.com/users")
    //         .then(response => response.json())
    //         .then(result => setUsrs(result))
    //         .finally(() => setIsLoading(false))
    // }, []);


    return isLoading ? (<p>Loading...</p>) : (
    
         <ul>
            {data.map(user => (
                <li key={user.id}>
                    <Link to={`/list/${user.id}`}>{user.name}</Link>
                </li>
            ))}
        </ul>
       
    )
}