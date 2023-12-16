import { useAuthValue } from "../../authContext";
import styles from "../../styles/navbar.module.css";
import { Outlet, NavLink } from "react-router-dom";

// Component to display the navigation bar with links
export default function Navbar() {
    // Destructure authentication-related state and functions from the authentication context
    const { isLoggedIn, signOut } = useAuthValue();

    return (
        <>
            {/* Container for the navigation bar */}
            <div className={styles.navbarContainer}>
                {/* Container for the application name */}
                <div className={styles.appName}>
                    {/* NavLink to the home page */}
                    <NavLink to="/">
                        Buy Busy
                    </NavLink>
                </div>
                {/* Container for navigation links */}
                <div className={styles.navLinks}>
                    {/* NavLink to the home page */}
                    <NavLink to="/">
                        <span>
                            Home
                        </span>
                    </NavLink>
                    {/* Conditional rendering of My Order and Cart links based on user authentication */}
                    {isLoggedIn && <NavLink to="/myorder">
                        <span>
                            My Order
                        </span>
                    </NavLink>}
                    {isLoggedIn && <NavLink to="/cart">
                        <span>
                            Cart
                        </span>
                    </NavLink>}
                    {/* NavLink to Sign In or Sign Out based on user authentication */}
                    <NavLink to={!isLoggedIn ? "/signin" : "/"}>
                        <span>
                            {!isLoggedIn ?
                                // Display SignIn when not authenticated
                                <>
                                    SignIn
                                </>
                                :
                                // Display SignOut and attach the signOut function when authenticated
                                <>
                                    <span onClick={signOut}>SignOut</span>
                                </>
                            }
                        </span>
                    </NavLink>
                </div>
            </div>
            {/* Outlet for rendering nested routes */}
            <Outlet />
        </>
    );
}
