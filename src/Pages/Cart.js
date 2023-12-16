import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProductContext } from "../productContext";
import { useAuthValue } from "../authContext";
import CartItem from "../Component/Cart/CartItem";
import Loader from "../Component/Loader/Loader";
import firstStyles from "../styles/home.module.css";
import secondStyles from "../styles/cart.module.css";
import { toast } from "react-toastify";

// Component to display the Cart page with user's cart items
export function Cart() {
    // State to track loading status
    const [isLoading, setLoading] = useState(true);
    // Access cart, total, clearCart, purchaseAll, and itemInCart from the product context
    const { cart, total, clearCart, purchaseAll, itemInCart } = useProductContext();
    // Access userLoggedIn from the authentication context
    const { userLoggedIn } = useAuthValue();
    // Navigate function from react-router-dom
    const navigate = useNavigate();

    // Simulating a delay for loading state
    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 300);
    }, []);

    // Function to handle the purchase of all items in the cart
    function handlePurchase() {
        // Check if the cart is empty
        if (itemInCart === 0) {
            toast.error("Nothing to purchase in Cart!!");
            return;
        }

        // Call purchaseAll function to update user's orders and clear the cart
        purchaseAll();
        toast.success("Your order has been Placed!!!")
        // Navigate to the My Order page after the purchase
        navigate("/myorder");
    }

    return (
        <>
            {isLoading ? <Loader /> :
                <div className={secondStyles.mainContainer}>
                    {/* Header section with user information and cart details */}
                    <div className={secondStyles.header}>
                        <div className={secondStyles.userInfo}>
                            {/* Greeting message with the user's name */}
                            <h1>Hey {userLoggedIn.name}, <small>Your Cart has</small></h1>
                        </div>
                        {/* Cart details showing the number of items and total amount */}
                        <div className={secondStyles.cartDetail}>
                            <div>
                                Item: {itemInCart}
                                <br />
                                {/* Button to remove all items from the cart */}
                                <button className={secondStyles.removeAll} onClick={clearCart}>
                                    Remove All
                                </button>
                            </div>
                            <div>
                                Total Amount: ₹{total}
                                <br />
                                {/* Button to purchase all items in the cart */}
                                <button className={secondStyles.purchaseAll} onClick={handlePurchase}>
                                    Purchase All
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* Display user's cart items or a message if the cart is empty */}
                    <div className={firstStyles.itemContainer}>
                        {cart.length === 0 ?
                            <h1>Nothing in Your Cart !!!</h1> :
                            cart.map((product, i) => <CartItem key={i} product={product} />)
                        }
                    </div>
                </div>
            }
        </>
    );
}
