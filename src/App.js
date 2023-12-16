import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthContext } from "./authContext";
import { ProductContext } from "./productContext";
import Navbar from "./Component/Navbar/Navbar";
import { Home } from "./Pages/Home";
import { MyOrder } from "./Pages/MyOrder";
import { Cart } from "./Pages/Cart";
import { SignIn } from "./Pages/SignIn";
import { SignUp } from "./Pages/SignUp";
import { Error } from "./Pages/Error";

// Main App component
function App() {
  // Create a browser router configuration
  const router = createBrowserRouter([
    {
      path: "/",
      // Navbar is rendered on every route
      element: <Navbar />,
      errorElement: <Error />,
      children: [
        // Home page is set as the default index route
        { index: true, element: <Home /> },
        // Other routes and their corresponding components
        { path: "/myorder", element: <MyOrder /> },
        { path: "/cart", element: <Cart /> },
        { path: "/signin", element: <SignIn /> },
        { path: "/signup", element: <SignUp /> },
      ]
    }
  ]);

  // Render the App component with nested context providers and router
  return (
    <>
      {/* Provide authentication context to the component tree */}
      <AuthContext>
        {/* Provide product context to the component tree */}
        <ProductContext>
          {/* Provide the router configuration to the component tree */}
          <RouterProvider router={router} />
        </ProductContext>
      </AuthContext>
    </>
  );
}

// Export the App component as the default export
export default App;
