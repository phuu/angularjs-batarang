var xt = {};

xt.connect = function (name, type) {

  type = type || 'runtime';

  if (!chrome[type]) throw new Error("Unknown connection type");
  if (!chrome[type].connect) throw new Error("Cannot call chrome." + type + ".connect");

  return PortWrapper(chrome[type].connect({
    name: name
  }));

};