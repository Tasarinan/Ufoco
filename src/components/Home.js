import React, { Component } from 'react';
import ItemList from './Home/Item-list'
import Gauges from './Gauges/gauges'
export default class Home extends Component {


  render() {
    return (

      <div>
       <Gauges />
      <ItemList></ItemList>
      </div>
    );
  }
}


