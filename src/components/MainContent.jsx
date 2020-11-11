import React, { Component } from "react";

import SearchBarHeader from "./SearchBarHeader";
import Header from './Header';

class MainContent extends Component {
  state = {};
  render() {
    return (
        <div class="main-content" id="panel">
            <SearchBarHeader></SearchBarHeader>
            <Header></Header>
        </div>
    );
  }
}

export default MainContent