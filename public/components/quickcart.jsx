import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import MiniCart from './minicart.jsx';
import QuickAdd from './quickadd.jsx';

class QuickCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentItem: this.props.item,
      sizes: [],
      quantities: {},
      cart: [],
    };

    this.getSizesQtys = this.getSizesQtys.bind(this);
  }

  componentDidMount() {
    this.getSizesQtys(this.state.currentItem);
  }

  getSizesQtys(productId) {
    $.ajax({
      url: `product/${productId}`,
      method: 'GET',
      success: (data) => {
        const newSizes = [];
        const newQuantities = {};
        for (let i = 0; i < data.length; i += 1) {
          newSizes.push(data[i].name);
          newQuantities[data[i].name] = data[i].quantity;
        }
        this.setState({
          sizes: newSizes,
          quantities: newQuantities,
        });
      },
      error: (err) => {
        this.setState({
          sizes: ['ERROR'],
          quantities: {
            ERROR: -1,
          },
        });
        console.log('Error', err);
      },
    });
  }

  render() {
    return (
      <div className="quickCart">
        <MiniCart />
        <QuickAdd sizes={this.state.sizes} quantities={this.state.quantities}/>
      </div>
    );
  }
}

export default QuickCart;
