import React from 'react';
import ReactDOM from 'react-dom';

const QuickAdd = (props) => (
  <div className="quickadd">
    <div className="quickadd-select">
      <select className="quickadd-dropdown quickadd-select-sizes">
        <option>Select Size</option>
      </select>
      <select className="quickadd-dropdown quickadd-select-quantity">
        <option>QTY: 1</option>
      </select>
    </div>
    <div className="quickadd-button">
      <button className="quickadd-button-add">ADD TO BAG</button>
    </div>
  </div>
);

export default QuickAdd;
