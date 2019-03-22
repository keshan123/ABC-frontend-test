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
  }

  // Grabs the suburbs when componentDidMount
  componentDidMount() {
    axios.get(`http://localhost:8010/proxy/suburbs.json?q=Syd`)
      .then(res => {
        const suburbs = res.data;
        this.setState({ suburbs, loaded: true });
      }
    )
  }

  // Shows the alert with the updated inputValue
  handleSubmit = (inputValue) => {
    alert(inputValue)
  }

  render() {
    const getItems = value => value ? matchSorter(
      this.state.suburbs,
      value,
      {keys: [
        'name', // Can search through all these paramters with the inputValue
        'locality',
        'postcode',
        'state.name',
        'state.abbreviation',
      ]}
    ) : this.state.suburbs

    return (
      <div>
        <Downshift itemToString={itemToString}>
          {({
            getInputProps,  // Getters
            getItemProps,
            getLabelProps,
            getMenuProps,

            clearSelection, // Actions

            highlightedIndex, // State
            inputValue,
            isOpen,
            selectedItem,
          }) => (
            <div>
              <LabelInputButtonContainer>
                <label {...getLabelProps()}> Suburbs </label>
                <Input {...getInputProps()}/>
                <Button onClick={() => this.handleSubmit(inputValue)}/>
              </LabelInputButtonContainer>
              <ResultsListContainer
                {...getMenuProps()}
              >
                {
                  isOpen
                  ? getItems(inputValue).map((item, index) => (
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
                    </ResultsListItem> ))
                  : null
                }
              </ResultsListContainer>
            </div>
          )}
        </Downshift>
      </div>
    )
  }
}
