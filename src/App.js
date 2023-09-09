import "./App.css";

import React, { Component } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export default class App extends Component {
  pageSize=12;
  render() {
    return (
      <>
      <BrowserRouter>
        <Navbar/>
        <div>
        <Routes>
            <Route exact path="/" element={<News key='general' pageSize={this.pageSize} country='in'/>}></Route>
            <Route exact path="/business" element={<News key='business' pageSize={this.pageSize} country='in' category='business'/>}></Route>
            <Route exact path="/entertainment" element={<News key='entertainment' pageSize={this.pageSize} country='in' category='entertainment'/>}></Route>
            <Route exact path="/health" element={<News key='health' pageSize={this.pageSize} country='in' category='health'/>}></Route>
            <Route exact path="/science" element={<News key='science' pageSize={this.pageSize} country='in' category='science'/>}></Route>
            <Route exact path="/sports" element={<News key='sports' pageSize={this.pageSize} country='in' category='sports'/>}></Route>
            <Route exact path="/technology" element={<News key='technology' pageSize={this.pageSize} country='in' category='technology'/>}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </>
    );
  }
}

// to every <News> component, we need to pass a unique key parameter so that each time we hit our end points the complete components get re rendered with the updated props value. Otherwise this wont work and we will see the same page on our each endpoint