import React from 'react';
import $ from 'jquery';
import QuickCart from './quickcart.jsx';

jest.mock('jquery');

describe('QuickCart', () => {
  describe('getSizesQtys', () => {
    test('should load data from the db on page load', () => {
      const spy = jest.spyOn(QuickCart.prototype, 'getSizesQtys');
      const quickCart = mount(<QuickCart item={0}/>);

      expect(spy).toHaveBeenCalledTimes(1);

      spy.mockClear();
    });

    test('should set state when a request succeeds', () => {
      const spy = jest.spyOn(QuickCart.prototype, 'getSizesQtys');
      const quickCart = mount(<QuickCart item={0}/>);

      expect(quickCart.state('sizes')).toEqual(['Fake Size Foo', 'Fake Size Bar']);
      expect(quickCart.state('quantities')).toEqual({
        'Fake Size Foo': 42,
        'Fake Size Bar': 42,
      });

      spy.mockClear();
    });

    test('should set state when a request fails', () => {
      const spy = jest.spyOn(QuickCart.prototype, 'getSizesQtys');
      const quickCart = mount(<QuickCart item={0}/>);

      quickCart.instance().getSizesQtys(42);

      expect(quickCart.state('sizes')).toEqual(['ERROR']);
      expect(quickCart.state('quantities')).toEqual({ERROR: -1});

      spy.mockClear();
    });
  });
});
