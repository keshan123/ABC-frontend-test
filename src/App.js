import React from 'react';
import axios from 'axios';
import Downshift from 'downshift';
import matchSorter from 'match-sorter';

import Button from './components/Button/Button.js';
import { ResultsListContainer } from './components/ResultsList/ResultsListContainer.js'
import { ResultsListItem } from './components/ResultsList/ResultsListItem.js'
import { Input } from './components/Input/Input.js'
import { LabelInputButtonContainer } from './containers/styles.js'


const itemToString = (item) => item ? item.name : '';

export default class App extends React.Component {
  state = {
    suburbs: [],
  };

  // Grabs the suburbs
  componentDidMount() {
    axios.get(`http://localhost:8010/proxy/suburbs.json?q=Syd`)
    .then(res => {
      this.setState({
        suburbs: res.data,
      });
    });
  };

  // Shows the alert with the updated inputValue
  handleSubmit = (inputValue) => alert(inputValue);

  // uses matchSorter to filter through results based on inputValue
  filterItems = (value) => {
    const { suburbs } = this.state;
    return value
      ? matchSorter(
        suburbs,
        value,
        {
          keys: [
            'name',
            'locality',
            'postcode',
            'state.name',
            'state.abbreviation',
          ]
        }
      )
      : suburbs;
  };

  render() {
    return (
      <div>
        <Downshift itemToString={itemToString}>
          {({
            getInputProps,
            getItemProps,
            getLabelProps,
            getMenuProps,
            highlightedIndex,
            inputValue,
            isOpen,
          }) => (
            <div>
              <LabelInputButtonContainer>
                <label {...getLabelProps()}> Suburbs </label>
                <Input {...getInputProps()}/>
                <Button
                  className="search-button"
                  onClick={() => this.handleSubmit(inputValue)}
                />
              </LabelInputButtonContainer>
              <ResultsListContainer
                {...getMenuProps()}
              >
                {isOpen && (
                  this.filterItems(inputValue).map((item, index) => (
                    <ResultsListItem
                      {...getItemProps({
                        item,
                        key: `${item.name}|||${item.postcode}`,
                        style: {
                           backgroundColor: index === highlightedIndex ? 'gray' : null,
                           color: index === highlightedIndex ? 'white' : 'black',
                         }
                       })}
                     >
                        {item.name}
                     </ResultsListItem> )
                  )
                )}
              </ResultsListContainer>
            </div>
          )}
        </Downshift>
      </div>
    );
  };
};
