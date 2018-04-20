import React from 'react';
import QuickCart from './quickcart.jsx';

describe('QuickCart', () => {
  test('should load data from the db on page load', () => {
    const spy = jest.spyOn(QuickCart, 'getSizesQtys');
    const quickCart = mount(<QuickCart />);

    expect(spy).toHaveBeenCalledTimes(1);
  });
});
