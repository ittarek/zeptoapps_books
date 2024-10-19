import { SyncLoader } from "react-spinners";


const Spinner = () => {
  return (
    <div
      style={{ height: "70vh" }}
      className="
     spinner-style
    
    "
    >
      <SyncLoader
        color="#160404"

        loading
        margin={10}
        size={10}
        speedMultiplier={1}
      />
    </div>
  );
};

export default Spinner;
