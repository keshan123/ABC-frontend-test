import React from 'react';
import axios from 'axios';
import Downshift from 'downshift';
import matchSorter from 'match-sorter';

import Buttom from './components/Button/Button.js';
import { ResultsListContainer } from './components/ResultsList/ResultsListContainer.js'
import { ResultsListItem } from './components/ResultsList/ResultsListItem.js'
import { Input } from './components/Input/Input.js'
import { InputButtonContainer } from './containers/styles.js'


const itemToString = (item) => item ? item.name : '';

export default class App extends React.Component {
  state = {
    suburbs: [],
  }

  componentDidMount() {
    axios.get(`http://localhost:8010/proxy/suburbs.json?q=Syd`)
      .then(res => {
        const suburbs = res.data;
        this.setState({ suburbs, loaded: true });
      }
    )
  }

  handleSubmit = (inputValue) => {
    alert(inputValue)
  }

  handleChange = (event) => {
    this.setState({
      value: event.target.value
    })
  }

  render() {
    const getItems = value => value ? matchSorter(
      this.state.suburbs,
      value,
      {keys: [
        'name',
        'locality',
        'postcode',
        'state.name',
        'state.abbreviation',
      ]}
    ) : this.state.suburbs
    return (
      <div>
        <h1> Suburb Search </h1>
        <div>
          <Downshift itemToString={itemToString}>
            {({
              getInputProps,
              getItemProps,
              getLabelProps,
              getMenuProps,

              clearSelection,

              highlightedIndex,
              inputValue,
              isOpen,
              selectedItem,
            }) => (
              <div>
                <label {...getLabelProps()}> Suburbs </label>
                <InputButtonContainer>
                  <Input {...getInputProps()}/>
                  <Buttom onClick={() => this.handleSubmit(inputValue)}/>
                </InputButtonContainer>
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
      </div>
    )
  }
}
