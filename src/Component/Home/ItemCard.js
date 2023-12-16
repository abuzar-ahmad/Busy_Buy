import { useProductContext } from "../../productContext";
import styles from "../../styles/home.module.css";

// Component to display individual item cards with add to cart functionality
export default function ItemCard(props) {
    // Destructure item details and context function from props
    const { name, image, price, category } = props.item;
    const { addToCart } = useProductContext();

    return (
        <>
            {/* Container for each item card */}
            <div className={styles.cardContainer}>
                {/* Container for the product image */}
                <div className={styles.imageContainer}>
                    <img src={image} alt={category} />
                </div>
                {/* Container for the product information */}
                <div className={styles.itemInfo}>
                    {/* Container for the product name and price */}
                    <div className={styles.namePrice}>
                        {/* Display product name */}
                        <div className={styles.name}>
                            {name}
                        </div>
                        {/* Display product price */}
                        <div className={styles.price}>
                            ₹{price}
                        </div>
                    </div>
                    {/* Container for the add to cart button */}
                    <div className={styles.btnContainer}>
                        {/* Button to add the product to the cart */}
                        <button className={styles.addBtn} onClick={() => addToCart(props.item)}>
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
