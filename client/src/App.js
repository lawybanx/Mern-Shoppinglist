import React, { Component } from 'react';
import AppNavbar from './components/AppNavbar';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

export default class App extends Component {
  render() {
    return (
      <div>
        <AppNavbar />
      </div>
    );
  }
}
