define(function (require) {

  'use strict';

  /**
   * Module dependencies
   */

  var dataRegistry = require('component/dataRegistry')

  /**
   * Module exports
   */

  return initialize;

  /**
   * Module function
   */

  function initialize() {
    dataRegistry.attachTo(document);
  }

});
