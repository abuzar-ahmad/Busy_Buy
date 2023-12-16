import { useProductContext } from "../../productContext";
import oldStyles from "../../styles/home.module.css";
import styles from "../../styles/cart.module.css";

// Component to display individual items in the cart
export default function CartItem(props) {
    // Destructure product details and context functions from props
    const { name, image, price, category, quantity } = props.product;
    const { removeFromCart, increaseQuant, decreaseQuant } = useProductContext();

    return (
        <>
            {/* Container for each cart item */}
            <div className={oldStyles.cardContainer}>
                {/* Container for the product image */}
                <div className={styles.imageContainer}>
                    <img src={image} alt={category} />
                </div>
                {/* Container for the product information */}
                <div className={styles.itemInfo}>
                    {/* Display product name */}
                    <div className={styles.namePrice}>
                        {name}
                    </div>
                    {/* Display product price and quantity */}
                    <div className={styles.priceQuant}>
                        {/* Display product price */}
                        <div className={styles.price}>
                            ₹{price}
                        </div>
                        {/* Display product quantity with increase and decrease buttons */}
                        <div className={styles.quantity}>
                            <span className={styles.minus}>
                                {/* Decrease quantity button */}
                                <i className="fa-solid fa-circle-minus" onClick={() => decreaseQuant(props.product)}></i>
                            </span>
                            &nbsp; {quantity} &nbsp; {/* Display product quantity */}
                            <span className={styles.plus}>
                                {/* Increase quantity button */}
                                <i className="fa-solid fa-circle-plus" onClick={() => increaseQuant(props.product)}></i>
                            </span>
                        </div>
                    </div>
                    {/* Container for the remove button */}
                    <div className={styles.btnContainer}>
                        {/* Button to remove the product from the cart */}
                        <button className={styles.removeBtn} onClick={() => removeFromCart(props.product)}>
                            Remove From Cart
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
