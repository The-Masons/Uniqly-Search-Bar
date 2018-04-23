import React from 'react';

class QuickAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSize: '',
      currentQty: '',
      buttonClass: 'quickadd-btn',
    };

    this.handleSelect = this.handleSelect.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  }

  handleSelect(e) {
    let newBtnClass = '';
    let newQty = '';

    if (this.props.quantities[e.target.form[0].value] < 1) {
      newBtnClass = 'quickadd-btn disabled';
      newQty = 'Out of Stock';
    } else {
      newBtnClass = 'quickadd-btn';
      newQty = 1;
    }

    this.setState({
      currentSize: e.target.form[0].value,
      currentQty: newQty,
      buttonClass: newBtnClass,
    });
  }

  handleAdd(e) {
    e.preventDefault();
    const size = e.target.form[0].value;
    const qty = e.target.form[1].value;
    if (qty !== 'Out of Stock') {
      this.props.addToCart(size, qty);
    }
  }

  generateSizes(sizes) {
    const results = [];
    for (let i = 0; i < sizes.length; i += 1) {
      results.push(
        <option key={'sizeOpt' + i}>{sizes[i]}</option>
      );
    }
    return results;
  }

  generateQtys(currSize) {
    const results = [];
    const quantity = this.props.quantities[currSize] < 99 ? this.props.quantities[currSize] : 99;
    for (let i = 0; i < quantity; i += 1) {
      results.push(
        <option key={'qtyOpt' + i}>{i + 1}</option>
      );
    }
    return results.length > 0 ? results : <option>Out of Stock</option>;
  }

  render() {
    return (
      <div className="quickadd">
        <form className="quickadd-form">
          <div className="quickadd-select">
            <select
              className="quickadd-dropdown quickadd-select-sizes"
              onChange={this.handleSelect}>
              {this.generateSizes(this.props.sizes)}
            </select>
            <select className="quickadd-dropdown quickadd-select-quantity">
              {this.generateQtys(this.state.currentSize)}
            </select>
          </div>
          <button className={this.state.buttonClass} onClick={this.handleAdd}>ADD TO BAG</button>
        </form>
      </div>
    );
  }
}

export default QuickAdd;
