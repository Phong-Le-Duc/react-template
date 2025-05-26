export async function getUsers() {
    
    const response = await fetch("https://jsnplaceholder.typicode.com/users");
    if (!response.ok) {
        throw new Error({message:'Den er helt gal'});
    }
    
   return response.json();
}