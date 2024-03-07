import dynamic from "next/dynamic";

const DynamicMap = dynamic(() => import("./DynamicMap"), {
  ssr: false,
});

// Set default sizing to control aspect ratio which will scale responsively
// but also help avoid layout shift

const Map = ({ isMapExpand, toggleMapSize, ...props }) => {
  return (
    <div
      style={{
        display: "flex",
        flex: "3",
        width: "100%",
        zIndex: "0",
        position: "relative",
      }}
    >
      <DynamicMap {...props} />
      <span
        style={{
          position: "absolute",
          display: "block",
          right: 0,
          top: "300px",
          background: "#00b19f",
          color: "white",
          borderTopLeftRadius: "10px",
          borderBottomLeftRadius: "10px",
          padding: "30px 0",
          cursor: 'pointer',
          lineHeight: '0',
          zIndex: 3000,
        }}
        onClick={toggleMapSize}
      >
        {isMapExpand ? "<" : ">"}
      </span>
    </div>
  );
};

export default Map;
