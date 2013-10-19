var attachRegistry = function () {
  require(['flight/lib/registry'], function (registry) {
    window.registry = registry;
  });
};

var getRegistryKeys = function () {
  return Object.keys(window.registry).map(function (key) {
    return {
      key: key,
      type: typeof window.registry[key]
    };
  });
};