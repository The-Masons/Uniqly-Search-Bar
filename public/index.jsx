import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import Cart from './components/cart.jsx';
import QuickAdd from './components/quickadd.jsx';

class QuickCart extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="quickCart">
        <Cart />
        <QuickAdd />
      </div>
    );
  }
}

ReactDOM.render(<QuickCart />, document.getElementById('app'));
