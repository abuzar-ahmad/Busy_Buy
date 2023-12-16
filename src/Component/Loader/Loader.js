import Spinner from 'react-spinner-material';

// Component to display a loading spinner
export default function Loader() {
  return (
    <div style={{
      // Styles for centering the loader
      textAlign: "center",
      display: "flex",
      justifyContent: "space-around",
      flexDirection: "column",
      alignItems: "center",
      marginTop: "15%",
      zIndex: "999"
    }}>
      {/* Container for the spinner and loading text */}
      <div>
        {/* Loading spinner with customizable properties */}
        <Spinner radius={80} color={"blue"} stroke={2} visible={true} />
        {/* Text indicating loading */}
        <h4>Loading..</h4>
      </div>
    </div>
  );
}
