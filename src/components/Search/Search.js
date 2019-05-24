/[/*import React, { Component, Fragment } from "react";
import './styles.css';
import ResultSearch from '../ResultSearch/ResultSearch'

class Search extends Component {
 constructor() {
   super();
   this.state = {
     name: ''
   }
   this.searchInput = this.searchInput.bind(this);
 }
 
 searchInput (e) {
   this.setState({
     name: e.target.value
   });
 }  
 
 render () {
    return (
        <Fragment>
        <input type="text" name="name" value={this.state.name} onChange={(e) => this.searchInput(e)} />
        <ResultSearch nameList={this.state.name} />
        </Fragment>
      );     
    }
}

export default Search; */}