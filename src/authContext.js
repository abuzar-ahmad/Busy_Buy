import { createContext, useContext, useEffect, useState } from "react";
import { db } from "./firebaseInit";
import { collection, addDoc, onSnapshot } from "firebase/firestore";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Create a context to manage authentication-related state
export const authContext = createContext();

// Custom hook to use the authentication context
export function useAuthValue() {
    const value = useContext(authContext);
    return value;
}

// Component to provide the authentication context to its children
export function AuthContext({ children }) {
    // State to manage the list of users
    const [userList, setUserList] = useState([]);
    // State to track whether a user is logged in
    const [isLoggedIn, setLoggedIn] = useState(false);
    // State to store the details of the currently logged-in user
    const [userLoggedIn, setUserLoggedIn] = useState(null);

    // Effect to fetch and update the list of users when the user logs in or out
    useEffect(() => {
        const unsub = onSnapshot(collection(db, "buybusy"), (snapShot) => {
            const users = snapShot.docs.map((doc) => {
                return {
                    id: doc.id,
                    ...doc.data()
                };
            });
            setUserList(users);
        });
    }, [isLoggedIn]);

    // Function to create a new user
    async function createUser(data) {
        const index = userList.findIndex((user) => user.email === data.email);
        if (index !== -1) {
            toast.error("Email Address already exists, Try Again or SignIn Instead!!!");
            return;
        }
        const docRef = await addDoc(collection(db, "buybusy"), {
            name: data.name,
            email: data.email,
            password: data.password,
            cart: [],
            orders: []
        });
        toast.success("New user Created, Please LogIn to Continue !!");
    }

    // Function to handle user sign-in
    async function signIn(data) {
        const index = userList.findIndex((user) => user.email === data.email);
        if (index === -1) {
            toast.error("Email does not exist, Try again or SignUp Instead!!!");
            return false;
        }
        if (userList[index].password === data.password) {
            toast.success("Sign In Successfully!!!");
            setLoggedIn(true);
            setUserLoggedIn(userList[index]);
            window.localStorage.setItem("token", true);
            window.localStorage.setItem("index", JSON.stringify(userList[index]));
            return true;
        } else {
            toast.error("Wrong UserName/Password, Try Again");
            return false;
        }
    }

    // Function to handle user sign-out
    function signOut() {
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("index");
        setLoggedIn(false);
        setUserLoggedIn(null);
        toast.success("Sign Out Successfully!!!!");
    }

    // Provide the authentication context to the component tree
    return (
        <>
            <authContext.Provider value={{
                createUser,
                isLoggedIn,
                setLoggedIn,
                signIn,
                userLoggedIn,
                setUserLoggedIn,
                signOut
            }}>
                <ToastContainer />
                {children}
            </authContext.Provider>
        </>
    );
}
