import React from "react";
import { ResultsListContainer , ListItem} from "./styles.js";

/**
 * <ResultsList
 *   items={[...]}
 *   onSelect={item => console.log(item.name)}
 *   className="MyResultsList"
 * />
 *
 * @prop {Array} items List of results of form { name: string, state: { abbreviation: string } }
 * @prop {Function} onSelect Callback to execute when item is selected, accepts object.
 * @prop {mixed} ... All other props will be forwarded to the container DOM node.
 */
export default function ResultsList(props) {
  const { className, onSelect, items, ...otherProps } = props;

  return (
    <ResultsListContainer {...otherProps}>
      {items.map(function(item, index) {
        return (
          <ListItem
            key={"item" + index}
            onClick={() => onSelect && onSelect(item.name)}
          >
            <button className="ResultsList-button">
              {item.name}, {item.state.abbreviation}
            </button>
          </ListItem>
        );
      })}
    </ResultsListContainer>
  );
}
