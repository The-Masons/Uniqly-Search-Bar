import React from 'react';
import QuickAdd from './quickadd.jsx';

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

    expect(quickAdd.find('.quickadd-select-quantity').children().length).toEqual(99);
    quickAdd.find('.quickadd-select-sizes').simulate('change', {target: {value: 'Fake Size 0'}});
    expect(quickAdd.state('currentSize')).toEqual('Fake Size 0');
    expect(quickAdd.find('.quickadd-select-quantity').children().length).toEqual(10);
  });
});
