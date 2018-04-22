import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import MiniCart from './minicart.jsx';
import QuickAdd from './quickadd.jsx';

class QuickCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sizes: [],
      quantities: {},
      cart: [],
    };

    this.getSizesQtys = this.getSizesQtys.bind(this);
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

  render() {
    return (
      <div className="quickCart">
        <MiniCart
          cart={{
            'Fake 1': {
              id: 0,
              name: 'Dog Shirt',
              color: 'Dog Color',
              quantity: 2,
              size: 'Small Dog Size',
              price: 9999,
              imgUrl: 'http://placecorgi.com/250'
            },
            'Fake 2': {
              id: 1,
              name: 'Cat Shirt',
              color: 'Cat Color',
              quantity: 1,
              size: 'Cat Size',
              price: 5099,
              imgUrl: 'http://placecorgi.com/250'
            },
            'Fake 3': {
              id: 2,
              name: 'Some Pants',
              color: 'Pants Color',
              quantity: 1,
              size: 'Human Size',
              price: 1599,
              imgUrl: 'http://placecorgi.com/250'
            },
          }}
          cartSize={4}
          cartOrder={['Fake 1', 'Fake 3', 'Fake 2']}
          getNewPage={this.getSizesQtys}
          />
        <QuickAdd sizes={this.state.sizes} quantities={this.state.quantities}/>
      </div>
    );
  }
}

export default QuickCart;
