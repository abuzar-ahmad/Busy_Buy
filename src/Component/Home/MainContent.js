import styles from "../../styles/home.module.css";
import ItemCard from "./ItemCard";
import { useProductContext } from "../../productContext";

// Component to display the main content with filtered item cards
export default function MainContent(props) {
    // Destructure props to get search, price, category, and applyFilter
    const { search, price, category, applyFilter } = props;
    // Access the product data from the product context
    const { data } = useProductContext();

    return (
        <div className={styles.itemContainer}>
            {/* Use filter and map functions to display filtered item cards */}
            {data.filter((item) => {
                // Filter items based on the search query
                return search.toLocaleLowerCase() === ''
                    ? item
                    : item.name.toLocaleLowerCase().includes(search)
            })
                .filter((item) => {
                    // Filter items based on the price range
                    return !applyFilter
                        ? item
                        : item.price <= price
                })
                .filter((item) => {
                    // Filter items based on the category
                    return !applyFilter || category === 'none'
                        ? item
                        : item.category === category
                })
                // Map through the filtered items to display corresponding ItemCard components
                .map((item) => <ItemCard key={item.id} item={item} />)
            }
        </div>
    );
}
