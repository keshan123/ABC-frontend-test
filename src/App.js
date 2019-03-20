import React, { Component } from "react";
import axios from 'axios';
import ResultsList from "./components/ResultsList/ResultsList";
import Input from "./components/Input/Input";
import Button from "./components/Button/Button";
import { MainContainer, SearchAndButtonContainer } from "./AppStyles.js";


export default class App extends Component {
  state = {
    value: '',
    suburbs: [],
    results: [],
    loaded: false,
  }

  componentDidMount() {
    axios.get(`http://localhost:8010/proxy/suburbs.json?q=Syd`)
      .then(res => {
        const suburbs = res.data;
        this.setState({ suburbs, loaded: true });
      })
  }

  onSelect = (result) => {
    this.setState({ value: result })
  }

  filterResults = () => {
    const inputValue = this.state.value.toLowerCase();
    const results = this.state.suburbs.reduce((acc, val) => {
      const inName = val.name.toLowerCase().indexOf(inputValue) === 0;
      const wasFound = inName;
      return wasFound
        ? [ ...acc, val ]
        : acc;
    }, []);
    this.setState({ results })
    if (inputValue === '') {
      this.setState({ results: []})
    }
  }

  handleChange = (queryString) => {
    this.setState(
      { value: queryString },
      this.filterResults
    );
  }

  render() {
    return this.state.loaded ? (
      <section>
      {console.log('state', this.state.results)}
        <MainContainer>
          <SearchAndButtonContainer>
          <Input value={this.state.value} onChange={this.handleChange}/>
          <Button/>
          </SearchAndButtonContainer>
          { this.state.results &&
            <ResultsList
              onSelect={this.onSelect}
              loaded
              items={this.state.results}
            />
          }
        </MainContainer>
      </section>
    ): 'Loading'
  }
}
