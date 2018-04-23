import React from 'react';

const ItemPicker = (props) => {
  const generateItems = (items) => {
    const itemList = [];

    for (let i = 0; i < items.length; i += 1) {
      itemList.push(
        <option
          className="itempicker-option"
          key={'itemPicker' + i}
          data-id={items[i].product_id}>
          {items[i].name_name}, {items[i].color_name}
        </option>
      );
    }

    return itemList;
  };

  return (
    <div className="itempicker">
      <select className="itempicker-select" onChange={props.setCurrentItem}>
        {generateItems(props.items)}
      </select>
    </div>
  );
};

export default ItemPicker;
