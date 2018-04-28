const jquery = {};

const ajax = jest.fn((options) => {
  if (options.url === '/product/0/sizes_qtys') {
    options.success.call(null, [
      { size_name: 'Fake Size Foo', quantity: 42 },
      { size_name: 'Fake Size Bar', quantity: 42 },
    ]);
  } else if (options.url === '/product/0/addtocart') {
    options.success.call(null, [
      {
        name_name: 'Fake Product',
        color_name: 'Fake Color',
        img_url: 'fake.url/image.fake',
        price: 4199,
      },
    ]);
  } else {
    options.error.call(null, `This is a fake error ${options.url}`);
  }
});

jquery.ajax = ajax;

module.exports = jquery;
