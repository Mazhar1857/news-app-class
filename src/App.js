
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import React, { Component } from 'react'
import NavBar from './Component/NavBar';
import News from './Component/News';
import LoadingBar from 'react-top-loading-bar'


export default class App extends Component {
  state = {
    progress: 0
  }
 
  setProgress = (progress) => {
    this.setState({ progress: progress })

  }

  render() {
    return (
      <div>
        <Router>
          <NavBar title='NewsMonkey' />
          <LoadingBar
            color='#f11946'
            progress={this.state.progress}
          // onLoaderFinished={() => setProgress(0)}
          />

          <Routes>
            <Route exact path="/" element={<News setProgress={this.setProgress} key="general" pageSize={20} country='in' category='general' />} />
            <Route exact path="/business" element={<News setProgress={this.setProgress} key="business" pageSize={20} country='in' category='business' />} />
            <Route exact path="/entertainment" element={<News setProgress={this.setProgress} key="entertainment" pageSize={20} country='in' category='entertainment' />} />
            <Route exact path="/health" element={<News setProgress={this.setProgress} pageSize={20} key="health" country='in' category='health' />} />
            <Route exact path="/science" element={<News setProgress={this.setProgress} key="science" pageSize={20} country='in' category='science' />} />
            <Route exact path="/sports" element={<News setProgress={this.setProgress} key="sports" pageSize={20} country='in' category='sports' />} />
            <Route exact path="/technology" element={<News setProgress={this.setProgress} key="technology" pageSize={20} country='in' category='technology' />} />
          </Routes>
        </Router>

      </div>
    )
  }
}

