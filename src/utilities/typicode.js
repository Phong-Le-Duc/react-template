import queryClient from "../queryClient";

export async function getUsers() {  
    return queryClient.fetchQuery({
        queryKey: ['users'],
        queryFn: async function () {
      const response = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!response.ok) {
        throw new Error({message:'Den er helt gal'});
    }
    
   return response.json();
 }
           
      });   
}