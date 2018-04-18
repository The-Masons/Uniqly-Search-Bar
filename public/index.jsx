import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import MiniCart from './components/minicart.jsx';
import QuickAdd from './components/quickadd.jsx';

class QuickCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentItem: 0,
      sizes: [
        'Fake Size 0',
        'Fake Size 1',
        'Fake Size 2',
      ],
      quantities: {
        'Fake Size 0': 10,
        'Fake Size 1': 11,
        'Fake Size 2': 12,
      },
      cart: [],
    };
  }

  // componentDidMount() {
  //   $.ajax({
  //     url: `product/${this.state.currentItem}`,
  //     method: 'GET',
  //     success: (data) => {
  //       this.setState({
  //         sizes: data.sizes,
  //         quantities: data.quantities,
  //       });
  //     },
  //     error: (err) => {
  //       this.setState({
  //         sizes: ['ERROR'],
  //         quantities: {
  //           ERROR: -1,
  //         },
  //       });
  //       console.log('Error', err);
  //     },
  //   });
  // }

  render() {
    return (
      <div className="quickCart">
        <MiniCart />
        <QuickAdd sizes={this.state.sizes} quantities={this.state.quantities}/>
      </div>
    );
  }
}

ReactDOM.render(<QuickCart />, document.getElementById('app'));
