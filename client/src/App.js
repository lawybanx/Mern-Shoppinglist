import React, { Component } from 'react';
import AppNavbar from './components/AppNavbar';
import ShoppingList from './components/ShoppingList';
import ItemModal from './components/ItemModal';
import { Container } from 'reactstrap';

import { Provider } from 'react-redux';
import store from './store';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppNavbar />
        <Container>
          <ItemModal />
          <ShoppingList />
        </Container>
      </Provider>
    );
  }
}
