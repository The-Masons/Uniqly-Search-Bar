import React from 'react';
import ItemPicker from './item-picker.jsx';

describe('ItemPicker', () => {
  test('should render with the correct items', () => {
    const itemPicker = mount(
      <ItemPicker
        items={[
          {
            name_name: 'Fake Item 0',
            product_id: 0,
            color_name: 'Fake Color 0',
          },
          {
            name_name: 'Fake Item 1',
            product_id: 1,
            color_name: 'Fake Color 0',
          },
          {
            name_name: 'Fake Item 2',
            product_id: 2,
            color_name: 'Fake Color 0',
          },
        ]}/>
      );

    expect(itemPicker).toMatchSnapshot();
  });
});
