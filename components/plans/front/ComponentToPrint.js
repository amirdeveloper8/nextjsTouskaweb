import React from "react";

const ComponentToPrint = React.forwardRef((props, ref) => {
  return <div ref={ref}></div>;
});
ComponentToPrint.displayName = "print";

export default ComponentToPrint;
