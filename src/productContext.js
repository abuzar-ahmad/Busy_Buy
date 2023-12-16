import { createContext, useContext, useEffect, useState } from "react";
import { db } from "./firebaseInit";
import { updateDoc, doc, arrayUnion, onSnapshot, arrayRemove } from "firebase/firestore";
import { data } from "./Assets/data";
import { useAuthValue } from "./authContext";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from "react-toastify";

// Create a context to manage product-related state
export const productContext = createContext();

// Custom hook to use the product context
export function useProductContext() {
    const value = useContext(productContext);
    return value;
}

// Component to provide the product context to its children
export function ProductContext({ children }) {
    // Destructure authentication-related state from the authentication context
    const { isLoggedIn, userLoggedIn, setLoggedIn, setUserLoggedIn } = useAuthValue();
    // State to manage the number of items in the cart
    const [itemInCart, setItemInCart] = useState(0);
    // State to manage the items in the cart
    const [cart, setCart] = useState([]);
    // State to manage the user's orders
    const [myorders, setMyOrders] = useState([]);
    // State to manage the total amount in the cart
    const [total, setTotal] = useState(0);

    // Function to get the current date in a specific format
    function getDate() {
        const date = new Date();
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        return (`${year}-${month}-${day}`);
    }

    // Check if the user is already logged in on component mount
    useEffect(() => {
        const token = window.localStorage.getItem("token");
        if (token) {
            const index = window.localStorage.getItem("index");
            const user = JSON.parse(index);
            setLoggedIn(token);
            setUserLoggedIn(user);
        }
    }, []);

    // Effect to update the cart and orders when the user is logged in
    useEffect(() => {
        if (isLoggedIn) {
            // Subscribe to changes in the user's cart and orders
            const unsub = onSnapshot(doc(db, "buybusy", userLoggedIn.id), (doc) => {
                setCart(doc.data().cart);
                setMyOrders(doc.data().orders);
            });
            // Calculate and update the total and items in the cart
            let sum = 0;
            cart.map((item) => Number(sum += item.price));
            setTotal(sum);
            setItemInCart(cart.length);
        }
    }, [userLoggedIn]);

    // Function to increase the quantity of a product in the cart
    async function increaseQuant(product) {
        const index = cart.findIndex((item) => item.name === product.name);
        cart[index].quantity++;
        setCart(cart);
        const userRef = doc(db, "buybusy", userLoggedIn.id);
        await updateDoc(userRef, {
            cart: cart
        });
        setItemInCart(itemInCart + 1);
        setTotal(Number(total + cart[index].price));
    }

    // Function to decrease the quantity of a product in the cart
    async function decreaseQuant(product) {
        const index = cart.findIndex((item) => item.name === product.name);
        setTotal(Number(total - cart[index].price));
        if (cart[index].quantity > 1) {
            cart[index].quantity--;
        } else {
            cart.splice(index, 1);
        }
        setCart(cart);
        setItemInCart(itemInCart - 1);
        const userRef = doc(db, "buybusy", userLoggedIn.id);
        await updateDoc(userRef, {
            cart: cart
        });
    }

    // Function to add a product to the cart
    async function addToCart(product) {
        if (!isLoggedIn) {
            toast.error("Please first Login !!!");
            return;
        }
        const index = cart.findIndex((item) => item.name === product.name);
        if (index !== -1) {
            increaseQuant(cart[index]);
            toast.success("Product Quantity Increased!!");
            return;
        }
        const userRef = doc(db, "buybusy", userLoggedIn.id);
        await updateDoc(userRef, {
            cart: arrayUnion({ quantity: 1, ...product })
        });
        setTotal(Number(total + product.price));
        setItemInCart(itemInCart + 1);
        toast.success("Added to your Cart!!");
    }

    // Function to remove a product from the cart
    async function removeFromCart(product) {
        const userRef = doc(db, "buybusy", userLoggedIn.id);
        await updateDoc(userRef, {
            cart: arrayRemove(product)
        });
        setTotal(Number(total - (product.quantity * product.price)));
        setItemInCart(itemInCart - product.quantity);
        toast.success("Removed from Cart!!");
    }

    // Function to clear the entire cart
    async function clearCart() {
        if (itemInCart === 0) {
            toast.error("Nothing to remove in Cart!!");
            return;
        }
        const userRef = doc(db, "buybusy", userLoggedIn.id);
        await updateDoc(userRef, {
            cart: []
        });
        setTotal(0);
        setItemInCart(0);
        toast.success("Empty Cart!!");
    }

    // Function to purchase all items in the cart
    async function purchaseAll() {
        const currentDate = getDate();
        const userRef = doc(db, "buybusy", userLoggedIn.id);
        await updateDoc(userRef, {
            orders: arrayUnion({ date: currentDate, list: cart, amount: total })
        });
        clearCart();
    }

    // Provide the product context to the component tree
    return (
        <productContext.Provider value={{
            data,
            addToCart,
            cart,
            total,
            setTotal,
            removeFromCart,
            clearCart,
            purchaseAll,
            myorders,
            increaseQuant,
            decreaseQuant,
            itemInCart
        }}>
            {children}
        </productContext.Provider>
    );
}
