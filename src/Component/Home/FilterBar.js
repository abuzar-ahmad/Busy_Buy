import styles from "../../styles/home.module.css";

// Component to display a filter bar with price range and category options
export default function FilterBar(props) {
    // Destructure props to get necessary state and functions
    const { price, setPrice, setCategory } = props;

    return (
        <div className={styles.filterBar}>
            {/* Heading for the filter bar */}
            <h1>FilterBar</h1>
            {/* Price range section */}
            <div className={styles.priceRange}>
                {/* Display current price range */}
                <span>Price</span>{` <= ${price}`}
                <br />
                {/* Input range for adjusting the price */}
                <input type="range" min="100" max="50000" value={price} onChange={(e) => setPrice(e.target.value)} />
            </div>
            {/* Category selection section */}
            <div className={styles.categoryBox}>
                {/* Label for the category selection */}
                <span>Category:</span>
                <div>
                    {/* Radio buttons for different categories with corresponding labels */}
                    <input type="radio" id="men" value="men" name="category" onClick={() => setCategory("men")} />
                    <label htmlFor="men">Men</label>
                    <input type="radio" id="women" value="women" name="category" onClick={() => setCategory("women")} />
                    <label htmlFor="women">Women</label>
                    <input type="radio" id="electric" value="electric" name="category" onClick={() => setCategory("electric")} />
                    <label htmlFor="electric">Electronic</label>
                    <input type="radio" id="jewellery" value="jewellery" name="category" onClick={() => setCategory("jewellery")} />
                    <label htmlFor="jewellery">Jewellery</label>
                    <input type="radio" id="none" value="none" name="category" onClick={() => setCategory("none")} />
                    <label htmlFor="none">None</label>
                </div>
            </div>
        </div>
    );
}
