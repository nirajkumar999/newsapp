import "./App.css";
import React from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import { useState } from "react";

const App = () => {
  const pageSize = 12;
  const [progress,setProgress] = useState(0);

    return (
      <>
        <BrowserRouter>
          <LoadingBar
            color='#f11946'
            progress={progress}
            height={4}
          />
          <Navbar />
          <div>
            <Routes>

              <Route exact path="/" element={<News setProgress={setProgress} key='general' pageSize={pageSize} country='in' />}></Route>

              <Route exact path="/business" element={<News setProgress={setProgress} key='business' pageSize={pageSize} country='in' category='business' />}></Route>

              <Route exact path="/entertainment" element={<News setProgress={setProgress} key='entertainment' pageSize={pageSize} country='in' category='entertainment' />}></Route>

              <Route exact path="/health" element={<News setProgress={setProgress} key='health' pageSize={pageSize} country='in' category='health' />}></Route>

              <Route exact path="/science" element={<News setProgress={setProgress} key='science' pageSize={pageSize} country='in' category='science' />}></Route>

              <Route exact path="/sports" element={<News setProgress={setProgress} key='sports' pageSize={pageSize} country='in' category='sports' />}></Route>

              <Route exact path="/technology" element={<News setProgress={setProgress} key='technology' pageSize={pageSize} country='in' category='technology' />}></Route>

            </Routes>
          </div>
        </BrowserRouter>
      </>
    );
}

export default App
// to every <News setprogress={this.setProgress}> component, we need to pass a unique key parameter so that each time we hit our end points the complete components get re rendered with the setd props value. Otherwise this wont work and we will see the same page on our each endpoint