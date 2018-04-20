import React from 'react';
import ReactDOM from 'react-dom';

class MiniCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: [],
      cartSize: 0,
      viewClass: 'minicart-view empty hidden',
      timeoutID: '',
    };

    this.generateMiniCart = this.generateMiniCart.bind(this);
    this.showCart = this.showCart.bind(this);
  }

  showCart() {
    const debounce = () => {
      if (this.state.timeoutID) {
        clearTimeout(this.state.timeoutID);
      }
      const newTimeoutID = setTimeout(() => this.setState({
        viewClass: this.state.viewClass + ' hidden',
      }), 5000);
      this.setState({
        timeoutID: newTimeoutID,
      });
    };

    this.setState({
      viewClass: this.state.viewClass.replace(' hidden', ''),
    }, debounce);
  }

  generateMiniCart(cart) {
    if (cart.length > 0) {

    } else {
      return 'YOUR BAG IS EMPTY';
    }
  }

  render() {
    return (
      <div className="minicart">
        <div
          className="minicart-icon"
          onMouseEnter={this.showCart}
          >
          <span>{this.state.cartSize}</span>
        </div>
        <div className={this.state.viewClass}>
          {this.generateMiniCart(this.state.cart)}
        </div>
      </div>
    );
  }
};

export default MiniCart;
