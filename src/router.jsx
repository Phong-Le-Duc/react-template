import { createBrowserRouter } from "react-router";
import Layout from "./Layout";
import Home from "./pages/Home";
import List from "./pages/List";
import Detail from "./pages/Detail";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import { getUser, getUsers } from "./utilities/typicode";
import Loading from "./Components/Loading";
import Error from "./Components/Error";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        hydrateFallbackElement : <Loading />, // This will show a loading state while the data is being fetched
       errorElement: <Error />, // This will show a NotFound component if there's an error
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "list",
                element: <List />,
                loader: getUsers // This will fetch users data when the Home component is loaded
            },
            {
                path: "list/:id",
                element: <Detail />,
                loader: getUser
            },
            {
                path: "contact",
                element: <Contact />
            },
            {   
                path: "*",  
                element: <NotFound />
            } 
        ]
    }

]);
export default router;