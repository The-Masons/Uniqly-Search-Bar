import React from 'react';

const ItemPicker = (props) => {
  const generateItems = (items) => {
    const itemList = [];

    for (let i = 0; i < items.length; i += 1) {
      itemList.push(
        <option className="itempicker-option" key={'itemPicker' + i} data-id={items[i].id}>{items[i].name}</option>
      );
    }

    return itemList;
  };

  return (
    <div className="itempicker">
      <select className="itempicker-select">
        {generateItems(props.items)}
      </select>
    </div>
  );
};

export default ItemPicker;
