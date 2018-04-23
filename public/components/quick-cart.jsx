import React from 'react';
import $ from 'jquery';

import MiniCart from './mini-cart.jsx';
import QuickAdd from './quick-add.jsx';

class QuickCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sizes: [],
      quantities: {},
      cart: {},
      cartOrder: [],
      cartSize: 0,
    };

    this.getSizesQtys = this.getSizesQtys.bind(this);
    this.addToCart= this.addToCart.bind(this);
  }

  componentDidMount() {
    this.getSizesQtys(this.props.item);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.item !== this.props.item) {
      this.getSizesQtys(this.props.item);
    }
  }

  getSizesQtys(productId) {
    $.ajax({
      url: `product/${productId}`,
      method: 'GET',
      success: (data) => {
        const newSizes = [];
        const newQuantities = {};
        for (let i = 0; i < data.length; i += 1) {
          newSizes.push(data[i].size_name);
          newQuantities[data[i].size_name] = data[i].quantity;
        }
        this.setState({
          currentItem: productId,
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

  addToCart(size, quantity) {
    $.ajax({
      url: `product/${this.props.item}/addtocart`,
      method: 'GET',
      success: (data) => {
        const newCart = Object.assign({}, this.state.cart);
        const cartKey = this.props.item + ' ' + size;
        if (this.state.cart.hasOwnProperty(cartKey)) {
          newCart[cartKey].quantity += parseInt(quantity);
          const newCartSize = this.state.cartSize + parseInt(quantity);
          this.setState({
            cart: newCart,
            cartSize: newCartSize,
          });
        } else {
          newCart[cartKey] = {
            id: this.props.item,
            name: data[0].name_name,
            color: data[0].color_name,
            quantity: parseInt(quantity),
            size: size,
            price: data[0].price,
            imgUrl: data[0].img_url,
          };
          const newCartSize = this.state.cartSize + parseInt(quantity);
          const newOrder = this.state.cartOrder.slice();
          newOrder.unshift(cartKey);
          this.setState({
            cart: newCart,
            cartSize: newCartSize,
            cartOrder: newOrder,
          });
        }
      },
      error: (err) => {
        console.log('Error', err);
      },
    });
  }

  render() {
    return (
      <div className="quickCart">
        <MiniCart
          cart={this.state.cart}
          cartSize={this.state.cartSize}
          cartOrder={this.state.cartOrder}
          getNewPage={this.getSizesQtys}
          />
        <QuickAdd
          sizes={this.state.sizes}
          quantities={this.state.quantities}
          addToCart={this.addToCart}/>
      </div>
    );
  }
}

export default QuickCart;
