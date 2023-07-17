import React from "react";
import CircleLoading from "../util/CircleLoading";

const Loading = ({ loading, error, children }) => {
  const elementType = children?.type?.render?.displayName;

  const renderHandler = () => {
    /* Handle Loading Status on Buttun */
    if (elementType === "Button") {
      const cloneButton = React.cloneElement(
        children,
        { disabled: true },
        "Loading..."
      );
      return (
        <>
          {loading ? (
            cloneButton
          ) : error ? (
            <>
              {children}
              <p>
                <br />
                {error}
              </p>
            </>
          ) : (
            children
          )}
        </>
      );
    }
    return (
      <>{loading ? <CircleLoading /> : error ? <p>{error}</p> : children}</>
    );
  };

  return renderHandler();
};

export default Loading;
