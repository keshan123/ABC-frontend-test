import React from "react";
import PropTypes from 'prop-types';
import iconPath from "./icons.svg";
import { StyledSVG, StyledButton } from "./styles.js";

/**
 * <Button
 *   className="MyButton"
 *   onClick={() => console.log('Click')}
 * />
 *
 */

 const Button = ({ onClick, className, ...otherProps }) => (
   <StyledButton
     type="button"
     aria-label="Search"
     className={"Button " + (className || "")}
     onClick={onClick}
     {...otherProps}
   >
     <StyledSVG viewBox="0 0 24 24" width="24" height="16">
       <use xlinkHref={`${iconPath}#dls-icon-arrow-right`} />
     </StyledSVG>
   </StyledButton>
 )

 Button.propTypes = {
   onClick: PropTypes.func,
   className: PropTypes.string,
 };

 export default Button
