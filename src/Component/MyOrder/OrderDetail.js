import styles from "../../styles/myorder.module.css";

// Component to display details of a single order
export default function OrderDetail(props) {
    // Destructure order details from props
    const { date, list, amount } = props.order;

    return (
        <div>
            {/* Heading displaying the order date */}
            <h1 className={styles.orderHeading}>
                Ordered On: {date}
            </h1>
            {/* Table to display the order details */}
            <table>
                <tr>
                    {/* Table headers */}
                    <th>S.no</th>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total Price</th>
                </tr>
                {/* Map through each product in the order list and display corresponding table rows */}
                {list.map((product, i) => <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>x{product.quantity}</td>
                    <td>₹{product.quantity * product.price}</td>
                </tr>)}
                {/* Table row for displaying the grand total */}
                <tr>
                    <td colSpan={4}>Grand Total</td>
                    <td>₹{amount}</td>
                </tr>
            </table>
        </div>
    );
}
