'use strict';

describeComponent('component/dataRegistry', function () {

  // Initialize the component and attach it to the DOM
  beforeEach(function () {
    setupComponent();
  });

  it('should be defined', function () {
    expect(this.component).toBeDefined();
  });

  it('should do something', function () {
    expect(true).toBe(false);
  });

});
