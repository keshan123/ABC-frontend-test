import React from "react";
import iconPath from "./icons.svg";
import {StyledSVG, StyledButton } from "./styles.js";

/**
 * <Button
 *   className="MyButton"
 *   onClick={() => console.log('Click')}
 * />
 *
 * @prop {Function} onClick
 * @prop {mixed} ... All other props will be forwarded to the native DOM button.

 */
export default function Button(props) {
  const { onClick, className, ...otherProps } = props;

  return (
    <StyledButton
      type="button"
      className={"Button " + (className || "")}
      onClick={onClick}
      {...otherProps}
    >
      <StyledSVG viewBox="0 0 24 24" width="24" height="16">
        <use xlinkHref={iconPath + "#dls-icon-arrow-right"} />
      </StyledSVG>
    </StyledButton>
  );
}
