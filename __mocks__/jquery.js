const jquery = {};

const ajax = jest.fn((options) => {
  if (options.url === 'product/0') {
    options.success.call(null, [
      { size_name: 'Fake Size Foo', quantity: 42 },
      { size_name: 'Fake Size Bar', quantity: 42 },
    ]);
  } else {
    options.error.call(null, 'This is a fake error');
  }
});

jquery.ajax = ajax;

module.exports = jquery;
