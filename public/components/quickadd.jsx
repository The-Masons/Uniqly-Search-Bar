import React from 'react';
import ReactDOM from 'react-dom';

const QuickAdd = (props) => (
  <div className="quickAdd">
    <select className="sizes">
      <option>Select Size</option>
    </select>
    <select className="quantity">
      <option>QTY: 1</option>
    </select>
    <button className="add-btn">ADD TO BAG</button>
  </div>
);

export default QuickAdd;
