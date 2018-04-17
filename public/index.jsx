import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import MiniCart from './components/minicart.jsx';
import QuickAdd from './components/quickadd.jsx';

class QuickCart extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="quickCart">
        <MiniCart />
        <QuickAdd />
      </div>
    );
  }
}

ReactDOM.render(<QuickCart />, document.getElementById('app'));
