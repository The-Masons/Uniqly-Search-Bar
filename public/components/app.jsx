import React from 'react';
import $ from 'jquery';
import QuickCart from './quick-cart.jsx';
import ItemPicker from './item-picker.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentItem: window.location.href.split('/').pop(),
      items: [],
    };

    this.setItem = this.setItem.bind(this);
  }

  componentDidMount() {
    $.ajax({
      url: `/products`,
      method: 'GET',
      success: (data) => {
        this.setState({
          currentItem: window.location.href.split('/').pop() || data[0].product_id,
          items: data,
        });
      },
      error: (err) => {
        this.setState({
          items: [{ name: 'ERROR', id: -1 }],
        });
      },
    });
  }

  setItem(e) {
    this.setState({
      currentItem: e.target.selectedOptions[0].dataset.id,
    });
  }

  render() {
    return (
      <div className="App">
        <QuickCart item={this.state.currentItem}/>
      </div>
    );
  }
}

export default App;
