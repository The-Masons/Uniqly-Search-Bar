import React from 'react';
import QuickCart from './quickcart.jsx';
import ItemPicker from './item-picker.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: 0,
    };

    this.setItem = this.setItem.bind(this);
  }

  setItem(itemId) {
    this.setState({
      item: itemId,
    });
  }

  getItems() {
    return [
      {
        name: 'Fake Item 0',
        id: 0,
      },
      {
        name: 'Fake Item 1',
        id: 1,
      },
      {
        name: 'Fake Item 2',
        id: 2,
      },
    ];
  }

  render() {
    return (
      <div className="App">
        <QuickCart item={this.state.item}/>
        <ItemPicker items={this.getItems()} setCurrentItem={this.setItem}/>
      </div>
    );
  }
}

export default App;
