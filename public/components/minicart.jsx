import React from 'react';
import ReactDOM from 'react-dom';

class MiniCart extends React.Component (
  constructor(props) {
    super(props);
    this.state = {
      cart: [];
    };

    this.generateMiniCart = this.generateMiniCart.bind(this);
  }

  generateMiniCart() {
    
  }

  render() {
    return (
      <div className="minicart-icon">
        <span>0</span>
      </div>
      <div className="minicart-view">
        {this.generateMiniCart(this.state.cart)}
      </div>
    );
  }
);

export default MiniCart;
