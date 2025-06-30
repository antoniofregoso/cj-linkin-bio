(() => {
  // ../../../../node_modules/@customerjourney/cj-core/src/components/AppElement.js
  var AppElement = class extends HTMLElement {
    #default = {};
    /**
     * 
     * @param {Object} props Attributes necessary to render the HTML element
     */
    constructor(props = {}) {
      super();
      this.state = this.initState(props);
    }
    /**
     * Applies default values to props that are not defined in the component state
     * @param {Object} defValues Default values
     * @param {Object} props Values to be applied in the rendering
     * @returns {Object} - Default attributes combined with shipped attributes
     */
    initState(defValues, props) {
      if (props != void 0) {
        let state = Object.assign({}, defValues, props);
        if (defValues != void 0) {
          if (Object.keys(defValues).lenght != 0) {
            Object.keys(defValues).forEach((prop) => {
              if (props[prop] != void 0) {
                if (typeof props[prop] === "string" || Array.isArray(props[prop])) {
                  state[prop] = props[prop];
                } else {
                  state[prop] = Object.assign({}, defValues[prop], props[prop]);
                }
              }
            });
          }
        }
        return state;
      } else {
        return defValues;
      }
    }
    /**
     * convierte el nombre de un atributo a camel case
     * @param {String} attribute 
     * @returns {String}
     */
    attribute2CamelCase(attribute2) {
      const pattern = new RegExp("-([a-z])", "g");
      return attribute2.replace(pattern, (match, capture) => capture.toUpperCase());
    }
    /**
     * Remove capitalization of an attribute name
     * @param {String} camelCase 
     * @returns  {String}
     */
    camelCase2attribute(camelCase) {
      return camelCase.replace(new RegExp("-([a-z])", "g"), (m, c) => c.toUpperCase());
    }
    /**
     * Initializes the component state and renders it.
     * @param {Object} props Attributes and properties to render the component
     */
    setState(props) {
      this.state = this.initState(this.#default, props);
      this.render();
    }
    /**
     * Update state and render the component
     * 
     * @param {Object} props Attributes and properties to update the component
     */
    updateState(props) {
      this.state = this.initState(this.state, props);
      this.render();
    }
    /**
     * Generate data attributes to generate component animations
     * 
     * @param {Object} props Attributes to define animation
     *  @param {string} props.animation Animation name
     *  @param {string} props.delay 2s, 3s, 4s or 5s
     *  @param {string} props.speed slower, slow, fast or faster. Default 1s
     *  @param {string} props.repeat 1, 2, 3, infinite. Default 0
     * @returns Animation data- params
     */
    setAnimation(props) {
      if (props === void 0 || props === null) {
        return "";
      } else {
        let animation = ` data-animation=${props.effect}`;
        props.delay != void 0 ? animation += ` data-delay=${props.delay}` : false;
        props.speed != void 0 ? animation += ` data-speed=${props.speed}` : false;
        props.repeat != void 0 ? animation += ` data-repeat=${props.repeat}` : false;
        return animation;
      }
    }
    /**
     * 
     */
    cleanValue(prop) {
      return prop != void 0 ? prop : "";
    }
    /**
     * 
     */
    updateClassList() {
      if (this.state.classList) {
        this.classList.add(...this.state.classList);
      }
    }
    /**
     * Add the additional classes sent to the component props
     * 
     * @param {string} defaultClass 
     * @param {string} optionalClasses 
     */
    getClasses(defaultClass = [], optionalClasses) {
      let resultClasses = [];
      if (optionalClasses === void 0) {
        resultClasses = defaultClass;
      } else {
        resultClasses = [...defaultClass, ...optionalClasses];
      }
      let classes = "";
      if (resultClasses.length > 0) {
        classes = `class="${resultClasses.toString().replaceAll(",", " ")}"`;
      }
      return classes;
    }
    /**
     * 
     * @returns {string} The styles needed to add the background image
     */
    getBackground() {
      let style = "";
      if (this.state.backgroundImage?.url != void 0) {
        style = `background-image: url('${this.state.backgroundImage.url}'); background-repeat: no-repeat; background-position: center; background-size: cover;`;
        if (this.state.backgroundImage?.fixed) {
          style = `${style} background-attachment: fixed;`;
        }
      } else {
        style = "";
      }
      return ` style="${style}"`;
    }
    /**
     * Generate caption, title and subtitle of the component
     */
    getTitles() {
      let titles = "";
      if (this.state != void 0) {
        titles = /* HTML */
        `
            <div class="content">    
            ${this.state.caption?.text[this.state.context.lang] != void 0 ? `
            <h2 ${this.getClasses(["subtitle"], this.state.caption?.classList)}  ${this.setAnimation(this.state.caption?.animation)}>${this.state.caption.text[this.state.context.lang]}</h2>` : ""}          
            ${this.state.title?.text[this.state.context.lang] != void 0 ? `
            <h1 ${this.getClasses([], this.state.title?.classList)}  ${this.setAnimation(this.state.title?.animation)}>${this.state.title.text[this.state.context.lang]}</h1>` : ``}
            ${this.state.subtitle?.text[this.state.context.lang] != void 0 ? `
            <h2 ${this.getClasses([], this.state.subtitle?.classList)}  ${this.setAnimation(this.state.subtitle?.animation)}>${this.state.subtitle.text[this.state.context.lang]}</h2>` : ``}
           </div>`;
      }
      return titles;
    }
    handleEvent(event) {
      if (event.type === "click") {
        if (this.state.buttons?.eventName != void 0) {
          this.eventName = this.state.buttons.eventName;
        }
        const clickFunnel = new CustomEvent(this.eventName, {
          detail: { source: event.target.id },
          bubbles: true,
          composed: true
        });
        this.dispatchEvent(clickFunnel);
      }
    }
    /**
     * Generate click events on the component's CTA buttons
     */
    addEvents() {
      let buttons = this.querySelectorAll("button");
      if (buttons.length > 0) {
        buttons.forEach((item) => {
          item.addEventListener("click", this);
        });
      }
    }
    /**
     * Create the CTA buttons of the component from the props sent
     * @param {Object} props 
     */
    #getButtons(props) {
      if (props != void 0) {
        let buttons = "";
        props.forEach((el) => {
          buttons += `<${el.href != void 0 ? "a" : "button"} id="${el.id}" ${this.getClasses(["button"], el.classList)} ${el.href != void 0 ? `href="${el.href}"` : ""}>${el?.text[this.state.context.lang]}</${el.href != void 0 ? "a" : "button"}>`;
        });
        return buttons;
      } else return "";
    }
    /**
     * Generate the CTA button container and insert the buttons described in the props
     * @param {Object} props 
     */
    buttonsRender(props) {
      if (props != void 0) {
        let buttons = (
          /* html */
          `
                <p ${this.getClasses(["buttons", "mt-4"], props.classList)}>
                    ${this.#getButtons(props.buttons)}
                </p>
            `
        );
        return buttons;
      } else return "";
    }
    /**
     * Render the component
     */
    render() {
      console.error("Nothing to render");
    }
    /**
     * Renders the component when inserted into the DOM
     */
    connectedCallback() {
      this.render();
    }
    disconnectedCallback() {
      let buttons = this.querySelectorAll("button");
      if (buttons.length > 0) {
        buttons.forEach((item) => {
          item.removeEventListener("click", this);
        });
      }
    }
  };
  customElements.define("app-element", AppElement);

  // ../../../../node_modules/@customerjourney/cj-core/src/components/AppPage.js
  var AppPage = class extends AppElement {
    #default = {
      events: {
        viewedElement: void 0,
        leavingApp: false,
        leavedApp: false
      },
      classList: []
    };
    /**
     * constructor description
     * @param {Object} data - The properties, animations, events and head of the page & context
     * @param {String} template - The layout of the funnel page components
     */
    constructor(data = {}, template = null) {
      super();
      this.data = data;
      this.template = template;
      try {
        let app = document.querySelector("#app");
        app.innerHTML = "";
        app.appendChild(this);
      } catch (error) {
        console.error('The element with id "app" does not exist to insert the element "app-page".', error);
      }
    }
    /**
     * Disable browser cache
     */
    #noCache() {
      let head = document.getElementsByTagName("head")[0];
      let cacheControl = document.createElement("meta");
      cacheControl.name = "Cache-Control";
      cacheControl.content = "no-cache, no-store, must-revalidate";
      head.appendChild(cacheControl);
      let pragma = document.createElement("meta");
      pragma.name = "Pragma";
      pragma.content = "no-cache";
      head.appendChild(pragma);
      let expires = document.createElement("meta");
      expires.name = "Expires";
      expires.content = "0";
      head.appendChild(expires);
    }
    #setSEO() {
      let props = this.data.props;
      let context = this.data.context;
      let head = document.getElementsByTagName("head")[0];
      if (document.title != void 0) {
        document.title = props.title[context.lang];
        let description = document.querySelector("meta[name=description]");
        if (description === null) {
          let meta = document.createElement("meta");
          meta.name = "description";
          meta.content = props.description[context.lang];
          head.appendChild(meta);
        } else {
          description.content = props.description[context.lang];
        }
        let metaTitle = document.createElement("meta");
        metaTitle.setAttribute("property", "og:title");
        metaTitle.content = props.title[context.lang];
        head.appendChild(metaTitle);
        let metaDescription = document.createElement("meta");
        metaDescription.setAttribute("property", "og:description");
        metaDescription.content = props.description[context.lang];
        head.appendChild(metaDescription);
        let metaType = document.createElement("meta");
        metaType.setAttribute("property", "og:type");
        metaType.content = props.type;
        head.appendChild(metaType);
        let metaImage = document.createElement("meta");
        metaImage.setAttribute("property", "og:image");
        metaImage.content = props.image;
        head.appendChild(metaImage);
        let twitterCard = document.createElement("meta");
        twitterCard.name = "twitter:card";
        twitterCard.content = "summary_large_image";
        head.appendChild(twitterCard);
        let twitterTitle = document.createElement("meta");
        twitterTitle.name = "twitter:title";
        twitterTitle.content = props.title[context.lang];
        head.appendChild(twitterTitle);
        let twitterDescription = document.createElement("meta");
        twitterDescription.name = "twitter:description";
        twitterDescription.content = props.title[context.lang];
        head.appendChild(twitterDescription);
        let twitterImage = document.createElement("meta");
        twitterImage.name = "twitter:image";
        twitterImage.content = props.image;
        head.appendChild(twitterImage);
        let cannonical = document.createElement("link");
        cannonical.setAttribute("rel", "canonical");
        cannonical.setAttribute("href", props.canonical);
        head.appendChild(cannonical);
      }
    }
    /**
     * Add the page body css
     */
    #setStyles() {
      if (this.data.props?.classList?.length > 0) {
        document.body.classList.add(...this.data.props.classList);
      }
    }
    /**
     * 
     * @param {Object} props 
     * @param {Object} context 
     * @returns 
     */
    #setContext(props, context = {}) {
      if (props != void 0) {
        props.context = context;
      }
      return props;
    }
    /**
     * Update the props to each of the components
     */
    loadData() {
      this.data.props = this.initState(this.#default, this.data.props);
      if (this.data.props.id != void 0) {
        this.getAttribute("id") || this.setAttribute("id", this.data.props.id || `component-${Math.floor(Math.random() * 100)}`);
        this.#setSEO();
        this.#setStyles();
        if (this.state.Cache === false) {
          this.#noCache();
        }
        this.data.props.components.forEach((el) => {
          try {
            this.querySelector(`#${el.id}`).updateState(this.#setContext(el, this.data.context));
          } catch (error) {
            console.error(`The Element with id ${el.id} does not exist or is not an object of type AppElement`, error);
          }
        });
        let loading = document.querySelector(".pageloader");
        if (loading != null) {
          loading.classList.remove("is-active");
        }
      }
    }
    /**
     * 
     * @param {String} webhookUrl - The webhook URI
     * @param {Object} data - The parameters that are sent in the JSON body of the webhook
     * @param {Object} [context={}] - The context of the app
     * @param {Boolean} [render=true] - true to render the page, false to just receive the data
     * @returns {Object} - If render is false it returns the body of the webhook response, if render is true it renders the page with the data from the response body.
     * 
     */
    async sendWebhook(webhookUrl, data, context = {}, render3 = true) {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      };
      let loading = document.querySelector(".pageloader");
      if (loading != null) {
        loading.classList.add("is-active");
      }
      try {
        const response = await fetch(webhookUrl, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const responseData = await response.json();
        if (render3 == true) {
          try {
            responseData.context = context;
            this.data = responseData;
            this.loadData();
          } catch (error) {
            console.error('Cannot load data to render "app-page" components', error);
          }
        } else {
          return responseData;
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
    /**
     * Detects if the component has already been viewed
     * @param {HTMLElement} el 
     * @returns { Boolean} - True if the element was viewed in its entirety, false if it is not yet visible
     */
    #isInViewport(el) {
      const rect = el.getBoundingClientRect();
      return rect.top >= 0 && rect.left >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && rect.right <= (window.innerWidth || document.documentElement.clientWidth);
    }
    /**
     * Add the events that the page responds to
     */
    #addEvents() {
      if (Array.isArray(this.data.props.events.trackViewed)) {
        document.addEventListener("scroll", () => {
          this.data.props.events.trackViewed.forEach((id) => {
            var el = this.querySelector(`#${id}`);
            if (this.#isInViewport(el) == true) {
              let viewedElement = new CustomEvent("viewedelement", {
                detail: { viewed: el.id },
                bubbles: true,
                composed: true
              });
              this.dispatchEvent(viewedElement);
            }
          });
        }, {
          passive: true
        });
      }
      if (this.data.props?.events?.leavingapp === true) {
        let leavingApp = new CustomEvent("leavingapp", {
          detail: { source: this.data.props.id },
          bubbles: true,
          composed: true
        });
        document.addEventListener("mouseleave", (e) => {
          if (e.clientY <= 0 || e.clientX <= 0 || (e.clientX >= window.innerWidth || e.clientY >= window.innerHeight)) {
            this.dispatchEvent(leavingApp);
          }
        });
      }
      if (this.data.props?.events?.leavedapp === true) {
        let leavedApp = new CustomEvent("leavedapp", {
          detail: { source: this.data.props.id },
          bubbles: true,
          composed: true
        });
        document.addEventListener("visibilitychange", () => {
          if (document.visibilityState === "hidden") {
            this.dispatchEvent(leavedApp);
          }
        });
      }
    }
    /**
     * Add listeners to each of the events
     * @param {Array} events - List of all events to follow generated within the funnel
     */
    eventsToListen(events, handleEvents) {
      events.forEach((value, index) => {
        this.addEventListener(value, handleEvents);
      });
    }
    /**
     * Fires on connectedCallback to render funnel page
     */
    render() {
      if (this.template === null) {
        console.error("No component template provided");
      } else {
        this.innerHTML = this.template;
        if (this.data.props?.id != void 0) {
          this.loadData(this.data);
          this.#addEvents();
        }
      }
    }
  };
  customElements.define("app-page", AppPage);

  // ../../../../node_modules/@customerjourney/cj-core/src/components/utils.js
  function slugify(input) {
    if (!input)
      return "";
    var slug = input.toLowerCase().trim();
    slug = slug.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    slug = slug.replace(/[^a-z0-9\s-]/g, " ").trim();
    slug = slug.replace(/[\s-]+/g, "%20");
    return slug;
  }

  // ../../../../node_modules/@customerjourney/cj-core/src/components/PageFooter.js
  var PageFooter = class extends AppElement {
    #default = {};
    constructor(props = {}) {
      super();
      this.state = this.initState(this.#default, props);
      this.getAttribute("id") || this.setAttribute("id", this.state.id || `component-${Math.floor(Math.random() * 100)}`);
    }
    render() {
      this.innerHTML = /* html */
      `
        <footer ${this.getClasses(["footer"], this.state.classList)} >
            <div class="content has-text-centered">
                    <img  src="${this.state.context?.theme === "light" ? this.state.brand?.src : this.state.brand?.srcDark === void 0 ? this.state.brand?.src : this.state.brand?.srcDark}" style="max-width:200px">
                <p>${this.state.content?.text[this.state.context.lang]}</p>
                <p><a href="${this.state.privacyPolicy?.url}">${this.state.privacyPolicy?.text === void 0 ? "" : this.state.privacyPolicy?.text[this.state.context.lang]}</a></p>
            </div>
            <div class="has-text-left" >
                <h4>Powered by <a href="https://www.conference.com.mx/comercializacion-digital">Conference</a></h4>
            </div>
        </footer>
        `;
    }
  };
  customElements.define("page-footer", PageFooter);

  // ../../../../node_modules/@fortawesome/fontawesome-svg-core/index.mjs
  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      enumerableOnly && (symbols = symbols.filter(function(sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      })), keys.push.apply(keys, symbols);
    }
    return keys;
  }
  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = null != arguments[i] ? arguments[i] : {};
      i % 2 ? ownKeys(Object(source), true).forEach(function(key) {
        _defineProperty(target, key, source[key]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function(key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
    return target;
  }
  function _typeof(obj) {
    "@babel/helpers - typeof";
    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
      return typeof obj2;
    } : function(obj2) {
      return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    }, _typeof(obj);
  }
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }
  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }
  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }
  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }
  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }
  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }
  function _iterableToArrayLimit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _s, _e;
    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);
        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }
  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
    return arr2;
  }
  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var noop = function noop2() {
  };
  var _WINDOW = {};
  var _DOCUMENT = {};
  var _MUTATION_OBSERVER = null;
  var _PERFORMANCE = {
    mark: noop,
    measure: noop
  };
  try {
    if (typeof window !== "undefined") _WINDOW = window;
    if (typeof document !== "undefined") _DOCUMENT = document;
    if (typeof MutationObserver !== "undefined") _MUTATION_OBSERVER = MutationObserver;
    if (typeof performance !== "undefined") _PERFORMANCE = performance;
  } catch (e) {
  }
  var _ref = _WINDOW.navigator || {};
  var _ref$userAgent = _ref.userAgent;
  var userAgent = _ref$userAgent === void 0 ? "" : _ref$userAgent;
  var WINDOW = _WINDOW;
  var DOCUMENT = _DOCUMENT;
  var MUTATION_OBSERVER = _MUTATION_OBSERVER;
  var PERFORMANCE = _PERFORMANCE;
  var IS_BROWSER = !!WINDOW.document;
  var IS_DOM = !!DOCUMENT.documentElement && !!DOCUMENT.head && typeof DOCUMENT.addEventListener === "function" && typeof DOCUMENT.createElement === "function";
  var IS_IE = ~userAgent.indexOf("MSIE") || ~userAgent.indexOf("Trident/");
  var _familyProxy;
  var _familyProxy2;
  var _familyProxy3;
  var _familyProxy4;
  var _familyProxy5;
  var NAMESPACE_IDENTIFIER = "___FONT_AWESOME___";
  var UNITS_IN_GRID = 16;
  var DEFAULT_CSS_PREFIX = "fa";
  var DEFAULT_REPLACEMENT_CLASS = "svg-inline--fa";
  var DATA_FA_I2SVG = "data-fa-i2svg";
  var DATA_FA_PSEUDO_ELEMENT = "data-fa-pseudo-element";
  var DATA_FA_PSEUDO_ELEMENT_PENDING = "data-fa-pseudo-element-pending";
  var DATA_PREFIX = "data-prefix";
  var DATA_ICON = "data-icon";
  var HTML_CLASS_I2SVG_BASE_CLASS = "fontawesome-i2svg";
  var MUTATION_APPROACH_ASYNC = "async";
  var TAGNAMES_TO_SKIP_FOR_PSEUDOELEMENTS = ["HTML", "HEAD", "STYLE", "SCRIPT"];
  var PRODUCTION = function() {
    try {
      return false;
    } catch (e) {
      return false;
    }
  }();
  var FAMILY_CLASSIC = "classic";
  var FAMILY_SHARP = "sharp";
  var FAMILIES = [FAMILY_CLASSIC, FAMILY_SHARP];
  function familyProxy(obj) {
    return new Proxy(obj, {
      get: function get2(target, prop) {
        return prop in target ? target[prop] : target[FAMILY_CLASSIC];
      }
    });
  }
  var PREFIX_TO_STYLE = familyProxy((_familyProxy = {}, _defineProperty(_familyProxy, FAMILY_CLASSIC, {
    "fa": "solid",
    "fas": "solid",
    "fa-solid": "solid",
    "far": "regular",
    "fa-regular": "regular",
    "fal": "light",
    "fa-light": "light",
    "fat": "thin",
    "fa-thin": "thin",
    "fad": "duotone",
    "fa-duotone": "duotone",
    "fab": "brands",
    "fa-brands": "brands",
    "fak": "kit",
    "fakd": "kit",
    "fa-kit": "kit",
    "fa-kit-duotone": "kit"
  }), _defineProperty(_familyProxy, FAMILY_SHARP, {
    "fa": "solid",
    "fass": "solid",
    "fa-solid": "solid",
    "fasr": "regular",
    "fa-regular": "regular",
    "fasl": "light",
    "fa-light": "light",
    "fast": "thin",
    "fa-thin": "thin"
  }), _familyProxy));
  var STYLE_TO_PREFIX = familyProxy((_familyProxy2 = {}, _defineProperty(_familyProxy2, FAMILY_CLASSIC, {
    solid: "fas",
    regular: "far",
    light: "fal",
    thin: "fat",
    duotone: "fad",
    brands: "fab",
    kit: "fak"
  }), _defineProperty(_familyProxy2, FAMILY_SHARP, {
    solid: "fass",
    regular: "fasr",
    light: "fasl",
    thin: "fast"
  }), _familyProxy2));
  var PREFIX_TO_LONG_STYLE = familyProxy((_familyProxy3 = {}, _defineProperty(_familyProxy3, FAMILY_CLASSIC, {
    fab: "fa-brands",
    fad: "fa-duotone",
    fak: "fa-kit",
    fal: "fa-light",
    far: "fa-regular",
    fas: "fa-solid",
    fat: "fa-thin"
  }), _defineProperty(_familyProxy3, FAMILY_SHARP, {
    fass: "fa-solid",
    fasr: "fa-regular",
    fasl: "fa-light",
    fast: "fa-thin"
  }), _familyProxy3));
  var LONG_STYLE_TO_PREFIX = familyProxy((_familyProxy4 = {}, _defineProperty(_familyProxy4, FAMILY_CLASSIC, {
    "fa-brands": "fab",
    "fa-duotone": "fad",
    "fa-kit": "fak",
    "fa-light": "fal",
    "fa-regular": "far",
    "fa-solid": "fas",
    "fa-thin": "fat"
  }), _defineProperty(_familyProxy4, FAMILY_SHARP, {
    "fa-solid": "fass",
    "fa-regular": "fasr",
    "fa-light": "fasl",
    "fa-thin": "fast"
  }), _familyProxy4));
  var ICON_SELECTION_SYNTAX_PATTERN = /fa(s|r|l|t|d|b|k|ss|sr|sl|st)?[\-\ ]/;
  var LAYERS_TEXT_CLASSNAME = "fa-layers-text";
  var FONT_FAMILY_PATTERN = /Font ?Awesome ?([56 ]*)(Solid|Regular|Light|Thin|Duotone|Brands|Free|Pro|Sharp|Kit)?.*/i;
  var FONT_WEIGHT_TO_PREFIX = familyProxy((_familyProxy5 = {}, _defineProperty(_familyProxy5, FAMILY_CLASSIC, {
    900: "fas",
    400: "far",
    normal: "far",
    300: "fal",
    100: "fat"
  }), _defineProperty(_familyProxy5, FAMILY_SHARP, {
    900: "fass",
    400: "fasr",
    300: "fasl",
    100: "fast"
  }), _familyProxy5));
  var oneToTen = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  var oneToTwenty = oneToTen.concat([11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);
  var ATTRIBUTES_WATCHED_FOR_MUTATION = ["class", "data-prefix", "data-icon", "data-fa-transform", "data-fa-mask"];
  var DUOTONE_CLASSES = {
    GROUP: "duotone-group",
    SWAP_OPACITY: "swap-opacity",
    PRIMARY: "primary",
    SECONDARY: "secondary"
  };
  var prefixes = /* @__PURE__ */ new Set();
  Object.keys(STYLE_TO_PREFIX[FAMILY_CLASSIC]).map(prefixes.add.bind(prefixes));
  Object.keys(STYLE_TO_PREFIX[FAMILY_SHARP]).map(prefixes.add.bind(prefixes));
  var RESERVED_CLASSES = [].concat(FAMILIES, _toConsumableArray(prefixes), ["2xs", "xs", "sm", "lg", "xl", "2xl", "beat", "border", "fade", "beat-fade", "bounce", "flip-both", "flip-horizontal", "flip-vertical", "flip", "fw", "inverse", "layers-counter", "layers-text", "layers", "li", "pull-left", "pull-right", "pulse", "rotate-180", "rotate-270", "rotate-90", "rotate-by", "shake", "spin-pulse", "spin-reverse", "spin", "stack-1x", "stack-2x", "stack", "ul", DUOTONE_CLASSES.GROUP, DUOTONE_CLASSES.SWAP_OPACITY, DUOTONE_CLASSES.PRIMARY, DUOTONE_CLASSES.SECONDARY]).concat(oneToTen.map(function(n) {
    return "".concat(n, "x");
  })).concat(oneToTwenty.map(function(n) {
    return "w-".concat(n);
  }));
  var initial = WINDOW.FontAwesomeConfig || {};
  function getAttrConfig(attr) {
    var element = DOCUMENT.querySelector("script[" + attr + "]");
    if (element) {
      return element.getAttribute(attr);
    }
  }
  function coerce(val) {
    if (val === "") return true;
    if (val === "false") return false;
    if (val === "true") return true;
    return val;
  }
  if (DOCUMENT && typeof DOCUMENT.querySelector === "function") {
    attrs = [["data-family-prefix", "familyPrefix"], ["data-css-prefix", "cssPrefix"], ["data-family-default", "familyDefault"], ["data-style-default", "styleDefault"], ["data-replacement-class", "replacementClass"], ["data-auto-replace-svg", "autoReplaceSvg"], ["data-auto-add-css", "autoAddCss"], ["data-auto-a11y", "autoA11y"], ["data-search-pseudo-elements", "searchPseudoElements"], ["data-observe-mutations", "observeMutations"], ["data-mutate-approach", "mutateApproach"], ["data-keep-original-source", "keepOriginalSource"], ["data-measure-performance", "measurePerformance"], ["data-show-missing-icons", "showMissingIcons"]];
    attrs.forEach(function(_ref2) {
      var _ref22 = _slicedToArray(_ref2, 2), attr = _ref22[0], key = _ref22[1];
      var val = coerce(getAttrConfig(attr));
      if (val !== void 0 && val !== null) {
        initial[key] = val;
      }
    });
  }
  var attrs;
  var _default = {
    styleDefault: "solid",
    familyDefault: "classic",
    cssPrefix: DEFAULT_CSS_PREFIX,
    replacementClass: DEFAULT_REPLACEMENT_CLASS,
    autoReplaceSvg: true,
    autoAddCss: true,
    autoA11y: true,
    searchPseudoElements: false,
    observeMutations: true,
    mutateApproach: "async",
    keepOriginalSource: true,
    measurePerformance: false,
    showMissingIcons: true
  };
  if (initial.familyPrefix) {
    initial.cssPrefix = initial.familyPrefix;
  }
  var _config = _objectSpread2(_objectSpread2({}, _default), initial);
  if (!_config.autoReplaceSvg) _config.observeMutations = false;
  var config = {};
  Object.keys(_default).forEach(function(key) {
    Object.defineProperty(config, key, {
      enumerable: true,
      set: function set2(val) {
        _config[key] = val;
        _onChangeCb.forEach(function(cb) {
          return cb(config);
        });
      },
      get: function get2() {
        return _config[key];
      }
    });
  });
  Object.defineProperty(config, "familyPrefix", {
    enumerable: true,
    set: function set(val) {
      _config.cssPrefix = val;
      _onChangeCb.forEach(function(cb) {
        return cb(config);
      });
    },
    get: function get() {
      return _config.cssPrefix;
    }
  });
  WINDOW.FontAwesomeConfig = config;
  var _onChangeCb = [];
  function onChange(cb) {
    _onChangeCb.push(cb);
    return function() {
      _onChangeCb.splice(_onChangeCb.indexOf(cb), 1);
    };
  }
  var d = UNITS_IN_GRID;
  var meaninglessTransform = {
    size: 16,
    x: 0,
    y: 0,
    rotate: 0,
    flipX: false,
    flipY: false
  };
  function insertCss(css2) {
    if (!css2 || !IS_DOM) {
      return;
    }
    var style = DOCUMENT.createElement("style");
    style.setAttribute("type", "text/css");
    style.innerHTML = css2;
    var headChildren = DOCUMENT.head.childNodes;
    var beforeChild = null;
    for (var i = headChildren.length - 1; i > -1; i--) {
      var child = headChildren[i];
      var tagName = (child.tagName || "").toUpperCase();
      if (["STYLE", "LINK"].indexOf(tagName) > -1) {
        beforeChild = child;
      }
    }
    DOCUMENT.head.insertBefore(style, beforeChild);
    return css2;
  }
  var idPool = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  function nextUniqueId() {
    var size = 12;
    var id = "";
    while (size-- > 0) {
      id += idPool[Math.random() * 62 | 0];
    }
    return id;
  }
  function toArray(obj) {
    var array = [];
    for (var i = (obj || []).length >>> 0; i--; ) {
      array[i] = obj[i];
    }
    return array;
  }
  function classArray(node) {
    if (node.classList) {
      return toArray(node.classList);
    } else {
      return (node.getAttribute("class") || "").split(" ").filter(function(i) {
        return i;
      });
    }
  }
  function htmlEscape(str) {
    return "".concat(str).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
  function joinAttributes(attributes) {
    return Object.keys(attributes || {}).reduce(function(acc, attributeName) {
      return acc + "".concat(attributeName, '="').concat(htmlEscape(attributes[attributeName]), '" ');
    }, "").trim();
  }
  function joinStyles(styles2) {
    return Object.keys(styles2 || {}).reduce(function(acc, styleName) {
      return acc + "".concat(styleName, ": ").concat(styles2[styleName].trim(), ";");
    }, "");
  }
  function transformIsMeaningful(transform) {
    return transform.size !== meaninglessTransform.size || transform.x !== meaninglessTransform.x || transform.y !== meaninglessTransform.y || transform.rotate !== meaninglessTransform.rotate || transform.flipX || transform.flipY;
  }
  function transformForSvg(_ref2) {
    var transform = _ref2.transform, containerWidth = _ref2.containerWidth, iconWidth = _ref2.iconWidth;
    var outer = {
      transform: "translate(".concat(containerWidth / 2, " 256)")
    };
    var innerTranslate = "translate(".concat(transform.x * 32, ", ").concat(transform.y * 32, ") ");
    var innerScale = "scale(".concat(transform.size / 16 * (transform.flipX ? -1 : 1), ", ").concat(transform.size / 16 * (transform.flipY ? -1 : 1), ") ");
    var innerRotate = "rotate(".concat(transform.rotate, " 0 0)");
    var inner = {
      transform: "".concat(innerTranslate, " ").concat(innerScale, " ").concat(innerRotate)
    };
    var path = {
      transform: "translate(".concat(iconWidth / 2 * -1, " -256)")
    };
    return {
      outer,
      inner,
      path
    };
  }
  function transformForCss(_ref2) {
    var transform = _ref2.transform, _ref2$width = _ref2.width, width = _ref2$width === void 0 ? UNITS_IN_GRID : _ref2$width, _ref2$height = _ref2.height, height = _ref2$height === void 0 ? UNITS_IN_GRID : _ref2$height, _ref2$startCentered = _ref2.startCentered, startCentered = _ref2$startCentered === void 0 ? false : _ref2$startCentered;
    var val = "";
    if (startCentered && IS_IE) {
      val += "translate(".concat(transform.x / d - width / 2, "em, ").concat(transform.y / d - height / 2, "em) ");
    } else if (startCentered) {
      val += "translate(calc(-50% + ".concat(transform.x / d, "em), calc(-50% + ").concat(transform.y / d, "em)) ");
    } else {
      val += "translate(".concat(transform.x / d, "em, ").concat(transform.y / d, "em) ");
    }
    val += "scale(".concat(transform.size / d * (transform.flipX ? -1 : 1), ", ").concat(transform.size / d * (transform.flipY ? -1 : 1), ") ");
    val += "rotate(".concat(transform.rotate, "deg) ");
    return val;
  }
  var baseStyles = ':root, :host {\n  --fa-font-solid: normal 900 1em/1 "Font Awesome 6 Solid";\n  --fa-font-regular: normal 400 1em/1 "Font Awesome 6 Regular";\n  --fa-font-light: normal 300 1em/1 "Font Awesome 6 Light";\n  --fa-font-thin: normal 100 1em/1 "Font Awesome 6 Thin";\n  --fa-font-duotone: normal 900 1em/1 "Font Awesome 6 Duotone";\n  --fa-font-sharp-solid: normal 900 1em/1 "Font Awesome 6 Sharp";\n  --fa-font-sharp-regular: normal 400 1em/1 "Font Awesome 6 Sharp";\n  --fa-font-sharp-light: normal 300 1em/1 "Font Awesome 6 Sharp";\n  --fa-font-sharp-thin: normal 100 1em/1 "Font Awesome 6 Sharp";\n  --fa-font-brands: normal 400 1em/1 "Font Awesome 6 Brands";\n}\n\nsvg:not(:root).svg-inline--fa, svg:not(:host).svg-inline--fa {\n  overflow: visible;\n  box-sizing: content-box;\n}\n\n.svg-inline--fa {\n  display: var(--fa-display, inline-block);\n  height: 1em;\n  overflow: visible;\n  vertical-align: -0.125em;\n}\n.svg-inline--fa.fa-2xs {\n  vertical-align: 0.1em;\n}\n.svg-inline--fa.fa-xs {\n  vertical-align: 0em;\n}\n.svg-inline--fa.fa-sm {\n  vertical-align: -0.0714285705em;\n}\n.svg-inline--fa.fa-lg {\n  vertical-align: -0.2em;\n}\n.svg-inline--fa.fa-xl {\n  vertical-align: -0.25em;\n}\n.svg-inline--fa.fa-2xl {\n  vertical-align: -0.3125em;\n}\n.svg-inline--fa.fa-pull-left {\n  margin-right: var(--fa-pull-margin, 0.3em);\n  width: auto;\n}\n.svg-inline--fa.fa-pull-right {\n  margin-left: var(--fa-pull-margin, 0.3em);\n  width: auto;\n}\n.svg-inline--fa.fa-li {\n  width: var(--fa-li-width, 2em);\n  top: 0.25em;\n}\n.svg-inline--fa.fa-fw {\n  width: var(--fa-fw-width, 1.25em);\n}\n\n.fa-layers svg.svg-inline--fa {\n  bottom: 0;\n  left: 0;\n  margin: auto;\n  position: absolute;\n  right: 0;\n  top: 0;\n}\n\n.fa-layers-counter, .fa-layers-text {\n  display: inline-block;\n  position: absolute;\n  text-align: center;\n}\n\n.fa-layers {\n  display: inline-block;\n  height: 1em;\n  position: relative;\n  text-align: center;\n  vertical-align: -0.125em;\n  width: 1em;\n}\n.fa-layers svg.svg-inline--fa {\n  -webkit-transform-origin: center center;\n          transform-origin: center center;\n}\n\n.fa-layers-text {\n  left: 50%;\n  top: 50%;\n  -webkit-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%);\n  -webkit-transform-origin: center center;\n          transform-origin: center center;\n}\n\n.fa-layers-counter {\n  background-color: var(--fa-counter-background-color, #ff253a);\n  border-radius: var(--fa-counter-border-radius, 1em);\n  box-sizing: border-box;\n  color: var(--fa-inverse, #fff);\n  line-height: var(--fa-counter-line-height, 1);\n  max-width: var(--fa-counter-max-width, 5em);\n  min-width: var(--fa-counter-min-width, 1.5em);\n  overflow: hidden;\n  padding: var(--fa-counter-padding, 0.25em 0.5em);\n  right: var(--fa-right, 0);\n  text-overflow: ellipsis;\n  top: var(--fa-top, 0);\n  -webkit-transform: scale(var(--fa-counter-scale, 0.25));\n          transform: scale(var(--fa-counter-scale, 0.25));\n  -webkit-transform-origin: top right;\n          transform-origin: top right;\n}\n\n.fa-layers-bottom-right {\n  bottom: var(--fa-bottom, 0);\n  right: var(--fa-right, 0);\n  top: auto;\n  -webkit-transform: scale(var(--fa-layers-scale, 0.25));\n          transform: scale(var(--fa-layers-scale, 0.25));\n  -webkit-transform-origin: bottom right;\n          transform-origin: bottom right;\n}\n\n.fa-layers-bottom-left {\n  bottom: var(--fa-bottom, 0);\n  left: var(--fa-left, 0);\n  right: auto;\n  top: auto;\n  -webkit-transform: scale(var(--fa-layers-scale, 0.25));\n          transform: scale(var(--fa-layers-scale, 0.25));\n  -webkit-transform-origin: bottom left;\n          transform-origin: bottom left;\n}\n\n.fa-layers-top-right {\n  top: var(--fa-top, 0);\n  right: var(--fa-right, 0);\n  -webkit-transform: scale(var(--fa-layers-scale, 0.25));\n          transform: scale(var(--fa-layers-scale, 0.25));\n  -webkit-transform-origin: top right;\n          transform-origin: top right;\n}\n\n.fa-layers-top-left {\n  left: var(--fa-left, 0);\n  right: auto;\n  top: var(--fa-top, 0);\n  -webkit-transform: scale(var(--fa-layers-scale, 0.25));\n          transform: scale(var(--fa-layers-scale, 0.25));\n  -webkit-transform-origin: top left;\n          transform-origin: top left;\n}\n\n.fa-1x {\n  font-size: 1em;\n}\n\n.fa-2x {\n  font-size: 2em;\n}\n\n.fa-3x {\n  font-size: 3em;\n}\n\n.fa-4x {\n  font-size: 4em;\n}\n\n.fa-5x {\n  font-size: 5em;\n}\n\n.fa-6x {\n  font-size: 6em;\n}\n\n.fa-7x {\n  font-size: 7em;\n}\n\n.fa-8x {\n  font-size: 8em;\n}\n\n.fa-9x {\n  font-size: 9em;\n}\n\n.fa-10x {\n  font-size: 10em;\n}\n\n.fa-2xs {\n  font-size: 0.625em;\n  line-height: 0.1em;\n  vertical-align: 0.225em;\n}\n\n.fa-xs {\n  font-size: 0.75em;\n  line-height: 0.0833333337em;\n  vertical-align: 0.125em;\n}\n\n.fa-sm {\n  font-size: 0.875em;\n  line-height: 0.0714285718em;\n  vertical-align: 0.0535714295em;\n}\n\n.fa-lg {\n  font-size: 1.25em;\n  line-height: 0.05em;\n  vertical-align: -0.075em;\n}\n\n.fa-xl {\n  font-size: 1.5em;\n  line-height: 0.0416666682em;\n  vertical-align: -0.125em;\n}\n\n.fa-2xl {\n  font-size: 2em;\n  line-height: 0.03125em;\n  vertical-align: -0.1875em;\n}\n\n.fa-fw {\n  text-align: center;\n  width: 1.25em;\n}\n\n.fa-ul {\n  list-style-type: none;\n  margin-left: var(--fa-li-margin, 2.5em);\n  padding-left: 0;\n}\n.fa-ul > li {\n  position: relative;\n}\n\n.fa-li {\n  left: calc(var(--fa-li-width, 2em) * -1);\n  position: absolute;\n  text-align: center;\n  width: var(--fa-li-width, 2em);\n  line-height: inherit;\n}\n\n.fa-border {\n  border-color: var(--fa-border-color, #eee);\n  border-radius: var(--fa-border-radius, 0.1em);\n  border-style: var(--fa-border-style, solid);\n  border-width: var(--fa-border-width, 0.08em);\n  padding: var(--fa-border-padding, 0.2em 0.25em 0.15em);\n}\n\n.fa-pull-left {\n  float: left;\n  margin-right: var(--fa-pull-margin, 0.3em);\n}\n\n.fa-pull-right {\n  float: right;\n  margin-left: var(--fa-pull-margin, 0.3em);\n}\n\n.fa-beat {\n  -webkit-animation-name: fa-beat;\n          animation-name: fa-beat;\n  -webkit-animation-delay: var(--fa-animation-delay, 0s);\n          animation-delay: var(--fa-animation-delay, 0s);\n  -webkit-animation-direction: var(--fa-animation-direction, normal);\n          animation-direction: var(--fa-animation-direction, normal);\n  -webkit-animation-duration: var(--fa-animation-duration, 1s);\n          animation-duration: var(--fa-animation-duration, 1s);\n  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n          animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  -webkit-animation-timing-function: var(--fa-animation-timing, ease-in-out);\n          animation-timing-function: var(--fa-animation-timing, ease-in-out);\n}\n\n.fa-bounce {\n  -webkit-animation-name: fa-bounce;\n          animation-name: fa-bounce;\n  -webkit-animation-delay: var(--fa-animation-delay, 0s);\n          animation-delay: var(--fa-animation-delay, 0s);\n  -webkit-animation-direction: var(--fa-animation-direction, normal);\n          animation-direction: var(--fa-animation-direction, normal);\n  -webkit-animation-duration: var(--fa-animation-duration, 1s);\n          animation-duration: var(--fa-animation-duration, 1s);\n  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n          animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  -webkit-animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.28, 0.84, 0.42, 1));\n          animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.28, 0.84, 0.42, 1));\n}\n\n.fa-fade {\n  -webkit-animation-name: fa-fade;\n          animation-name: fa-fade;\n  -webkit-animation-delay: var(--fa-animation-delay, 0s);\n          animation-delay: var(--fa-animation-delay, 0s);\n  -webkit-animation-direction: var(--fa-animation-direction, normal);\n          animation-direction: var(--fa-animation-direction, normal);\n  -webkit-animation-duration: var(--fa-animation-duration, 1s);\n          animation-duration: var(--fa-animation-duration, 1s);\n  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n          animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  -webkit-animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));\n          animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));\n}\n\n.fa-beat-fade {\n  -webkit-animation-name: fa-beat-fade;\n          animation-name: fa-beat-fade;\n  -webkit-animation-delay: var(--fa-animation-delay, 0s);\n          animation-delay: var(--fa-animation-delay, 0s);\n  -webkit-animation-direction: var(--fa-animation-direction, normal);\n          animation-direction: var(--fa-animation-direction, normal);\n  -webkit-animation-duration: var(--fa-animation-duration, 1s);\n          animation-duration: var(--fa-animation-duration, 1s);\n  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n          animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  -webkit-animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));\n          animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));\n}\n\n.fa-flip {\n  -webkit-animation-name: fa-flip;\n          animation-name: fa-flip;\n  -webkit-animation-delay: var(--fa-animation-delay, 0s);\n          animation-delay: var(--fa-animation-delay, 0s);\n  -webkit-animation-direction: var(--fa-animation-direction, normal);\n          animation-direction: var(--fa-animation-direction, normal);\n  -webkit-animation-duration: var(--fa-animation-duration, 1s);\n          animation-duration: var(--fa-animation-duration, 1s);\n  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n          animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  -webkit-animation-timing-function: var(--fa-animation-timing, ease-in-out);\n          animation-timing-function: var(--fa-animation-timing, ease-in-out);\n}\n\n.fa-shake {\n  -webkit-animation-name: fa-shake;\n          animation-name: fa-shake;\n  -webkit-animation-delay: var(--fa-animation-delay, 0s);\n          animation-delay: var(--fa-animation-delay, 0s);\n  -webkit-animation-direction: var(--fa-animation-direction, normal);\n          animation-direction: var(--fa-animation-direction, normal);\n  -webkit-animation-duration: var(--fa-animation-duration, 1s);\n          animation-duration: var(--fa-animation-duration, 1s);\n  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n          animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  -webkit-animation-timing-function: var(--fa-animation-timing, linear);\n          animation-timing-function: var(--fa-animation-timing, linear);\n}\n\n.fa-spin {\n  -webkit-animation-name: fa-spin;\n          animation-name: fa-spin;\n  -webkit-animation-delay: var(--fa-animation-delay, 0s);\n          animation-delay: var(--fa-animation-delay, 0s);\n  -webkit-animation-direction: var(--fa-animation-direction, normal);\n          animation-direction: var(--fa-animation-direction, normal);\n  -webkit-animation-duration: var(--fa-animation-duration, 2s);\n          animation-duration: var(--fa-animation-duration, 2s);\n  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n          animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  -webkit-animation-timing-function: var(--fa-animation-timing, linear);\n          animation-timing-function: var(--fa-animation-timing, linear);\n}\n\n.fa-spin-reverse {\n  --fa-animation-direction: reverse;\n}\n\n.fa-pulse,\n.fa-spin-pulse {\n  -webkit-animation-name: fa-spin;\n          animation-name: fa-spin;\n  -webkit-animation-direction: var(--fa-animation-direction, normal);\n          animation-direction: var(--fa-animation-direction, normal);\n  -webkit-animation-duration: var(--fa-animation-duration, 1s);\n          animation-duration: var(--fa-animation-duration, 1s);\n  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n          animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  -webkit-animation-timing-function: var(--fa-animation-timing, steps(8));\n          animation-timing-function: var(--fa-animation-timing, steps(8));\n}\n\n@media (prefers-reduced-motion: reduce) {\n  .fa-beat,\n.fa-bounce,\n.fa-fade,\n.fa-beat-fade,\n.fa-flip,\n.fa-pulse,\n.fa-shake,\n.fa-spin,\n.fa-spin-pulse {\n    -webkit-animation-delay: -1ms;\n            animation-delay: -1ms;\n    -webkit-animation-duration: 1ms;\n            animation-duration: 1ms;\n    -webkit-animation-iteration-count: 1;\n            animation-iteration-count: 1;\n    -webkit-transition-delay: 0s;\n            transition-delay: 0s;\n    -webkit-transition-duration: 0s;\n            transition-duration: 0s;\n  }\n}\n@-webkit-keyframes fa-beat {\n  0%, 90% {\n    -webkit-transform: scale(1);\n            transform: scale(1);\n  }\n  45% {\n    -webkit-transform: scale(var(--fa-beat-scale, 1.25));\n            transform: scale(var(--fa-beat-scale, 1.25));\n  }\n}\n@keyframes fa-beat {\n  0%, 90% {\n    -webkit-transform: scale(1);\n            transform: scale(1);\n  }\n  45% {\n    -webkit-transform: scale(var(--fa-beat-scale, 1.25));\n            transform: scale(var(--fa-beat-scale, 1.25));\n  }\n}\n@-webkit-keyframes fa-bounce {\n  0% {\n    -webkit-transform: scale(1, 1) translateY(0);\n            transform: scale(1, 1) translateY(0);\n  }\n  10% {\n    -webkit-transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);\n            transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);\n  }\n  30% {\n    -webkit-transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));\n            transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));\n  }\n  50% {\n    -webkit-transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);\n            transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);\n  }\n  57% {\n    -webkit-transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));\n            transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));\n  }\n  64% {\n    -webkit-transform: scale(1, 1) translateY(0);\n            transform: scale(1, 1) translateY(0);\n  }\n  100% {\n    -webkit-transform: scale(1, 1) translateY(0);\n            transform: scale(1, 1) translateY(0);\n  }\n}\n@keyframes fa-bounce {\n  0% {\n    -webkit-transform: scale(1, 1) translateY(0);\n            transform: scale(1, 1) translateY(0);\n  }\n  10% {\n    -webkit-transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);\n            transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);\n  }\n  30% {\n    -webkit-transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));\n            transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));\n  }\n  50% {\n    -webkit-transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);\n            transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);\n  }\n  57% {\n    -webkit-transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));\n            transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));\n  }\n  64% {\n    -webkit-transform: scale(1, 1) translateY(0);\n            transform: scale(1, 1) translateY(0);\n  }\n  100% {\n    -webkit-transform: scale(1, 1) translateY(0);\n            transform: scale(1, 1) translateY(0);\n  }\n}\n@-webkit-keyframes fa-fade {\n  50% {\n    opacity: var(--fa-fade-opacity, 0.4);\n  }\n}\n@keyframes fa-fade {\n  50% {\n    opacity: var(--fa-fade-opacity, 0.4);\n  }\n}\n@-webkit-keyframes fa-beat-fade {\n  0%, 100% {\n    opacity: var(--fa-beat-fade-opacity, 0.4);\n    -webkit-transform: scale(1);\n            transform: scale(1);\n  }\n  50% {\n    opacity: 1;\n    -webkit-transform: scale(var(--fa-beat-fade-scale, 1.125));\n            transform: scale(var(--fa-beat-fade-scale, 1.125));\n  }\n}\n@keyframes fa-beat-fade {\n  0%, 100% {\n    opacity: var(--fa-beat-fade-opacity, 0.4);\n    -webkit-transform: scale(1);\n            transform: scale(1);\n  }\n  50% {\n    opacity: 1;\n    -webkit-transform: scale(var(--fa-beat-fade-scale, 1.125));\n            transform: scale(var(--fa-beat-fade-scale, 1.125));\n  }\n}\n@-webkit-keyframes fa-flip {\n  50% {\n    -webkit-transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));\n            transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));\n  }\n}\n@keyframes fa-flip {\n  50% {\n    -webkit-transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));\n            transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));\n  }\n}\n@-webkit-keyframes fa-shake {\n  0% {\n    -webkit-transform: rotate(-15deg);\n            transform: rotate(-15deg);\n  }\n  4% {\n    -webkit-transform: rotate(15deg);\n            transform: rotate(15deg);\n  }\n  8%, 24% {\n    -webkit-transform: rotate(-18deg);\n            transform: rotate(-18deg);\n  }\n  12%, 28% {\n    -webkit-transform: rotate(18deg);\n            transform: rotate(18deg);\n  }\n  16% {\n    -webkit-transform: rotate(-22deg);\n            transform: rotate(-22deg);\n  }\n  20% {\n    -webkit-transform: rotate(22deg);\n            transform: rotate(22deg);\n  }\n  32% {\n    -webkit-transform: rotate(-12deg);\n            transform: rotate(-12deg);\n  }\n  36% {\n    -webkit-transform: rotate(12deg);\n            transform: rotate(12deg);\n  }\n  40%, 100% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg);\n  }\n}\n@keyframes fa-shake {\n  0% {\n    -webkit-transform: rotate(-15deg);\n            transform: rotate(-15deg);\n  }\n  4% {\n    -webkit-transform: rotate(15deg);\n            transform: rotate(15deg);\n  }\n  8%, 24% {\n    -webkit-transform: rotate(-18deg);\n            transform: rotate(-18deg);\n  }\n  12%, 28% {\n    -webkit-transform: rotate(18deg);\n            transform: rotate(18deg);\n  }\n  16% {\n    -webkit-transform: rotate(-22deg);\n            transform: rotate(-22deg);\n  }\n  20% {\n    -webkit-transform: rotate(22deg);\n            transform: rotate(22deg);\n  }\n  32% {\n    -webkit-transform: rotate(-12deg);\n            transform: rotate(-12deg);\n  }\n  36% {\n    -webkit-transform: rotate(12deg);\n            transform: rotate(12deg);\n  }\n  40%, 100% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg);\n  }\n}\n@-webkit-keyframes fa-spin {\n  0% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg);\n  }\n  100% {\n    -webkit-transform: rotate(360deg);\n            transform: rotate(360deg);\n  }\n}\n@keyframes fa-spin {\n  0% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg);\n  }\n  100% {\n    -webkit-transform: rotate(360deg);\n            transform: rotate(360deg);\n  }\n}\n.fa-rotate-90 {\n  -webkit-transform: rotate(90deg);\n          transform: rotate(90deg);\n}\n\n.fa-rotate-180 {\n  -webkit-transform: rotate(180deg);\n          transform: rotate(180deg);\n}\n\n.fa-rotate-270 {\n  -webkit-transform: rotate(270deg);\n          transform: rotate(270deg);\n}\n\n.fa-flip-horizontal {\n  -webkit-transform: scale(-1, 1);\n          transform: scale(-1, 1);\n}\n\n.fa-flip-vertical {\n  -webkit-transform: scale(1, -1);\n          transform: scale(1, -1);\n}\n\n.fa-flip-both,\n.fa-flip-horizontal.fa-flip-vertical {\n  -webkit-transform: scale(-1, -1);\n          transform: scale(-1, -1);\n}\n\n.fa-rotate-by {\n  -webkit-transform: rotate(var(--fa-rotate-angle, 0));\n          transform: rotate(var(--fa-rotate-angle, 0));\n}\n\n.fa-stack {\n  display: inline-block;\n  vertical-align: middle;\n  height: 2em;\n  position: relative;\n  width: 2.5em;\n}\n\n.fa-stack-1x,\n.fa-stack-2x {\n  bottom: 0;\n  left: 0;\n  margin: auto;\n  position: absolute;\n  right: 0;\n  top: 0;\n  z-index: var(--fa-stack-z-index, auto);\n}\n\n.svg-inline--fa.fa-stack-1x {\n  height: 1em;\n  width: 1.25em;\n}\n.svg-inline--fa.fa-stack-2x {\n  height: 2em;\n  width: 2.5em;\n}\n\n.fa-inverse {\n  color: var(--fa-inverse, #fff);\n}\n\n.sr-only,\n.fa-sr-only {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  padding: 0;\n  margin: -1px;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  white-space: nowrap;\n  border-width: 0;\n}\n\n.sr-only-focusable:not(:focus),\n.fa-sr-only-focusable:not(:focus) {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  padding: 0;\n  margin: -1px;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  white-space: nowrap;\n  border-width: 0;\n}\n\n.svg-inline--fa .fa-primary {\n  fill: var(--fa-primary-color, currentColor);\n  opacity: var(--fa-primary-opacity, 1);\n}\n\n.svg-inline--fa .fa-secondary {\n  fill: var(--fa-secondary-color, currentColor);\n  opacity: var(--fa-secondary-opacity, 0.4);\n}\n\n.svg-inline--fa.fa-swap-opacity .fa-primary {\n  opacity: var(--fa-secondary-opacity, 0.4);\n}\n\n.svg-inline--fa.fa-swap-opacity .fa-secondary {\n  opacity: var(--fa-primary-opacity, 1);\n}\n\n.svg-inline--fa mask .fa-primary,\n.svg-inline--fa mask .fa-secondary {\n  fill: black;\n}\n\n.fad.fa-inverse,\n.fa-duotone.fa-inverse {\n  color: var(--fa-inverse, #fff);\n}';
  function css() {
    var dcp = DEFAULT_CSS_PREFIX;
    var drc = DEFAULT_REPLACEMENT_CLASS;
    var fp = config.cssPrefix;
    var rc = config.replacementClass;
    var s = baseStyles;
    if (fp !== dcp || rc !== drc) {
      var dPatt = new RegExp("\\.".concat(dcp, "\\-"), "g");
      var customPropPatt = new RegExp("\\--".concat(dcp, "\\-"), "g");
      var rPatt = new RegExp("\\.".concat(drc), "g");
      s = s.replace(dPatt, ".".concat(fp, "-")).replace(customPropPatt, "--".concat(fp, "-")).replace(rPatt, ".".concat(rc));
    }
    return s;
  }
  var _cssInserted = false;
  function ensureCss() {
    if (config.autoAddCss && !_cssInserted) {
      insertCss(css());
      _cssInserted = true;
    }
  }
  var InjectCSS = {
    mixout: function mixout() {
      return {
        dom: {
          css,
          insertCss: ensureCss
        }
      };
    },
    hooks: function hooks() {
      return {
        beforeDOMElementCreation: function beforeDOMElementCreation() {
          ensureCss();
        },
        beforeI2svg: function beforeI2svg() {
          ensureCss();
        }
      };
    }
  };
  var w = WINDOW || {};
  if (!w[NAMESPACE_IDENTIFIER]) w[NAMESPACE_IDENTIFIER] = {};
  if (!w[NAMESPACE_IDENTIFIER].styles) w[NAMESPACE_IDENTIFIER].styles = {};
  if (!w[NAMESPACE_IDENTIFIER].hooks) w[NAMESPACE_IDENTIFIER].hooks = {};
  if (!w[NAMESPACE_IDENTIFIER].shims) w[NAMESPACE_IDENTIFIER].shims = [];
  var namespace = w[NAMESPACE_IDENTIFIER];
  var functions = [];
  var listener = function listener2() {
    DOCUMENT.removeEventListener("DOMContentLoaded", listener2);
    loaded = 1;
    functions.map(function(fn) {
      return fn();
    });
  };
  var loaded = false;
  if (IS_DOM) {
    loaded = (DOCUMENT.documentElement.doScroll ? /^loaded|^c/ : /^loaded|^i|^c/).test(DOCUMENT.readyState);
    if (!loaded) DOCUMENT.addEventListener("DOMContentLoaded", listener);
  }
  function domready(fn) {
    if (!IS_DOM) return;
    loaded ? setTimeout(fn, 0) : functions.push(fn);
  }
  function toHtml(abstractNodes) {
    var tag = abstractNodes.tag, _abstractNodes$attrib = abstractNodes.attributes, attributes = _abstractNodes$attrib === void 0 ? {} : _abstractNodes$attrib, _abstractNodes$childr = abstractNodes.children, children = _abstractNodes$childr === void 0 ? [] : _abstractNodes$childr;
    if (typeof abstractNodes === "string") {
      return htmlEscape(abstractNodes);
    } else {
      return "<".concat(tag, " ").concat(joinAttributes(attributes), ">").concat(children.map(toHtml).join(""), "</").concat(tag, ">");
    }
  }
  function iconFromMapping(mapping, prefix, iconName) {
    if (mapping && mapping[prefix] && mapping[prefix][iconName]) {
      return {
        prefix,
        iconName,
        icon: mapping[prefix][iconName]
      };
    }
  }
  var bindInternal4 = function bindInternal42(func, thisContext) {
    return function(a, b, c, d2) {
      return func.call(thisContext, a, b, c, d2);
    };
  };
  var reduce = function fastReduceObject(subject, fn, initialValue, thisContext) {
    var keys = Object.keys(subject), length = keys.length, iterator = thisContext !== void 0 ? bindInternal4(fn, thisContext) : fn, i, key, result;
    if (initialValue === void 0) {
      i = 1;
      result = subject[keys[0]];
    } else {
      i = 0;
      result = initialValue;
    }
    for (; i < length; i++) {
      key = keys[i];
      result = iterator(result, subject[key], key, subject);
    }
    return result;
  };
  function ucs2decode(string) {
    var output = [];
    var counter2 = 0;
    var length = string.length;
    while (counter2 < length) {
      var value = string.charCodeAt(counter2++);
      if (value >= 55296 && value <= 56319 && counter2 < length) {
        var extra = string.charCodeAt(counter2++);
        if ((extra & 64512) == 56320) {
          output.push(((value & 1023) << 10) + (extra & 1023) + 65536);
        } else {
          output.push(value);
          counter2--;
        }
      } else {
        output.push(value);
      }
    }
    return output;
  }
  function toHex(unicode) {
    var decoded = ucs2decode(unicode);
    return decoded.length === 1 ? decoded[0].toString(16) : null;
  }
  function codePointAt(string, index) {
    var size = string.length;
    var first = string.charCodeAt(index);
    var second;
    if (first >= 55296 && first <= 56319 && size > index + 1) {
      second = string.charCodeAt(index + 1);
      if (second >= 56320 && second <= 57343) {
        return (first - 55296) * 1024 + second - 56320 + 65536;
      }
    }
    return first;
  }
  function normalizeIcons(icons) {
    return Object.keys(icons).reduce(function(acc, iconName) {
      var icon3 = icons[iconName];
      var expanded = !!icon3.icon;
      if (expanded) {
        acc[icon3.iconName] = icon3.icon;
      } else {
        acc[iconName] = icon3;
      }
      return acc;
    }, {});
  }
  function defineIcons(prefix, icons) {
    var params = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    var _params$skipHooks = params.skipHooks, skipHooks = _params$skipHooks === void 0 ? false : _params$skipHooks;
    var normalized = normalizeIcons(icons);
    if (typeof namespace.hooks.addPack === "function" && !skipHooks) {
      namespace.hooks.addPack(prefix, normalizeIcons(icons));
    } else {
      namespace.styles[prefix] = _objectSpread2(_objectSpread2({}, namespace.styles[prefix] || {}), normalized);
    }
    if (prefix === "fas") {
      defineIcons("fa", icons);
    }
  }
  var _LONG_STYLE;
  var _PREFIXES;
  var _PREFIXES_FOR_FAMILY;
  var styles = namespace.styles;
  var shims = namespace.shims;
  var LONG_STYLE = (_LONG_STYLE = {}, _defineProperty(_LONG_STYLE, FAMILY_CLASSIC, Object.values(PREFIX_TO_LONG_STYLE[FAMILY_CLASSIC])), _defineProperty(_LONG_STYLE, FAMILY_SHARP, Object.values(PREFIX_TO_LONG_STYLE[FAMILY_SHARP])), _LONG_STYLE);
  var _defaultUsablePrefix = null;
  var _byUnicode = {};
  var _byLigature = {};
  var _byOldName = {};
  var _byOldUnicode = {};
  var _byAlias = {};
  var PREFIXES = (_PREFIXES = {}, _defineProperty(_PREFIXES, FAMILY_CLASSIC, Object.keys(PREFIX_TO_STYLE[FAMILY_CLASSIC])), _defineProperty(_PREFIXES, FAMILY_SHARP, Object.keys(PREFIX_TO_STYLE[FAMILY_SHARP])), _PREFIXES);
  function isReserved(name) {
    return ~RESERVED_CLASSES.indexOf(name);
  }
  function getIconName(cssPrefix, cls) {
    var parts = cls.split("-");
    var prefix = parts[0];
    var iconName = parts.slice(1).join("-");
    if (prefix === cssPrefix && iconName !== "" && !isReserved(iconName)) {
      return iconName;
    } else {
      return null;
    }
  }
  var build = function build2() {
    var lookup = function lookup2(reducer) {
      return reduce(styles, function(o, style, prefix) {
        o[prefix] = reduce(style, reducer, {});
        return o;
      }, {});
    };
    _byUnicode = lookup(function(acc, icon3, iconName) {
      if (icon3[3]) {
        acc[icon3[3]] = iconName;
      }
      if (icon3[2]) {
        var aliases = icon3[2].filter(function(a) {
          return typeof a === "number";
        });
        aliases.forEach(function(alias) {
          acc[alias.toString(16)] = iconName;
        });
      }
      return acc;
    });
    _byLigature = lookup(function(acc, icon3, iconName) {
      acc[iconName] = iconName;
      if (icon3[2]) {
        var aliases = icon3[2].filter(function(a) {
          return typeof a === "string";
        });
        aliases.forEach(function(alias) {
          acc[alias] = iconName;
        });
      }
      return acc;
    });
    _byAlias = lookup(function(acc, icon3, iconName) {
      var aliases = icon3[2];
      acc[iconName] = iconName;
      aliases.forEach(function(alias) {
        acc[alias] = iconName;
      });
      return acc;
    });
    var hasRegular = "far" in styles || config.autoFetchSvg;
    var shimLookups = reduce(shims, function(acc, shim) {
      var maybeNameMaybeUnicode = shim[0];
      var prefix = shim[1];
      var iconName = shim[2];
      if (prefix === "far" && !hasRegular) {
        prefix = "fas";
      }
      if (typeof maybeNameMaybeUnicode === "string") {
        acc.names[maybeNameMaybeUnicode] = {
          prefix,
          iconName
        };
      }
      if (typeof maybeNameMaybeUnicode === "number") {
        acc.unicodes[maybeNameMaybeUnicode.toString(16)] = {
          prefix,
          iconName
        };
      }
      return acc;
    }, {
      names: {},
      unicodes: {}
    });
    _byOldName = shimLookups.names;
    _byOldUnicode = shimLookups.unicodes;
    _defaultUsablePrefix = getCanonicalPrefix(config.styleDefault, {
      family: config.familyDefault
    });
  };
  onChange(function(c) {
    _defaultUsablePrefix = getCanonicalPrefix(c.styleDefault, {
      family: config.familyDefault
    });
  });
  build();
  function byUnicode(prefix, unicode) {
    return (_byUnicode[prefix] || {})[unicode];
  }
  function byLigature(prefix, ligature) {
    return (_byLigature[prefix] || {})[ligature];
  }
  function byAlias(prefix, alias) {
    return (_byAlias[prefix] || {})[alias];
  }
  function byOldName(name) {
    return _byOldName[name] || {
      prefix: null,
      iconName: null
    };
  }
  function byOldUnicode(unicode) {
    var oldUnicode = _byOldUnicode[unicode];
    var newUnicode = byUnicode("fas", unicode);
    return oldUnicode || (newUnicode ? {
      prefix: "fas",
      iconName: newUnicode
    } : null) || {
      prefix: null,
      iconName: null
    };
  }
  function getDefaultUsablePrefix() {
    return _defaultUsablePrefix;
  }
  var emptyCanonicalIcon = function emptyCanonicalIcon2() {
    return {
      prefix: null,
      iconName: null,
      rest: []
    };
  };
  function getCanonicalPrefix(styleOrPrefix) {
    var params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    var _params$family = params.family, family = _params$family === void 0 ? FAMILY_CLASSIC : _params$family;
    var style = PREFIX_TO_STYLE[family][styleOrPrefix];
    var prefix = STYLE_TO_PREFIX[family][styleOrPrefix] || STYLE_TO_PREFIX[family][style];
    var defined = styleOrPrefix in namespace.styles ? styleOrPrefix : null;
    return prefix || defined || null;
  }
  var PREFIXES_FOR_FAMILY = (_PREFIXES_FOR_FAMILY = {}, _defineProperty(_PREFIXES_FOR_FAMILY, FAMILY_CLASSIC, Object.keys(PREFIX_TO_LONG_STYLE[FAMILY_CLASSIC])), _defineProperty(_PREFIXES_FOR_FAMILY, FAMILY_SHARP, Object.keys(PREFIX_TO_LONG_STYLE[FAMILY_SHARP])), _PREFIXES_FOR_FAMILY);
  function getCanonicalIcon(values) {
    var _famProps;
    var params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    var _params$skipLookups = params.skipLookups, skipLookups = _params$skipLookups === void 0 ? false : _params$skipLookups;
    var famProps = (_famProps = {}, _defineProperty(_famProps, FAMILY_CLASSIC, "".concat(config.cssPrefix, "-").concat(FAMILY_CLASSIC)), _defineProperty(_famProps, FAMILY_SHARP, "".concat(config.cssPrefix, "-").concat(FAMILY_SHARP)), _famProps);
    var givenPrefix = null;
    var family = FAMILY_CLASSIC;
    if (values.includes(famProps[FAMILY_CLASSIC]) || values.some(function(v) {
      return PREFIXES_FOR_FAMILY[FAMILY_CLASSIC].includes(v);
    })) {
      family = FAMILY_CLASSIC;
    }
    if (values.includes(famProps[FAMILY_SHARP]) || values.some(function(v) {
      return PREFIXES_FOR_FAMILY[FAMILY_SHARP].includes(v);
    })) {
      family = FAMILY_SHARP;
    }
    var canonical = values.reduce(function(acc, cls) {
      var iconName = getIconName(config.cssPrefix, cls);
      if (styles[cls]) {
        cls = LONG_STYLE[family].includes(cls) ? LONG_STYLE_TO_PREFIX[family][cls] : cls;
        givenPrefix = cls;
        acc.prefix = cls;
      } else if (PREFIXES[family].indexOf(cls) > -1) {
        givenPrefix = cls;
        acc.prefix = getCanonicalPrefix(cls, {
          family
        });
      } else if (iconName) {
        acc.iconName = iconName;
      } else if (cls !== config.replacementClass && cls !== famProps[FAMILY_CLASSIC] && cls !== famProps[FAMILY_SHARP]) {
        acc.rest.push(cls);
      }
      if (!skipLookups && acc.prefix && acc.iconName) {
        var shim = givenPrefix === "fa" ? byOldName(acc.iconName) : {};
        var aliasIconName = byAlias(acc.prefix, acc.iconName);
        if (shim.prefix) {
          givenPrefix = null;
        }
        acc.iconName = shim.iconName || aliasIconName || acc.iconName;
        acc.prefix = shim.prefix || acc.prefix;
        if (acc.prefix === "far" && !styles["far"] && styles["fas"] && !config.autoFetchSvg) {
          acc.prefix = "fas";
        }
      }
      return acc;
    }, emptyCanonicalIcon());
    if (values.includes("fa-brands") || values.includes("fab")) {
      canonical.prefix = "fab";
    }
    if (values.includes("fa-duotone") || values.includes("fad")) {
      canonical.prefix = "fad";
    }
    if (!canonical.prefix && family === FAMILY_SHARP && (styles["fass"] || config.autoFetchSvg)) {
      canonical.prefix = "fass";
      canonical.iconName = byAlias(canonical.prefix, canonical.iconName) || canonical.iconName;
    }
    if (canonical.prefix === "fa" || givenPrefix === "fa") {
      canonical.prefix = getDefaultUsablePrefix() || "fas";
    }
    return canonical;
  }
  var Library = /* @__PURE__ */ function() {
    function Library2() {
      _classCallCheck(this, Library2);
      this.definitions = {};
    }
    _createClass(Library2, [{
      key: "add",
      value: function add() {
        var _this = this;
        for (var _len = arguments.length, definitions = new Array(_len), _key = 0; _key < _len; _key++) {
          definitions[_key] = arguments[_key];
        }
        var additions = definitions.reduce(this._pullDefinitions, {});
        Object.keys(additions).forEach(function(key) {
          _this.definitions[key] = _objectSpread2(_objectSpread2({}, _this.definitions[key] || {}), additions[key]);
          defineIcons(key, additions[key]);
          var longPrefix = PREFIX_TO_LONG_STYLE[FAMILY_CLASSIC][key];
          if (longPrefix) defineIcons(longPrefix, additions[key]);
          build();
        });
      }
    }, {
      key: "reset",
      value: function reset() {
        this.definitions = {};
      }
    }, {
      key: "_pullDefinitions",
      value: function _pullDefinitions(additions, definition) {
        var normalized = definition.prefix && definition.iconName && definition.icon ? {
          0: definition
        } : definition;
        Object.keys(normalized).map(function(key) {
          var _normalized$key = normalized[key], prefix = _normalized$key.prefix, iconName = _normalized$key.iconName, icon3 = _normalized$key.icon;
          var aliases = icon3[2];
          if (!additions[prefix]) additions[prefix] = {};
          if (aliases.length > 0) {
            aliases.forEach(function(alias) {
              if (typeof alias === "string") {
                additions[prefix][alias] = icon3;
              }
            });
          }
          additions[prefix][iconName] = icon3;
        });
        return additions;
      }
    }]);
    return Library2;
  }();
  var _plugins = [];
  var _hooks = {};
  var providers = {};
  var defaultProviderKeys = Object.keys(providers);
  function registerPlugins(nextPlugins, _ref2) {
    var obj = _ref2.mixoutsTo;
    _plugins = nextPlugins;
    _hooks = {};
    Object.keys(providers).forEach(function(k) {
      if (defaultProviderKeys.indexOf(k) === -1) {
        delete providers[k];
      }
    });
    _plugins.forEach(function(plugin) {
      var mixout8 = plugin.mixout ? plugin.mixout() : {};
      Object.keys(mixout8).forEach(function(tk) {
        if (typeof mixout8[tk] === "function") {
          obj[tk] = mixout8[tk];
        }
        if (_typeof(mixout8[tk]) === "object") {
          Object.keys(mixout8[tk]).forEach(function(sk) {
            if (!obj[tk]) {
              obj[tk] = {};
            }
            obj[tk][sk] = mixout8[tk][sk];
          });
        }
      });
      if (plugin.hooks) {
        var hooks8 = plugin.hooks();
        Object.keys(hooks8).forEach(function(hook) {
          if (!_hooks[hook]) {
            _hooks[hook] = [];
          }
          _hooks[hook].push(hooks8[hook]);
        });
      }
      if (plugin.provides) {
        plugin.provides(providers);
      }
    });
    return obj;
  }
  function chainHooks(hook, accumulator) {
    for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }
    var hookFns = _hooks[hook] || [];
    hookFns.forEach(function(hookFn) {
      accumulator = hookFn.apply(null, [accumulator].concat(args));
    });
    return accumulator;
  }
  function callHooks(hook) {
    for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }
    var hookFns = _hooks[hook] || [];
    hookFns.forEach(function(hookFn) {
      hookFn.apply(null, args);
    });
    return void 0;
  }
  function callProvided() {
    var hook = arguments[0];
    var args = Array.prototype.slice.call(arguments, 1);
    return providers[hook] ? providers[hook].apply(null, args) : void 0;
  }
  function findIconDefinition(iconLookup) {
    if (iconLookup.prefix === "fa") {
      iconLookup.prefix = "fas";
    }
    var iconName = iconLookup.iconName;
    var prefix = iconLookup.prefix || getDefaultUsablePrefix();
    if (!iconName) return;
    iconName = byAlias(prefix, iconName) || iconName;
    return iconFromMapping(library.definitions, prefix, iconName) || iconFromMapping(namespace.styles, prefix, iconName);
  }
  var library = new Library();
  var noAuto = function noAuto2() {
    config.autoReplaceSvg = false;
    config.observeMutations = false;
    callHooks("noAuto");
  };
  var dom = {
    i2svg: function i2svg() {
      var params = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
      if (IS_DOM) {
        callHooks("beforeI2svg", params);
        callProvided("pseudoElements2svg", params);
        return callProvided("i2svg", params);
      } else {
        return Promise.reject("Operation requires a DOM of some kind.");
      }
    },
    watch: function watch() {
      var params = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
      var autoReplaceSvgRoot = params.autoReplaceSvgRoot;
      if (config.autoReplaceSvg === false) {
        config.autoReplaceSvg = true;
      }
      config.observeMutations = true;
      domready(function() {
        autoReplace({
          autoReplaceSvgRoot
        });
        callHooks("watch", params);
      });
    }
  };
  var parse = {
    icon: function icon(_icon) {
      if (_icon === null) {
        return null;
      }
      if (_typeof(_icon) === "object" && _icon.prefix && _icon.iconName) {
        return {
          prefix: _icon.prefix,
          iconName: byAlias(_icon.prefix, _icon.iconName) || _icon.iconName
        };
      }
      if (Array.isArray(_icon) && _icon.length === 2) {
        var iconName = _icon[1].indexOf("fa-") === 0 ? _icon[1].slice(3) : _icon[1];
        var prefix = getCanonicalPrefix(_icon[0]);
        return {
          prefix,
          iconName: byAlias(prefix, iconName) || iconName
        };
      }
      if (typeof _icon === "string" && (_icon.indexOf("".concat(config.cssPrefix, "-")) > -1 || _icon.match(ICON_SELECTION_SYNTAX_PATTERN))) {
        var canonicalIcon = getCanonicalIcon(_icon.split(" "), {
          skipLookups: true
        });
        return {
          prefix: canonicalIcon.prefix || getDefaultUsablePrefix(),
          iconName: byAlias(canonicalIcon.prefix, canonicalIcon.iconName) || canonicalIcon.iconName
        };
      }
      if (typeof _icon === "string") {
        var _prefix = getDefaultUsablePrefix();
        return {
          prefix: _prefix,
          iconName: byAlias(_prefix, _icon) || _icon
        };
      }
    }
  };
  var api = {
    noAuto,
    config,
    dom,
    parse,
    library,
    findIconDefinition,
    toHtml
  };
  var autoReplace = function autoReplace2() {
    var params = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    var _params$autoReplaceSv = params.autoReplaceSvgRoot, autoReplaceSvgRoot = _params$autoReplaceSv === void 0 ? DOCUMENT : _params$autoReplaceSv;
    if ((Object.keys(namespace.styles).length > 0 || config.autoFetchSvg) && IS_DOM && config.autoReplaceSvg) api.dom.i2svg({
      node: autoReplaceSvgRoot
    });
  };
  function domVariants(val, abstractCreator) {
    Object.defineProperty(val, "abstract", {
      get: abstractCreator
    });
    Object.defineProperty(val, "html", {
      get: function get2() {
        return val.abstract.map(function(a) {
          return toHtml(a);
        });
      }
    });
    Object.defineProperty(val, "node", {
      get: function get2() {
        if (!IS_DOM) return;
        var container = DOCUMENT.createElement("div");
        container.innerHTML = val.html;
        return container.children;
      }
    });
    return val;
  }
  function asIcon(_ref2) {
    var children = _ref2.children, main = _ref2.main, mask = _ref2.mask, attributes = _ref2.attributes, styles2 = _ref2.styles, transform = _ref2.transform;
    if (transformIsMeaningful(transform) && main.found && !mask.found) {
      var width = main.width, height = main.height;
      var offset = {
        x: width / height / 2,
        y: 0.5
      };
      attributes["style"] = joinStyles(_objectSpread2(_objectSpread2({}, styles2), {}, {
        "transform-origin": "".concat(offset.x + transform.x / 16, "em ").concat(offset.y + transform.y / 16, "em")
      }));
    }
    return [{
      tag: "svg",
      attributes,
      children
    }];
  }
  function asSymbol(_ref2) {
    var prefix = _ref2.prefix, iconName = _ref2.iconName, children = _ref2.children, attributes = _ref2.attributes, symbol = _ref2.symbol;
    var id = symbol === true ? "".concat(prefix, "-").concat(config.cssPrefix, "-").concat(iconName) : symbol;
    return [{
      tag: "svg",
      attributes: {
        style: "display: none;"
      },
      children: [{
        tag: "symbol",
        attributes: _objectSpread2(_objectSpread2({}, attributes), {}, {
          id
        }),
        children
      }]
    }];
  }
  function makeInlineSvgAbstract(params) {
    var _params$icons = params.icons, main = _params$icons.main, mask = _params$icons.mask, prefix = params.prefix, iconName = params.iconName, transform = params.transform, symbol = params.symbol, title = params.title, maskId = params.maskId, titleId = params.titleId, extra = params.extra, _params$watchable = params.watchable, watchable = _params$watchable === void 0 ? false : _params$watchable;
    var _ref2 = mask.found ? mask : main, width = _ref2.width, height = _ref2.height;
    var isUploadedIcon = prefix === "fak";
    var attrClass = [config.replacementClass, iconName ? "".concat(config.cssPrefix, "-").concat(iconName) : ""].filter(function(c) {
      return extra.classes.indexOf(c) === -1;
    }).filter(function(c) {
      return c !== "" || !!c;
    }).concat(extra.classes).join(" ");
    var content = {
      children: [],
      attributes: _objectSpread2(_objectSpread2({}, extra.attributes), {}, {
        "data-prefix": prefix,
        "data-icon": iconName,
        "class": attrClass,
        "role": extra.attributes.role || "img",
        "xmlns": "http://www.w3.org/2000/svg",
        "viewBox": "0 0 ".concat(width, " ").concat(height)
      })
    };
    var uploadedIconWidthStyle = isUploadedIcon && !~extra.classes.indexOf("fa-fw") ? {
      width: "".concat(width / height * 16 * 0.0625, "em")
    } : {};
    if (watchable) {
      content.attributes[DATA_FA_I2SVG] = "";
    }
    if (title) {
      content.children.push({
        tag: "title",
        attributes: {
          id: content.attributes["aria-labelledby"] || "title-".concat(titleId || nextUniqueId())
        },
        children: [title]
      });
      delete content.attributes.title;
    }
    var args = _objectSpread2(_objectSpread2({}, content), {}, {
      prefix,
      iconName,
      main,
      mask,
      maskId,
      transform,
      symbol,
      styles: _objectSpread2(_objectSpread2({}, uploadedIconWidthStyle), extra.styles)
    });
    var _ref22 = mask.found && main.found ? callProvided("generateAbstractMask", args) || {
      children: [],
      attributes: {}
    } : callProvided("generateAbstractIcon", args) || {
      children: [],
      attributes: {}
    }, children = _ref22.children, attributes = _ref22.attributes;
    args.children = children;
    args.attributes = attributes;
    if (symbol) {
      return asSymbol(args);
    } else {
      return asIcon(args);
    }
  }
  function makeLayersTextAbstract(params) {
    var content = params.content, width = params.width, height = params.height, transform = params.transform, title = params.title, extra = params.extra, _params$watchable2 = params.watchable, watchable = _params$watchable2 === void 0 ? false : _params$watchable2;
    var attributes = _objectSpread2(_objectSpread2(_objectSpread2({}, extra.attributes), title ? {
      "title": title
    } : {}), {}, {
      "class": extra.classes.join(" ")
    });
    if (watchable) {
      attributes[DATA_FA_I2SVG] = "";
    }
    var styles2 = _objectSpread2({}, extra.styles);
    if (transformIsMeaningful(transform)) {
      styles2["transform"] = transformForCss({
        transform,
        startCentered: true,
        width,
        height
      });
      styles2["-webkit-transform"] = styles2["transform"];
    }
    var styleString = joinStyles(styles2);
    if (styleString.length > 0) {
      attributes["style"] = styleString;
    }
    var val = [];
    val.push({
      tag: "span",
      attributes,
      children: [content]
    });
    if (title) {
      val.push({
        tag: "span",
        attributes: {
          class: "sr-only"
        },
        children: [title]
      });
    }
    return val;
  }
  function makeLayersCounterAbstract(params) {
    var content = params.content, title = params.title, extra = params.extra;
    var attributes = _objectSpread2(_objectSpread2(_objectSpread2({}, extra.attributes), title ? {
      "title": title
    } : {}), {}, {
      "class": extra.classes.join(" ")
    });
    var styleString = joinStyles(extra.styles);
    if (styleString.length > 0) {
      attributes["style"] = styleString;
    }
    var val = [];
    val.push({
      tag: "span",
      attributes,
      children: [content]
    });
    if (title) {
      val.push({
        tag: "span",
        attributes: {
          class: "sr-only"
        },
        children: [title]
      });
    }
    return val;
  }
  var styles$1 = namespace.styles;
  function asFoundIcon(icon3) {
    var width = icon3[0];
    var height = icon3[1];
    var _icon$slice = icon3.slice(4), _icon$slice2 = _slicedToArray(_icon$slice, 1), vectorData = _icon$slice2[0];
    var element = null;
    if (Array.isArray(vectorData)) {
      element = {
        tag: "g",
        attributes: {
          class: "".concat(config.cssPrefix, "-").concat(DUOTONE_CLASSES.GROUP)
        },
        children: [{
          tag: "path",
          attributes: {
            class: "".concat(config.cssPrefix, "-").concat(DUOTONE_CLASSES.SECONDARY),
            fill: "currentColor",
            d: vectorData[0]
          }
        }, {
          tag: "path",
          attributes: {
            class: "".concat(config.cssPrefix, "-").concat(DUOTONE_CLASSES.PRIMARY),
            fill: "currentColor",
            d: vectorData[1]
          }
        }]
      };
    } else {
      element = {
        tag: "path",
        attributes: {
          fill: "currentColor",
          d: vectorData
        }
      };
    }
    return {
      found: true,
      width,
      height,
      icon: element
    };
  }
  var missingIconResolutionMixin = {
    found: false,
    width: 512,
    height: 512
  };
  function maybeNotifyMissing(iconName, prefix) {
    if (!PRODUCTION && !config.showMissingIcons && iconName) {
      console.error('Icon with name "'.concat(iconName, '" and prefix "').concat(prefix, '" is missing.'));
    }
  }
  function findIcon(iconName, prefix) {
    var givenPrefix = prefix;
    if (prefix === "fa" && config.styleDefault !== null) {
      prefix = getDefaultUsablePrefix();
    }
    return new Promise(function(resolve, reject) {
      var val = {
        found: false,
        width: 512,
        height: 512,
        icon: callProvided("missingIconAbstract") || {}
      };
      if (givenPrefix === "fa") {
        var shim = byOldName(iconName) || {};
        iconName = shim.iconName || iconName;
        prefix = shim.prefix || prefix;
      }
      if (iconName && prefix && styles$1[prefix] && styles$1[prefix][iconName]) {
        var icon3 = styles$1[prefix][iconName];
        return resolve(asFoundIcon(icon3));
      }
      maybeNotifyMissing(iconName, prefix);
      resolve(_objectSpread2(_objectSpread2({}, missingIconResolutionMixin), {}, {
        icon: config.showMissingIcons && iconName ? callProvided("missingIconAbstract") || {} : {}
      }));
    });
  }
  var noop$1 = function noop3() {
  };
  var p = config.measurePerformance && PERFORMANCE && PERFORMANCE.mark && PERFORMANCE.measure ? PERFORMANCE : {
    mark: noop$1,
    measure: noop$1
  };
  var preamble = 'FA "6.5.2"';
  var begin = function begin2(name) {
    p.mark("".concat(preamble, " ").concat(name, " begins"));
    return function() {
      return end(name);
    };
  };
  var end = function end2(name) {
    p.mark("".concat(preamble, " ").concat(name, " ends"));
    p.measure("".concat(preamble, " ").concat(name), "".concat(preamble, " ").concat(name, " begins"), "".concat(preamble, " ").concat(name, " ends"));
  };
  var perf = {
    begin,
    end
  };
  var noop$2 = function noop4() {
  };
  function isWatched(node) {
    var i2svg2 = node.getAttribute ? node.getAttribute(DATA_FA_I2SVG) : null;
    return typeof i2svg2 === "string";
  }
  function hasPrefixAndIcon(node) {
    var prefix = node.getAttribute ? node.getAttribute(DATA_PREFIX) : null;
    var icon3 = node.getAttribute ? node.getAttribute(DATA_ICON) : null;
    return prefix && icon3;
  }
  function hasBeenReplaced(node) {
    return node && node.classList && node.classList.contains && node.classList.contains(config.replacementClass);
  }
  function getMutator() {
    if (config.autoReplaceSvg === true) {
      return mutators.replace;
    }
    var mutator = mutators[config.autoReplaceSvg];
    return mutator || mutators.replace;
  }
  function createElementNS(tag) {
    return DOCUMENT.createElementNS("http://www.w3.org/2000/svg", tag);
  }
  function createElement(tag) {
    return DOCUMENT.createElement(tag);
  }
  function convertSVG(abstractObj) {
    var params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    var _params$ceFn = params.ceFn, ceFn = _params$ceFn === void 0 ? abstractObj.tag === "svg" ? createElementNS : createElement : _params$ceFn;
    if (typeof abstractObj === "string") {
      return DOCUMENT.createTextNode(abstractObj);
    }
    var tag = ceFn(abstractObj.tag);
    Object.keys(abstractObj.attributes || []).forEach(function(key) {
      tag.setAttribute(key, abstractObj.attributes[key]);
    });
    var children = abstractObj.children || [];
    children.forEach(function(child) {
      tag.appendChild(convertSVG(child, {
        ceFn
      }));
    });
    return tag;
  }
  function nodeAsComment(node) {
    var comment2 = " ".concat(node.outerHTML, " ");
    comment2 = "".concat(comment2, "Font Awesome fontawesome.com ");
    return comment2;
  }
  var mutators = {
    replace: function replace(mutation) {
      var node = mutation[0];
      if (node.parentNode) {
        mutation[1].forEach(function(_abstract) {
          node.parentNode.insertBefore(convertSVG(_abstract), node);
        });
        if (node.getAttribute(DATA_FA_I2SVG) === null && config.keepOriginalSource) {
          var comment2 = DOCUMENT.createComment(nodeAsComment(node));
          node.parentNode.replaceChild(comment2, node);
        } else {
          node.remove();
        }
      }
    },
    nest: function nest(mutation) {
      var node = mutation[0];
      var _abstract2 = mutation[1];
      if (~classArray(node).indexOf(config.replacementClass)) {
        return mutators.replace(mutation);
      }
      var forSvg = new RegExp("".concat(config.cssPrefix, "-.*"));
      delete _abstract2[0].attributes.id;
      if (_abstract2[0].attributes.class) {
        var splitClasses = _abstract2[0].attributes.class.split(" ").reduce(function(acc, cls) {
          if (cls === config.replacementClass || cls.match(forSvg)) {
            acc.toSvg.push(cls);
          } else {
            acc.toNode.push(cls);
          }
          return acc;
        }, {
          toNode: [],
          toSvg: []
        });
        _abstract2[0].attributes.class = splitClasses.toSvg.join(" ");
        if (splitClasses.toNode.length === 0) {
          node.removeAttribute("class");
        } else {
          node.setAttribute("class", splitClasses.toNode.join(" "));
        }
      }
      var newInnerHTML = _abstract2.map(function(a) {
        return toHtml(a);
      }).join("\n");
      node.setAttribute(DATA_FA_I2SVG, "");
      node.innerHTML = newInnerHTML;
    }
  };
  function performOperationSync(op) {
    op();
  }
  function perform(mutations, callback) {
    var callbackFunction = typeof callback === "function" ? callback : noop$2;
    if (mutations.length === 0) {
      callbackFunction();
    } else {
      var frame = performOperationSync;
      if (config.mutateApproach === MUTATION_APPROACH_ASYNC) {
        frame = WINDOW.requestAnimationFrame || performOperationSync;
      }
      frame(function() {
        var mutator = getMutator();
        var mark2 = perf.begin("mutate");
        mutations.map(mutator);
        mark2();
        callbackFunction();
      });
    }
  }
  var disabled = false;
  function disableObservation() {
    disabled = true;
  }
  function enableObservation() {
    disabled = false;
  }
  var mo = null;
  function observe(options) {
    if (!MUTATION_OBSERVER) {
      return;
    }
    if (!config.observeMutations) {
      return;
    }
    var _options$treeCallback = options.treeCallback, treeCallback = _options$treeCallback === void 0 ? noop$2 : _options$treeCallback, _options$nodeCallback = options.nodeCallback, nodeCallback = _options$nodeCallback === void 0 ? noop$2 : _options$nodeCallback, _options$pseudoElemen = options.pseudoElementsCallback, pseudoElementsCallback = _options$pseudoElemen === void 0 ? noop$2 : _options$pseudoElemen, _options$observeMutat = options.observeMutationsRoot, observeMutationsRoot = _options$observeMutat === void 0 ? DOCUMENT : _options$observeMutat;
    mo = new MUTATION_OBSERVER(function(objects) {
      if (disabled) return;
      var defaultPrefix = getDefaultUsablePrefix();
      toArray(objects).forEach(function(mutationRecord) {
        if (mutationRecord.type === "childList" && mutationRecord.addedNodes.length > 0 && !isWatched(mutationRecord.addedNodes[0])) {
          if (config.searchPseudoElements) {
            pseudoElementsCallback(mutationRecord.target);
          }
          treeCallback(mutationRecord.target);
        }
        if (mutationRecord.type === "attributes" && mutationRecord.target.parentNode && config.searchPseudoElements) {
          pseudoElementsCallback(mutationRecord.target.parentNode);
        }
        if (mutationRecord.type === "attributes" && isWatched(mutationRecord.target) && ~ATTRIBUTES_WATCHED_FOR_MUTATION.indexOf(mutationRecord.attributeName)) {
          if (mutationRecord.attributeName === "class" && hasPrefixAndIcon(mutationRecord.target)) {
            var _getCanonicalIcon = getCanonicalIcon(classArray(mutationRecord.target)), prefix = _getCanonicalIcon.prefix, iconName = _getCanonicalIcon.iconName;
            mutationRecord.target.setAttribute(DATA_PREFIX, prefix || defaultPrefix);
            if (iconName) mutationRecord.target.setAttribute(DATA_ICON, iconName);
          } else if (hasBeenReplaced(mutationRecord.target)) {
            nodeCallback(mutationRecord.target);
          }
        }
      });
    });
    if (!IS_DOM) return;
    mo.observe(observeMutationsRoot, {
      childList: true,
      attributes: true,
      characterData: true,
      subtree: true
    });
  }
  function disconnect() {
    if (!mo) return;
    mo.disconnect();
  }
  function styleParser(node) {
    var style = node.getAttribute("style");
    var val = [];
    if (style) {
      val = style.split(";").reduce(function(acc, style2) {
        var styles2 = style2.split(":");
        var prop = styles2[0];
        var value = styles2.slice(1);
        if (prop && value.length > 0) {
          acc[prop] = value.join(":").trim();
        }
        return acc;
      }, {});
    }
    return val;
  }
  function classParser(node) {
    var existingPrefix = node.getAttribute("data-prefix");
    var existingIconName = node.getAttribute("data-icon");
    var innerText = node.innerText !== void 0 ? node.innerText.trim() : "";
    var val = getCanonicalIcon(classArray(node));
    if (!val.prefix) {
      val.prefix = getDefaultUsablePrefix();
    }
    if (existingPrefix && existingIconName) {
      val.prefix = existingPrefix;
      val.iconName = existingIconName;
    }
    if (val.iconName && val.prefix) {
      return val;
    }
    if (val.prefix && innerText.length > 0) {
      val.iconName = byLigature(val.prefix, node.innerText) || byUnicode(val.prefix, toHex(node.innerText));
    }
    if (!val.iconName && config.autoFetchSvg && node.firstChild && node.firstChild.nodeType === Node.TEXT_NODE) {
      val.iconName = node.firstChild.data;
    }
    return val;
  }
  function attributesParser(node) {
    var extraAttributes = toArray(node.attributes).reduce(function(acc, attr) {
      if (acc.name !== "class" && acc.name !== "style") {
        acc[attr.name] = attr.value;
      }
      return acc;
    }, {});
    var title = node.getAttribute("title");
    var titleId = node.getAttribute("data-fa-title-id");
    if (config.autoA11y) {
      if (title) {
        extraAttributes["aria-labelledby"] = "".concat(config.replacementClass, "-title-").concat(titleId || nextUniqueId());
      } else {
        extraAttributes["aria-hidden"] = "true";
        extraAttributes["focusable"] = "false";
      }
    }
    return extraAttributes;
  }
  function blankMeta() {
    return {
      iconName: null,
      title: null,
      titleId: null,
      prefix: null,
      transform: meaninglessTransform,
      symbol: false,
      mask: {
        iconName: null,
        prefix: null,
        rest: []
      },
      maskId: null,
      extra: {
        classes: [],
        styles: {},
        attributes: {}
      }
    };
  }
  function parseMeta(node) {
    var parser = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {
      styleParser: true
    };
    var _classParser = classParser(node), iconName = _classParser.iconName, prefix = _classParser.prefix, extraClasses = _classParser.rest;
    var extraAttributes = attributesParser(node);
    var pluginMeta = chainHooks("parseNodeAttributes", {}, node);
    var extraStyles = parser.styleParser ? styleParser(node) : [];
    return _objectSpread2({
      iconName,
      title: node.getAttribute("title"),
      titleId: node.getAttribute("data-fa-title-id"),
      prefix,
      transform: meaninglessTransform,
      mask: {
        iconName: null,
        prefix: null,
        rest: []
      },
      maskId: null,
      symbol: false,
      extra: {
        classes: extraClasses,
        styles: extraStyles,
        attributes: extraAttributes
      }
    }, pluginMeta);
  }
  var styles$2 = namespace.styles;
  function generateMutation(node) {
    var nodeMeta = config.autoReplaceSvg === "nest" ? parseMeta(node, {
      styleParser: false
    }) : parseMeta(node);
    if (~nodeMeta.extra.classes.indexOf(LAYERS_TEXT_CLASSNAME)) {
      return callProvided("generateLayersText", node, nodeMeta);
    } else {
      return callProvided("generateSvgReplacementMutation", node, nodeMeta);
    }
  }
  var knownPrefixes = /* @__PURE__ */ new Set();
  FAMILIES.map(function(family) {
    knownPrefixes.add("fa-".concat(family));
  });
  Object.keys(PREFIX_TO_STYLE[FAMILY_CLASSIC]).map(knownPrefixes.add.bind(knownPrefixes));
  Object.keys(PREFIX_TO_STYLE[FAMILY_SHARP]).map(knownPrefixes.add.bind(knownPrefixes));
  knownPrefixes = _toConsumableArray(knownPrefixes);
  function onTree(root) {
    var callback = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
    if (!IS_DOM) return Promise.resolve();
    var htmlClassList = DOCUMENT.documentElement.classList;
    var hclAdd = function hclAdd2(suffix) {
      return htmlClassList.add("".concat(HTML_CLASS_I2SVG_BASE_CLASS, "-").concat(suffix));
    };
    var hclRemove = function hclRemove2(suffix) {
      return htmlClassList.remove("".concat(HTML_CLASS_I2SVG_BASE_CLASS, "-").concat(suffix));
    };
    var prefixes2 = config.autoFetchSvg ? knownPrefixes : FAMILIES.map(function(f) {
      return "fa-".concat(f);
    }).concat(Object.keys(styles$2));
    if (!prefixes2.includes("fa")) {
      prefixes2.push("fa");
    }
    var prefixesDomQuery = [".".concat(LAYERS_TEXT_CLASSNAME, ":not([").concat(DATA_FA_I2SVG, "])")].concat(prefixes2.map(function(p2) {
      return ".".concat(p2, ":not([").concat(DATA_FA_I2SVG, "])");
    })).join(", ");
    if (prefixesDomQuery.length === 0) {
      return Promise.resolve();
    }
    var candidates = [];
    try {
      candidates = toArray(root.querySelectorAll(prefixesDomQuery));
    } catch (e) {
    }
    if (candidates.length > 0) {
      hclAdd("pending");
      hclRemove("complete");
    } else {
      return Promise.resolve();
    }
    var mark2 = perf.begin("onTree");
    var mutations = candidates.reduce(function(acc, node) {
      try {
        var mutation = generateMutation(node);
        if (mutation) {
          acc.push(mutation);
        }
      } catch (e) {
        if (!PRODUCTION) {
          if (e.name === "MissingIcon") {
            console.error(e);
          }
        }
      }
      return acc;
    }, []);
    return new Promise(function(resolve, reject) {
      Promise.all(mutations).then(function(resolvedMutations) {
        perform(resolvedMutations, function() {
          hclAdd("active");
          hclAdd("complete");
          hclRemove("pending");
          if (typeof callback === "function") callback();
          mark2();
          resolve();
        });
      }).catch(function(e) {
        mark2();
        reject(e);
      });
    });
  }
  function onNode(node) {
    var callback = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
    generateMutation(node).then(function(mutation) {
      if (mutation) {
        perform([mutation], callback);
      }
    });
  }
  function resolveIcons(next) {
    return function(maybeIconDefinition) {
      var params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      var iconDefinition = (maybeIconDefinition || {}).icon ? maybeIconDefinition : findIconDefinition(maybeIconDefinition || {});
      var mask = params.mask;
      if (mask) {
        mask = (mask || {}).icon ? mask : findIconDefinition(mask || {});
      }
      return next(iconDefinition, _objectSpread2(_objectSpread2({}, params), {}, {
        mask
      }));
    };
  }
  var render = function render2(iconDefinition) {
    var params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    var _params$transform = params.transform, transform = _params$transform === void 0 ? meaninglessTransform : _params$transform, _params$symbol = params.symbol, symbol = _params$symbol === void 0 ? false : _params$symbol, _params$mask = params.mask, mask = _params$mask === void 0 ? null : _params$mask, _params$maskId = params.maskId, maskId = _params$maskId === void 0 ? null : _params$maskId, _params$title = params.title, title = _params$title === void 0 ? null : _params$title, _params$titleId = params.titleId, titleId = _params$titleId === void 0 ? null : _params$titleId, _params$classes = params.classes, classes = _params$classes === void 0 ? [] : _params$classes, _params$attributes = params.attributes, attributes = _params$attributes === void 0 ? {} : _params$attributes, _params$styles = params.styles, styles2 = _params$styles === void 0 ? {} : _params$styles;
    if (!iconDefinition) return;
    var prefix = iconDefinition.prefix, iconName = iconDefinition.iconName, icon3 = iconDefinition.icon;
    return domVariants(_objectSpread2({
      type: "icon"
    }, iconDefinition), function() {
      callHooks("beforeDOMElementCreation", {
        iconDefinition,
        params
      });
      if (config.autoA11y) {
        if (title) {
          attributes["aria-labelledby"] = "".concat(config.replacementClass, "-title-").concat(titleId || nextUniqueId());
        } else {
          attributes["aria-hidden"] = "true";
          attributes["focusable"] = "false";
        }
      }
      return makeInlineSvgAbstract({
        icons: {
          main: asFoundIcon(icon3),
          mask: mask ? asFoundIcon(mask.icon) : {
            found: false,
            width: null,
            height: null,
            icon: {}
          }
        },
        prefix,
        iconName,
        transform: _objectSpread2(_objectSpread2({}, meaninglessTransform), transform),
        symbol,
        title,
        maskId,
        titleId,
        extra: {
          attributes,
          styles: styles2,
          classes
        }
      });
    });
  };
  var ReplaceElements = {
    mixout: function mixout2() {
      return {
        icon: resolveIcons(render)
      };
    },
    hooks: function hooks2() {
      return {
        mutationObserverCallbacks: function mutationObserverCallbacks(accumulator) {
          accumulator.treeCallback = onTree;
          accumulator.nodeCallback = onNode;
          return accumulator;
        }
      };
    },
    provides: function provides(providers$$1) {
      providers$$1.i2svg = function(params) {
        var _params$node = params.node, node = _params$node === void 0 ? DOCUMENT : _params$node, _params$callback = params.callback, callback = _params$callback === void 0 ? function() {
        } : _params$callback;
        return onTree(node, callback);
      };
      providers$$1.generateSvgReplacementMutation = function(node, nodeMeta) {
        var iconName = nodeMeta.iconName, title = nodeMeta.title, titleId = nodeMeta.titleId, prefix = nodeMeta.prefix, transform = nodeMeta.transform, symbol = nodeMeta.symbol, mask = nodeMeta.mask, maskId = nodeMeta.maskId, extra = nodeMeta.extra;
        return new Promise(function(resolve, reject) {
          Promise.all([findIcon(iconName, prefix), mask.iconName ? findIcon(mask.iconName, mask.prefix) : Promise.resolve({
            found: false,
            width: 512,
            height: 512,
            icon: {}
          })]).then(function(_ref2) {
            var _ref22 = _slicedToArray(_ref2, 2), main = _ref22[0], mask2 = _ref22[1];
            resolve([node, makeInlineSvgAbstract({
              icons: {
                main,
                mask: mask2
              },
              prefix,
              iconName,
              transform,
              symbol,
              maskId,
              title,
              titleId,
              extra,
              watchable: true
            })]);
          }).catch(reject);
        });
      };
      providers$$1.generateAbstractIcon = function(_ref3) {
        var children = _ref3.children, attributes = _ref3.attributes, main = _ref3.main, transform = _ref3.transform, styles2 = _ref3.styles;
        var styleString = joinStyles(styles2);
        if (styleString.length > 0) {
          attributes["style"] = styleString;
        }
        var nextChild;
        if (transformIsMeaningful(transform)) {
          nextChild = callProvided("generateAbstractTransformGrouping", {
            main,
            transform,
            containerWidth: main.width,
            iconWidth: main.width
          });
        }
        children.push(nextChild || main.icon);
        return {
          children,
          attributes
        };
      };
    }
  };
  var Layers = {
    mixout: function mixout3() {
      return {
        layer: function layer2(assembler) {
          var params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
          var _params$classes = params.classes, classes = _params$classes === void 0 ? [] : _params$classes;
          return domVariants({
            type: "layer"
          }, function() {
            callHooks("beforeDOMElementCreation", {
              assembler,
              params
            });
            var children = [];
            assembler(function(args) {
              Array.isArray(args) ? args.map(function(a) {
                children = children.concat(a.abstract);
              }) : children = children.concat(args.abstract);
            });
            return [{
              tag: "span",
              attributes: {
                class: ["".concat(config.cssPrefix, "-layers")].concat(_toConsumableArray(classes)).join(" ")
              },
              children
            }];
          });
        }
      };
    }
  };
  var LayersCounter = {
    mixout: function mixout4() {
      return {
        counter: function counter2(content) {
          var params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
          var _params$title = params.title, title = _params$title === void 0 ? null : _params$title, _params$classes = params.classes, classes = _params$classes === void 0 ? [] : _params$classes, _params$attributes = params.attributes, attributes = _params$attributes === void 0 ? {} : _params$attributes, _params$styles = params.styles, styles2 = _params$styles === void 0 ? {} : _params$styles;
          return domVariants({
            type: "counter",
            content
          }, function() {
            callHooks("beforeDOMElementCreation", {
              content,
              params
            });
            return makeLayersCounterAbstract({
              content: content.toString(),
              title,
              extra: {
                attributes,
                styles: styles2,
                classes: ["".concat(config.cssPrefix, "-layers-counter")].concat(_toConsumableArray(classes))
              }
            });
          });
        }
      };
    }
  };
  var LayersText = {
    mixout: function mixout5() {
      return {
        text: function text3(content) {
          var params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
          var _params$transform = params.transform, transform = _params$transform === void 0 ? meaninglessTransform : _params$transform, _params$title = params.title, title = _params$title === void 0 ? null : _params$title, _params$classes = params.classes, classes = _params$classes === void 0 ? [] : _params$classes, _params$attributes = params.attributes, attributes = _params$attributes === void 0 ? {} : _params$attributes, _params$styles = params.styles, styles2 = _params$styles === void 0 ? {} : _params$styles;
          return domVariants({
            type: "text",
            content
          }, function() {
            callHooks("beforeDOMElementCreation", {
              content,
              params
            });
            return makeLayersTextAbstract({
              content,
              transform: _objectSpread2(_objectSpread2({}, meaninglessTransform), transform),
              title,
              extra: {
                attributes,
                styles: styles2,
                classes: ["".concat(config.cssPrefix, "-layers-text")].concat(_toConsumableArray(classes))
              }
            });
          });
        }
      };
    },
    provides: function provides2(providers$$1) {
      providers$$1.generateLayersText = function(node, nodeMeta) {
        var title = nodeMeta.title, transform = nodeMeta.transform, extra = nodeMeta.extra;
        var width = null;
        var height = null;
        if (IS_IE) {
          var computedFontSize = parseInt(getComputedStyle(node).fontSize, 10);
          var boundingClientRect = node.getBoundingClientRect();
          width = boundingClientRect.width / computedFontSize;
          height = boundingClientRect.height / computedFontSize;
        }
        if (config.autoA11y && !title) {
          extra.attributes["aria-hidden"] = "true";
        }
        return Promise.resolve([node, makeLayersTextAbstract({
          content: node.innerHTML,
          width,
          height,
          transform,
          title,
          extra,
          watchable: true
        })]);
      };
    }
  };
  var CLEAN_CONTENT_PATTERN = new RegExp('"', "ug");
  var SECONDARY_UNICODE_RANGE = [1105920, 1112319];
  function hexValueFromContent(content) {
    var cleaned = content.replace(CLEAN_CONTENT_PATTERN, "");
    var codePoint = codePointAt(cleaned, 0);
    var isPrependTen = codePoint >= SECONDARY_UNICODE_RANGE[0] && codePoint <= SECONDARY_UNICODE_RANGE[1];
    var isDoubled = cleaned.length === 2 ? cleaned[0] === cleaned[1] : false;
    return {
      value: isDoubled ? toHex(cleaned[0]) : toHex(cleaned),
      isSecondary: isPrependTen || isDoubled
    };
  }
  function replaceForPosition(node, position) {
    var pendingAttribute = "".concat(DATA_FA_PSEUDO_ELEMENT_PENDING).concat(position.replace(":", "-"));
    return new Promise(function(resolve, reject) {
      if (node.getAttribute(pendingAttribute) !== null) {
        return resolve();
      }
      var children = toArray(node.children);
      var alreadyProcessedPseudoElement = children.filter(function(c) {
        return c.getAttribute(DATA_FA_PSEUDO_ELEMENT) === position;
      })[0];
      var styles2 = WINDOW.getComputedStyle(node, position);
      var fontFamily = styles2.getPropertyValue("font-family").match(FONT_FAMILY_PATTERN);
      var fontWeight = styles2.getPropertyValue("font-weight");
      var content = styles2.getPropertyValue("content");
      if (alreadyProcessedPseudoElement && !fontFamily) {
        node.removeChild(alreadyProcessedPseudoElement);
        return resolve();
      } else if (fontFamily && content !== "none" && content !== "") {
        var _content = styles2.getPropertyValue("content");
        var family = ~["Sharp"].indexOf(fontFamily[2]) ? FAMILY_SHARP : FAMILY_CLASSIC;
        var prefix = ~["Solid", "Regular", "Light", "Thin", "Duotone", "Brands", "Kit"].indexOf(fontFamily[2]) ? STYLE_TO_PREFIX[family][fontFamily[2].toLowerCase()] : FONT_WEIGHT_TO_PREFIX[family][fontWeight];
        var _hexValueFromContent = hexValueFromContent(_content), hexValue = _hexValueFromContent.value, isSecondary = _hexValueFromContent.isSecondary;
        var isV4 = fontFamily[0].startsWith("FontAwesome");
        var iconName = byUnicode(prefix, hexValue);
        var iconIdentifier = iconName;
        if (isV4) {
          var iconName4 = byOldUnicode(hexValue);
          if (iconName4.iconName && iconName4.prefix) {
            iconName = iconName4.iconName;
            prefix = iconName4.prefix;
          }
        }
        if (iconName && !isSecondary && (!alreadyProcessedPseudoElement || alreadyProcessedPseudoElement.getAttribute(DATA_PREFIX) !== prefix || alreadyProcessedPseudoElement.getAttribute(DATA_ICON) !== iconIdentifier)) {
          node.setAttribute(pendingAttribute, iconIdentifier);
          if (alreadyProcessedPseudoElement) {
            node.removeChild(alreadyProcessedPseudoElement);
          }
          var meta = blankMeta();
          var extra = meta.extra;
          extra.attributes[DATA_FA_PSEUDO_ELEMENT] = position;
          findIcon(iconName, prefix).then(function(main) {
            var _abstract = makeInlineSvgAbstract(_objectSpread2(_objectSpread2({}, meta), {}, {
              icons: {
                main,
                mask: emptyCanonicalIcon()
              },
              prefix,
              iconName: iconIdentifier,
              extra,
              watchable: true
            }));
            var element = DOCUMENT.createElementNS("http://www.w3.org/2000/svg", "svg");
            if (position === "::before") {
              node.insertBefore(element, node.firstChild);
            } else {
              node.appendChild(element);
            }
            element.outerHTML = _abstract.map(function(a) {
              return toHtml(a);
            }).join("\n");
            node.removeAttribute(pendingAttribute);
            resolve();
          }).catch(reject);
        } else {
          resolve();
        }
      } else {
        resolve();
      }
    });
  }
  function replace2(node) {
    return Promise.all([replaceForPosition(node, "::before"), replaceForPosition(node, "::after")]);
  }
  function processable(node) {
    return node.parentNode !== document.head && !~TAGNAMES_TO_SKIP_FOR_PSEUDOELEMENTS.indexOf(node.tagName.toUpperCase()) && !node.getAttribute(DATA_FA_PSEUDO_ELEMENT) && (!node.parentNode || node.parentNode.tagName !== "svg");
  }
  function searchPseudoElements(root) {
    if (!IS_DOM) return;
    return new Promise(function(resolve, reject) {
      var operations = toArray(root.querySelectorAll("*")).filter(processable).map(replace2);
      var end3 = perf.begin("searchPseudoElements");
      disableObservation();
      Promise.all(operations).then(function() {
        end3();
        enableObservation();
        resolve();
      }).catch(function() {
        end3();
        enableObservation();
        reject();
      });
    });
  }
  var PseudoElements = {
    hooks: function hooks3() {
      return {
        mutationObserverCallbacks: function mutationObserverCallbacks(accumulator) {
          accumulator.pseudoElementsCallback = searchPseudoElements;
          return accumulator;
        }
      };
    },
    provides: function provides3(providers$$1) {
      providers$$1.pseudoElements2svg = function(params) {
        var _params$node = params.node, node = _params$node === void 0 ? DOCUMENT : _params$node;
        if (config.searchPseudoElements) {
          searchPseudoElements(node);
        }
      };
    }
  };
  var _unwatched = false;
  var MutationObserver$1 = {
    mixout: function mixout6() {
      return {
        dom: {
          unwatch: function unwatch() {
            disableObservation();
            _unwatched = true;
          }
        }
      };
    },
    hooks: function hooks4() {
      return {
        bootstrap: function bootstrap() {
          observe(chainHooks("mutationObserverCallbacks", {}));
        },
        noAuto: function noAuto3() {
          disconnect();
        },
        watch: function watch2(params) {
          var observeMutationsRoot = params.observeMutationsRoot;
          if (_unwatched) {
            enableObservation();
          } else {
            observe(chainHooks("mutationObserverCallbacks", {
              observeMutationsRoot
            }));
          }
        }
      };
    }
  };
  var parseTransformString = function parseTransformString2(transformString) {
    var transform = {
      size: 16,
      x: 0,
      y: 0,
      flipX: false,
      flipY: false,
      rotate: 0
    };
    return transformString.toLowerCase().split(" ").reduce(function(acc, n) {
      var parts = n.toLowerCase().split("-");
      var first = parts[0];
      var rest = parts.slice(1).join("-");
      if (first && rest === "h") {
        acc.flipX = true;
        return acc;
      }
      if (first && rest === "v") {
        acc.flipY = true;
        return acc;
      }
      rest = parseFloat(rest);
      if (isNaN(rest)) {
        return acc;
      }
      switch (first) {
        case "grow":
          acc.size = acc.size + rest;
          break;
        case "shrink":
          acc.size = acc.size - rest;
          break;
        case "left":
          acc.x = acc.x - rest;
          break;
        case "right":
          acc.x = acc.x + rest;
          break;
        case "up":
          acc.y = acc.y - rest;
          break;
        case "down":
          acc.y = acc.y + rest;
          break;
        case "rotate":
          acc.rotate = acc.rotate + rest;
          break;
      }
      return acc;
    }, transform);
  };
  var PowerTransforms = {
    mixout: function mixout7() {
      return {
        parse: {
          transform: function transform(transformString) {
            return parseTransformString(transformString);
          }
        }
      };
    },
    hooks: function hooks5() {
      return {
        parseNodeAttributes: function parseNodeAttributes(accumulator, node) {
          var transformString = node.getAttribute("data-fa-transform");
          if (transformString) {
            accumulator.transform = parseTransformString(transformString);
          }
          return accumulator;
        }
      };
    },
    provides: function provides4(providers2) {
      providers2.generateAbstractTransformGrouping = function(_ref2) {
        var main = _ref2.main, transform = _ref2.transform, containerWidth = _ref2.containerWidth, iconWidth = _ref2.iconWidth;
        var outer = {
          transform: "translate(".concat(containerWidth / 2, " 256)")
        };
        var innerTranslate = "translate(".concat(transform.x * 32, ", ").concat(transform.y * 32, ") ");
        var innerScale = "scale(".concat(transform.size / 16 * (transform.flipX ? -1 : 1), ", ").concat(transform.size / 16 * (transform.flipY ? -1 : 1), ") ");
        var innerRotate = "rotate(".concat(transform.rotate, " 0 0)");
        var inner = {
          transform: "".concat(innerTranslate, " ").concat(innerScale, " ").concat(innerRotate)
        };
        var path = {
          transform: "translate(".concat(iconWidth / 2 * -1, " -256)")
        };
        var operations = {
          outer,
          inner,
          path
        };
        return {
          tag: "g",
          attributes: _objectSpread2({}, operations.outer),
          children: [{
            tag: "g",
            attributes: _objectSpread2({}, operations.inner),
            children: [{
              tag: main.icon.tag,
              children: main.icon.children,
              attributes: _objectSpread2(_objectSpread2({}, main.icon.attributes), operations.path)
            }]
          }]
        };
      };
    }
  };
  var ALL_SPACE = {
    x: 0,
    y: 0,
    width: "100%",
    height: "100%"
  };
  function fillBlack(_abstract) {
    var force = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
    if (_abstract.attributes && (_abstract.attributes.fill || force)) {
      _abstract.attributes.fill = "black";
    }
    return _abstract;
  }
  function deGroup(_abstract2) {
    if (_abstract2.tag === "g") {
      return _abstract2.children;
    } else {
      return [_abstract2];
    }
  }
  var Masks = {
    hooks: function hooks6() {
      return {
        parseNodeAttributes: function parseNodeAttributes(accumulator, node) {
          var maskData = node.getAttribute("data-fa-mask");
          var mask = !maskData ? emptyCanonicalIcon() : getCanonicalIcon(maskData.split(" ").map(function(i) {
            return i.trim();
          }));
          if (!mask.prefix) {
            mask.prefix = getDefaultUsablePrefix();
          }
          accumulator.mask = mask;
          accumulator.maskId = node.getAttribute("data-fa-mask-id");
          return accumulator;
        }
      };
    },
    provides: function provides5(providers2) {
      providers2.generateAbstractMask = function(_ref2) {
        var children = _ref2.children, attributes = _ref2.attributes, main = _ref2.main, mask = _ref2.mask, explicitMaskId = _ref2.maskId, transform = _ref2.transform;
        var mainWidth = main.width, mainPath = main.icon;
        var maskWidth = mask.width, maskPath = mask.icon;
        var trans = transformForSvg({
          transform,
          containerWidth: maskWidth,
          iconWidth: mainWidth
        });
        var maskRect = {
          tag: "rect",
          attributes: _objectSpread2(_objectSpread2({}, ALL_SPACE), {}, {
            fill: "white"
          })
        };
        var maskInnerGroupChildrenMixin = mainPath.children ? {
          children: mainPath.children.map(fillBlack)
        } : {};
        var maskInnerGroup = {
          tag: "g",
          attributes: _objectSpread2({}, trans.inner),
          children: [fillBlack(_objectSpread2({
            tag: mainPath.tag,
            attributes: _objectSpread2(_objectSpread2({}, mainPath.attributes), trans.path)
          }, maskInnerGroupChildrenMixin))]
        };
        var maskOuterGroup = {
          tag: "g",
          attributes: _objectSpread2({}, trans.outer),
          children: [maskInnerGroup]
        };
        var maskId = "mask-".concat(explicitMaskId || nextUniqueId());
        var clipId = "clip-".concat(explicitMaskId || nextUniqueId());
        var maskTag = {
          tag: "mask",
          attributes: _objectSpread2(_objectSpread2({}, ALL_SPACE), {}, {
            id: maskId,
            maskUnits: "userSpaceOnUse",
            maskContentUnits: "userSpaceOnUse"
          }),
          children: [maskRect, maskOuterGroup]
        };
        var defs = {
          tag: "defs",
          children: [{
            tag: "clipPath",
            attributes: {
              id: clipId
            },
            children: deGroup(maskPath)
          }, maskTag]
        };
        children.push(defs, {
          tag: "rect",
          attributes: _objectSpread2({
            fill: "currentColor",
            "clip-path": "url(#".concat(clipId, ")"),
            mask: "url(#".concat(maskId, ")")
          }, ALL_SPACE)
        });
        return {
          children,
          attributes
        };
      };
    }
  };
  var MissingIconIndicator = {
    provides: function provides6(providers2) {
      var reduceMotion = false;
      if (WINDOW.matchMedia) {
        reduceMotion = WINDOW.matchMedia("(prefers-reduced-motion: reduce)").matches;
      }
      providers2.missingIconAbstract = function() {
        var gChildren = [];
        var FILL = {
          fill: "currentColor"
        };
        var ANIMATION_BASE = {
          attributeType: "XML",
          repeatCount: "indefinite",
          dur: "2s"
        };
        gChildren.push({
          tag: "path",
          attributes: _objectSpread2(_objectSpread2({}, FILL), {}, {
            d: "M156.5,447.7l-12.6,29.5c-18.7-9.5-35.9-21.2-51.5-34.9l22.7-22.7C127.6,430.5,141.5,440,156.5,447.7z M40.6,272H8.5 c1.4,21.2,5.4,41.7,11.7,61.1L50,321.2C45.1,305.5,41.8,289,40.6,272z M40.6,240c1.4-18.8,5.2-37,11.1-54.1l-29.5-12.6 C14.7,194.3,10,216.7,8.5,240H40.6z M64.3,156.5c7.8-14.9,17.2-28.8,28.1-41.5L69.7,92.3c-13.7,15.6-25.5,32.8-34.9,51.5 L64.3,156.5z M397,419.6c-13.9,12-29.4,22.3-46.1,30.4l11.9,29.8c20.7-9.9,39.8-22.6,56.9-37.6L397,419.6z M115,92.4 c13.9-12,29.4-22.3,46.1-30.4l-11.9-29.8c-20.7,9.9-39.8,22.6-56.8,37.6L115,92.4z M447.7,355.5c-7.8,14.9-17.2,28.8-28.1,41.5 l22.7,22.7c13.7-15.6,25.5-32.9,34.9-51.5L447.7,355.5z M471.4,272c-1.4,18.8-5.2,37-11.1,54.1l29.5,12.6 c7.5-21.1,12.2-43.5,13.6-66.8H471.4z M321.2,462c-15.7,5-32.2,8.2-49.2,9.4v32.1c21.2-1.4,41.7-5.4,61.1-11.7L321.2,462z M240,471.4c-18.8-1.4-37-5.2-54.1-11.1l-12.6,29.5c21.1,7.5,43.5,12.2,66.8,13.6V471.4z M462,190.8c5,15.7,8.2,32.2,9.4,49.2h32.1 c-1.4-21.2-5.4-41.7-11.7-61.1L462,190.8z M92.4,397c-12-13.9-22.3-29.4-30.4-46.1l-29.8,11.9c9.9,20.7,22.6,39.8,37.6,56.9 L92.4,397z M272,40.6c18.8,1.4,36.9,5.2,54.1,11.1l12.6-29.5C317.7,14.7,295.3,10,272,8.5V40.6z M190.8,50 c15.7-5,32.2-8.2,49.2-9.4V8.5c-21.2,1.4-41.7,5.4-61.1,11.7L190.8,50z M442.3,92.3L419.6,115c12,13.9,22.3,29.4,30.5,46.1 l29.8-11.9C470,128.5,457.3,109.4,442.3,92.3z M397,92.4l22.7-22.7c-15.6-13.7-32.8-25.5-51.5-34.9l-12.6,29.5 C370.4,72.1,384.4,81.5,397,92.4z"
          })
        });
        var OPACITY_ANIMATE = _objectSpread2(_objectSpread2({}, ANIMATION_BASE), {}, {
          attributeName: "opacity"
        });
        var dot = {
          tag: "circle",
          attributes: _objectSpread2(_objectSpread2({}, FILL), {}, {
            cx: "256",
            cy: "364",
            r: "28"
          }),
          children: []
        };
        if (!reduceMotion) {
          dot.children.push({
            tag: "animate",
            attributes: _objectSpread2(_objectSpread2({}, ANIMATION_BASE), {}, {
              attributeName: "r",
              values: "28;14;28;28;14;28;"
            })
          }, {
            tag: "animate",
            attributes: _objectSpread2(_objectSpread2({}, OPACITY_ANIMATE), {}, {
              values: "1;0;1;1;0;1;"
            })
          });
        }
        gChildren.push(dot);
        gChildren.push({
          tag: "path",
          attributes: _objectSpread2(_objectSpread2({}, FILL), {}, {
            opacity: "1",
            d: "M263.7,312h-16c-6.6,0-12-5.4-12-12c0-71,77.4-63.9,77.4-107.8c0-20-17.8-40.2-57.4-40.2c-29.1,0-44.3,9.6-59.2,28.7 c-3.9,5-11.1,6-16.2,2.4l-13.1-9.2c-5.6-3.9-6.9-11.8-2.6-17.2c21.2-27.2,46.4-44.7,91.2-44.7c52.3,0,97.4,29.8,97.4,80.2 c0,67.6-77.4,63.5-77.4,107.8C275.7,306.6,270.3,312,263.7,312z"
          }),
          children: reduceMotion ? [] : [{
            tag: "animate",
            attributes: _objectSpread2(_objectSpread2({}, OPACITY_ANIMATE), {}, {
              values: "1;0;0;0;0;1;"
            })
          }]
        });
        if (!reduceMotion) {
          gChildren.push({
            tag: "path",
            attributes: _objectSpread2(_objectSpread2({}, FILL), {}, {
              opacity: "0",
              d: "M232.5,134.5l7,168c0.3,6.4,5.6,11.5,12,11.5h9c6.4,0,11.7-5.1,12-11.5l7-168c0.3-6.8-5.2-12.5-12-12.5h-23 C237.7,122,232.2,127.7,232.5,134.5z"
            }),
            children: [{
              tag: "animate",
              attributes: _objectSpread2(_objectSpread2({}, OPACITY_ANIMATE), {}, {
                values: "0;0;1;1;0;0;"
              })
            }]
          });
        }
        return {
          tag: "g",
          attributes: {
            "class": "missing"
          },
          children: gChildren
        };
      };
    }
  };
  var SvgSymbols = {
    hooks: function hooks7() {
      return {
        parseNodeAttributes: function parseNodeAttributes(accumulator, node) {
          var symbolData = node.getAttribute("data-fa-symbol");
          var symbol = symbolData === null ? false : symbolData === "" ? true : symbolData;
          accumulator["symbol"] = symbol;
          return accumulator;
        }
      };
    }
  };
  var plugins = [InjectCSS, ReplaceElements, Layers, LayersCounter, LayersText, PseudoElements, MutationObserver$1, PowerTransforms, Masks, MissingIconIndicator, SvgSymbols];
  registerPlugins(plugins, {
    mixoutsTo: api
  });
  var noAuto$1 = api.noAuto;
  var config$1 = api.config;
  var library$1 = api.library;
  var dom$1 = api.dom;
  var parse$1 = api.parse;
  var findIconDefinition$1 = api.findIconDefinition;
  var toHtml$1 = api.toHtml;
  var icon2 = api.icon;
  var layer = api.layer;
  var text = api.text;
  var counter = api.counter;

  // ../../../../node_modules/@fortawesome/free-solid-svg-icons/index.mjs
  var faCircleCheck = {
    prefix: "fas",
    iconName: "circle-check",
    icon: [512, 512, [61533, "check-circle"], "f058", "M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"]
  };
  var faEnvelope = {
    prefix: "fas",
    iconName: "envelope",
    icon: [512, 512, [128386, 9993, 61443], "f0e0", "M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"]
  };
  var faEllipsisVertical = {
    prefix: "fas",
    iconName: "ellipsis-vertical",
    icon: [128, 512, ["ellipsis-v"], "f142", "M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z"]
  };
  var faSun = {
    prefix: "fas",
    iconName: "sun",
    icon: [512, 512, [9728], "f185", "M361.5 1.2c5 2.1 8.6 6.6 9.6 11.9L391 121l107.9 19.8c5.3 1 9.8 4.6 11.9 9.6s1.5 10.7-1.6 15.2L446.9 256l62.3 90.3c3.1 4.5 3.7 10.2 1.6 15.2s-6.6 8.6-11.9 9.6L391 391 371.1 498.9c-1 5.3-4.6 9.8-9.6 11.9s-10.7 1.5-15.2-1.6L256 446.9l-90.3 62.3c-4.5 3.1-10.2 3.7-15.2 1.6s-8.6-6.6-9.6-11.9L121 391 13.1 371.1c-5.3-1-9.8-4.6-11.9-9.6s-1.5-10.7 1.6-15.2L65.1 256 2.8 165.7c-3.1-4.5-3.7-10.2-1.6-15.2s6.6-8.6 11.9-9.6L121 121 140.9 13.1c1-5.3 4.6-9.8 9.6-11.9s10.7-1.5 15.2 1.6L256 65.1 346.3 2.8c4.5-3.1 10.2-3.7 15.2-1.6zM160 256a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zm224 0a128 128 0 1 0 -256 0 128 128 0 1 0 256 0z"]
  };
  var faMoon = {
    prefix: "fas",
    iconName: "moon",
    icon: [384, 512, [127769, 9214], "f186", "M223.5 32C100 32 0 132.3 0 256S100 480 223.5 480c60.6 0 115.5-24.2 155.8-63.4c5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6c-96.9 0-175.5-78.8-175.5-176c0-65.8 36-123.1 89.3-153.3c6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z"]
  };
  var faDesktop = {
    prefix: "fas",
    iconName: "desktop",
    icon: [576, 512, [128421, 61704, "desktop-alt"], "f390", "M64 0C28.7 0 0 28.7 0 64V352c0 35.3 28.7 64 64 64H240l-10.7 32H160c-17.7 0-32 14.3-32 32s14.3 32 32 32H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H346.7L336 416H512c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64H64zM512 64V288H64V64H512z"]
  };
  var faShare = {
    prefix: "fas",
    iconName: "share",
    icon: [512, 512, ["mail-forward"], "f064", "M307 34.8c-11.5 5.1-19 16.6-19 29.2v64H176C78.8 128 0 206.8 0 304C0 417.3 81.5 467.9 100.2 478.1c2.5 1.4 5.3 1.9 8.1 1.9c10.9 0 19.7-8.9 19.7-19.7c0-7.5-4.3-14.4-9.8-19.5C108.8 431.9 96 414.4 96 384c0-53 43-96 96-96h96v64c0 12.6 7.4 24.1 19 29.2s25 3 34.4-5.4l160-144c6.7-6.1 10.6-14.7 10.6-23.8s-3.8-17.7-10.6-23.8l-160-144c-9.4-8.5-22.9-10.6-34.4-5.4z"]
  };

  // ../../../../node_modules/@customerjourney/cj-core/src/components/PageHeader.js
  var PageHeader = class extends AppElement {
    #default = {
      brand: {
        src: "https://customerjourney.ninja/assets/images/cj-js.png"
      },
      theme: {
        text: {
          es: "Tema",
          en: "Theme",
          fr: "Th\xE8me"
        }
      },
      themeValues: {
        light: {
          text: {
            es: "Claro",
            en: "Light",
            fr: "Clair"
          }
        },
        dark: {
          text: {
            es: "Oscuro",
            en: "Dark",
            fr: "Sombre"
          }
        },
        system: {
          text: {
            es: "Sistema",
            en: "System",
            fr: "Syst\xE8me"
          }
        }
      }
    };
    #sunIcon = icon2(faSun, { classes: ["fa-1x", "has-text-warning"] }).html[0];
    #moonIcon = icon2(faMoon, { classes: ["fa-1x", "has-text-grey-light"] }).html[0];
    #desktopIcon = icon2(faDesktop, { classes: ["fa-1x", "has-text-info"] }).html[0];
    constructor(props = {}) {
      super();
      this.state = this.initState(this.#default, props);
      this.getAttribute("id") || this.setAttribute("id", this.state.id || `header-${Math.floor(Math.random() * 100)}`);
      this.setAttribute("i18n", this.state.context?.lang);
      this.setAttribute("theme", this.state.context?.theme);
    }
    handleEvent(event) {
      if (event.type === "click") {
        let theme = "";
        switch (event.currentTarget.id) {
          case "themes":
            let themes = document.getElementById(event.currentTarget.id);
            themes.parentNode.classList.toggle("is-active");
            break;
          case "light-theme":
            document.getElementById("themes").parentNode.classList.toggle("is-active");
            document.documentElement.setAttribute("data-theme", "light");
            theme = "light";
            break;
          case "dark-theme":
            document.getElementById("themes").parentNode.classList.toggle("is-active");
            document.documentElement.setAttribute("data-theme", "dark");
            document.documentElement.classList.add("cc--darkmode");
            theme = "dark";
            break;
          case "system-theme":
            document.getElementById("themes").parentNode.classList.toggle("is-active");
            document.documentElement.removeAttribute("data-theme");
            theme = "system";
            break;
          default:
            const selectLang = new CustomEvent("user:select-lang", {
              detail: event.target.id.slice(4),
              bubbles: true,
              composed: true
            });
            this.dispatchEvent(selectLang);
            break;
        }
        if (theme !== "") {
          const selectTheme = new CustomEvent("user:select-theme", {
            detail: theme,
            bubbles: true,
            composed: true
          });
          this.dispatchEvent(selectTheme);
        }
      }
    }
    #getButtons() {
      let lngButtons = ``;
      Object.entries(this.state.i18n.lang).forEach(([key, value]) => {
        let focus = ["button"];
        if (key === this.state.context.lang) {
          focus.push("is-focused");
        }
        lngButtons += `<button id="btn-${key}" ${this.getClasses(focus, this.state.i18n?.classList)}">${value}</button>`;
      });
      return lngButtons;
    }
    addEvents() {
      let themes = document.querySelector("#themes");
      themes.addEventListener("click", this);
      let lightTheme = document.querySelector("#light-theme");
      lightTheme.addEventListener("click", this);
      let darkTheme = document.querySelector("#dark-theme");
      darkTheme.addEventListener("click", this);
      let systemTheme = document.querySelector("#system-theme");
      systemTheme.addEventListener("click", this);
      if (this.state.i18n?.lang != void 0) {
        Object.entries(this.state.i18n.lang).forEach(([key, value]) => {
          this.querySelector(`#btn-${key}`).addEventListener("click", this);
        });
      }
    }
    #setTheme() {
      switch (this.state.context.theme) {
        case "light":
          return this.#sunIcon;
          break;
        case "dark":
          return this.#moonIcon;
          break;
        default:
          return this.#desktopIcon;
          break;
      }
    }
    render() {
      this.innerHTML = /* html */
      `
            <header>
            <nav ${this.getClasses(["navbar"], this.state.classList)} role="navigation" aria-label="main navigation">
                <div class="navbar-brand">
                <img class="navbar-item"  src="${this.state.context?.theme === "light" ? this.state.brand?.src : this.state.brand?.srcDark === void 0 ? this.state.brand?.src : this.state.brand?.srcDark}" width="180" height="28">
                <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
                </div>
                <div class="navbar-menu">
                <div class="navbar-start">
                <div class="navbar-item has-dropdown">
                    <a id="themes" class="navbar-link is-arrowless">
                        ${this.state.theme?.text[this.state.context.lang]} ${this.#setTheme()}
                    </a>
                    <div class="navbar-dropdown">                   
                        <a id="light-theme" class="navbar-item">
                            ${this.#sunIcon} ${this.state.themeValues.light.text[this.state.context.lang]}
                        </a>
                        <a id="dark-theme" class="navbar-item">
                            ${this.#moonIcon} ${this.state.themeValues.dark.text[this.state.context.lang]}
                        </a>
                        <a id="system-theme" class="navbar-item">
                            ${this.#desktopIcon} ${this.state.themeValues.system.text[this.state.context.lang]}
                        </a>
                    </div>
                </div>
                </div>
                ${this.state.i18n === void 0 ? "" : `
                <div class="navbar-end">
                    <div class="navbar-item">
                        <div class="buttons are-small">
                            ${this.#getButtons()}
                        </div>
                    </div>
                </div>
                `}
                </div>
            </nav>
        </header>
        `;
      this.addEvents();
      let burger = this.querySelector(".navbar-burger");
      let menu = this.querySelector(".navbar-menu");
      burger.addEventListener("click", () => {
        burger.classList.toggle("is-active");
        menu.classList.toggle("is-active");
      });
    }
  };
  customElements.define("page-header", PageHeader);

  // ../../../../node_modules/@fortawesome/free-brands-svg-icons/index.mjs
  var faVk = {
    prefix: "fab",
    iconName: "vk",
    icon: [448, 512, [], "f189", "M31.4907 63.4907C0 94.9813 0 145.671 0 247.04V264.96C0 366.329 0 417.019 31.4907 448.509C62.9813 480 113.671 480 215.04 480H232.96C334.329 480 385.019 480 416.509 448.509C448 417.019 448 366.329 448 264.96V247.04C448 145.671 448 94.9813 416.509 63.4907C385.019 32 334.329 32 232.96 32H215.04C113.671 32 62.9813 32 31.4907 63.4907ZM75.6 168.267H126.747C128.427 253.76 166.133 289.973 196 297.44V168.267H244.16V242C273.653 238.827 304.64 205.227 315.093 168.267H363.253C359.313 187.435 351.46 205.583 340.186 221.579C328.913 237.574 314.461 251.071 297.733 261.227C316.41 270.499 332.907 283.63 346.132 299.751C359.357 315.873 369.01 334.618 374.453 354.747H321.44C316.555 337.262 306.614 321.61 292.865 309.754C279.117 297.899 262.173 290.368 244.16 288.107V354.747H238.373C136.267 354.747 78.0267 284.747 75.6 168.267Z"]
  };
  var faSquareInstagram = {
    prefix: "fab",
    iconName: "square-instagram",
    icon: [448, 512, ["instagram-square"], "e055", "M194.4 211.7a53.3 53.3 0 1 0 59.3 88.7 53.3 53.3 0 1 0 -59.3-88.7zm142.3-68.4c-5.2-5.2-11.5-9.3-18.4-12c-18.1-7.1-57.6-6.8-83.1-6.5c-4.1 0-7.9 .1-11.2 .1c-3.3 0-7.2 0-11.4-.1c-25.5-.3-64.8-.7-82.9 6.5c-6.9 2.7-13.1 6.8-18.4 12s-9.3 11.5-12 18.4c-7.1 18.1-6.7 57.7-6.5 83.2c0 4.1 .1 7.9 .1 11.1s0 7-.1 11.1c-.2 25.5-.6 65.1 6.5 83.2c2.7 6.9 6.8 13.1 12 18.4s11.5 9.3 18.4 12c18.1 7.1 57.6 6.8 83.1 6.5c4.1 0 7.9-.1 11.2-.1c3.3 0 7.2 0 11.4 .1c25.5 .3 64.8 .7 82.9-6.5c6.9-2.7 13.1-6.8 18.4-12s9.3-11.5 12-18.4c7.2-18 6.8-57.4 6.5-83c0-4.2-.1-8.1-.1-11.4s0-7.1 .1-11.4c.3-25.5 .7-64.9-6.5-83l0 0c-2.7-6.9-6.8-13.1-12-18.4zm-67.1 44.5A82 82 0 1 1 178.4 324.2a82 82 0 1 1 91.1-136.4zm29.2-1.3c-3.1-2.1-5.6-5.1-7.1-8.6s-1.8-7.3-1.1-11.1s2.6-7.1 5.2-9.8s6.1-4.5 9.8-5.2s7.6-.4 11.1 1.1s6.5 3.9 8.6 7s3.2 6.8 3.2 10.6c0 2.5-.5 5-1.4 7.3s-2.4 4.4-4.1 6.2s-3.9 3.2-6.2 4.2s-4.8 1.5-7.3 1.5l0 0c-3.8 0-7.5-1.1-10.6-3.2zM448 96c0-35.3-28.7-64-64-64H64C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96zM357 389c-18.7 18.7-41.4 24.6-67 25.9c-26.4 1.5-105.6 1.5-132 0c-25.6-1.3-48.3-7.2-67-25.9s-24.6-41.4-25.8-67c-1.5-26.4-1.5-105.6 0-132c1.3-25.6 7.1-48.3 25.8-67s41.5-24.6 67-25.8c26.4-1.5 105.6-1.5 132 0c25.6 1.3 48.3 7.1 67 25.8s24.6 41.4 25.8 67c1.5 26.3 1.5 105.4 0 131.9c-1.3 25.6-7.1 48.3-25.8 67z"]
  };
  var faDiscord = {
    prefix: "fab",
    iconName: "discord",
    icon: [640, 512, [], "f392", "M524.531,69.836a1.5,1.5,0,0,0-.764-.7A485.065,485.065,0,0,0,404.081,32.03a1.816,1.816,0,0,0-1.923.91,337.461,337.461,0,0,0-14.9,30.6,447.848,447.848,0,0,0-134.426,0,309.541,309.541,0,0,0-15.135-30.6,1.89,1.89,0,0,0-1.924-.91A483.689,483.689,0,0,0,116.085,69.137a1.712,1.712,0,0,0-.788.676C39.068,183.651,18.186,294.69,28.43,404.354a2.016,2.016,0,0,0,.765,1.375A487.666,487.666,0,0,0,176.02,479.918a1.9,1.9,0,0,0,2.063-.676A348.2,348.2,0,0,0,208.12,430.4a1.86,1.86,0,0,0-1.019-2.588,321.173,321.173,0,0,1-45.868-21.853,1.885,1.885,0,0,1-.185-3.126c3.082-2.309,6.166-4.711,9.109-7.137a1.819,1.819,0,0,1,1.9-.256c96.229,43.917,200.41,43.917,295.5,0a1.812,1.812,0,0,1,1.924.233c2.944,2.426,6.027,4.851,9.132,7.16a1.884,1.884,0,0,1-.162,3.126,301.407,301.407,0,0,1-45.89,21.83,1.875,1.875,0,0,0-1,2.611,391.055,391.055,0,0,0,30.014,48.815,1.864,1.864,0,0,0,2.063.7A486.048,486.048,0,0,0,610.7,405.729a1.882,1.882,0,0,0,.765-1.352C623.729,277.594,590.933,167.465,524.531,69.836ZM222.491,337.58c-28.972,0-52.844-26.587-52.844-59.239S193.056,219.1,222.491,219.1c29.665,0,53.306,26.82,52.843,59.239C275.334,310.993,251.924,337.58,222.491,337.58Zm195.38,0c-28.971,0-52.843-26.587-52.843-59.239S388.437,219.1,417.871,219.1c29.667,0,53.307,26.82,52.844,59.239C470.715,310.993,447.538,337.58,417.871,337.58Z"]
  };
  var faSquareGithub = {
    prefix: "fab",
    iconName: "square-github",
    icon: [448, 512, ["github-square"], "f092", "M448 96c0-35.3-28.7-64-64-64H64C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96zM265.8 407.7c0-1.8 0-6 .1-11.6c.1-11.4 .1-28.8 .1-43.7c0-15.6-5.2-25.5-11.3-30.7c37-4.1 76-9.2 76-73.1c0-18.2-6.5-27.3-17.1-39c1.7-4.3 7.4-22-1.7-45c-13.9-4.3-45.7 17.9-45.7 17.9c-13.2-3.7-27.5-5.6-41.6-5.6s-28.4 1.9-41.6 5.6c0 0-31.8-22.2-45.7-17.9c-9.1 22.9-3.5 40.6-1.7 45c-10.6 11.7-15.6 20.8-15.6 39c0 63.6 37.3 69 74.3 73.1c-4.8 4.3-9.1 11.7-10.6 22.3c-9.5 4.3-33.8 11.7-48.3-13.9c-9.1-15.8-25.5-17.1-25.5-17.1c-16.2-.2-1.1 10.2-1.1 10.2c10.8 5 18.4 24.2 18.4 24.2c9.7 29.7 56.1 19.7 56.1 19.7c0 9 .1 21.7 .1 30.6c0 4.8 .1 8.6 .1 10c0 4.3-3 9.5-11.5 8C106 393.6 59.8 330.8 59.8 257.4c0-91.8 70.2-161.5 162-161.5s166.2 69.7 166.2 161.5c.1 73.4-44.7 136.3-110.7 158.3c-8.4 1.5-11.5-3.7-11.5-8zm-90.5-54.8c-.2-1.5 1.1-2.8 3-3.2c1.9-.2 3.7 .6 3.9 1.9c.3 1.3-1 2.6-3 3c-1.9 .4-3.7-.4-3.9-1.7zm-9.1 3.2c-2.2 .2-3.7-.9-3.7-2.4c0-1.3 1.5-2.4 3.5-2.4c1.9-.2 3.7 .9 3.7 2.4c0 1.3-1.5 2.4-3.5 2.4zm-14.3-2.2c-1.9-.4-3.2-1.9-2.8-3.2s2.4-1.9 4.1-1.5c2 .6 3.3 2.1 2.8 3.4c-.4 1.3-2.4 1.9-4.1 1.3zm-12.5-7.3c-1.5-1.3-1.9-3.2-.9-4.1c.9-1.1 2.8-.9 4.3 .6c1.3 1.3 1.8 3.3 .9 4.1c-.9 1.1-2.8 .9-4.3-.6zm-8.5-10c-1.1-1.5-1.1-3.2 0-3.9c1.1-.9 2.8-.2 3.7 1.3c1.1 1.5 1.1 3.3 0 4.1c-.9 .6-2.6 0-3.7-1.5zm-6.3-8.8c-1.1-1.3-1.3-2.8-.4-3.5c.9-.9 2.4-.4 3.5 .6c1.1 1.3 1.3 2.8 .4 3.5c-.9 .9-2.4 .4-3.5-.6zm-6-6.4c-1.3-.6-1.9-1.7-1.5-2.6c.4-.6 1.5-.9 2.8-.4c1.3 .7 1.9 1.8 1.5 2.6c-.4 .9-1.7 1.1-2.8 .4z"]
  };
  var faSquareThreads = {
    prefix: "fab",
    iconName: "square-threads",
    icon: [448, 512, [], "e619", "M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zM294.2 244.3c19.5 9.3 33.7 23.5 41.2 40.9c10.4 24.3 11.4 63.9-20.2 95.4c-24.2 24.1-53.5 35-95.1 35.3h-.2c-46.8-.3-82.8-16.1-106.9-46.8C91.5 341.8 80.4 303.7 80 256v-.1-.1c.4-47.7 11.5-85.7 33-113.1c24.2-30.7 60.2-46.5 106.9-46.8h.2c46.9 .3 83.3 16 108.2 46.6c12.3 15.1 21.3 33.3 27 54.4l-26.9 7.2c-4.7-17.2-11.9-31.9-21.4-43.6c-19.4-23.9-48.7-36.1-87-36.4c-38 .3-66.8 12.5-85.5 36.2c-17.5 22.3-26.6 54.4-26.9 95.5c.3 41.1 9.4 73.3 26.9 95.5c18.7 23.8 47.4 36 85.5 36.2c34.3-.3 56.9-8.4 75.8-27.3c21.5-21.5 21.1-47.9 14.2-64c-4-9.4-11.4-17.3-21.3-23.3c-2.4 18-7.9 32.2-16.5 43.2c-11.4 14.5-27.7 22.4-48.4 23.5c-15.7 .9-30.8-2.9-42.6-10.7c-13.9-9.2-22-23.2-22.9-39.5c-1.7-32.2 23.8-55.3 63.5-57.6c14.1-.8 27.3-.2 39.5 1.9c-1.6-9.9-4.9-17.7-9.8-23.4c-6.7-7.8-17.1-11.8-30.8-11.9h-.4c-11 0-26 3.1-35.6 17.6l-23-15.8c12.8-19.4 33.6-30.1 58.5-30.1h.6c41.8 .3 66.6 26.3 69.1 71.8c1.4 .6 2.8 1.2 4.2 1.9l.1 .5zm-71.8 67.5c17-.9 36.4-7.6 39.7-48.8c-8.8-1.9-18.6-2.9-29-2.9c-3.2 0-6.4 .1-9.6 .3c-28.6 1.6-38.1 15.5-37.4 27.9c.9 16.7 19 24.5 36.4 23.6l-.1-.1z"]
  };
  var faSquareGitlab = {
    prefix: "fab",
    iconName: "square-gitlab",
    icon: [448, 512, ["gitlab-square"], "e5ae", "M0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64C28.7 32 0 60.7 0 96zm337.5 12.5l44.6 116.4 .4 1.2c5.6 16.8 7.2 35.2 2.3 52.5c-5 17.2-15.4 32.4-29.8 43.3l-.2 .1-68.4 51.2-54.1 40.9c-.5 .2-1.1 .5-1.7 .8c-2 1-4.4 2-6.7 2c-3 0-6.8-1.8-8.3-2.8l-54.2-40.9L93.5 322.3l-.4-.3-.2-.1c-14.3-10.8-24.8-26-29.7-43.3s-4.2-35.7 2.2-52.5l.5-1.2 44.7-116.4c.9-2.3 2.5-4.3 4.5-5.6c1.6-1 3.4-1.6 5.2-1.8c1.3-.7 2.1-.4 3.4 .1c.6 .2 1.2 .5 2 .7c1 .4 1.6 .9 2.4 1.5c.6 .4 1.2 1 2.1 1.5c1.2 1.4 2.2 3 2.7 4.8l29.2 92.2H285l30.2-92.2c.5-1.8 1.4-3.4 2.6-4.8s2.8-2.4 4.5-3.1c1.7-.6 3.6-.9 5.4-.7s3.6 .8 5.2 1.8c2 1.3 3.7 3.3 4.6 5.6z"]
  };
  var faTiktok = {
    prefix: "fab",
    iconName: "tiktok",
    icon: [448, 512, [], "e07b", "M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z"]
  };
  var faSquareFacebook = {
    prefix: "fab",
    iconName: "square-facebook",
    icon: [448, 512, ["facebook-square"], "f082", "M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64h98.2V334.2H109.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H255V480H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64z"]
  };
  var faLinkedin = {
    prefix: "fab",
    iconName: "linkedin",
    icon: [448, 512, [], "f08c", "M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"]
  };
  var faTwitch = {
    prefix: "fab",
    iconName: "twitch",
    icon: [512, 512, [], "f1e8", "M391.17,103.47H352.54v109.7h38.63ZM285,103H246.37V212.75H285ZM120.83,0,24.31,91.42V420.58H140.14V512l96.53-91.42h77.25L487.69,256V0ZM449.07,237.75l-77.22,73.12H294.61l-67.6,64v-64H140.14V36.58H449.07Z"]
  };
  var faYoutube = {
    prefix: "fab",
    iconName: "youtube",
    icon: [576, 512, [61802], "f167", "M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"]
  };
  var faTelegram = {
    prefix: "fab",
    iconName: "telegram",
    icon: [496, 512, [62462, "telegram-plane"], "f2c6", "M248,8C111.033,8,0,119.033,0,256S111.033,504,248,504,496,392.967,496,256,384.967,8,248,8ZM362.952,176.66c-3.732,39.215-19.881,134.378-28.1,178.3-3.476,18.584-10.322,24.816-16.948,25.425-14.4,1.326-25.338-9.517-39.287-18.661-21.827-14.308-34.158-23.215-55.346-37.177-24.485-16.135-8.612-25,5.342-39.5,3.652-3.793,67.107-61.51,68.335-66.746.153-.655.3-3.1-1.154-4.384s-3.59-.849-5.135-.5q-3.283.746-104.608,69.142-14.845,10.194-26.894,9.934c-8.855-.191-25.888-5.006-38.551-9.123-15.531-5.048-27.875-7.717-26.8-16.291q.84-6.7,18.45-13.7,108.446-47.248,144.628-62.3c68.872-28.647,83.183-33.623,92.511-33.789,2.052-.034,6.639.474,9.61,2.885a10.452,10.452,0,0,1,3.53,6.716A43.765,43.765,0,0,1,362.952,176.66Z"]
  };
  var faSquareWhatsapp = {
    prefix: "fab",
    iconName: "square-whatsapp",
    icon: [448, 512, ["whatsapp-square"], "f40c", "M92.1 254.6c0 24.9 7 49.2 20.2 70.1l3.1 5-13.3 48.6L152 365.2l4.8 2.9c20.2 12 43.4 18.4 67.1 18.4h.1c72.6 0 133.3-59.1 133.3-131.8c0-35.2-15.2-68.3-40.1-93.2c-25-25-58-38.7-93.2-38.7c-72.7 0-131.8 59.1-131.9 131.8zM274.8 330c-12.6 1.9-22.4 .9-47.5-9.9c-36.8-15.9-61.8-51.5-66.9-58.7c-.4-.6-.7-.9-.8-1.1c-2-2.6-16.2-21.5-16.2-41c0-18.4 9-27.9 13.2-32.3c.3-.3 .5-.5 .7-.8c3.6-4 7.9-5 10.6-5c2.6 0 5.3 0 7.6 .1c.3 0 .5 0 .8 0c2.3 0 5.2 0 8.1 6.8c1.2 2.9 3 7.3 4.9 11.8c3.3 8 6.7 16.3 7.3 17.6c1 2 1.7 4.3 .3 6.9c-3.4 6.8-6.9 10.4-9.3 13c-3.1 3.2-4.5 4.7-2.3 8.6c15.3 26.3 30.6 35.4 53.9 47.1c4 2 6.3 1.7 8.6-1c2.3-2.6 9.9-11.6 12.5-15.5c2.6-4 5.3-3.3 8.9-2s23.1 10.9 27.1 12.9c.8 .4 1.5 .7 2.1 1c2.8 1.4 4.7 2.3 5.5 3.6c.9 1.9 .9 9.9-2.4 19.1c-3.3 9.3-19.1 17.7-26.7 18.8zM448 96c0-35.3-28.7-64-64-64H64C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96zM148.1 393.9L64 416l22.5-82.2c-13.9-24-21.2-51.3-21.2-79.3C65.4 167.1 136.5 96 223.9 96c42.4 0 82.2 16.5 112.2 46.5c29.9 30 47.9 69.8 47.9 112.2c0 87.4-72.7 158.5-160.1 158.5c-26.6 0-52.7-6.7-75.8-19.3z"]
  };
  var faSquareXTwitter = {
    prefix: "fab",
    iconName: "square-x-twitter",
    icon: [448, 512, [], "e61a", "M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm297.1 84L257.3 234.6 379.4 396H283.8L209 298.1 123.3 396H75.8l111-126.9L69.7 116h98l67.7 89.5L313.6 116h47.5zM323.3 367.6L153.4 142.9H125.1L296.9 367.6h26.3z"]
  };

  // src/components/ShareLink.js
  var ShareLink = class extends AppElement {
    #default = {
      context: {
        lang: "en"
      },
      share: {
        en: "Share on",
        es: "Compartir en",
        fr: "Partager sur"
      }
    };
    constructor(props = {}) {
      super();
      this.eventName = "user:click-modal-box";
      this.state = this.initState(this.#default, props);
      this.getAttribute("id") || this.setAttribute("id", this.state.id || `component-${Math.floor(Math.random() * 100)}`);
    }
    static get observedAttributes() {
      return ["active"];
    }
    attributeChangedCallback(name, old, now) {
      if (name == "active" && now === "1") {
        this.target = this.getAttribute("target");
        this.title = slugify(document.querySelector(`#${this.getAttribute("source")}`).textContent);
        this.render();
        this.querySelector(".modal").classList.add("is-active");
      }
    }
    handleEvent(event) {
      if (event.type === "click") {
        if (event.target.ariaLabel === "close") {
          this.querySelector(".modal").classList.remove("is-active");
          this.removeAttribute("active");
        }
      }
    }
    #getContent() {
      return (
        /*HTML*/
        `
            <div class="modal-card">
                <header class="modal-card-head">
                <p class="modal-card-title">${this.state.title?.text[this.state.context.lang]}</p>
                <button class="delete" aria-label="close"></button>
                </header>
                <section class="modal-card-body">
                <aside class="menu">
                 <ul  class="menu-list is-size-5">
                    <li ><a href="https://www.linkedin.com/shareArticle?mini=true&url=${this.target}&title=${this.title}">${icon2(faLinkedin).html[0]}  ${this.state.share[this.state.context.lang]} Linkedin <span class="is-pulled-right">${icon2(faShare).html[0]}</span></a></li>
                    <li><a href="https://x.com/intent/tweet?text=${this.title}&url=${this.target}">${icon2(faSquareXTwitter).html[0]}  ${this.state.share[this.state.context.lang]} X <span class="is-pulled-right">${icon2(faShare).html[0]}</span></a></li>
                    <li><a href="https://www.facebook.com/sharer/sharer.php?u=${this.target}">${icon2(faSquareFacebook).html[0]}  ${this.state.share[this.state.context.lang]} Facebook <span class="is-pulled-right">${icon2(faShare).html[0]}</span></a></li>
                    <li><a href="https://api.whatsapp.com/send?text=${this.title}%20${this.target}">${icon2(faSquareWhatsapp).html[0]}  ${this.state.share[this.state.context.lang]} Whatsapp <span class="is-pulled-right">${icon2(faShare).html[0]}</span></a></li>
                    <li><a href="https://t.me/share/url?url=${this.target}&text=${this.title}">${icon2(faTelegram).html[0]}  ${this.state.share[this.state.context.lang]} Telegram <span class="is-pulled-right">${icon2(faShare).html[0]}</span></a></li>
                    <li><a href="mailto:?subject=${this.title}&body=${this.target}">${icon2(faEnvelope).html[0]}  ${this.state.share[this.state.context.lang]} eMail <span class="is-pulled-right">${icon2(faShare).html[0]}</span></a></li>
                </ul>
                </aside>
                </section>
            </div>
        `
      );
    }
    render() {
      this.innerHTML = /* html */
      `
        <div class="modal">
            <div class="modal-background"></div>
                ${this.#getContent()}
        </div>
        `;
      this.addEvents();
    }
  };
  customElements.define("share-link", ShareLink);

  // src/components/LinkinBio.js
  var LinkinBio = class extends AppElement {
    #default = {
      cardsWidth: 4,
      buttons: []
    };
    /**
     * 
     * @param {Object} state - {props:{...}, context:{...}}
     */
    constructor(state = {}) {
      super();
      this.eventName = "user:click-linkin-bio";
      this.state = this.initState(this.#default, state);
      this.getAttribute("id") || this.setAttribute("id", this.state.id || `component-${Math.floor(Math.random() * 100)}`);
    }
    #ok = icon2(faCircleCheck, { classes: ["fa-1x", "has-text-link"] }).html[0];
    handleEvent(event) {
      if (this.state?.eventName != void 0) {
        this.eventName = this.state.eventName;
      }
      if (event.type === "click") {
        if (event.target.tagName === "path" || event.target.tagName === "svg" || event.target.tagName === "P" && event.target.classList.contains("option")) {
          const bjClick = new CustomEvent(this.eventName, {
            detail: { link: event.target.closest("p").dataset.share, type: "share", source: event.target.closest("p").dataset.source },
            bubbles: true,
            composed: true
          });
          this.dispatchEvent(bjClick);
        } else if (event.target.tagName === "IMG" || event.target.tagName === "P" && event.target.classList.contains("action")) {
          const bjClick = new CustomEvent(this.eventName, {
            detail: { source: event.target.closest("BUTTON").dataset.source, type: "action" },
            bubbles: true,
            composed: true
          });
          this.dispatchEvent(bjClick);
        } else if (event.target.classList.contains("lang")) {
          const bjClick = new CustomEvent(this.eventName, {
            detail: { source: event.target.id.slice(4), type: "lang" },
            bubbles: true,
            composed: true
          });
          this.dispatchEvent(bjClick);
        }
      }
    }
    addEvents() {
      let buttons = this.querySelectorAll("button");
      if (buttons.length > 0) {
        buttons.forEach((item) => {
          item.addEventListener("click", this);
        });
      }
      ;
      let actions = this.querySelectorAll(".option");
      if (actions.length > 0) {
        actions.forEach((item) => {
          item.addEventListener("click", this);
        });
      }
      ;
      if (this.state.i18n?.lang != void 0) {
        Object.entries(this.state.i18n.lang).forEach(([key, value]) => {
          this.querySelector(`#btn-${key}`).addEventListener("click", this);
        });
      }
    }
    #getSocialBar() {
      let iconClasses = { classes: ["fa-2x", this.state.socialBar?.iconsColor != void 0 ? this.state.socialBar.iconsColor : "has-text-white"] };
      let icons = "";
      if (this.state.socialBar?.networks.length > 0) {
        this.state.socialBar?.networks.forEach((el) => {
          if (el.includes("x.com")) {
            icons += `<a class="p-1"  href="${el}">${icon2(faSquareXTwitter, iconClasses).html[0]}</a>`;
          } else if (el.includes("threads")) {
            icons += `<a class="p-1"  href="${el}">${icon2(faSquareThreads, iconClasses).html[0]}</a>`;
          } else if (el.includes("instagram")) {
            icons += `<a class="p-1"  href="${el}">${icon2(faSquareInstagram, iconClasses).html[0]}</a>`;
          } else if (el.includes("facebook")) {
            icons += `<a class="p-1"  href="${el}">${icon2(faSquareFacebook, iconClasses).html[0]}</a>`;
          } else if (el.includes("youtube")) {
            icons += `<a class="p-1"  href="${el}">${icon2(faYoutube, iconClasses).html[0]}</a>`;
          } else if (el.includes("linkedin")) {
            icons += `<a class="p-1"  href="${el}">${icon2(faLinkedin, iconClasses).html[0]}</a>`;
          } else if (el.includes("vk")) {
            icons += `<a class="p-1"  href="${el}">${icon2(faVk, iconClasses).html[0]}</a>`;
          } else if (el.includes("discord")) {
            icons += `<a class="p-1"  href="${el}">${icon2(faDiscord, iconClasses).html[0]}</a>`;
          } else if (el.includes("twitch")) {
            icons += `<a class="p-1"  href="${el}">${icon2(faTwitch, iconClasses).html[0]}</a>`;
          } else if (el.includes("tiktok")) {
            icons += `<a class="p-1"  href="${el}">${icon2(faTiktok, iconClasses).html[0]}</a>`;
          } else if (el.includes("whatsapp")) {
            icons += `<a class="p-1"  href="${el}">${icon2(faSquareWhatsapp, iconClasses).html[0]}</a>`;
          } else if (el.includes("github")) {
            icons += `<a class="p-1"  href="${el}">${icon2(faSquareGithub, iconClasses).html[0]}</a>`;
          } else if (el.includes("gitlab")) {
            icons += `<a class="p-1"  href="${el}">${icon2(faSquareGitlab, iconClasses).html[0]}</a>`;
          } else if (el.includes("mailto:")) {
            icons += `<a class="p-1"  href="${el}">${icon2(faEnvelope, iconClasses).html[0]}</a>`;
          }
        });
      }
      return (
        /* html */
        `  
    <div class="card" style="box-shadow: none; background-color:transparent;">
        <div class="card-content p-1">
            <div class="media">
                <div class="media-content pt-3" style="height:48px">
                   ${icons}
                </div>
            </div>
        </div>
    </div>
    `
      );
    }
    #getLang() {
      let lngButtons = ``;
      if (this.state.i18n?.lang != void 0) {
        Object.entries(this.state.i18n.lang).forEach(([key, value]) => {
          let focus = ["button", "lang"];
          if (key === this.state.context.lang) {
            if (this.state.i18n?.selectedClassList != void 0) {
              lngButtons += `<button id="btn-${key}" ${this.getClasses(focus, this.state.i18n?.selectedClassList)}>${value}</button>`;
            } else {
              focus.push("is-focused");
              lngButtons += `<button id="btn-${key}" ${this.getClasses(focus, this.state.i18n?.classList)}>${value}</button>`;
            }
            focus.push("is-focused");
          } else {
            lngButtons += `<button id="btn-${key}" ${this.getClasses(focus, this.state.i18n?.classList)}>${value}</button>`;
          }
        });
      }
      ;
      return lngButtons;
    }
    #geti18n() {
      return (
        /* html */
        `
        <div class="buttons buttons are-small is-centered">
            ${this.#getLang()}
        </div>
       `
      );
    }
    #getLinks() {
      let links2 = ``;
      if (this.state.links?.cards.length > 0) {
        this.state.links.cards.forEach((el) => {
          let link = (
            /* html */
            `
                    <div ${typeof el.id === "undefined" ? `` : `id="${el.id}" style="cursor: pointer;" `}  ${this.getClasses(["card", "mt-5"], this.state.links.classList)} ${this.setAnimation(this.state.links.animation)}>
                        <div class="card-content p-2">
                            <div class="media">
                                ${el.imgSrc != void 0 ? `                                     
                                    <figure class="media-left">
                                        ${el.href === void 0 ? `<button style="width:100%" data-source="${el.id}">` : `<a href="${el.href}">`}
                                        <p class="image is-48x48 action">
                                        <img class="action" src="${el.imgSrc}" />
                                        </p>${el.href === void 0 ? `</button>` : `</a>`}
                                    ` : ""}     
                                    </figure>                           
                                <div class="media-content pt-3" style="min-height:48px">
                                     ${el.href === void 0 ? `<button style="width:100%" data-source="${el.id}">` : `<a href="${el.href}" style="color: inherit; text-decoration: none;">`}
                                    <p id="content-${el.id}" class="is-6 action">${el.text[this.state.context.lang]}</p>
                                    ${el.href === void 0 ? `</button>` : `</a>`}
                                </div>
                                <figure class="media-right pt-1">
                                    <p class="icon is-48x48 pt-3 option" data-source="content-${el.id}" data-share="${el.href === void 0 ? "/" : el.href}">
                                    ${icon2(faEllipsisVertical).html[0]}
                                    </p>
                                </figure>
                            </div>
                        </div>
                    </div>
                `
          );
          links2 += link;
          if (typeof el.id != "undefined") {
            this.state.buttons.push(el.id);
          }
        });
      } else {
        console.error("No links to render");
      }
      return links2;
    }
    render() {
      console.log("state", this.state);
      this.innerHTML = /* html */
      `
        <div class="columns is-centered">
            <div class="column is-5 has-text-centered px-5" >
                <figure class="image is-96x96 is-inline-block mt-6 " ${this.setAnimation(this.state.avatar?.animation)}>
                    <img ${this.getClasses([], this.state.avatar?.classList)} src="${this.state.avatar?.src}">
                </figure>
                <div class="card" style="box-shadow: none; background-color:transparent;">
                    <div class="card-content p-1">
                        <div class="media">
                            <div class="media-content pt-3" style="min-height:44px">
                                <p ${this.getClasses(["title", "is-5", "mb-0"], this.state.title?.classList)} ${this.setAnimation(this.state.title?.animation)}>${this.state.title?.text[this.state.context.lang]}${this.state.verified === true ? `${this.#ok}` : ``}</p>
                                <p ${this.getClasses([], this.state.subtitle?.classList)} ${this.setAnimation(this.state.subtitle?.animation)} >${this.state.subtitle?.text[this.state.context.lang]}</p>
                            </div>
                        </div>
                    </div>
                </div>
                ${this.state.i18n?.up === true ? this.#geti18n() : ``}
                ${this.state.socialBar?.up === true ? this.#getSocialBar() : ``}
                ${this.#getLinks()}
                ${this.state.socialBar?.up != true ? this.#getSocialBar() : ``}
                ${this.state.i18n?.up != true ? this.#geti18n() : ``}
                ${this.state.footer?.src === void 0 ? `` : `
               <div class="card mt-1" style="box-shadow: none; background-color:transparent;">
                    <div class="card-content">
                        <div class="media">
                            <div class="media-content has-text-centered " >
                                <figure class="image is-inline-block" style="width:100px">
                                <span ${this.getClasses([], this.state.footer?.message?.classList)}>${this.state.footer?.message?.text[this.state.context.lang]}</span>
                                ${this.state.footer?.url === void 0 ? `` : `<a href="${this.state.footer.url}">`}<img src="${this.state.footer.src}" alt="${this.state.footer?.alt[this.state.context.lang]}">${this.state.footer?.url === void 0 ? `` : `</a>`}
                                </figure>
                            </div>
                        </div>
                    </div>
                </div>`}
            </div>
        </div>  
        `;
      this.addEvents();
    }
  };
  customElements.define("linkin-bio", LinkinBio);

  // ../../../../node_modules/remarkable/dist/esm/index.browser.js
  var textarea;
  function decodeEntity(name) {
    textarea = textarea || document.createElement("textarea");
    textarea.innerHTML = "&" + name + ";";
    return textarea.value;
  }
  var hasOwn = Object.prototype.hasOwnProperty;
  function has(object, key) {
    return object ? hasOwn.call(object, key) : false;
  }
  function assign(obj) {
    var sources = [].slice.call(arguments, 1);
    sources.forEach(function(source) {
      if (!source) {
        return;
      }
      if (typeof source !== "object") {
        throw new TypeError(source + "must be object");
      }
      Object.keys(source).forEach(function(key) {
        obj[key] = source[key];
      });
    });
    return obj;
  }
  var UNESCAPE_MD_RE = /\\([\\!"#$%&'()*+,.\/:;<=>?@[\]^_`{|}~-])/g;
  function unescapeMd(str) {
    if (str.indexOf("\\") < 0) {
      return str;
    }
    return str.replace(UNESCAPE_MD_RE, "$1");
  }
  function isValidEntityCode(c) {
    if (c >= 55296 && c <= 57343) {
      return false;
    }
    if (c >= 64976 && c <= 65007) {
      return false;
    }
    if ((c & 65535) === 65535 || (c & 65535) === 65534) {
      return false;
    }
    if (c >= 0 && c <= 8) {
      return false;
    }
    if (c === 11) {
      return false;
    }
    if (c >= 14 && c <= 31) {
      return false;
    }
    if (c >= 127 && c <= 159) {
      return false;
    }
    if (c > 1114111) {
      return false;
    }
    return true;
  }
  function fromCodePoint(c) {
    if (c > 65535) {
      c -= 65536;
      var surrogate1 = 55296 + (c >> 10), surrogate2 = 56320 + (c & 1023);
      return String.fromCharCode(surrogate1, surrogate2);
    }
    return String.fromCharCode(c);
  }
  var NAMED_ENTITY_RE = /&([a-z#][a-z0-9]{1,31});/gi;
  var DIGITAL_ENTITY_TEST_RE = /^#((?:x[a-f0-9]{1,8}|[0-9]{1,8}))/i;
  function replaceEntityPattern(match, name) {
    var code2 = 0;
    var decoded = decodeEntity(name);
    if (name !== decoded) {
      return decoded;
    } else if (name.charCodeAt(0) === 35 && DIGITAL_ENTITY_TEST_RE.test(name)) {
      code2 = name[1].toLowerCase() === "x" ? parseInt(name.slice(2), 16) : parseInt(name.slice(1), 10);
      if (isValidEntityCode(code2)) {
        return fromCodePoint(code2);
      }
    }
    return match;
  }
  function replaceEntities(str) {
    if (str.indexOf("&") < 0) {
      return str;
    }
    return str.replace(NAMED_ENTITY_RE, replaceEntityPattern);
  }
  var HTML_ESCAPE_TEST_RE = /[&<>"]/;
  var HTML_ESCAPE_REPLACE_RE = /[&<>"]/g;
  var HTML_REPLACEMENTS = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;"
  };
  function replaceUnsafeChar(ch) {
    return HTML_REPLACEMENTS[ch];
  }
  function escapeHtml(str) {
    if (HTML_ESCAPE_TEST_RE.test(str)) {
      return str.replace(HTML_ESCAPE_REPLACE_RE, replaceUnsafeChar);
    }
    return str;
  }
  var rules = {};
  rules.blockquote_open = function() {
    return "<blockquote>\n";
  };
  rules.blockquote_close = function(tokens, idx) {
    return "</blockquote>" + getBreak(tokens, idx);
  };
  rules.code = function(tokens, idx) {
    if (tokens[idx].block) {
      return "<pre><code>" + escapeHtml(tokens[idx].content) + "</code></pre>" + getBreak(tokens, idx);
    }
    return "<code>" + escapeHtml(tokens[idx].content) + "</code>";
  };
  rules.fence = function(tokens, idx, options, env, instance) {
    var token = tokens[idx];
    var langClass = "";
    var langPrefix = options.langPrefix;
    var langName = "", fences2, fenceName;
    var highlighted;
    if (token.params) {
      fences2 = token.params.split(/\s+/g);
      fenceName = fences2.join(" ");
      if (has(instance.rules.fence_custom, fences2[0])) {
        return instance.rules.fence_custom[fences2[0]](tokens, idx, options, env, instance);
      }
      langName = escapeHtml(replaceEntities(unescapeMd(fenceName)));
      langClass = ' class="' + langPrefix + langName + '"';
    }
    if (options.highlight) {
      highlighted = options.highlight.apply(options.highlight, [token.content].concat(fences2)) || escapeHtml(token.content);
    } else {
      highlighted = escapeHtml(token.content);
    }
    return "<pre><code" + langClass + ">" + highlighted + "</code></pre>" + getBreak(tokens, idx);
  };
  rules.fence_custom = {};
  rules.heading_open = function(tokens, idx) {
    return "<h" + tokens[idx].hLevel + ">";
  };
  rules.heading_close = function(tokens, idx) {
    return "</h" + tokens[idx].hLevel + ">\n";
  };
  rules.hr = function(tokens, idx, options) {
    return (options.xhtmlOut ? "<hr />" : "<hr>") + getBreak(tokens, idx);
  };
  rules.bullet_list_open = function() {
    return "<ul>\n";
  };
  rules.bullet_list_close = function(tokens, idx) {
    return "</ul>" + getBreak(tokens, idx);
  };
  rules.list_item_open = function() {
    return "<li>";
  };
  rules.list_item_close = function() {
    return "</li>\n";
  };
  rules.ordered_list_open = function(tokens, idx) {
    var token = tokens[idx];
    var order = token.order > 1 ? ' start="' + token.order + '"' : "";
    return "<ol" + order + ">\n";
  };
  rules.ordered_list_close = function(tokens, idx) {
    return "</ol>" + getBreak(tokens, idx);
  };
  rules.paragraph_open = function(tokens, idx) {
    return tokens[idx].tight ? "" : "<p>";
  };
  rules.paragraph_close = function(tokens, idx) {
    var addBreak = !(tokens[idx].tight && idx && tokens[idx - 1].type === "inline" && !tokens[idx - 1].content);
    return (tokens[idx].tight ? "" : "</p>") + (addBreak ? getBreak(tokens, idx) : "");
  };
  rules.link_open = function(tokens, idx, options) {
    var title = tokens[idx].title ? ' title="' + escapeHtml(replaceEntities(tokens[idx].title)) + '"' : "";
    var target = options.linkTarget ? ' target="' + options.linkTarget + '"' : "";
    return '<a href="' + escapeHtml(tokens[idx].href) + '"' + title + target + ">";
  };
  rules.link_close = function() {
    return "</a>";
  };
  rules.image = function(tokens, idx, options) {
    var src = ' src="' + escapeHtml(tokens[idx].src) + '"';
    var title = tokens[idx].title ? ' title="' + escapeHtml(replaceEntities(tokens[idx].title)) + '"' : "";
    var alt = ' alt="' + (tokens[idx].alt ? escapeHtml(replaceEntities(unescapeMd(tokens[idx].alt))) : "") + '"';
    var suffix = options.xhtmlOut ? " /" : "";
    return "<img" + src + alt + title + suffix + ">";
  };
  rules.table_open = function() {
    return "<table>\n";
  };
  rules.table_close = function() {
    return "</table>\n";
  };
  rules.thead_open = function() {
    return "<thead>\n";
  };
  rules.thead_close = function() {
    return "</thead>\n";
  };
  rules.tbody_open = function() {
    return "<tbody>\n";
  };
  rules.tbody_close = function() {
    return "</tbody>\n";
  };
  rules.tr_open = function() {
    return "<tr>";
  };
  rules.tr_close = function() {
    return "</tr>\n";
  };
  rules.th_open = function(tokens, idx) {
    var token = tokens[idx];
    return "<th" + (token.align ? ' style="text-align:' + token.align + '"' : "") + ">";
  };
  rules.th_close = function() {
    return "</th>";
  };
  rules.td_open = function(tokens, idx) {
    var token = tokens[idx];
    return "<td" + (token.align ? ' style="text-align:' + token.align + '"' : "") + ">";
  };
  rules.td_close = function() {
    return "</td>";
  };
  rules.strong_open = function() {
    return "<strong>";
  };
  rules.strong_close = function() {
    return "</strong>";
  };
  rules.em_open = function() {
    return "<em>";
  };
  rules.em_close = function() {
    return "</em>";
  };
  rules.del_open = function() {
    return "<del>";
  };
  rules.del_close = function() {
    return "</del>";
  };
  rules.ins_open = function() {
    return "<ins>";
  };
  rules.ins_close = function() {
    return "</ins>";
  };
  rules.mark_open = function() {
    return "<mark>";
  };
  rules.mark_close = function() {
    return "</mark>";
  };
  rules.sub = function(tokens, idx) {
    return "<sub>" + escapeHtml(tokens[idx].content) + "</sub>";
  };
  rules.sup = function(tokens, idx) {
    return "<sup>" + escapeHtml(tokens[idx].content) + "</sup>";
  };
  rules.hardbreak = function(tokens, idx, options) {
    return options.xhtmlOut ? "<br />\n" : "<br>\n";
  };
  rules.softbreak = function(tokens, idx, options) {
    return options.breaks ? options.xhtmlOut ? "<br />\n" : "<br>\n" : "\n";
  };
  rules.text = function(tokens, idx) {
    return escapeHtml(tokens[idx].content);
  };
  rules.htmlblock = function(tokens, idx) {
    return tokens[idx].content;
  };
  rules.htmltag = function(tokens, idx) {
    return tokens[idx].content;
  };
  rules.abbr_open = function(tokens, idx) {
    return '<abbr title="' + escapeHtml(replaceEntities(tokens[idx].title)) + '">';
  };
  rules.abbr_close = function() {
    return "</abbr>";
  };
  rules.footnote_ref = function(tokens, idx) {
    var n = Number(tokens[idx].id + 1).toString();
    var id = "fnref" + n;
    if (tokens[idx].subId > 0) {
      id += ":" + tokens[idx].subId;
    }
    return '<sup class="footnote-ref"><a href="#fn' + n + '" id="' + id + '">[' + n + "]</a></sup>";
  };
  rules.footnote_block_open = function(tokens, idx, options) {
    var hr2 = options.xhtmlOut ? '<hr class="footnotes-sep" />\n' : '<hr class="footnotes-sep">\n';
    return hr2 + '<section class="footnotes">\n<ol class="footnotes-list">\n';
  };
  rules.footnote_block_close = function() {
    return "</ol>\n</section>\n";
  };
  rules.footnote_open = function(tokens, idx) {
    var id = Number(tokens[idx].id + 1).toString();
    return '<li id="fn' + id + '"  class="footnote-item">';
  };
  rules.footnote_close = function() {
    return "</li>\n";
  };
  rules.footnote_anchor = function(tokens, idx) {
    var n = Number(tokens[idx].id + 1).toString();
    var id = "fnref" + n;
    if (tokens[idx].subId > 0) {
      id += ":" + tokens[idx].subId;
    }
    return ' <a href="#' + id + '" class="footnote-backref">\u21A9</a>';
  };
  rules.dl_open = function() {
    return "<dl>\n";
  };
  rules.dt_open = function() {
    return "<dt>";
  };
  rules.dd_open = function() {
    return "<dd>";
  };
  rules.dl_close = function() {
    return "</dl>\n";
  };
  rules.dt_close = function() {
    return "</dt>\n";
  };
  rules.dd_close = function() {
    return "</dd>\n";
  };
  function nextToken(tokens, idx) {
    if (++idx >= tokens.length - 2) {
      return idx;
    }
    if (tokens[idx].type === "paragraph_open" && tokens[idx].tight && (tokens[idx + 1].type === "inline" && tokens[idx + 1].content.length === 0) && (tokens[idx + 2].type === "paragraph_close" && tokens[idx + 2].tight)) {
      return nextToken(tokens, idx + 2);
    }
    return idx;
  }
  var getBreak = rules.getBreak = function getBreak2(tokens, idx) {
    idx = nextToken(tokens, idx);
    if (idx < tokens.length && tokens[idx].type === "list_item_close") {
      return "";
    }
    return "\n";
  };
  function Renderer() {
    this.rules = assign({}, rules);
    this.getBreak = rules.getBreak;
  }
  Renderer.prototype.renderInline = function(tokens, options, env) {
    var _rules2 = this.rules;
    var len = tokens.length, i = 0;
    var result = "";
    while (len--) {
      result += _rules2[tokens[i].type](tokens, i++, options, env, this);
    }
    return result;
  };
  Renderer.prototype.render = function(tokens, options, env) {
    var _rules2 = this.rules;
    var len = tokens.length, i = -1;
    var result = "";
    while (++i < len) {
      if (tokens[i].type === "inline") {
        result += this.renderInline(tokens[i].children, options, env);
      } else {
        result += _rules2[tokens[i].type](tokens, i, options, env, this);
      }
    }
    return result;
  };
  function Ruler() {
    this.__rules__ = [];
    this.__cache__ = null;
  }
  Ruler.prototype.__find__ = function(name) {
    var len = this.__rules__.length;
    var i = -1;
    while (len--) {
      if (this.__rules__[++i].name === name) {
        return i;
      }
    }
    return -1;
  };
  Ruler.prototype.__compile__ = function() {
    var self = this;
    var chains = [""];
    self.__rules__.forEach(function(rule) {
      if (!rule.enabled) {
        return;
      }
      rule.alt.forEach(function(altName) {
        if (chains.indexOf(altName) < 0) {
          chains.push(altName);
        }
      });
    });
    self.__cache__ = {};
    chains.forEach(function(chain) {
      self.__cache__[chain] = [];
      self.__rules__.forEach(function(rule) {
        if (!rule.enabled) {
          return;
        }
        if (chain && rule.alt.indexOf(chain) < 0) {
          return;
        }
        self.__cache__[chain].push(rule.fn);
      });
    });
  };
  Ruler.prototype.at = function(name, fn, options) {
    var idx = this.__find__(name);
    var opt = options || {};
    if (idx === -1) {
      throw new Error("Parser rule not found: " + name);
    }
    this.__rules__[idx].fn = fn;
    this.__rules__[idx].alt = opt.alt || [];
    this.__cache__ = null;
  };
  Ruler.prototype.before = function(beforeName, ruleName, fn, options) {
    var idx = this.__find__(beforeName);
    var opt = options || {};
    if (idx === -1) {
      throw new Error("Parser rule not found: " + beforeName);
    }
    this.__rules__.splice(idx, 0, {
      name: ruleName,
      enabled: true,
      fn,
      alt: opt.alt || []
    });
    this.__cache__ = null;
  };
  Ruler.prototype.after = function(afterName, ruleName, fn, options) {
    var idx = this.__find__(afterName);
    var opt = options || {};
    if (idx === -1) {
      throw new Error("Parser rule not found: " + afterName);
    }
    this.__rules__.splice(idx + 1, 0, {
      name: ruleName,
      enabled: true,
      fn,
      alt: opt.alt || []
    });
    this.__cache__ = null;
  };
  Ruler.prototype.push = function(ruleName, fn, options) {
    var opt = options || {};
    this.__rules__.push({
      name: ruleName,
      enabled: true,
      fn,
      alt: opt.alt || []
    });
    this.__cache__ = null;
  };
  Ruler.prototype.enable = function(list2, strict) {
    list2 = !Array.isArray(list2) ? [list2] : list2;
    if (strict) {
      this.__rules__.forEach(function(rule) {
        rule.enabled = false;
      });
    }
    list2.forEach(function(name) {
      var idx = this.__find__(name);
      if (idx < 0) {
        throw new Error("Rules manager: invalid rule name " + name);
      }
      this.__rules__[idx].enabled = true;
    }, this);
    this.__cache__ = null;
  };
  Ruler.prototype.disable = function(list2) {
    list2 = !Array.isArray(list2) ? [list2] : list2;
    list2.forEach(function(name) {
      var idx = this.__find__(name);
      if (idx < 0) {
        throw new Error("Rules manager: invalid rule name " + name);
      }
      this.__rules__[idx].enabled = false;
    }, this);
    this.__cache__ = null;
  };
  Ruler.prototype.getRules = function(chainName) {
    if (this.__cache__ === null) {
      this.__compile__();
    }
    return this.__cache__[chainName] || [];
  };
  function block(state) {
    if (state.inlineMode) {
      state.tokens.push({
        type: "inline",
        content: state.src.replace(/\n/g, " ").trim(),
        level: 0,
        lines: [0, 1],
        children: []
      });
    } else {
      state.block.parse(state.src, state.options, state.env, state.tokens);
    }
  }
  function StateInline(src, parserInline, options, env, outTokens) {
    this.src = src;
    this.env = env;
    this.options = options;
    this.parser = parserInline;
    this.tokens = outTokens;
    this.pos = 0;
    this.posMax = this.src.length;
    this.level = 0;
    this.pending = "";
    this.pendingLevel = 0;
    this.cache = [];
    this.isInLabel = false;
    this.linkLevel = 0;
    this.linkContent = "";
    this.labelUnmatchedScopes = 0;
  }
  StateInline.prototype.pushPending = function() {
    this.tokens.push({
      type: "text",
      content: this.pending,
      level: this.pendingLevel
    });
    this.pending = "";
  };
  StateInline.prototype.push = function(token) {
    if (this.pending) {
      this.pushPending();
    }
    this.tokens.push(token);
    this.pendingLevel = this.level;
  };
  StateInline.prototype.cacheSet = function(key, val) {
    for (var i = this.cache.length; i <= key; i++) {
      this.cache.push(0);
    }
    this.cache[key] = val;
  };
  StateInline.prototype.cacheGet = function(key) {
    return key < this.cache.length ? this.cache[key] : 0;
  };
  function parseLinkLabel(state, start) {
    var level, found, marker, labelEnd = -1, max = state.posMax, oldPos = state.pos, oldFlag = state.isInLabel;
    if (state.isInLabel) {
      return -1;
    }
    if (state.labelUnmatchedScopes) {
      state.labelUnmatchedScopes--;
      return -1;
    }
    state.pos = start + 1;
    state.isInLabel = true;
    level = 1;
    while (state.pos < max) {
      marker = state.src.charCodeAt(state.pos);
      if (marker === 91) {
        level++;
      } else if (marker === 93) {
        level--;
        if (level === 0) {
          found = true;
          break;
        }
      }
      state.parser.skipToken(state);
    }
    if (found) {
      labelEnd = state.pos;
      state.labelUnmatchedScopes = 0;
    } else {
      state.labelUnmatchedScopes = level - 1;
    }
    state.pos = oldPos;
    state.isInLabel = oldFlag;
    return labelEnd;
  }
  function parseAbbr(str, parserInline, options, env) {
    var state, labelEnd, pos, max, label, title;
    if (str.charCodeAt(0) !== 42) {
      return -1;
    }
    if (str.charCodeAt(1) !== 91) {
      return -1;
    }
    if (str.indexOf("]:") === -1) {
      return -1;
    }
    state = new StateInline(str, parserInline, options, env, []);
    labelEnd = parseLinkLabel(state, 1);
    if (labelEnd < 0 || str.charCodeAt(labelEnd + 1) !== 58) {
      return -1;
    }
    max = state.posMax;
    for (pos = labelEnd + 2; pos < max; pos++) {
      if (state.src.charCodeAt(pos) === 10) {
        break;
      }
    }
    label = str.slice(2, labelEnd);
    title = str.slice(labelEnd + 2, pos).trim();
    if (title.length === 0) {
      return -1;
    }
    if (!env.abbreviations) {
      env.abbreviations = {};
    }
    if (typeof env.abbreviations[":" + label] === "undefined") {
      env.abbreviations[":" + label] = title;
    }
    return pos;
  }
  function abbr(state) {
    var tokens = state.tokens, i, l, content, pos;
    if (state.inlineMode) {
      return;
    }
    for (i = 1, l = tokens.length - 1; i < l; i++) {
      if (tokens[i - 1].type === "paragraph_open" && tokens[i].type === "inline" && tokens[i + 1].type === "paragraph_close") {
        content = tokens[i].content;
        while (content.length) {
          pos = parseAbbr(content, state.inline, state.options, state.env);
          if (pos < 0) {
            break;
          }
          content = content.slice(pos).trim();
        }
        tokens[i].content = content;
        if (!content.length) {
          tokens[i - 1].tight = true;
          tokens[i + 1].tight = true;
        }
      }
    }
  }
  function normalizeLink(url) {
    var normalized = replaceEntities(url);
    try {
      normalized = decodeURI(normalized);
    } catch (err) {
    }
    return encodeURI(normalized);
  }
  function parseLinkDestination(state, pos) {
    var code2, level, link, start = pos, max = state.posMax;
    if (state.src.charCodeAt(pos) === 60) {
      pos++;
      while (pos < max) {
        code2 = state.src.charCodeAt(pos);
        if (code2 === 10) {
          return false;
        }
        if (code2 === 62) {
          link = normalizeLink(unescapeMd(state.src.slice(start + 1, pos)));
          if (!state.parser.validateLink(link)) {
            return false;
          }
          state.pos = pos + 1;
          state.linkContent = link;
          return true;
        }
        if (code2 === 92 && pos + 1 < max) {
          pos += 2;
          continue;
        }
        pos++;
      }
      return false;
    }
    level = 0;
    while (pos < max) {
      code2 = state.src.charCodeAt(pos);
      if (code2 === 32) {
        break;
      }
      if (code2 < 32 || code2 === 127) {
        break;
      }
      if (code2 === 92 && pos + 1 < max) {
        pos += 2;
        continue;
      }
      if (code2 === 40) {
        level++;
        if (level > 1) {
          break;
        }
      }
      if (code2 === 41) {
        level--;
        if (level < 0) {
          break;
        }
      }
      pos++;
    }
    if (start === pos) {
      return false;
    }
    link = unescapeMd(state.src.slice(start, pos));
    if (!state.parser.validateLink(link)) {
      return false;
    }
    state.linkContent = link;
    state.pos = pos;
    return true;
  }
  function parseLinkTitle(state, pos) {
    var code2, start = pos, max = state.posMax, marker = state.src.charCodeAt(pos);
    if (marker !== 34 && marker !== 39 && marker !== 40) {
      return false;
    }
    pos++;
    if (marker === 40) {
      marker = 41;
    }
    while (pos < max) {
      code2 = state.src.charCodeAt(pos);
      if (code2 === marker) {
        state.pos = pos + 1;
        state.linkContent = unescapeMd(state.src.slice(start + 1, pos));
        return true;
      }
      if (code2 === 92 && pos + 1 < max) {
        pos += 2;
        continue;
      }
      pos++;
    }
    return false;
  }
  function normalizeReference(str) {
    return str.trim().replace(/\s+/g, " ").toUpperCase();
  }
  function parseReference(str, parser, options, env) {
    var state, labelEnd, pos, max, code2, start, href, title, label;
    if (str.charCodeAt(0) !== 91) {
      return -1;
    }
    if (str.indexOf("]:") === -1) {
      return -1;
    }
    state = new StateInline(str, parser, options, env, []);
    labelEnd = parseLinkLabel(state, 0);
    if (labelEnd < 0 || str.charCodeAt(labelEnd + 1) !== 58) {
      return -1;
    }
    max = state.posMax;
    for (pos = labelEnd + 2; pos < max; pos++) {
      code2 = state.src.charCodeAt(pos);
      if (code2 !== 32 && code2 !== 10) {
        break;
      }
    }
    if (!parseLinkDestination(state, pos)) {
      return -1;
    }
    href = state.linkContent;
    pos = state.pos;
    start = pos;
    for (pos = pos + 1; pos < max; pos++) {
      code2 = state.src.charCodeAt(pos);
      if (code2 !== 32 && code2 !== 10) {
        break;
      }
    }
    if (pos < max && start !== pos && parseLinkTitle(state, pos)) {
      title = state.linkContent;
      pos = state.pos;
    } else {
      title = "";
      pos = start;
    }
    while (pos < max && state.src.charCodeAt(pos) === 32) {
      pos++;
    }
    if (pos < max && state.src.charCodeAt(pos) !== 10) {
      return -1;
    }
    label = normalizeReference(str.slice(1, labelEnd));
    if (typeof env.references[label] === "undefined") {
      env.references[label] = { title, href };
    }
    return pos;
  }
  function references(state) {
    var tokens = state.tokens, i, l, content, pos;
    state.env.references = state.env.references || {};
    if (state.inlineMode) {
      return;
    }
    for (i = 1, l = tokens.length - 1; i < l; i++) {
      if (tokens[i].type === "inline" && tokens[i - 1].type === "paragraph_open" && tokens[i + 1].type === "paragraph_close") {
        content = tokens[i].content;
        while (content.length) {
          pos = parseReference(content, state.inline, state.options, state.env);
          if (pos < 0) {
            break;
          }
          content = content.slice(pos).trim();
        }
        tokens[i].content = content;
        if (!content.length) {
          tokens[i - 1].tight = true;
          tokens[i + 1].tight = true;
        }
      }
    }
  }
  function inline(state) {
    var tokens = state.tokens, tok, i, l;
    for (i = 0, l = tokens.length; i < l; i++) {
      tok = tokens[i];
      if (tok.type === "inline") {
        state.inline.parse(tok.content, state.options, state.env, tok.children);
      }
    }
  }
  function footnote_block(state) {
    var i, l, j, t, lastParagraph, list2, tokens, current, currentLabel, level = 0, insideRef = false, refTokens = {};
    if (!state.env.footnotes) {
      return;
    }
    state.tokens = state.tokens.filter(function(tok) {
      if (tok.type === "footnote_reference_open") {
        insideRef = true;
        current = [];
        currentLabel = tok.label;
        return false;
      }
      if (tok.type === "footnote_reference_close") {
        insideRef = false;
        refTokens[":" + currentLabel] = current;
        return false;
      }
      if (insideRef) {
        current.push(tok);
      }
      return !insideRef;
    });
    if (!state.env.footnotes.list) {
      return;
    }
    list2 = state.env.footnotes.list;
    state.tokens.push({
      type: "footnote_block_open",
      level: level++
    });
    for (i = 0, l = list2.length; i < l; i++) {
      state.tokens.push({
        type: "footnote_open",
        id: i,
        level: level++
      });
      if (list2[i].tokens) {
        tokens = [];
        tokens.push({
          type: "paragraph_open",
          tight: false,
          level: level++
        });
        tokens.push({
          type: "inline",
          content: "",
          level,
          children: list2[i].tokens
        });
        tokens.push({
          type: "paragraph_close",
          tight: false,
          level: --level
        });
      } else if (list2[i].label) {
        tokens = refTokens[":" + list2[i].label];
      }
      state.tokens = state.tokens.concat(tokens);
      if (state.tokens[state.tokens.length - 1].type === "paragraph_close") {
        lastParagraph = state.tokens.pop();
      } else {
        lastParagraph = null;
      }
      t = list2[i].count > 0 ? list2[i].count : 1;
      for (j = 0; j < t; j++) {
        state.tokens.push({
          type: "footnote_anchor",
          id: i,
          subId: j,
          level
        });
      }
      if (lastParagraph) {
        state.tokens.push(lastParagraph);
      }
      state.tokens.push({
        type: "footnote_close",
        level: --level
      });
    }
    state.tokens.push({
      type: "footnote_block_close",
      level: --level
    });
  }
  var PUNCT_CHARS = ` 
()[]'".,!?-`;
  function regEscape(s) {
    return s.replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1");
  }
  function abbr2(state) {
    var i, j, l, tokens, token, text3, nodes, pos, level, reg, m, regText, blockTokens = state.tokens;
    if (!state.env.abbreviations) {
      return;
    }
    if (!state.env.abbrRegExp) {
      regText = "(^|[" + PUNCT_CHARS.split("").map(regEscape).join("") + "])(" + Object.keys(state.env.abbreviations).map(function(x) {
        return x.substr(1);
      }).sort(function(a, b) {
        return b.length - a.length;
      }).map(regEscape).join("|") + ")($|[" + PUNCT_CHARS.split("").map(regEscape).join("") + "])";
      state.env.abbrRegExp = new RegExp(regText, "g");
    }
    reg = state.env.abbrRegExp;
    for (j = 0, l = blockTokens.length; j < l; j++) {
      if (blockTokens[j].type !== "inline") {
        continue;
      }
      tokens = blockTokens[j].children;
      for (i = tokens.length - 1; i >= 0; i--) {
        token = tokens[i];
        if (token.type !== "text") {
          continue;
        }
        pos = 0;
        text3 = token.content;
        reg.lastIndex = 0;
        level = token.level;
        nodes = [];
        while (m = reg.exec(text3)) {
          if (reg.lastIndex > pos) {
            nodes.push({
              type: "text",
              content: text3.slice(pos, m.index + m[1].length),
              level
            });
          }
          nodes.push({
            type: "abbr_open",
            title: state.env.abbreviations[":" + m[2]],
            level: level++
          });
          nodes.push({
            type: "text",
            content: m[2],
            level
          });
          nodes.push({
            type: "abbr_close",
            level: --level
          });
          pos = reg.lastIndex - m[3].length;
        }
        if (!nodes.length) {
          continue;
        }
        if (pos < text3.length) {
          nodes.push({
            type: "text",
            content: text3.slice(pos),
            level
          });
        }
        blockTokens[j].children = tokens = [].concat(tokens.slice(0, i), nodes, tokens.slice(i + 1));
      }
    }
  }
  var RARE_RE = /\+-|\.\.|\?\?\?\?|!!!!|,,|--/;
  var SCOPED_ABBR_RE = /\((c|tm|r|p)\)/ig;
  var SCOPED_ABBR = {
    "c": "\xA9",
    "r": "\xAE",
    "p": "\xA7",
    "tm": "\u2122"
  };
  function replaceScopedAbbr(str) {
    if (str.indexOf("(") < 0) {
      return str;
    }
    return str.replace(SCOPED_ABBR_RE, function(match, name) {
      return SCOPED_ABBR[name.toLowerCase()];
    });
  }
  function replace3(state) {
    var i, token, text3, inlineTokens, blkIdx;
    if (!state.options.typographer) {
      return;
    }
    for (blkIdx = state.tokens.length - 1; blkIdx >= 0; blkIdx--) {
      if (state.tokens[blkIdx].type !== "inline") {
        continue;
      }
      inlineTokens = state.tokens[blkIdx].children;
      for (i = inlineTokens.length - 1; i >= 0; i--) {
        token = inlineTokens[i];
        if (token.type === "text") {
          text3 = token.content;
          text3 = replaceScopedAbbr(text3);
          if (RARE_RE.test(text3)) {
            text3 = text3.replace(/\+-/g, "\xB1").replace(/\.{2,}/g, "\u2026").replace(/([?!])…/g, "$1..").replace(/([?!]){4,}/g, "$1$1$1").replace(/,{2,}/g, ",").replace(/(^|[^-])---([^-]|$)/mg, "$1\u2014$2").replace(/(^|\s)--(\s|$)/mg, "$1\u2013$2").replace(/(^|[^-\s])--([^-\s]|$)/mg, "$1\u2013$2");
          }
          token.content = text3;
        }
      }
    }
  }
  var QUOTE_TEST_RE = /['"]/;
  var QUOTE_RE = /['"]/g;
  var PUNCT_RE = /[-\s()\[\]]/;
  var APOSTROPHE = "\u2019";
  function isLetter(str, pos) {
    if (pos < 0 || pos >= str.length) {
      return false;
    }
    return !PUNCT_RE.test(str[pos]);
  }
  function replaceAt(str, index, ch) {
    return str.substr(0, index) + ch + str.substr(index + 1);
  }
  function smartquotes(state) {
    var i, token, text3, t, pos, max, thisLevel, lastSpace, nextSpace, item, canOpen, canClose, j, isSingle, blkIdx, tokens, stack;
    if (!state.options.typographer) {
      return;
    }
    stack = [];
    for (blkIdx = state.tokens.length - 1; blkIdx >= 0; blkIdx--) {
      if (state.tokens[blkIdx].type !== "inline") {
        continue;
      }
      tokens = state.tokens[blkIdx].children;
      stack.length = 0;
      for (i = 0; i < tokens.length; i++) {
        token = tokens[i];
        if (token.type !== "text" || QUOTE_TEST_RE.test(token.text)) {
          continue;
        }
        thisLevel = tokens[i].level;
        for (j = stack.length - 1; j >= 0; j--) {
          if (stack[j].level <= thisLevel) {
            break;
          }
        }
        stack.length = j + 1;
        text3 = token.content;
        pos = 0;
        max = text3.length;
        OUTER:
          while (pos < max) {
            QUOTE_RE.lastIndex = pos;
            t = QUOTE_RE.exec(text3);
            if (!t) {
              break;
            }
            lastSpace = !isLetter(text3, t.index - 1);
            pos = t.index + 1;
            isSingle = t[0] === "'";
            nextSpace = !isLetter(text3, pos);
            if (!nextSpace && !lastSpace) {
              if (isSingle) {
                token.content = replaceAt(token.content, t.index, APOSTROPHE);
              }
              continue;
            }
            canOpen = !nextSpace;
            canClose = !lastSpace;
            if (canClose) {
              for (j = stack.length - 1; j >= 0; j--) {
                item = stack[j];
                if (stack[j].level < thisLevel) {
                  break;
                }
                if (item.single === isSingle && stack[j].level === thisLevel) {
                  item = stack[j];
                  if (isSingle) {
                    tokens[item.token].content = replaceAt(tokens[item.token].content, item.pos, state.options.quotes[2]);
                    token.content = replaceAt(token.content, t.index, state.options.quotes[3]);
                  } else {
                    tokens[item.token].content = replaceAt(tokens[item.token].content, item.pos, state.options.quotes[0]);
                    token.content = replaceAt(token.content, t.index, state.options.quotes[1]);
                  }
                  stack.length = j;
                  continue OUTER;
                }
              }
            }
            if (canOpen) {
              stack.push({
                token: i,
                pos: t.index,
                single: isSingle,
                level: thisLevel
              });
            } else if (canClose && isSingle) {
              token.content = replaceAt(token.content, t.index, APOSTROPHE);
            }
          }
      }
    }
  }
  var _rules = [
    ["block", block],
    ["abbr", abbr],
    ["references", references],
    ["inline", inline],
    ["footnote_tail", footnote_block],
    ["abbr2", abbr2],
    ["replacements", replace3],
    ["smartquotes", smartquotes]
  ];
  function Core() {
    this.options = {};
    this.ruler = new Ruler();
    for (var i = 0; i < _rules.length; i++) {
      this.ruler.push(_rules[i][0], _rules[i][1]);
    }
  }
  Core.prototype.process = function(state) {
    var i, l, rules2;
    rules2 = this.ruler.getRules("");
    for (i = 0, l = rules2.length; i < l; i++) {
      rules2[i](state);
    }
  };
  function StateBlock(src, parser, options, env, tokens) {
    var ch, s, start, pos, len, indent, indent_found;
    this.src = src;
    this.parser = parser;
    this.options = options;
    this.env = env;
    this.tokens = tokens;
    this.bMarks = [];
    this.eMarks = [];
    this.tShift = [];
    this.blkIndent = 0;
    this.line = 0;
    this.lineMax = 0;
    this.tight = false;
    this.parentType = "root";
    this.ddIndent = -1;
    this.level = 0;
    this.result = "";
    s = this.src;
    indent = 0;
    indent_found = false;
    for (start = pos = indent = 0, len = s.length; pos < len; pos++) {
      ch = s.charCodeAt(pos);
      if (!indent_found) {
        if (ch === 32) {
          indent++;
          continue;
        } else {
          indent_found = true;
        }
      }
      if (ch === 10 || pos === len - 1) {
        if (ch !== 10) {
          pos++;
        }
        this.bMarks.push(start);
        this.eMarks.push(pos);
        this.tShift.push(indent);
        indent_found = false;
        indent = 0;
        start = pos + 1;
      }
    }
    this.bMarks.push(s.length);
    this.eMarks.push(s.length);
    this.tShift.push(0);
    this.lineMax = this.bMarks.length - 1;
  }
  StateBlock.prototype.isEmpty = function isEmpty(line) {
    return this.bMarks[line] + this.tShift[line] >= this.eMarks[line];
  };
  StateBlock.prototype.skipEmptyLines = function skipEmptyLines(from) {
    for (var max = this.lineMax; from < max; from++) {
      if (this.bMarks[from] + this.tShift[from] < this.eMarks[from]) {
        break;
      }
    }
    return from;
  };
  StateBlock.prototype.skipSpaces = function skipSpaces(pos) {
    for (var max = this.src.length; pos < max; pos++) {
      if (this.src.charCodeAt(pos) !== 32) {
        break;
      }
    }
    return pos;
  };
  StateBlock.prototype.skipChars = function skipChars(pos, code2) {
    for (var max = this.src.length; pos < max; pos++) {
      if (this.src.charCodeAt(pos) !== code2) {
        break;
      }
    }
    return pos;
  };
  StateBlock.prototype.skipCharsBack = function skipCharsBack(pos, code2, min) {
    if (pos <= min) {
      return pos;
    }
    while (pos > min) {
      if (code2 !== this.src.charCodeAt(--pos)) {
        return pos + 1;
      }
    }
    return pos;
  };
  StateBlock.prototype.getLines = function getLines(begin3, end3, indent, keepLastLF) {
    var i, first, last, queue, shift, line = begin3;
    if (begin3 >= end3) {
      return "";
    }
    if (line + 1 === end3) {
      first = this.bMarks[line] + Math.min(this.tShift[line], indent);
      last = keepLastLF ? this.eMarks[line] + 1 : this.eMarks[line];
      return this.src.slice(first, last);
    }
    queue = new Array(end3 - begin3);
    for (i = 0; line < end3; line++, i++) {
      shift = this.tShift[line];
      if (shift > indent) {
        shift = indent;
      }
      if (shift < 0) {
        shift = 0;
      }
      first = this.bMarks[line] + shift;
      if (line + 1 < end3 || keepLastLF) {
        last = this.eMarks[line] + 1;
      } else {
        last = this.eMarks[line];
      }
      queue[i] = this.src.slice(first, last);
    }
    return queue.join("");
  };
  function code(state, startLine, endLine) {
    var nextLine, last;
    if (state.tShift[startLine] - state.blkIndent < 4) {
      return false;
    }
    last = nextLine = startLine + 1;
    while (nextLine < endLine) {
      if (state.isEmpty(nextLine)) {
        nextLine++;
        continue;
      }
      if (state.tShift[nextLine] - state.blkIndent >= 4) {
        nextLine++;
        last = nextLine;
        continue;
      }
      break;
    }
    state.line = nextLine;
    state.tokens.push({
      type: "code",
      content: state.getLines(startLine, last, 4 + state.blkIndent, true),
      block: true,
      lines: [startLine, state.line],
      level: state.level
    });
    return true;
  }
  function fences(state, startLine, endLine, silent) {
    var marker, len, params, nextLine, mem, haveEndMarker = false, pos = state.bMarks[startLine] + state.tShift[startLine], max = state.eMarks[startLine];
    if (pos + 3 > max) {
      return false;
    }
    marker = state.src.charCodeAt(pos);
    if (marker !== 126 && marker !== 96) {
      return false;
    }
    mem = pos;
    pos = state.skipChars(pos, marker);
    len = pos - mem;
    if (len < 3) {
      return false;
    }
    params = state.src.slice(pos, max).trim();
    if (params.indexOf("`") >= 0) {
      return false;
    }
    if (silent) {
      return true;
    }
    nextLine = startLine;
    for (; ; ) {
      nextLine++;
      if (nextLine >= endLine) {
        break;
      }
      pos = mem = state.bMarks[nextLine] + state.tShift[nextLine];
      max = state.eMarks[nextLine];
      if (pos < max && state.tShift[nextLine] < state.blkIndent) {
        break;
      }
      if (state.src.charCodeAt(pos) !== marker) {
        continue;
      }
      if (state.tShift[nextLine] - state.blkIndent >= 4) {
        continue;
      }
      pos = state.skipChars(pos, marker);
      if (pos - mem < len) {
        continue;
      }
      pos = state.skipSpaces(pos);
      if (pos < max) {
        continue;
      }
      haveEndMarker = true;
      break;
    }
    len = state.tShift[startLine];
    state.line = nextLine + (haveEndMarker ? 1 : 0);
    state.tokens.push({
      type: "fence",
      params,
      content: state.getLines(startLine + 1, nextLine, len, true),
      lines: [startLine, state.line],
      level: state.level
    });
    return true;
  }
  function blockquote(state, startLine, endLine, silent) {
    var nextLine, lastLineEmpty, oldTShift, oldBMarks, oldIndent, oldParentType, lines, terminatorRules, i, l, terminate, pos = state.bMarks[startLine] + state.tShift[startLine], max = state.eMarks[startLine];
    if (pos > max) {
      return false;
    }
    if (state.src.charCodeAt(pos++) !== 62) {
      return false;
    }
    if (state.level >= state.options.maxNesting) {
      return false;
    }
    if (silent) {
      return true;
    }
    if (state.src.charCodeAt(pos) === 32) {
      pos++;
    }
    oldIndent = state.blkIndent;
    state.blkIndent = 0;
    oldBMarks = [state.bMarks[startLine]];
    state.bMarks[startLine] = pos;
    pos = pos < max ? state.skipSpaces(pos) : pos;
    lastLineEmpty = pos >= max;
    oldTShift = [state.tShift[startLine]];
    state.tShift[startLine] = pos - state.bMarks[startLine];
    terminatorRules = state.parser.ruler.getRules("blockquote");
    for (nextLine = startLine + 1; nextLine < endLine; nextLine++) {
      pos = state.bMarks[nextLine] + state.tShift[nextLine];
      max = state.eMarks[nextLine];
      if (pos >= max) {
        break;
      }
      if (state.src.charCodeAt(pos++) === 62) {
        if (state.src.charCodeAt(pos) === 32) {
          pos++;
        }
        oldBMarks.push(state.bMarks[nextLine]);
        state.bMarks[nextLine] = pos;
        pos = pos < max ? state.skipSpaces(pos) : pos;
        lastLineEmpty = pos >= max;
        oldTShift.push(state.tShift[nextLine]);
        state.tShift[nextLine] = pos - state.bMarks[nextLine];
        continue;
      }
      if (lastLineEmpty) {
        break;
      }
      terminate = false;
      for (i = 0, l = terminatorRules.length; i < l; i++) {
        if (terminatorRules[i](state, nextLine, endLine, true)) {
          terminate = true;
          break;
        }
      }
      if (terminate) {
        break;
      }
      oldBMarks.push(state.bMarks[nextLine]);
      oldTShift.push(state.tShift[nextLine]);
      state.tShift[nextLine] = -1337;
    }
    oldParentType = state.parentType;
    state.parentType = "blockquote";
    state.tokens.push({
      type: "blockquote_open",
      lines: lines = [startLine, 0],
      level: state.level++
    });
    state.parser.tokenize(state, startLine, nextLine);
    state.tokens.push({
      type: "blockquote_close",
      level: --state.level
    });
    state.parentType = oldParentType;
    lines[1] = state.line;
    for (i = 0; i < oldTShift.length; i++) {
      state.bMarks[i + startLine] = oldBMarks[i];
      state.tShift[i + startLine] = oldTShift[i];
    }
    state.blkIndent = oldIndent;
    return true;
  }
  function hr(state, startLine, endLine, silent) {
    var marker, cnt, ch, pos = state.bMarks[startLine], max = state.eMarks[startLine];
    pos += state.tShift[startLine];
    if (pos > max) {
      return false;
    }
    marker = state.src.charCodeAt(pos++);
    if (marker !== 42 && marker !== 45 && marker !== 95) {
      return false;
    }
    cnt = 1;
    while (pos < max) {
      ch = state.src.charCodeAt(pos++);
      if (ch !== marker && ch !== 32) {
        return false;
      }
      if (ch === marker) {
        cnt++;
      }
    }
    if (cnt < 3) {
      return false;
    }
    if (silent) {
      return true;
    }
    state.line = startLine + 1;
    state.tokens.push({
      type: "hr",
      lines: [startLine, state.line],
      level: state.level
    });
    return true;
  }
  function skipBulletListMarker(state, startLine) {
    var marker, pos, max;
    pos = state.bMarks[startLine] + state.tShift[startLine];
    max = state.eMarks[startLine];
    if (pos >= max) {
      return -1;
    }
    marker = state.src.charCodeAt(pos++);
    if (marker !== 42 && marker !== 45 && marker !== 43) {
      return -1;
    }
    if (pos < max && state.src.charCodeAt(pos) !== 32) {
      return -1;
    }
    return pos;
  }
  function skipOrderedListMarker(state, startLine) {
    var ch, pos = state.bMarks[startLine] + state.tShift[startLine], max = state.eMarks[startLine];
    if (pos + 1 >= max) {
      return -1;
    }
    ch = state.src.charCodeAt(pos++);
    if (ch < 48 || ch > 57) {
      return -1;
    }
    for (; ; ) {
      if (pos >= max) {
        return -1;
      }
      ch = state.src.charCodeAt(pos++);
      if (ch >= 48 && ch <= 57) {
        continue;
      }
      if (ch === 41 || ch === 46) {
        break;
      }
      return -1;
    }
    if (pos < max && state.src.charCodeAt(pos) !== 32) {
      return -1;
    }
    return pos;
  }
  function markTightParagraphs(state, idx) {
    var i, l, level = state.level + 2;
    for (i = idx + 2, l = state.tokens.length - 2; i < l; i++) {
      if (state.tokens[i].level === level && state.tokens[i].type === "paragraph_open") {
        state.tokens[i + 2].tight = true;
        state.tokens[i].tight = true;
        i += 2;
      }
    }
  }
  function list(state, startLine, endLine, silent) {
    var nextLine, indent, oldTShift, oldIndent, oldTight, oldParentType, start, posAfterMarker, max, indentAfterMarker, markerValue, markerCharCode, isOrdered, contentStart, listTokIdx, prevEmptyEnd, listLines, itemLines, tight = true, terminatorRules, i, l, terminate;
    if ((posAfterMarker = skipOrderedListMarker(state, startLine)) >= 0) {
      isOrdered = true;
    } else if ((posAfterMarker = skipBulletListMarker(state, startLine)) >= 0) {
      isOrdered = false;
    } else {
      return false;
    }
    if (state.level >= state.options.maxNesting) {
      return false;
    }
    markerCharCode = state.src.charCodeAt(posAfterMarker - 1);
    if (silent) {
      return true;
    }
    listTokIdx = state.tokens.length;
    if (isOrdered) {
      start = state.bMarks[startLine] + state.tShift[startLine];
      markerValue = Number(state.src.substr(start, posAfterMarker - start - 1));
      state.tokens.push({
        type: "ordered_list_open",
        order: markerValue,
        lines: listLines = [startLine, 0],
        level: state.level++
      });
    } else {
      state.tokens.push({
        type: "bullet_list_open",
        lines: listLines = [startLine, 0],
        level: state.level++
      });
    }
    nextLine = startLine;
    prevEmptyEnd = false;
    terminatorRules = state.parser.ruler.getRules("list");
    while (nextLine < endLine) {
      contentStart = state.skipSpaces(posAfterMarker);
      max = state.eMarks[nextLine];
      if (contentStart >= max) {
        indentAfterMarker = 1;
      } else {
        indentAfterMarker = contentStart - posAfterMarker;
      }
      if (indentAfterMarker > 4) {
        indentAfterMarker = 1;
      }
      if (indentAfterMarker < 1) {
        indentAfterMarker = 1;
      }
      indent = posAfterMarker - state.bMarks[nextLine] + indentAfterMarker;
      state.tokens.push({
        type: "list_item_open",
        lines: itemLines = [startLine, 0],
        level: state.level++
      });
      oldIndent = state.blkIndent;
      oldTight = state.tight;
      oldTShift = state.tShift[startLine];
      oldParentType = state.parentType;
      state.tShift[startLine] = contentStart - state.bMarks[startLine];
      state.blkIndent = indent;
      state.tight = true;
      state.parentType = "list";
      state.parser.tokenize(state, startLine, endLine, true);
      if (!state.tight || prevEmptyEnd) {
        tight = false;
      }
      prevEmptyEnd = state.line - startLine > 1 && state.isEmpty(state.line - 1);
      state.blkIndent = oldIndent;
      state.tShift[startLine] = oldTShift;
      state.tight = oldTight;
      state.parentType = oldParentType;
      state.tokens.push({
        type: "list_item_close",
        level: --state.level
      });
      nextLine = startLine = state.line;
      itemLines[1] = nextLine;
      contentStart = state.bMarks[startLine];
      if (nextLine >= endLine) {
        break;
      }
      if (state.isEmpty(nextLine)) {
        break;
      }
      if (state.tShift[nextLine] < state.blkIndent) {
        break;
      }
      terminate = false;
      for (i = 0, l = terminatorRules.length; i < l; i++) {
        if (terminatorRules[i](state, nextLine, endLine, true)) {
          terminate = true;
          break;
        }
      }
      if (terminate) {
        break;
      }
      if (isOrdered) {
        posAfterMarker = skipOrderedListMarker(state, nextLine);
        if (posAfterMarker < 0) {
          break;
        }
      } else {
        posAfterMarker = skipBulletListMarker(state, nextLine);
        if (posAfterMarker < 0) {
          break;
        }
      }
      if (markerCharCode !== state.src.charCodeAt(posAfterMarker - 1)) {
        break;
      }
    }
    state.tokens.push({
      type: isOrdered ? "ordered_list_close" : "bullet_list_close",
      level: --state.level
    });
    listLines[1] = nextLine;
    state.line = nextLine;
    if (tight) {
      markTightParagraphs(state, listTokIdx);
    }
    return true;
  }
  function footnote(state, startLine, endLine, silent) {
    var oldBMark, oldTShift, oldParentType, pos, label, start = state.bMarks[startLine] + state.tShift[startLine], max = state.eMarks[startLine];
    if (start + 4 > max) {
      return false;
    }
    if (state.src.charCodeAt(start) !== 91) {
      return false;
    }
    if (state.src.charCodeAt(start + 1) !== 94) {
      return false;
    }
    if (state.level >= state.options.maxNesting) {
      return false;
    }
    for (pos = start + 2; pos < max; pos++) {
      if (state.src.charCodeAt(pos) === 32) {
        return false;
      }
      if (state.src.charCodeAt(pos) === 93) {
        break;
      }
    }
    if (pos === start + 2) {
      return false;
    }
    if (pos + 1 >= max || state.src.charCodeAt(++pos) !== 58) {
      return false;
    }
    if (silent) {
      return true;
    }
    pos++;
    if (!state.env.footnotes) {
      state.env.footnotes = {};
    }
    if (!state.env.footnotes.refs) {
      state.env.footnotes.refs = {};
    }
    label = state.src.slice(start + 2, pos - 2);
    state.env.footnotes.refs[":" + label] = -1;
    state.tokens.push({
      type: "footnote_reference_open",
      label,
      level: state.level++
    });
    oldBMark = state.bMarks[startLine];
    oldTShift = state.tShift[startLine];
    oldParentType = state.parentType;
    state.tShift[startLine] = state.skipSpaces(pos) - pos;
    state.bMarks[startLine] = pos;
    state.blkIndent += 4;
    state.parentType = "footnote";
    if (state.tShift[startLine] < state.blkIndent) {
      state.tShift[startLine] += state.blkIndent;
      state.bMarks[startLine] -= state.blkIndent;
    }
    state.parser.tokenize(state, startLine, endLine, true);
    state.parentType = oldParentType;
    state.blkIndent -= 4;
    state.tShift[startLine] = oldTShift;
    state.bMarks[startLine] = oldBMark;
    state.tokens.push({
      type: "footnote_reference_close",
      level: --state.level
    });
    return true;
  }
  function heading(state, startLine, endLine, silent) {
    var ch, level, tmp, pos = state.bMarks[startLine] + state.tShift[startLine], max = state.eMarks[startLine];
    if (pos >= max) {
      return false;
    }
    ch = state.src.charCodeAt(pos);
    if (ch !== 35 || pos >= max) {
      return false;
    }
    level = 1;
    ch = state.src.charCodeAt(++pos);
    while (ch === 35 && pos < max && level <= 6) {
      level++;
      ch = state.src.charCodeAt(++pos);
    }
    if (level > 6 || pos < max && ch !== 32) {
      return false;
    }
    if (silent) {
      return true;
    }
    max = state.skipCharsBack(max, 32, pos);
    tmp = state.skipCharsBack(max, 35, pos);
    if (tmp > pos && state.src.charCodeAt(tmp - 1) === 32) {
      max = tmp;
    }
    state.line = startLine + 1;
    state.tokens.push({
      type: "heading_open",
      hLevel: level,
      lines: [startLine, state.line],
      level: state.level
    });
    if (pos < max) {
      state.tokens.push({
        type: "inline",
        content: state.src.slice(pos, max).trim(),
        level: state.level + 1,
        lines: [startLine, state.line],
        children: []
      });
    }
    state.tokens.push({ type: "heading_close", hLevel: level, level: state.level });
    return true;
  }
  function lheading(state, startLine, endLine) {
    var marker, pos, max, next = startLine + 1;
    if (next >= endLine) {
      return false;
    }
    if (state.tShift[next] < state.blkIndent) {
      return false;
    }
    if (state.tShift[next] - state.blkIndent > 3) {
      return false;
    }
    pos = state.bMarks[next] + state.tShift[next];
    max = state.eMarks[next];
    if (pos >= max) {
      return false;
    }
    marker = state.src.charCodeAt(pos);
    if (marker !== 45 && marker !== 61) {
      return false;
    }
    pos = state.skipChars(pos, marker);
    pos = state.skipSpaces(pos);
    if (pos < max) {
      return false;
    }
    pos = state.bMarks[startLine] + state.tShift[startLine];
    state.line = next + 1;
    state.tokens.push({
      type: "heading_open",
      hLevel: marker === 61 ? 1 : 2,
      lines: [startLine, state.line],
      level: state.level
    });
    state.tokens.push({
      type: "inline",
      content: state.src.slice(pos, state.eMarks[startLine]).trim(),
      level: state.level + 1,
      lines: [startLine, state.line - 1],
      children: []
    });
    state.tokens.push({
      type: "heading_close",
      hLevel: marker === 61 ? 1 : 2,
      level: state.level
    });
    return true;
  }
  var html_blocks = {};
  [
    "article",
    "aside",
    "button",
    "blockquote",
    "body",
    "canvas",
    "caption",
    "col",
    "colgroup",
    "dd",
    "div",
    "dl",
    "dt",
    "embed",
    "fieldset",
    "figcaption",
    "figure",
    "footer",
    "form",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "header",
    "hgroup",
    "hr",
    "iframe",
    "li",
    "map",
    "object",
    "ol",
    "output",
    "p",
    "pre",
    "progress",
    "script",
    "section",
    "style",
    "table",
    "tbody",
    "td",
    "textarea",
    "tfoot",
    "th",
    "tr",
    "thead",
    "ul",
    "video"
  ].forEach(function(name) {
    html_blocks[name] = true;
  });
  var HTML_TAG_OPEN_RE = /^<([a-zA-Z]{1,15})[\s\/>]/;
  var HTML_TAG_CLOSE_RE = /^<\/([a-zA-Z]{1,15})[\s>]/;
  function isLetter$1(ch) {
    var lc = ch | 32;
    return lc >= 97 && lc <= 122;
  }
  function htmlblock(state, startLine, endLine, silent) {
    var ch, match, nextLine, pos = state.bMarks[startLine], max = state.eMarks[startLine], shift = state.tShift[startLine];
    pos += shift;
    if (!state.options.html) {
      return false;
    }
    if (shift > 3 || pos + 2 >= max) {
      return false;
    }
    if (state.src.charCodeAt(pos) !== 60) {
      return false;
    }
    ch = state.src.charCodeAt(pos + 1);
    if (ch === 33 || ch === 63) {
      if (silent) {
        return true;
      }
    } else if (ch === 47 || isLetter$1(ch)) {
      if (ch === 47) {
        match = state.src.slice(pos, max).match(HTML_TAG_CLOSE_RE);
        if (!match) {
          return false;
        }
      } else {
        match = state.src.slice(pos, max).match(HTML_TAG_OPEN_RE);
        if (!match) {
          return false;
        }
      }
      if (html_blocks[match[1].toLowerCase()] !== true) {
        return false;
      }
      if (silent) {
        return true;
      }
    } else {
      return false;
    }
    nextLine = startLine + 1;
    while (nextLine < state.lineMax && !state.isEmpty(nextLine)) {
      nextLine++;
    }
    state.line = nextLine;
    state.tokens.push({
      type: "htmlblock",
      level: state.level,
      lines: [startLine, state.line],
      content: state.getLines(startLine, nextLine, 0, true)
    });
    return true;
  }
  function getLine(state, line) {
    var pos = state.bMarks[line] + state.blkIndent, max = state.eMarks[line];
    return state.src.substr(pos, max - pos);
  }
  function table(state, startLine, endLine, silent) {
    var ch, lineText, pos, i, nextLine, rows, cell, aligns, t, tableLines, tbodyLines;
    if (startLine + 2 > endLine) {
      return false;
    }
    nextLine = startLine + 1;
    if (state.tShift[nextLine] < state.blkIndent) {
      return false;
    }
    pos = state.bMarks[nextLine] + state.tShift[nextLine];
    if (pos >= state.eMarks[nextLine]) {
      return false;
    }
    ch = state.src.charCodeAt(pos);
    if (ch !== 124 && ch !== 45 && ch !== 58) {
      return false;
    }
    lineText = getLine(state, startLine + 1);
    if (!/^[-:| ]+$/.test(lineText)) {
      return false;
    }
    rows = lineText.split("|");
    if (rows <= 2) {
      return false;
    }
    aligns = [];
    for (i = 0; i < rows.length; i++) {
      t = rows[i].trim();
      if (!t) {
        if (i === 0 || i === rows.length - 1) {
          continue;
        } else {
          return false;
        }
      }
      if (!/^:?-+:?$/.test(t)) {
        return false;
      }
      if (t.charCodeAt(t.length - 1) === 58) {
        aligns.push(t.charCodeAt(0) === 58 ? "center" : "right");
      } else if (t.charCodeAt(0) === 58) {
        aligns.push("left");
      } else {
        aligns.push("");
      }
    }
    lineText = getLine(state, startLine).trim();
    if (lineText.indexOf("|") === -1) {
      return false;
    }
    rows = lineText.replace(/^\||\|$/g, "").split("|");
    if (aligns.length !== rows.length) {
      return false;
    }
    if (silent) {
      return true;
    }
    state.tokens.push({
      type: "table_open",
      lines: tableLines = [startLine, 0],
      level: state.level++
    });
    state.tokens.push({
      type: "thead_open",
      lines: [startLine, startLine + 1],
      level: state.level++
    });
    state.tokens.push({
      type: "tr_open",
      lines: [startLine, startLine + 1],
      level: state.level++
    });
    for (i = 0; i < rows.length; i++) {
      state.tokens.push({
        type: "th_open",
        align: aligns[i],
        lines: [startLine, startLine + 1],
        level: state.level++
      });
      state.tokens.push({
        type: "inline",
        content: rows[i].trim(),
        lines: [startLine, startLine + 1],
        level: state.level,
        children: []
      });
      state.tokens.push({ type: "th_close", level: --state.level });
    }
    state.tokens.push({ type: "tr_close", level: --state.level });
    state.tokens.push({ type: "thead_close", level: --state.level });
    state.tokens.push({
      type: "tbody_open",
      lines: tbodyLines = [startLine + 2, 0],
      level: state.level++
    });
    for (nextLine = startLine + 2; nextLine < endLine; nextLine++) {
      if (state.tShift[nextLine] < state.blkIndent) {
        break;
      }
      lineText = getLine(state, nextLine).trim();
      if (lineText.indexOf("|") === -1) {
        break;
      }
      rows = lineText.replace(/^\||\|$/g, "").split("|");
      state.tokens.push({ type: "tr_open", level: state.level++ });
      for (i = 0; i < rows.length; i++) {
        state.tokens.push({ type: "td_open", align: aligns[i], level: state.level++ });
        cell = rows[i].substring(
          rows[i].charCodeAt(0) === 124 ? 1 : 0,
          rows[i].charCodeAt(rows[i].length - 1) === 124 ? rows[i].length - 1 : rows[i].length
        ).trim();
        state.tokens.push({
          type: "inline",
          content: cell,
          level: state.level,
          children: []
        });
        state.tokens.push({ type: "td_close", level: --state.level });
      }
      state.tokens.push({ type: "tr_close", level: --state.level });
    }
    state.tokens.push({ type: "tbody_close", level: --state.level });
    state.tokens.push({ type: "table_close", level: --state.level });
    tableLines[1] = tbodyLines[1] = nextLine;
    state.line = nextLine;
    return true;
  }
  function skipMarker(state, line) {
    var pos, marker, start = state.bMarks[line] + state.tShift[line], max = state.eMarks[line];
    if (start >= max) {
      return -1;
    }
    marker = state.src.charCodeAt(start++);
    if (marker !== 126 && marker !== 58) {
      return -1;
    }
    pos = state.skipSpaces(start);
    if (start === pos) {
      return -1;
    }
    if (pos >= max) {
      return -1;
    }
    return pos;
  }
  function markTightParagraphs$1(state, idx) {
    var i, l, level = state.level + 2;
    for (i = idx + 2, l = state.tokens.length - 2; i < l; i++) {
      if (state.tokens[i].level === level && state.tokens[i].type === "paragraph_open") {
        state.tokens[i + 2].tight = true;
        state.tokens[i].tight = true;
        i += 2;
      }
    }
  }
  function deflist(state, startLine, endLine, silent) {
    var contentStart, ddLine, dtLine, itemLines, listLines, listTokIdx, nextLine, oldIndent, oldDDIndent, oldParentType, oldTShift, oldTight, prevEmptyEnd, tight;
    if (silent) {
      if (state.ddIndent < 0) {
        return false;
      }
      return skipMarker(state, startLine) >= 0;
    }
    nextLine = startLine + 1;
    if (state.isEmpty(nextLine)) {
      if (++nextLine > endLine) {
        return false;
      }
    }
    if (state.tShift[nextLine] < state.blkIndent) {
      return false;
    }
    contentStart = skipMarker(state, nextLine);
    if (contentStart < 0) {
      return false;
    }
    if (state.level >= state.options.maxNesting) {
      return false;
    }
    listTokIdx = state.tokens.length;
    state.tokens.push({
      type: "dl_open",
      lines: listLines = [startLine, 0],
      level: state.level++
    });
    dtLine = startLine;
    ddLine = nextLine;
    OUTER:
      for (; ; ) {
        tight = true;
        prevEmptyEnd = false;
        state.tokens.push({
          type: "dt_open",
          lines: [dtLine, dtLine],
          level: state.level++
        });
        state.tokens.push({
          type: "inline",
          content: state.getLines(dtLine, dtLine + 1, state.blkIndent, false).trim(),
          level: state.level + 1,
          lines: [dtLine, dtLine],
          children: []
        });
        state.tokens.push({
          type: "dt_close",
          level: --state.level
        });
        for (; ; ) {
          state.tokens.push({
            type: "dd_open",
            lines: itemLines = [nextLine, 0],
            level: state.level++
          });
          oldTight = state.tight;
          oldDDIndent = state.ddIndent;
          oldIndent = state.blkIndent;
          oldTShift = state.tShift[ddLine];
          oldParentType = state.parentType;
          state.blkIndent = state.ddIndent = state.tShift[ddLine] + 2;
          state.tShift[ddLine] = contentStart - state.bMarks[ddLine];
          state.tight = true;
          state.parentType = "deflist";
          state.parser.tokenize(state, ddLine, endLine, true);
          if (!state.tight || prevEmptyEnd) {
            tight = false;
          }
          prevEmptyEnd = state.line - ddLine > 1 && state.isEmpty(state.line - 1);
          state.tShift[ddLine] = oldTShift;
          state.tight = oldTight;
          state.parentType = oldParentType;
          state.blkIndent = oldIndent;
          state.ddIndent = oldDDIndent;
          state.tokens.push({
            type: "dd_close",
            level: --state.level
          });
          itemLines[1] = nextLine = state.line;
          if (nextLine >= endLine) {
            break OUTER;
          }
          if (state.tShift[nextLine] < state.blkIndent) {
            break OUTER;
          }
          contentStart = skipMarker(state, nextLine);
          if (contentStart < 0) {
            break;
          }
          ddLine = nextLine;
        }
        if (nextLine >= endLine) {
          break;
        }
        dtLine = nextLine;
        if (state.isEmpty(dtLine)) {
          break;
        }
        if (state.tShift[dtLine] < state.blkIndent) {
          break;
        }
        ddLine = dtLine + 1;
        if (ddLine >= endLine) {
          break;
        }
        if (state.isEmpty(ddLine)) {
          ddLine++;
        }
        if (ddLine >= endLine) {
          break;
        }
        if (state.tShift[ddLine] < state.blkIndent) {
          break;
        }
        contentStart = skipMarker(state, ddLine);
        if (contentStart < 0) {
          break;
        }
      }
    state.tokens.push({
      type: "dl_close",
      level: --state.level
    });
    listLines[1] = nextLine;
    state.line = nextLine;
    if (tight) {
      markTightParagraphs$1(state, listTokIdx);
    }
    return true;
  }
  function paragraph(state, startLine) {
    var endLine, content, terminate, i, l, nextLine = startLine + 1, terminatorRules;
    endLine = state.lineMax;
    if (nextLine < endLine && !state.isEmpty(nextLine)) {
      terminatorRules = state.parser.ruler.getRules("paragraph");
      for (; nextLine < endLine && !state.isEmpty(nextLine); nextLine++) {
        if (state.tShift[nextLine] - state.blkIndent > 3) {
          continue;
        }
        terminate = false;
        for (i = 0, l = terminatorRules.length; i < l; i++) {
          if (terminatorRules[i](state, nextLine, endLine, true)) {
            terminate = true;
            break;
          }
        }
        if (terminate) {
          break;
        }
      }
    }
    content = state.getLines(startLine, nextLine, state.blkIndent, false).trim();
    state.line = nextLine;
    if (content.length) {
      state.tokens.push({
        type: "paragraph_open",
        tight: false,
        lines: [startLine, state.line],
        level: state.level
      });
      state.tokens.push({
        type: "inline",
        content,
        level: state.level + 1,
        lines: [startLine, state.line],
        children: []
      });
      state.tokens.push({
        type: "paragraph_close",
        tight: false,
        level: state.level
      });
    }
    return true;
  }
  var _rules$1 = [
    ["code", code],
    ["fences", fences, ["paragraph", "blockquote", "list"]],
    ["blockquote", blockquote, ["paragraph", "blockquote", "list"]],
    ["hr", hr, ["paragraph", "blockquote", "list"]],
    ["list", list, ["paragraph", "blockquote"]],
    ["footnote", footnote, ["paragraph"]],
    ["heading", heading, ["paragraph", "blockquote"]],
    ["lheading", lheading],
    ["htmlblock", htmlblock, ["paragraph", "blockquote"]],
    ["table", table, ["paragraph"]],
    ["deflist", deflist, ["paragraph"]],
    ["paragraph", paragraph]
  ];
  function ParserBlock() {
    this.ruler = new Ruler();
    for (var i = 0; i < _rules$1.length; i++) {
      this.ruler.push(_rules$1[i][0], _rules$1[i][1], {
        alt: (_rules$1[i][2] || []).slice()
      });
    }
  }
  ParserBlock.prototype.tokenize = function(state, startLine, endLine) {
    var rules2 = this.ruler.getRules("");
    var len = rules2.length;
    var line = startLine;
    var hasEmptyLines = false;
    var ok, i;
    while (line < endLine) {
      state.line = line = state.skipEmptyLines(line);
      if (line >= endLine) {
        break;
      }
      if (state.tShift[line] < state.blkIndent) {
        break;
      }
      for (i = 0; i < len; i++) {
        ok = rules2[i](state, line, endLine, false);
        if (ok) {
          break;
        }
      }
      state.tight = !hasEmptyLines;
      if (state.isEmpty(state.line - 1)) {
        hasEmptyLines = true;
      }
      line = state.line;
      if (line < endLine && state.isEmpty(line)) {
        hasEmptyLines = true;
        line++;
        if (line < endLine && state.parentType === "list" && state.isEmpty(line)) {
          break;
        }
        state.line = line;
      }
    }
  };
  var TABS_SCAN_RE = /[\n\t]/g;
  var NEWLINES_RE = /\r[\n\u0085]|[\u2424\u2028\u0085]/g;
  var SPACES_RE = /\u00a0/g;
  ParserBlock.prototype.parse = function(str, options, env, outTokens) {
    var state, lineStart = 0, lastTabPos = 0;
    if (!str) {
      return [];
    }
    str = str.replace(SPACES_RE, " ");
    str = str.replace(NEWLINES_RE, "\n");
    if (str.indexOf("	") >= 0) {
      str = str.replace(TABS_SCAN_RE, function(match, offset) {
        var result;
        if (str.charCodeAt(offset) === 10) {
          lineStart = offset + 1;
          lastTabPos = 0;
          return match;
        }
        result = "    ".slice((offset - lineStart - lastTabPos) % 4);
        lastTabPos = offset - lineStart + 1;
        return result;
      });
    }
    state = new StateBlock(str, this, options, env, outTokens);
    this.tokenize(state, state.line, state.lineMax);
  };
  function isTerminatorChar(ch) {
    switch (ch) {
      case 10:
      case 92:
      case 96:
      case 42:
      case 95:
      case 94:
      case 91:
      case 93:
      case 33:
      case 38:
      case 60:
      case 62:
      case 123:
      case 125:
      case 36:
      case 37:
      case 64:
      case 126:
      case 43:
      case 61:
      case 58:
        return true;
      default:
        return false;
    }
  }
  function text2(state, silent) {
    var pos = state.pos;
    while (pos < state.posMax && !isTerminatorChar(state.src.charCodeAt(pos))) {
      pos++;
    }
    if (pos === state.pos) {
      return false;
    }
    if (!silent) {
      state.pending += state.src.slice(state.pos, pos);
    }
    state.pos = pos;
    return true;
  }
  function newline(state, silent) {
    var pmax, max, pos = state.pos;
    if (state.src.charCodeAt(pos) !== 10) {
      return false;
    }
    pmax = state.pending.length - 1;
    max = state.posMax;
    if (!silent) {
      if (pmax >= 0 && state.pending.charCodeAt(pmax) === 32) {
        if (pmax >= 1 && state.pending.charCodeAt(pmax - 1) === 32) {
          for (var i = pmax - 2; i >= 0; i--) {
            if (state.pending.charCodeAt(i) !== 32) {
              state.pending = state.pending.substring(0, i + 1);
              break;
            }
          }
          state.push({
            type: "hardbreak",
            level: state.level
          });
        } else {
          state.pending = state.pending.slice(0, -1);
          state.push({
            type: "softbreak",
            level: state.level
          });
        }
      } else {
        state.push({
          type: "softbreak",
          level: state.level
        });
      }
    }
    pos++;
    while (pos < max && state.src.charCodeAt(pos) === 32) {
      pos++;
    }
    state.pos = pos;
    return true;
  }
  var ESCAPED = [];
  for (i = 0; i < 256; i++) {
    ESCAPED.push(0);
  }
  var i;
  "\\!\"#$%&'()*+,./:;<=>?@[]^_`{|}~-".split("").forEach(function(ch) {
    ESCAPED[ch.charCodeAt(0)] = 1;
  });
  function escape(state, silent) {
    var ch, pos = state.pos, max = state.posMax;
    if (state.src.charCodeAt(pos) !== 92) {
      return false;
    }
    pos++;
    if (pos < max) {
      ch = state.src.charCodeAt(pos);
      if (ch < 256 && ESCAPED[ch] !== 0) {
        if (!silent) {
          state.pending += state.src[pos];
        }
        state.pos += 2;
        return true;
      }
      if (ch === 10) {
        if (!silent) {
          state.push({
            type: "hardbreak",
            level: state.level
          });
        }
        pos++;
        while (pos < max && state.src.charCodeAt(pos) === 32) {
          pos++;
        }
        state.pos = pos;
        return true;
      }
    }
    if (!silent) {
      state.pending += "\\";
    }
    state.pos++;
    return true;
  }
  function backticks(state, silent) {
    var start, max, marker, matchStart, matchEnd, pos = state.pos, ch = state.src.charCodeAt(pos);
    if (ch !== 96) {
      return false;
    }
    start = pos;
    pos++;
    max = state.posMax;
    while (pos < max && state.src.charCodeAt(pos) === 96) {
      pos++;
    }
    marker = state.src.slice(start, pos);
    matchStart = matchEnd = pos;
    while ((matchStart = state.src.indexOf("`", matchEnd)) !== -1) {
      matchEnd = matchStart + 1;
      while (matchEnd < max && state.src.charCodeAt(matchEnd) === 96) {
        matchEnd++;
      }
      if (matchEnd - matchStart === marker.length) {
        if (!silent) {
          state.push({
            type: "code",
            content: state.src.slice(pos, matchStart).replace(/[ \n]+/g, " ").trim(),
            block: false,
            level: state.level
          });
        }
        state.pos = matchEnd;
        return true;
      }
    }
    if (!silent) {
      state.pending += marker;
    }
    state.pos += marker.length;
    return true;
  }
  function del(state, silent) {
    var found, pos, stack, max = state.posMax, start = state.pos, lastChar, nextChar;
    if (state.src.charCodeAt(start) !== 126) {
      return false;
    }
    if (silent) {
      return false;
    }
    if (start + 4 >= max) {
      return false;
    }
    if (state.src.charCodeAt(start + 1) !== 126) {
      return false;
    }
    if (state.level >= state.options.maxNesting) {
      return false;
    }
    lastChar = start > 0 ? state.src.charCodeAt(start - 1) : -1;
    nextChar = state.src.charCodeAt(start + 2);
    if (lastChar === 126) {
      return false;
    }
    if (nextChar === 126) {
      return false;
    }
    if (nextChar === 32 || nextChar === 10) {
      return false;
    }
    pos = start + 2;
    while (pos < max && state.src.charCodeAt(pos) === 126) {
      pos++;
    }
    if (pos > start + 3) {
      state.pos += pos - start;
      if (!silent) {
        state.pending += state.src.slice(start, pos);
      }
      return true;
    }
    state.pos = start + 2;
    stack = 1;
    while (state.pos + 1 < max) {
      if (state.src.charCodeAt(state.pos) === 126) {
        if (state.src.charCodeAt(state.pos + 1) === 126) {
          lastChar = state.src.charCodeAt(state.pos - 1);
          nextChar = state.pos + 2 < max ? state.src.charCodeAt(state.pos + 2) : -1;
          if (nextChar !== 126 && lastChar !== 126) {
            if (lastChar !== 32 && lastChar !== 10) {
              stack--;
            } else if (nextChar !== 32 && nextChar !== 10) {
              stack++;
            }
            if (stack <= 0) {
              found = true;
              break;
            }
          }
        }
      }
      state.parser.skipToken(state);
    }
    if (!found) {
      state.pos = start;
      return false;
    }
    state.posMax = state.pos;
    state.pos = start + 2;
    if (!silent) {
      state.push({ type: "del_open", level: state.level++ });
      state.parser.tokenize(state);
      state.push({ type: "del_close", level: --state.level });
    }
    state.pos = state.posMax + 2;
    state.posMax = max;
    return true;
  }
  function ins(state, silent) {
    var found, pos, stack, max = state.posMax, start = state.pos, lastChar, nextChar;
    if (state.src.charCodeAt(start) !== 43) {
      return false;
    }
    if (silent) {
      return false;
    }
    if (start + 4 >= max) {
      return false;
    }
    if (state.src.charCodeAt(start + 1) !== 43) {
      return false;
    }
    if (state.level >= state.options.maxNesting) {
      return false;
    }
    lastChar = start > 0 ? state.src.charCodeAt(start - 1) : -1;
    nextChar = state.src.charCodeAt(start + 2);
    if (lastChar === 43) {
      return false;
    }
    if (nextChar === 43) {
      return false;
    }
    if (nextChar === 32 || nextChar === 10) {
      return false;
    }
    pos = start + 2;
    while (pos < max && state.src.charCodeAt(pos) === 43) {
      pos++;
    }
    if (pos !== start + 2) {
      state.pos += pos - start;
      if (!silent) {
        state.pending += state.src.slice(start, pos);
      }
      return true;
    }
    state.pos = start + 2;
    stack = 1;
    while (state.pos + 1 < max) {
      if (state.src.charCodeAt(state.pos) === 43) {
        if (state.src.charCodeAt(state.pos + 1) === 43) {
          lastChar = state.src.charCodeAt(state.pos - 1);
          nextChar = state.pos + 2 < max ? state.src.charCodeAt(state.pos + 2) : -1;
          if (nextChar !== 43 && lastChar !== 43) {
            if (lastChar !== 32 && lastChar !== 10) {
              stack--;
            } else if (nextChar !== 32 && nextChar !== 10) {
              stack++;
            }
            if (stack <= 0) {
              found = true;
              break;
            }
          }
        }
      }
      state.parser.skipToken(state);
    }
    if (!found) {
      state.pos = start;
      return false;
    }
    state.posMax = state.pos;
    state.pos = start + 2;
    if (!silent) {
      state.push({ type: "ins_open", level: state.level++ });
      state.parser.tokenize(state);
      state.push({ type: "ins_close", level: --state.level });
    }
    state.pos = state.posMax + 2;
    state.posMax = max;
    return true;
  }
  function mark(state, silent) {
    var found, pos, stack, max = state.posMax, start = state.pos, lastChar, nextChar;
    if (state.src.charCodeAt(start) !== 61) {
      return false;
    }
    if (silent) {
      return false;
    }
    if (start + 4 >= max) {
      return false;
    }
    if (state.src.charCodeAt(start + 1) !== 61) {
      return false;
    }
    if (state.level >= state.options.maxNesting) {
      return false;
    }
    lastChar = start > 0 ? state.src.charCodeAt(start - 1) : -1;
    nextChar = state.src.charCodeAt(start + 2);
    if (lastChar === 61) {
      return false;
    }
    if (nextChar === 61) {
      return false;
    }
    if (nextChar === 32 || nextChar === 10) {
      return false;
    }
    pos = start + 2;
    while (pos < max && state.src.charCodeAt(pos) === 61) {
      pos++;
    }
    if (pos !== start + 2) {
      state.pos += pos - start;
      if (!silent) {
        state.pending += state.src.slice(start, pos);
      }
      return true;
    }
    state.pos = start + 2;
    stack = 1;
    while (state.pos + 1 < max) {
      if (state.src.charCodeAt(state.pos) === 61) {
        if (state.src.charCodeAt(state.pos + 1) === 61) {
          lastChar = state.src.charCodeAt(state.pos - 1);
          nextChar = state.pos + 2 < max ? state.src.charCodeAt(state.pos + 2) : -1;
          if (nextChar !== 61 && lastChar !== 61) {
            if (lastChar !== 32 && lastChar !== 10) {
              stack--;
            } else if (nextChar !== 32 && nextChar !== 10) {
              stack++;
            }
            if (stack <= 0) {
              found = true;
              break;
            }
          }
        }
      }
      state.parser.skipToken(state);
    }
    if (!found) {
      state.pos = start;
      return false;
    }
    state.posMax = state.pos;
    state.pos = start + 2;
    if (!silent) {
      state.push({ type: "mark_open", level: state.level++ });
      state.parser.tokenize(state);
      state.push({ type: "mark_close", level: --state.level });
    }
    state.pos = state.posMax + 2;
    state.posMax = max;
    return true;
  }
  function isAlphaNum(code2) {
    return code2 >= 48 && code2 <= 57 || code2 >= 65 && code2 <= 90 || code2 >= 97 && code2 <= 122;
  }
  function scanDelims(state, start) {
    var pos = start, lastChar, nextChar, count, can_open = true, can_close = true, max = state.posMax, marker = state.src.charCodeAt(start);
    lastChar = start > 0 ? state.src.charCodeAt(start - 1) : -1;
    while (pos < max && state.src.charCodeAt(pos) === marker) {
      pos++;
    }
    if (pos >= max) {
      can_open = false;
    }
    count = pos - start;
    if (count >= 4) {
      can_open = can_close = false;
    } else {
      nextChar = pos < max ? state.src.charCodeAt(pos) : -1;
      if (nextChar === 32 || nextChar === 10) {
        can_open = false;
      }
      if (lastChar === 32 || lastChar === 10) {
        can_close = false;
      }
      if (marker === 95) {
        if (isAlphaNum(lastChar)) {
          can_open = false;
        }
        if (isAlphaNum(nextChar)) {
          can_close = false;
        }
      }
    }
    return {
      can_open,
      can_close,
      delims: count
    };
  }
  function emphasis(state, silent) {
    var startCount, count, found, oldCount, newCount, stack, res, max = state.posMax, start = state.pos, marker = state.src.charCodeAt(start);
    if (marker !== 95 && marker !== 42) {
      return false;
    }
    if (silent) {
      return false;
    }
    res = scanDelims(state, start);
    startCount = res.delims;
    if (!res.can_open) {
      state.pos += startCount;
      if (!silent) {
        state.pending += state.src.slice(start, state.pos);
      }
      return true;
    }
    if (state.level >= state.options.maxNesting) {
      return false;
    }
    state.pos = start + startCount;
    stack = [startCount];
    while (state.pos < max) {
      if (state.src.charCodeAt(state.pos) === marker) {
        res = scanDelims(state, state.pos);
        count = res.delims;
        if (res.can_close) {
          oldCount = stack.pop();
          newCount = count;
          while (oldCount !== newCount) {
            if (newCount < oldCount) {
              stack.push(oldCount - newCount);
              break;
            }
            newCount -= oldCount;
            if (stack.length === 0) {
              break;
            }
            state.pos += oldCount;
            oldCount = stack.pop();
          }
          if (stack.length === 0) {
            startCount = oldCount;
            found = true;
            break;
          }
          state.pos += count;
          continue;
        }
        if (res.can_open) {
          stack.push(count);
        }
        state.pos += count;
        continue;
      }
      state.parser.skipToken(state);
    }
    if (!found) {
      state.pos = start;
      return false;
    }
    state.posMax = state.pos;
    state.pos = start + startCount;
    if (!silent) {
      if (startCount === 2 || startCount === 3) {
        state.push({ type: "strong_open", level: state.level++ });
      }
      if (startCount === 1 || startCount === 3) {
        state.push({ type: "em_open", level: state.level++ });
      }
      state.parser.tokenize(state);
      if (startCount === 1 || startCount === 3) {
        state.push({ type: "em_close", level: --state.level });
      }
      if (startCount === 2 || startCount === 3) {
        state.push({ type: "strong_close", level: --state.level });
      }
    }
    state.pos = state.posMax + startCount;
    state.posMax = max;
    return true;
  }
  var UNESCAPE_RE = /\\([ \\!"#$%&'()*+,.\/:;<=>?@[\]^_`{|}~-])/g;
  function sub(state, silent) {
    var found, content, max = state.posMax, start = state.pos;
    if (state.src.charCodeAt(start) !== 126) {
      return false;
    }
    if (silent) {
      return false;
    }
    if (start + 2 >= max) {
      return false;
    }
    if (state.level >= state.options.maxNesting) {
      return false;
    }
    state.pos = start + 1;
    while (state.pos < max) {
      if (state.src.charCodeAt(state.pos) === 126) {
        found = true;
        break;
      }
      state.parser.skipToken(state);
    }
    if (!found || start + 1 === state.pos) {
      state.pos = start;
      return false;
    }
    content = state.src.slice(start + 1, state.pos);
    if (content.match(/(^|[^\\])(\\\\)*\s/)) {
      state.pos = start;
      return false;
    }
    state.posMax = state.pos;
    state.pos = start + 1;
    if (!silent) {
      state.push({
        type: "sub",
        level: state.level,
        content: content.replace(UNESCAPE_RE, "$1")
      });
    }
    state.pos = state.posMax + 1;
    state.posMax = max;
    return true;
  }
  var UNESCAPE_RE$1 = /\\([ \\!"#$%&'()*+,.\/:;<=>?@[\]^_`{|}~-])/g;
  function sup(state, silent) {
    var found, content, max = state.posMax, start = state.pos;
    if (state.src.charCodeAt(start) !== 94) {
      return false;
    }
    if (silent) {
      return false;
    }
    if (start + 2 >= max) {
      return false;
    }
    if (state.level >= state.options.maxNesting) {
      return false;
    }
    state.pos = start + 1;
    while (state.pos < max) {
      if (state.src.charCodeAt(state.pos) === 94) {
        found = true;
        break;
      }
      state.parser.skipToken(state);
    }
    if (!found || start + 1 === state.pos) {
      state.pos = start;
      return false;
    }
    content = state.src.slice(start + 1, state.pos);
    if (content.match(/(^|[^\\])(\\\\)*\s/)) {
      state.pos = start;
      return false;
    }
    state.posMax = state.pos;
    state.pos = start + 1;
    if (!silent) {
      state.push({
        type: "sup",
        level: state.level,
        content: content.replace(UNESCAPE_RE$1, "$1")
      });
    }
    state.pos = state.posMax + 1;
    state.posMax = max;
    return true;
  }
  function links(state, silent) {
    var labelStart, labelEnd, label, href, title, pos, ref, code2, isImage = false, oldPos = state.pos, max = state.posMax, start = state.pos, marker = state.src.charCodeAt(start);
    if (marker === 33) {
      isImage = true;
      marker = state.src.charCodeAt(++start);
    }
    if (marker !== 91) {
      return false;
    }
    if (state.level >= state.options.maxNesting) {
      return false;
    }
    labelStart = start + 1;
    labelEnd = parseLinkLabel(state, start);
    if (labelEnd < 0) {
      return false;
    }
    pos = labelEnd + 1;
    if (pos < max && state.src.charCodeAt(pos) === 40) {
      pos++;
      for (; pos < max; pos++) {
        code2 = state.src.charCodeAt(pos);
        if (code2 !== 32 && code2 !== 10) {
          break;
        }
      }
      if (pos >= max) {
        return false;
      }
      start = pos;
      if (parseLinkDestination(state, pos)) {
        href = state.linkContent;
        pos = state.pos;
      } else {
        href = "";
      }
      start = pos;
      for (; pos < max; pos++) {
        code2 = state.src.charCodeAt(pos);
        if (code2 !== 32 && code2 !== 10) {
          break;
        }
      }
      if (pos < max && start !== pos && parseLinkTitle(state, pos)) {
        title = state.linkContent;
        pos = state.pos;
        for (; pos < max; pos++) {
          code2 = state.src.charCodeAt(pos);
          if (code2 !== 32 && code2 !== 10) {
            break;
          }
        }
      } else {
        title = "";
      }
      if (pos >= max || state.src.charCodeAt(pos) !== 41) {
        state.pos = oldPos;
        return false;
      }
      pos++;
    } else {
      if (state.linkLevel > 0) {
        return false;
      }
      for (; pos < max; pos++) {
        code2 = state.src.charCodeAt(pos);
        if (code2 !== 32 && code2 !== 10) {
          break;
        }
      }
      if (pos < max && state.src.charCodeAt(pos) === 91) {
        start = pos + 1;
        pos = parseLinkLabel(state, pos);
        if (pos >= 0) {
          label = state.src.slice(start, pos++);
        } else {
          pos = start - 1;
        }
      }
      if (!label) {
        if (typeof label === "undefined") {
          pos = labelEnd + 1;
        }
        label = state.src.slice(labelStart, labelEnd);
      }
      ref = state.env.references[normalizeReference(label)];
      if (!ref) {
        state.pos = oldPos;
        return false;
      }
      href = ref.href;
      title = ref.title;
    }
    if (!silent) {
      state.pos = labelStart;
      state.posMax = labelEnd;
      if (isImage) {
        state.push({
          type: "image",
          src: href,
          title,
          alt: state.src.substr(labelStart, labelEnd - labelStart),
          level: state.level
        });
      } else {
        state.push({
          type: "link_open",
          href,
          title,
          level: state.level++
        });
        state.linkLevel++;
        state.parser.tokenize(state);
        state.linkLevel--;
        state.push({ type: "link_close", level: --state.level });
      }
    }
    state.pos = pos;
    state.posMax = max;
    return true;
  }
  function footnote_inline(state, silent) {
    var labelStart, labelEnd, footnoteId, oldLength, max = state.posMax, start = state.pos;
    if (start + 2 >= max) {
      return false;
    }
    if (state.src.charCodeAt(start) !== 94) {
      return false;
    }
    if (state.src.charCodeAt(start + 1) !== 91) {
      return false;
    }
    if (state.level >= state.options.maxNesting) {
      return false;
    }
    labelStart = start + 2;
    labelEnd = parseLinkLabel(state, start + 1);
    if (labelEnd < 0) {
      return false;
    }
    if (!silent) {
      if (!state.env.footnotes) {
        state.env.footnotes = {};
      }
      if (!state.env.footnotes.list) {
        state.env.footnotes.list = [];
      }
      footnoteId = state.env.footnotes.list.length;
      state.pos = labelStart;
      state.posMax = labelEnd;
      state.push({
        type: "footnote_ref",
        id: footnoteId,
        level: state.level
      });
      state.linkLevel++;
      oldLength = state.tokens.length;
      state.parser.tokenize(state);
      state.env.footnotes.list[footnoteId] = { tokens: state.tokens.splice(oldLength) };
      state.linkLevel--;
    }
    state.pos = labelEnd + 1;
    state.posMax = max;
    return true;
  }
  function footnote_ref(state, silent) {
    var label, pos, footnoteId, footnoteSubId, max = state.posMax, start = state.pos;
    if (start + 3 > max) {
      return false;
    }
    if (!state.env.footnotes || !state.env.footnotes.refs) {
      return false;
    }
    if (state.src.charCodeAt(start) !== 91) {
      return false;
    }
    if (state.src.charCodeAt(start + 1) !== 94) {
      return false;
    }
    if (state.level >= state.options.maxNesting) {
      return false;
    }
    for (pos = start + 2; pos < max; pos++) {
      if (state.src.charCodeAt(pos) === 32) {
        return false;
      }
      if (state.src.charCodeAt(pos) === 10) {
        return false;
      }
      if (state.src.charCodeAt(pos) === 93) {
        break;
      }
    }
    if (pos === start + 2) {
      return false;
    }
    if (pos >= max) {
      return false;
    }
    pos++;
    label = state.src.slice(start + 2, pos - 1);
    if (typeof state.env.footnotes.refs[":" + label] === "undefined") {
      return false;
    }
    if (!silent) {
      if (!state.env.footnotes.list) {
        state.env.footnotes.list = [];
      }
      if (state.env.footnotes.refs[":" + label] < 0) {
        footnoteId = state.env.footnotes.list.length;
        state.env.footnotes.list[footnoteId] = { label, count: 0 };
        state.env.footnotes.refs[":" + label] = footnoteId;
      } else {
        footnoteId = state.env.footnotes.refs[":" + label];
      }
      footnoteSubId = state.env.footnotes.list[footnoteId].count;
      state.env.footnotes.list[footnoteId].count++;
      state.push({
        type: "footnote_ref",
        id: footnoteId,
        subId: footnoteSubId,
        level: state.level
      });
    }
    state.pos = pos;
    state.posMax = max;
    return true;
  }
  var url_schemas = [
    "coap",
    "doi",
    "javascript",
    "aaa",
    "aaas",
    "about",
    "acap",
    "cap",
    "cid",
    "crid",
    "data",
    "dav",
    "dict",
    "dns",
    "file",
    "ftp",
    "geo",
    "go",
    "gopher",
    "h323",
    "http",
    "https",
    "iax",
    "icap",
    "im",
    "imap",
    "info",
    "ipp",
    "iris",
    "iris.beep",
    "iris.xpc",
    "iris.xpcs",
    "iris.lwz",
    "ldap",
    "mailto",
    "mid",
    "msrp",
    "msrps",
    "mtqp",
    "mupdate",
    "news",
    "nfs",
    "ni",
    "nih",
    "nntp",
    "opaquelocktoken",
    "pop",
    "pres",
    "rtsp",
    "service",
    "session",
    "shttp",
    "sieve",
    "sip",
    "sips",
    "sms",
    "snmp",
    "soap.beep",
    "soap.beeps",
    "tag",
    "tel",
    "telnet",
    "tftp",
    "thismessage",
    "tn3270",
    "tip",
    "tv",
    "urn",
    "vemmi",
    "ws",
    "wss",
    "xcon",
    "xcon-userid",
    "xmlrpc.beep",
    "xmlrpc.beeps",
    "xmpp",
    "z39.50r",
    "z39.50s",
    "adiumxtra",
    "afp",
    "afs",
    "aim",
    "apt",
    "attachment",
    "aw",
    "beshare",
    "bitcoin",
    "bolo",
    "callto",
    "chrome",
    "chrome-extension",
    "com-eventbrite-attendee",
    "content",
    "cvs",
    "dlna-playsingle",
    "dlna-playcontainer",
    "dtn",
    "dvb",
    "ed2k",
    "facetime",
    "feed",
    "finger",
    "fish",
    "gg",
    "git",
    "gizmoproject",
    "gtalk",
    "hcp",
    "icon",
    "ipn",
    "irc",
    "irc6",
    "ircs",
    "itms",
    "jar",
    "jms",
    "keyparc",
    "lastfm",
    "ldaps",
    "magnet",
    "maps",
    "market",
    "message",
    "mms",
    "ms-help",
    "msnim",
    "mumble",
    "mvn",
    "notes",
    "oid",
    "palm",
    "paparazzi",
    "platform",
    "proxy",
    "psyc",
    "query",
    "res",
    "resource",
    "rmi",
    "rsync",
    "rtmp",
    "secondlife",
    "sftp",
    "sgn",
    "skype",
    "smb",
    "soldat",
    "spotify",
    "ssh",
    "steam",
    "svn",
    "teamspeak",
    "things",
    "udp",
    "unreal",
    "ut2004",
    "ventrilo",
    "view-source",
    "webcal",
    "wtai",
    "wyciwyg",
    "xfire",
    "xri",
    "ymsgr"
  ];
  var EMAIL_RE = /^<([a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*)>/;
  var AUTOLINK_RE = /^<([a-zA-Z.\-]{1,25}):([^<>\x00-\x20]*)>/;
  function autolink(state, silent) {
    var tail, linkMatch, emailMatch, url, fullUrl, pos = state.pos;
    if (state.src.charCodeAt(pos) !== 60) {
      return false;
    }
    tail = state.src.slice(pos);
    if (tail.indexOf(">") < 0) {
      return false;
    }
    linkMatch = tail.match(AUTOLINK_RE);
    if (linkMatch) {
      if (url_schemas.indexOf(linkMatch[1].toLowerCase()) < 0) {
        return false;
      }
      url = linkMatch[0].slice(1, -1);
      fullUrl = normalizeLink(url);
      if (!state.parser.validateLink(url)) {
        return false;
      }
      if (!silent) {
        state.push({
          type: "link_open",
          href: fullUrl,
          level: state.level
        });
        state.push({
          type: "text",
          content: url,
          level: state.level + 1
        });
        state.push({ type: "link_close", level: state.level });
      }
      state.pos += linkMatch[0].length;
      return true;
    }
    emailMatch = tail.match(EMAIL_RE);
    if (emailMatch) {
      url = emailMatch[0].slice(1, -1);
      fullUrl = normalizeLink("mailto:" + url);
      if (!state.parser.validateLink(fullUrl)) {
        return false;
      }
      if (!silent) {
        state.push({
          type: "link_open",
          href: fullUrl,
          level: state.level
        });
        state.push({
          type: "text",
          content: url,
          level: state.level + 1
        });
        state.push({ type: "link_close", level: state.level });
      }
      state.pos += emailMatch[0].length;
      return true;
    }
    return false;
  }
  function replace$1(regex, options) {
    regex = regex.source;
    options = options || "";
    return function self(name, val) {
      if (!name) {
        return new RegExp(regex, options);
      }
      val = val.source || val;
      regex = regex.replace(name, val);
      return self;
    };
  }
  var attr_name = /[a-zA-Z_:][a-zA-Z0-9:._-]*/;
  var unquoted = /[^"'=<>`\x00-\x20]+/;
  var single_quoted = /'[^']*'/;
  var double_quoted = /"[^"]*"/;
  var attr_value = replace$1(/(?:unquoted|single_quoted|double_quoted)/)("unquoted", unquoted)("single_quoted", single_quoted)("double_quoted", double_quoted)();
  var attribute = replace$1(/(?:\s+attr_name(?:\s*=\s*attr_value)?)/)("attr_name", attr_name)("attr_value", attr_value)();
  var open_tag = replace$1(/<[A-Za-z][A-Za-z0-9]*attribute*\s*\/?>/)("attribute", attribute)();
  var close_tag = /<\/[A-Za-z][A-Za-z0-9]*\s*>/;
  var comment = /<!---->|<!--(?:-?[^>-])(?:-?[^-])*-->/;
  var processing = /<[?].*?[?]>/;
  var declaration = /<![A-Z]+\s+[^>]*>/;
  var cdata = /<!\[CDATA\[[\s\S]*?\]\]>/;
  var HTML_TAG_RE = replace$1(/^(?:open_tag|close_tag|comment|processing|declaration|cdata)/)("open_tag", open_tag)("close_tag", close_tag)("comment", comment)("processing", processing)("declaration", declaration)("cdata", cdata)();
  function isLetter$2(ch) {
    var lc = ch | 32;
    return lc >= 97 && lc <= 122;
  }
  function htmltag(state, silent) {
    var ch, match, max, pos = state.pos;
    if (!state.options.html) {
      return false;
    }
    max = state.posMax;
    if (state.src.charCodeAt(pos) !== 60 || pos + 2 >= max) {
      return false;
    }
    ch = state.src.charCodeAt(pos + 1);
    if (ch !== 33 && ch !== 63 && ch !== 47 && !isLetter$2(ch)) {
      return false;
    }
    match = state.src.slice(pos).match(HTML_TAG_RE);
    if (!match) {
      return false;
    }
    if (!silent) {
      state.push({
        type: "htmltag",
        content: state.src.slice(pos, pos + match[0].length),
        level: state.level
      });
    }
    state.pos += match[0].length;
    return true;
  }
  var DIGITAL_RE = /^&#((?:x[a-f0-9]{1,8}|[0-9]{1,8}));/i;
  var NAMED_RE = /^&([a-z][a-z0-9]{1,31});/i;
  function entity(state, silent) {
    var ch, code2, match, pos = state.pos, max = state.posMax;
    if (state.src.charCodeAt(pos) !== 38) {
      return false;
    }
    if (pos + 1 < max) {
      ch = state.src.charCodeAt(pos + 1);
      if (ch === 35) {
        match = state.src.slice(pos).match(DIGITAL_RE);
        if (match) {
          if (!silent) {
            code2 = match[1][0].toLowerCase() === "x" ? parseInt(match[1].slice(1), 16) : parseInt(match[1], 10);
            state.pending += isValidEntityCode(code2) ? fromCodePoint(code2) : fromCodePoint(65533);
          }
          state.pos += match[0].length;
          return true;
        }
      } else {
        match = state.src.slice(pos).match(NAMED_RE);
        if (match) {
          var decoded = decodeEntity(match[1]);
          if (match[1] !== decoded) {
            if (!silent) {
              state.pending += decoded;
            }
            state.pos += match[0].length;
            return true;
          }
        }
      }
    }
    if (!silent) {
      state.pending += "&";
    }
    state.pos++;
    return true;
  }
  var _rules$2 = [
    ["text", text2],
    ["newline", newline],
    ["escape", escape],
    ["backticks", backticks],
    ["del", del],
    ["ins", ins],
    ["mark", mark],
    ["emphasis", emphasis],
    ["sub", sub],
    ["sup", sup],
    ["links", links],
    ["footnote_inline", footnote_inline],
    ["footnote_ref", footnote_ref],
    ["autolink", autolink],
    ["htmltag", htmltag],
    ["entity", entity]
  ];
  function ParserInline() {
    this.ruler = new Ruler();
    for (var i = 0; i < _rules$2.length; i++) {
      this.ruler.push(_rules$2[i][0], _rules$2[i][1]);
    }
    this.validateLink = validateLink;
  }
  ParserInline.prototype.skipToken = function(state) {
    var rules2 = this.ruler.getRules("");
    var len = rules2.length;
    var pos = state.pos;
    var i, cached_pos;
    if ((cached_pos = state.cacheGet(pos)) > 0) {
      state.pos = cached_pos;
      return;
    }
    for (i = 0; i < len; i++) {
      if (rules2[i](state, true)) {
        state.cacheSet(pos, state.pos);
        return;
      }
    }
    state.pos++;
    state.cacheSet(pos, state.pos);
  };
  ParserInline.prototype.tokenize = function(state) {
    var rules2 = this.ruler.getRules("");
    var len = rules2.length;
    var end3 = state.posMax;
    var ok, i;
    while (state.pos < end3) {
      for (i = 0; i < len; i++) {
        ok = rules2[i](state, false);
        if (ok) {
          break;
        }
      }
      if (ok) {
        if (state.pos >= end3) {
          break;
        }
        continue;
      }
      state.pending += state.src[state.pos++];
    }
    if (state.pending) {
      state.pushPending();
    }
  };
  ParserInline.prototype.parse = function(str, options, env, outTokens) {
    var state = new StateInline(str, this, options, env, outTokens);
    this.tokenize(state);
  };
  function validateLink(url) {
    var BAD_PROTOCOLS = ["vbscript", "javascript", "file", "data"];
    var str = url.trim().toLowerCase();
    str = replaceEntities(str);
    if (str.indexOf(":") !== -1 && BAD_PROTOCOLS.indexOf(str.split(":")[0]) !== -1) {
      return false;
    }
    return true;
  }
  var defaultConfig = {
    options: {
      html: false,
      // Enable HTML tags in source
      xhtmlOut: false,
      // Use '/' to close single tags (<br />)
      breaks: false,
      // Convert '\n' in paragraphs into <br>
      langPrefix: "language-",
      // CSS language prefix for fenced blocks
      linkTarget: "",
      // set target to open link in
      // Enable some language-neutral replacements + quotes beautification
      typographer: false,
      // Double + single quotes replacement pairs, when typographer enabled,
      // and smartquotes on. Set doubles to '«»' for Russian, '„“' for German.
      quotes: "\u201C\u201D\u2018\u2019",
      // Highlighter function. Should return escaped HTML,
      // or '' if input not changed
      //
      // function (/*str, lang*/) { return ''; }
      //
      highlight: null,
      maxNesting: 20
      // Internal protection, recursion limit
    },
    components: {
      core: {
        rules: [
          "block",
          "inline",
          "references",
          "replacements",
          "smartquotes",
          "references",
          "abbr2",
          "footnote_tail"
        ]
      },
      block: {
        rules: [
          "blockquote",
          "code",
          "fences",
          "footnote",
          "heading",
          "hr",
          "htmlblock",
          "lheading",
          "list",
          "paragraph",
          "table"
        ]
      },
      inline: {
        rules: [
          "autolink",
          "backticks",
          "del",
          "emphasis",
          "entity",
          "escape",
          "footnote_ref",
          "htmltag",
          "links",
          "newline",
          "text"
        ]
      }
    }
  };
  var fullConfig = {
    options: {
      html: false,
      // Enable HTML tags in source
      xhtmlOut: false,
      // Use '/' to close single tags (<br />)
      breaks: false,
      // Convert '\n' in paragraphs into <br>
      langPrefix: "language-",
      // CSS language prefix for fenced blocks
      linkTarget: "",
      // set target to open link in
      // Enable some language-neutral replacements + quotes beautification
      typographer: false,
      // Double + single quotes replacement pairs, when typographer enabled,
      // and smartquotes on. Set doubles to '«»' for Russian, '„“' for German.
      quotes: "\u201C\u201D\u2018\u2019",
      // Highlighter function. Should return escaped HTML,
      // or '' if input not changed
      //
      // function (/*str, lang*/) { return ''; }
      //
      highlight: null,
      maxNesting: 20
      // Internal protection, recursion limit
    },
    components: {
      // Don't restrict core/block/inline rules
      core: {},
      block: {},
      inline: {}
    }
  };
  var commonmarkConfig = {
    options: {
      html: true,
      // Enable HTML tags in source
      xhtmlOut: true,
      // Use '/' to close single tags (<br />)
      breaks: false,
      // Convert '\n' in paragraphs into <br>
      langPrefix: "language-",
      // CSS language prefix for fenced blocks
      linkTarget: "",
      // set target to open link in
      // Enable some language-neutral replacements + quotes beautification
      typographer: false,
      // Double + single quotes replacement pairs, when typographer enabled,
      // and smartquotes on. Set doubles to '«»' for Russian, '„“' for German.
      quotes: "\u201C\u201D\u2018\u2019",
      // Highlighter function. Should return escaped HTML,
      // or '' if input not changed
      //
      // function (/*str, lang*/) { return ''; }
      //
      highlight: null,
      maxNesting: 20
      // Internal protection, recursion limit
    },
    components: {
      core: {
        rules: [
          "block",
          "inline",
          "references",
          "abbr2"
        ]
      },
      block: {
        rules: [
          "blockquote",
          "code",
          "fences",
          "heading",
          "hr",
          "htmlblock",
          "lheading",
          "list",
          "paragraph"
        ]
      },
      inline: {
        rules: [
          "autolink",
          "backticks",
          "emphasis",
          "entity",
          "escape",
          "htmltag",
          "links",
          "newline",
          "text"
        ]
      }
    }
  };
  var config2 = {
    "default": defaultConfig,
    "full": fullConfig,
    "commonmark": commonmarkConfig
  };
  function StateCore(instance, str, env) {
    this.src = str;
    this.env = env;
    this.options = instance.options;
    this.tokens = [];
    this.inlineMode = false;
    this.inline = instance.inline;
    this.block = instance.block;
    this.renderer = instance.renderer;
    this.typographer = instance.typographer;
  }
  function Remarkable(preset, options) {
    if (typeof preset !== "string") {
      options = preset;
      preset = "default";
    }
    if (options && options.linkify != null) {
      console.warn(
        "linkify option is removed. Use linkify plugin instead:\n\nimport Remarkable from 'remarkable';\nimport linkify from 'remarkable/linkify';\nnew Remarkable().use(linkify)\n"
      );
    }
    this.inline = new ParserInline();
    this.block = new ParserBlock();
    this.core = new Core();
    this.renderer = new Renderer();
    this.ruler = new Ruler();
    this.options = {};
    this.configure(config2[preset]);
    this.set(options || {});
  }
  Remarkable.prototype.set = function(options) {
    assign(this.options, options);
  };
  Remarkable.prototype.configure = function(presets) {
    var self = this;
    if (!presets) {
      throw new Error("Wrong `remarkable` preset, check name/content");
    }
    if (presets.options) {
      self.set(presets.options);
    }
    if (presets.components) {
      Object.keys(presets.components).forEach(function(name) {
        if (presets.components[name].rules) {
          self[name].ruler.enable(presets.components[name].rules, true);
        }
      });
    }
  };
  Remarkable.prototype.use = function(plugin, options) {
    plugin(this, options);
    return this;
  };
  Remarkable.prototype.parse = function(str, env) {
    var state = new StateCore(this, str, env);
    this.core.process(state);
    return state.tokens;
  };
  Remarkable.prototype.render = function(str, env) {
    env = env || {};
    return this.renderer.render(this.parse(str, env), this.options, env);
  };
  Remarkable.prototype.parseInline = function(str, env) {
    var state = new StateCore(this, str, env);
    state.inlineMode = true;
    this.core.process(state);
    return state.tokens;
  };
  Remarkable.prototype.renderInline = function(str, env) {
    env = env || {};
    return this.renderer.render(this.parseInline(str, env), this.options, env);
  };

  // src/components/AboutMe.js
  var AboutMe = class extends AppElement {
    #default = {
      context: {
        lang: "en"
      }
    };
    constructor(props = {}) {
      super();
      this.eventName = "user:click-modal-box";
      this.state = this.initState(this.#default, props);
      this.getAttribute("id") || this.setAttribute("id", this.state.id || `component-${Math.floor(Math.random() * 100)}`);
      this.md = new Remarkable();
    }
    static get observedAttributes() {
      return ["active"];
    }
    attributeChangedCallback(name, old, now) {
      console.log(name, old, now);
      if (name == "active" && now === "1") {
        this.querySelector(".modal").classList.add("is-active");
      }
    }
    handleEvent(event) {
      if (event.type === "click") {
        if (event.target.ariaLabel === "close") {
          this.querySelector(".modal").classList.remove("is-active");
          this.removeAttribute("active");
        }
      }
    }
    #getContent() {
      return (
        /*HTML*/
        `
            <div class="modal-card">
                <header class="modal-card-head">
                <p class="modal-card-title">${this.state.title?.text[this.state.context.lang]}</p>
                <button class="delete" aria-label="close"></button>
                </header>
                <section class="modal-card-body content">
                ${this.md.render(this.state.content?.text[this.state.context.lang])}
                </section>
            </div>
        `
      );
    }
    render() {
      this.innerHTML = /* html */
      `
        <div class="modal">
            <div class="modal-background"></div>
                ${this.#getContent()}
        </div>
        `;
      this.addEvents();
    }
  };
  customElements.define("about-me", AboutMe);
})();
