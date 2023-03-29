type Props = {
  direction?: "row" | "column";
  color?: React.CSSProperties["color"];
  style?: React.CSSProperties;
};

const Divider = (props: Props) => {
  const { direction = "row", color = "#fff", style } = props;
  //
  if (direction === "row") {
    return (
      <div
        style={{
          ...style,
          width: "100%",
          height: 1,
          backgroundColor: color,
        }}
      />
    );
  } else {
    return (
      <div
        style={{
          ...style,
          width: 1,
          height: "100%",
          backgroundColor: color,
        }}
      />
    );
  }
};
export default Divider;
