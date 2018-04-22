import React from 'react';
import $ from 'jquery';
import QuickCart from './quickcart.jsx';
import ItemPicker from './item-picker.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentItem: -1,
      items: [],
    };

    this.setItem = this.setItem.bind(this);
  }

  componentDidMount() {
    $.ajax({
      url: '/products',
      method: 'GET',
      success: (data) => {
        this.setState({
          currentItem: data[0].product_id,
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

  setItem(itemId) {
    this.setState({
      currentItem: itemId,
    });
  }

  render() {
    return (
      <div className="App">
        <QuickCart item={this.state.currentItem}/>
        <ItemPicker items={this.state.items} setCurrentItem={this.setItem}/>
      </div>
    );
  }
}

export default App;
