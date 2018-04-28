import React from 'react';
import QuickAdd from './quick-add.jsx';

describe('QuickAdd', () => {
  test('should populate dropdowns with given data', () => {
    const quickAdd = mount(
      <QuickAdd sizes={[
        'Fake Size 0',
        'Fake Size 1',
        'Fake Size 2',
      ]}
      quantities={{
        'Fake Size 0': 10,
        'Fake Size 1': 11,
        'Fake Size 2': 12,
      }}/>
    );

    expect(quickAdd.containsAllMatchingElements([
      <option key='sizeOpt0'>Fake Size 0</option>,
      <option key='sizeOpt1'>Fake Size 1</option>,
      <option key='sizeOpt2'>Fake Size 2</option>,
    ])).toEqual(true);
  });

  test('should populate quantity dropdown with the correct number of options', () => {
    const quickAdd = mount(
      <QuickAdd sizes={[
        'Fake Size 0',
        'Fake Size 1',
        'Fake Size 2',
      ]}
      quantities={{
        'Fake Size 0': 10,
        'Fake Size 1': 11,
        'Fake Size 2': 12,
      }}/>
    );

    expect(quickAdd.find('.quickadd-select-quantity').children().length).toEqual(10);
    quickAdd.find('.quickadd-select-sizes').simulate('change', {target: {form: [{value: 'Fake Size 2'}]}});
    expect(quickAdd.state('currentSize')).toEqual('Fake Size 2');
    expect(quickAdd.find('.quickadd-select-quantity').children().length).toEqual(12);
  });

  test('should add an item to the cart when "ADD TO BAG" is clicked', () => {
    const mockAdd = jest.fn();
    const quickAdd = mount(
      <QuickAdd sizes={[
        'Fake Size 0',
        'Fake Size 1',
        'Fake Size 2',
      ]}
      quantities={{
        'Fake Size 0': 10,
        'Fake Size 1': 11,
        'Fake Size 2': 12,
      }}
      addToCart={mockAdd}/>
    );

    quickAdd.find('.quickadd-btn').simulate('click', {target: {form: [{value: 'Fake Size 0'}, {value: 1}]}});

    expect(mockAdd).toHaveBeenCalledWith('Fake Size 0', 1);
  });
});
