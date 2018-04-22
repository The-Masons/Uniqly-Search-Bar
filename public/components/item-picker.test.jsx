import React from 'react';
import ItemPicker from './item-picker.jsx';

describe('ItemPicker', () => {
  test('should render with the correct items', () => {
    const itemPicker = mount(
      <ItemPicker
        items={[
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
        ]}/>
      );

    expect(itemPicker).toMatchSnapshot();
  });
});
