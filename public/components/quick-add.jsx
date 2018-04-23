import React from 'react';

class QuickAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSize: '',
    };
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(e) {
    this.setState({
      currentSize: e.target.value,
    });
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
    return results;
  }

  render() {
    return (
      <div className="quickadd">
        <div className="quickadd-select">
          <select className="quickadd-dropdown quickadd-select-sizes" onChange={this.handleSelect}>
            {this.generateSizes(this.props.sizes)}
          </select>
          <select className="quickadd-dropdown quickadd-select-quantity">
            {this.generateQtys(this.state.currentSize)}
          </select>
        </div>
        <div className="quickadd-button">
          <button className="quickadd-button-add">ADD TO BAG</button>
        </div>
      </div>
    );
  }
}

export default QuickAdd;
