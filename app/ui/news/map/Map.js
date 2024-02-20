import dynamic from "next/dynamic";

const DynamicMap = dynamic(() => import("./DynamicMap"), {
  ssr: false,
});

// Set default sizing to control aspect ratio which will scale responsively
// but also help avoid layout shift

const Map = (props) => {
  return (
    <div style={{ display: "flex", flex: "3", width: "100%", zIndex: "0" }}>
      <DynamicMap {...props} />
    </div>
  );
};

export default Map;
