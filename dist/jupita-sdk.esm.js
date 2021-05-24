import request from 'request';

var Constants = function Constants() {}; // define req variable

Constants.url = "https://api.jupita.io/v1";
Constants.dumpEndpoint = Constants.url + "/dump";
Constants.feedEndpoint = Constants.url + "/feed";
Constants.ratingEntpoint = Constants.url + "/rating";

var ModelName = function ModelName() {};
ModelName.JUPITAV1 = "JupitaV1";
ModelName.JUPITAV2 = "JupitaV2";

var MessageType = function MessageType() {};
MessageType.Agent = 0;
MessageType.Client = 1;

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;

  _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _construct(Parent, args, Class) {
  if (_isNativeReflectConstruct()) {
    _construct = Reflect.construct;
  } else {
    _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) _setPrototypeOf(instance, Class.prototype);
      return instance;
    };
  }

  return _construct.apply(null, arguments);
}

function _isNativeFunction(fn) {
  return Function.toString.call(fn).indexOf("[native code]") !== -1;
}

function _wrapNativeSuper(Class) {
  var _cache = typeof Map === "function" ? new Map() : undefined;

  _wrapNativeSuper = function _wrapNativeSuper(Class) {
    if (Class === null || !_isNativeFunction(Class)) return Class;

    if (typeof Class !== "function") {
      throw new TypeError("Super expression must either be null or a function");
    }

    if (typeof _cache !== "undefined") {
      if (_cache.has(Class)) return _cache.get(Class);

      _cache.set(Class, Wrapper);
    }

    function Wrapper() {
      return _construct(Class, arguments, _getPrototypeOf(this).constructor);
    }

    Wrapper.prototype = Object.create(Class.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    return _setPrototypeOf(Wrapper, Class);
  };

  return _wrapNativeSuper(Class);
}

// handling error for invalid input
var InvalidParameterException = /*#__PURE__*/function (_Error) {
  _inheritsLoose(InvalidParameterException, _Error);

  function InvalidParameterException(message) {
    var _this;

    _this = _Error.call(this, message) || this;
    _this.name = "InvalidParameterException";
    return _this;
  }

  return InvalidParameterException;
}( /*#__PURE__*/_wrapNativeSuper(Error));

// importing module
//import { ModelName } from "./ModelName";
// rating base exception

var Agent = /*#__PURE__*/function () {
  // define constructor
  function Agent(token, agent_id) {
    this.token = token;
    this.agent_id = agent_id;
  }

  var _proto = Agent.prototype;

  // dump
  _proto.dump = function dump(text, client_id, message_type, isCall, listener) {
    if (message_type === void 0) {
      message_type = MessageType.Agent;
    }

    if (isCall === void 0) {
      isCall = false;
    }

    if (listener === void 0) {
      listener = null;
    }

    // checking input
    if (message_type !== 1 || 0) {
      throw new InvalidParameterException(" invalid input");
    }

    if (listener !== null) {
      request.post(Constants.dumpEndpoint, {
        json: {
          "token": this.token,
          "agent id": this.agent_id,
          "client id": client_id,
          "message type": message_type,
          "text": text,
          "isCall": isCall
        },
        headers: {
          "content-type": "application/json"
        }
      }, function (err, res, body) {
        console.log(res);

        if (err || res.statusCode !== 200) {
          listener.onError(res.statusCode.toString(), res.body);
        } else {
          listener.onSuccess(body);
        }
      });
    } else {
      console.log("Listener is not Defined");
    }
  } // feed
  ;

  _proto.feed = function feed(listener) {
    request.post(Constants.feedEndpoint, {
      json: {
        "token": this.token,
        "agent id": this.agent_id
      },
      headers: {
        "content-type": "application/json"
      }
    }, function (err, res, body) {
      console.log(res);

      if (err || res.statusCode !== 200) {
        listener.onError(res.statusCode.toString(), res.body);
      } else {
        listener.onSuccess(body);
      }
    });
  } // rating listener
  ;

  _proto.rating = function rating(model_name, listener) {
    if (model_name === void 0) {
      model_name = ModelName.JUPITAV1;
    }

    if (listener === void 0) {
      listener = null;
    }

    // checking input
    if (model_name !== (ModelName.JUPITAV1 || ModelName.JUPITAV2)) {
      throw new InvalidParameterException(model_name + " is a not valid modelname try " + ModelName.JUPITAV1 + " or " + ModelName.JUPITAV2);
    } // optional paramater


    if (listener !== null) {
      request.post(Constants.ratingEntpoint, {
        json: {
          "token": this.token,
          "agent id": this.agent_id,
          "model": model_name
        },
        headers: {
          "content-type": "application/json"
        }
      }, function (err, res, body) {
        console.log(res);

        if (err || res.statusCode !== 200) {
          listener.onError(res.statusCode.toString(), res.body);
        } else {
          listener.onSuccess(body);
        }
      });
    } else {
      console.log("Rating api value is Null");
    }
  };

  return Agent;
}();

var agent = /*#__PURE__*/new Agent("87e96f474b9bbd4a67c4cea97990ad322a665adaa244aeef716b2f78b3766ca3", "ihfazh");
agent.dump("welcome to this app", 1, 1, false, {
  onError: function onError(statusCode, response) {
    console.log(statusCode);
    console.log(response);
  },
  onSuccess: function onSuccess(week) {
    console.log(week);
  }
});
agent.feed({
  onError: function onError(statusCode, response) {
    console.log(statusCode);
    console.log(response);
  },
  onSuccess: function onSuccess(week) {
    console.log(week);
  }
}); // rating

agent.rating();
//# sourceMappingURL=jupita-sdk.esm.js.map
