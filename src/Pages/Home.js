import { useState, useEffect } from "react";
import FilterBar from "../Component/Home/FilterBar";
import MainContent from "../Component/Home/MainContent";
import styles from "../styles/home.module.css";
import Loader from "../Component/Loader/Loader";

// Component to display the Home page with item filtering functionality
export function Home() {
    // State to track loading status
    const [isLoading, setLoading] = useState(true);
    // State to control whether the filter is applied or not
    const [applyFilter, setApplyFilter] = useState(false);
    // State to manage the price filter value
    const [price, setPrice] = useState(5000);
    // State to manage the category filter value
    const [category, setCategory] = useState('none');
    // State to manage the search input value
    const [search, setSearch] = useState('');

    // Simulating a delay for loading state
    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 400);
    }, []);

    return (
        <>
            {/* Conditionally render loader or home page content based on loading state */}
            {isLoading ? <Loader /> :
                <>
                    {/* Header section with search input and filter button */}
                    <div className={styles.header}>
                        {/* Search input for filtering items by name */}
                        <input type="text"
                            placeholder="Search Item..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)} />
                        {/* Button to toggle the application of filters */}
                        <button onClick={() => setApplyFilter(!applyFilter)}>
                            {applyFilter ? "Cancel" : "Apply Filter"}
                        </button>
                    </div>
                    {/* Main container for the Home page */}
                    <div className={styles.mainContainer}>
                        {/* Conditionally render the FilterBar based on applyFilter state */}
                        {applyFilter && <FilterBar price={price}
                            setPrice={setPrice}
                            setCategory={setCategory} />}
                        {/* Display the main content with filtered items */}
                        <MainContent search={search}
                            price={price}
                            category={category}
                            applyFilter={applyFilter} />
                    </div>
                </>
            }
        </>
    );
}
