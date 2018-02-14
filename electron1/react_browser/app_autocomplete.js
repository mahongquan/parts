//'use strict';
//    findDOMNode = _require.findDOMNode;
//var scrollIntoView = require('dom-scroll-into-view');
const RE_NUM = /[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source;

function getClientPosition(elem) {
  let box;
  let x;
  let y;
  const doc = elem.ownerDocument;
  const body = doc.body;
  const docElem = doc && doc.documentElement;
  // 根据 GBS 最新数据，A-Grade Browsers 都已支持 getBoundingClientRect 方法，不用再考虑传统的实现方式
  box = elem.getBoundingClientRect();

  // 注：jQuery 还考虑减去 docElem.clientLeft/clientTop
  // 但测试发现，这样反而会导致当 html 和 body 有边距/边框样式时，获取的值不正确
  // 此外，ie6 会忽略 html 的 margin 值，幸运地是没有谁会去设置 html 的 margin

  x = box.left;
  y = box.top;

  // In IE, most of the time, 2 extra pixels are added to the top and left
  // due to the implicit 2-pixel inset border.  In IE6/7 quirks mode and
  // IE6 standards mode, this border can be overridden by setting the
  // document element's border to zero -- thus, we cannot rely on the
  // offset always being 2 pixels.

  // In quirks mode, the offset can be determined by querying the body's
  // clientLeft/clientTop, but in standards mode, it is found by querying
  // the document element's clientLeft/clientTop.  Since we already called
  // getClientBoundingRect we have already forced a reflow, so it is not
  // too expensive just to query them all.

  // ie 下应该减去窗口的边框吧，毕竟默认 absolute 都是相对窗口定位的
  // 窗口边框标准是设 documentElement ,quirks 时设置 body
  // 最好禁止在 body 和 html 上边框 ，但 ie < 9 html 默认有 2px ，减去
  // 但是非 ie 不可能设置窗口边框，body html 也不是窗口 ,ie 可以通过 html,body 设置
  // 标准 ie 下 docElem.clientTop 就是 border-top
  // ie7 html 即窗口边框改变不了。永远为 2
  // 但标准 firefox/chrome/ie9 下 docElem.clientTop 是窗口边框，即使设了 border-top 也为 0

  x -= docElem.clientLeft || body.clientLeft || 0;
  y -= docElem.clientTop || body.clientTop || 0;

  return {
    left: x,
    top: y,
  };
}

function getScroll(w, top) {
  let ret = w[`page${(top ? 'Y' : 'X')}Offset`];
  const method = `scroll${(top ? 'Top' : 'Left')}`;
  if (typeof ret !== 'number') {
    const d = w.document;
    // ie6,7,8 standard mode
    ret = d.documentElement[method];
    if (typeof ret !== 'number') {
      // quirks mode
      ret = d.body[method];
    }
  }
  return ret;
}

function getScrollLeft(w) {
  return getScroll(w);
}

function getScrollTop(w) {
  return getScroll(w, true);
}

function getOffset(el) {
  const pos = getClientPosition(el);
  const doc = el.ownerDocument;
  const w = doc.defaultView || doc.parentWindow;
  pos.left += getScrollLeft(w);
  pos.top += getScrollTop(w);
  return pos;
}
function _getComputedStyle(elem, name, computedStyle_) {
  let val = '';
  const d = elem.ownerDocument;
  const computedStyle = computedStyle_ || d.defaultView.getComputedStyle(elem, null);

  // https://github.com/kissyteam/kissy/issues/61
  if (computedStyle) {
    val = computedStyle.getPropertyValue(name) || computedStyle[name];
  }

  return val;
}

const _RE_NUM_NO_PX = new RegExp(`^(${RE_NUM})(?!px)[a-z%]+$`, 'i');
const RE_POS = /^(top|right|bottom|left)$/;
const CURRENT_STYLE = 'currentStyle';
const RUNTIME_STYLE = 'runtimeStyle';
const LEFT = 'left';
const PX = 'px';

function _getComputedStyleIE(elem, name) {
  // currentStyle maybe null
  // http://msdn.microsoft.com/en-us/library/ms535231.aspx
  let ret = elem[CURRENT_STYLE] && elem[CURRENT_STYLE][name];

  // 当 width/height 设置为百分比时，通过 pixelLeft 方式转换的 width/height 值
  // 一开始就处理了! CUSTOM_STYLE.height,CUSTOM_STYLE.width ,cssHook 解决@2011-08-19
  // 在 ie 下不对，需要直接用 offset 方式
  // borderWidth 等值也有问题，但考虑到 borderWidth 设为百分比的概率很小，这里就不考虑了

  // From the awesome hack by Dean Edwards
  // http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291
  // If we're not dealing with a regular pixel number
  // but a number that has a weird ending, we need to convert it to pixels
  // exclude left right for relativity
  if (_RE_NUM_NO_PX.test(ret) && !RE_POS.test(name)) {
    // Remember the original values
    const style = elem.style;
    const left = style[LEFT];
    const rsLeft = elem[RUNTIME_STYLE][LEFT];

    // prevent flashing of content
    elem[RUNTIME_STYLE][LEFT] = elem[CURRENT_STYLE][LEFT];

    // Put in the new values to get a computed value out
    style[LEFT] = name === 'fontSize' ? '1em' : (ret || 0);
    ret = style.pixelLeft + PX;

    // Revert the changed values
    style[LEFT] = left;

    elem[RUNTIME_STYLE][LEFT] = rsLeft;
  }
  return ret === '' ? 'auto' : ret;
}

let getComputedStyleX;
if (typeof window !== 'undefined') {
  getComputedStyleX = window.getComputedStyle ? _getComputedStyle : _getComputedStyleIE;
}

function each(arr, fn) {
  for (let i = 0; i < arr.length; i++) {
    fn(arr[i]);
  }
}

function isBorderBoxFn(elem) {
  return getComputedStyleX(elem, 'boxSizing') === 'border-box';
}

const BOX_MODELS = ['margin', 'border', 'padding'];
const CONTENT_INDEX = -1;
const PADDING_INDEX = 2;
const BORDER_INDEX = 1;
const MARGIN_INDEX = 0;

function swap(elem, options, callback) {
  const old = {};
  const style = elem.style;
  let name;

  // Remember the old values, and insert the new ones
  for (name in options) {
    if (options.hasOwnProperty(name)) {
      old[name] = style[name];
      style[name] = options[name];
    }
  }

  callback.call(elem);

  // Revert the old values
  for (name in options) {
    if (options.hasOwnProperty(name)) {
      style[name] = old[name];
    }
  }
}

function getPBMWidth(elem, props, which) {
  let value = 0;
  let prop;
  let j;
  let i;
  for (j = 0; j < props.length; j++) {
    prop = props[j];
    if (prop) {
      for (i = 0; i < which.length; i++) {
        let cssProp;
        if (prop === 'border') {
          cssProp = `${prop + which[i]}Width`;
        } else {
          cssProp = prop + which[i];
        }
        value += parseFloat(getComputedStyleX(elem, cssProp)) || 0;
      }
    }
  }
  return value;
}

/**
 * A crude way of determining if an object is a window
 * @member util
 */
function isWindow(obj) {
  // must use == for ie8
  /* eslint eqeqeq:0 */
  return obj != null && obj == obj.window;
}

const domUtils = {};

each(['Width', 'Height'], (name) => {
  domUtils[`doc${name}`] = (refWin) => {
    const d = refWin.document;
    return Math.max(
      // firefox chrome documentElement.scrollHeight< body.scrollHeight
      // ie standard mode : documentElement.scrollHeight> body.scrollHeight
      d.documentElement[`scroll${name}`],
      // quirks : documentElement.scrollHeight 最大等于可视窗口多一点？
      d.body[`scroll${name}`],
      domUtils[`viewport${name}`](d));
  };

  domUtils[`viewport${name}`] = (win) => {
    // pc browser includes scrollbar in window.innerWidth
    const prop = `client${name}`;
    const doc = win.document;
    const body = doc.body;
    const documentElement = doc.documentElement;
    const documentElementProp = documentElement[prop];
    // 标准模式取 documentElement
    // backcompat 取 body
    return doc.compatMode === 'CSS1Compat' && documentElementProp ||
      body && body[prop] || documentElementProp;
  };
});

/*
 得到元素的大小信息
 @param elem
 @param name
 @param {String} [extra]  'padding' : (css width) + padding
 'border' : (css width) + padding + border
 'margin' : (css width) + padding + border + margin
 */
function getWH(elem, name, extra) {
  if (isWindow(elem)) {
    return name === 'width' ? domUtils.viewportWidth(elem) : domUtils.viewportHeight(elem);
  } else if (elem.nodeType === 9) {
    return name === 'width' ? domUtils.docWidth(elem) : domUtils.docHeight(elem);
  }
  const which = name === 'width' ? ['Left', 'Right'] : ['Top', 'Bottom'];
  let borderBoxValue = name === 'width' ? elem.offsetWidth : elem.offsetHeight;
  const computedStyle = getComputedStyleX(elem);
  const isBorderBox = isBorderBoxFn(elem, computedStyle);
  let cssBoxValue = 0;
  if (borderBoxValue == null || borderBoxValue <= 0) {
    borderBoxValue = undefined;
    // Fall back to computed then un computed css if necessary
    cssBoxValue = getComputedStyleX(elem, name);
    if (cssBoxValue == null || (Number(cssBoxValue)) < 0) {
      cssBoxValue = elem.style[name] || 0;
    }
    // Normalize '', auto, and prepare for extra
    cssBoxValue = parseFloat(cssBoxValue) || 0;
  }
  if (extra === undefined) {
    extra = isBorderBox ? BORDER_INDEX : CONTENT_INDEX;
  }
  const borderBoxValueOrIsBorderBox = borderBoxValue !== undefined || isBorderBox;
  const val = borderBoxValue || cssBoxValue;
  if (extra === CONTENT_INDEX) {
    if (borderBoxValueOrIsBorderBox) {
      return val - getPBMWidth(elem, ['border', 'padding'],
          which, computedStyle);
    }
    return cssBoxValue;
  }
  if (borderBoxValueOrIsBorderBox) {
    const padding = (extra === PADDING_INDEX ?
      -getPBMWidth(elem, ['border'], which, computedStyle) :
      getPBMWidth(elem, ['margin'], which, computedStyle));
    return val + (extra === BORDER_INDEX ? 0 : padding);
  }
  return cssBoxValue + getPBMWidth(elem, BOX_MODELS.slice(extra),
      which, computedStyle);
}

const cssShow = {
  position: 'absolute',
  visibility: 'hidden',
  display: 'block',
};

// fix #119 : https://github.com/kissyteam/kissy/issues/119
function getWHIgnoreDisplay(elem) {
  let val;
  const args = arguments;
  // in case elem is window
  // elem.offsetWidth === undefined
  if (elem.offsetWidth !== 0) {
    val = getWH.apply(undefined, args);
  } else {
    swap(elem, cssShow, () => {
      val = getWH.apply(undefined, args);
    });
  }
  return val;
}

function css(el, name, v) {
  let value = v;
  if (typeof name === 'object') {
    for (const i in name) {
      if (name.hasOwnProperty(i)) {
        css(el, i, name[i]);
      }
    }
    return undefined;
  }
  if (typeof value !== 'undefined') {
    if (typeof value === 'number') {
      value += 'px';
    }
    el.style[name] = value;
    return undefined;
  }
  return getComputedStyleX(el, name);
}

each(['width', 'height'], (name) => {
  const first = name.charAt(0).toUpperCase() + name.slice(1);
  domUtils[`outer${first}`] = (el, includeMargin) => {
    return el && getWHIgnoreDisplay(el, name, includeMargin ? MARGIN_INDEX : BORDER_INDEX);
  };
  const which = name === 'width' ? ['Left', 'Right'] : ['Top', 'Bottom'];

  domUtils[name] = (elem, val) => {
    if (val !== undefined) {
      if (elem) {
        const computedStyle = getComputedStyleX(elem);
        const isBorderBox = isBorderBoxFn(elem);
        if (isBorderBox) {
          val += getPBMWidth(elem, ['padding', 'border'], which, computedStyle);
        }
        return css(elem, name, val);
      }
      return undefined;
    }
    return elem && getWHIgnoreDisplay(elem, name, CONTENT_INDEX);
  };
});

// 设置 elem 相对 elem.ownerDocument 的坐标
function setOffset(elem, offset) {
  // set position first, in-case top/left are set even on static elem
  if (css(elem, 'position') === 'static') {
    elem.style.position = 'relative';
  }

  const old = getOffset(elem);
  const ret = {};
  let current;
  let key;

  for (key in offset) {
    if (offset.hasOwnProperty(key)) {
      current = parseFloat(css(elem, key)) || 0;
      ret[key] = current + offset[key] - old[key];
    }
  }
  css(elem, ret);
}

var util = {
  getWindow(node) {
    const doc = node.ownerDocument || node;
    return doc.defaultView || doc.parentWindow;
  },
  offset(el, value) {
    if (typeof value !== 'undefined') {
      setOffset(el, value);
    } else {
      return getOffset(el);
    }
  },
  isWindow,
  each,
  css,
  clone(obj) {
    const ret = {};
    for (const i in obj) {
      if (obj.hasOwnProperty(i)) {
        ret[i] = obj[i];
      }
    }
    const overflow = obj.overflow;
    if (overflow) {
      for (const i in obj) {
        if (obj.hasOwnProperty(i)) {
          ret.overflow[i] = obj.overflow[i];
        }
      }
    }
    return ret;
  },
  scrollLeft(w, v) {
    if (isWindow(w)) {
      if (v === undefined) {
        return getScrollLeft(w);
      }
      window.scrollTo(v, getScrollTop(w));
    } else {
      if (v === undefined) {
        return w.scrollLeft;
      }
      w.scrollLeft = v;
    }
  },
  scrollTop(w, v) {
    if (isWindow(w)) {
      if (v === undefined) {
        return getScrollTop(w);
      }
      window.scrollTo(getScrollLeft(w), v);
    } else {
      if (v === undefined) {
        return w.scrollTop;
      }
      w.scrollTop = v;
    }
  },
  viewportWidth: 0,
  viewportHeight: 0,
  ...domUtils,
}
function scrollIntoView(elem, container, config) {
  config = config || {};
  // document 归一化到 window
  if (container.nodeType === 9) {
    container = util.getWindow(container);
  }

  let allowHorizontalScroll = config.allowHorizontalScroll;
  const onlyScrollIfNeeded = config.onlyScrollIfNeeded;
  let alignWithTop = config.alignWithTop;
  let alignWithLeft = config.alignWithLeft;
  const offsetTop = config.offsetTop || 0;
  const offsetLeft = config.offsetLeft || 0;
  const offsetBottom = config.offsetBottom || 0;
  const offsetRight = config.offsetRight || 0;

  allowHorizontalScroll = allowHorizontalScroll === undefined ? true : allowHorizontalScroll;

  const isWin = util.isWindow(container);
  const elemOffset = util.offset(elem);
  const eh = util.outerHeight(elem);
  const ew = util.outerWidth(elem);
  let containerOffset;
  let ch;
  let cw;
  let containerScroll;
  let diffTop;
  let diffBottom;
  let win;
  let winScroll;
  let ww;
  let wh;

  if (isWin) {
    win = container;
    wh = util.height(win);
    ww = util.width(win);
    winScroll = {
      left: util.scrollLeft(win),
      top: util.scrollTop(win),
    };
    // elem 相对 container 可视视窗的距离
    diffTop = {
      left: elemOffset.left - winScroll.left - offsetLeft,
      top: elemOffset.top - winScroll.top - offsetTop,
    };
    diffBottom = {
      left: elemOffset.left + ew - (winScroll.left + ww) + offsetRight,
      top: elemOffset.top + eh - (winScroll.top + wh) + offsetBottom,
    };
    containerScroll = winScroll;
  } else {
    containerOffset = util.offset(container);
    ch = container.clientHeight;
    cw = container.clientWidth;
    containerScroll = {
      left: container.scrollLeft,
      top: container.scrollTop,
    };
    // elem 相对 container 可视视窗的距离
    // 注意边框, offset 是边框到根节点
    diffTop = {
      left: elemOffset.left - (containerOffset.left +
      (parseFloat(util.css(container, 'borderLeftWidth')) || 0)) - offsetLeft,
      top: elemOffset.top - (containerOffset.top +
      (parseFloat(util.css(container, 'borderTopWidth')) || 0)) - offsetTop,
    };
    diffBottom = {
      left: elemOffset.left + ew -
      (containerOffset.left + cw +
      (parseFloat(util.css(container, 'borderRightWidth')) || 0)) + offsetRight,
      top: elemOffset.top + eh -
      (containerOffset.top + ch +
      (parseFloat(util.css(container, 'borderBottomWidth')) || 0)) + offsetBottom,
    };
  }

  if (diffTop.top < 0 || diffBottom.top > 0) {
    // 强制向上
    if (alignWithTop === true) {
      util.scrollTop(container, containerScroll.top + diffTop.top);
    } else if (alignWithTop === false) {
      util.scrollTop(container, containerScroll.top + diffBottom.top);
    } else {
      // 自动调整
      if (diffTop.top < 0) {
        util.scrollTop(container, containerScroll.top + diffTop.top);
      } else {
        util.scrollTop(container, containerScroll.top + diffBottom.top);
      }
    }
  } else {
    if (!onlyScrollIfNeeded) {
      alignWithTop = alignWithTop === undefined ? true : !!alignWithTop;
      if (alignWithTop) {
        util.scrollTop(container, containerScroll.top + diffTop.top);
      } else {
        util.scrollTop(container, containerScroll.top + diffBottom.top);
      }
    }
  }

  if (allowHorizontalScroll) {
    if (diffTop.left < 0 || diffBottom.left > 0) {
      // 强制向上
      if (alignWithLeft === true) {
        util.scrollLeft(container, containerScroll.left + diffTop.left);
      } else if (alignWithLeft === false) {
        util.scrollLeft(container, containerScroll.left + diffBottom.left);
      } else {
        // 自动调整
        if (diffTop.left < 0) {
          util.scrollLeft(container, containerScroll.left + diffTop.left);
        } else {
          util.scrollLeft(container, containerScroll.left + diffBottom.left);
        }
      }
    } else {
      if (!onlyScrollIfNeeded) {
        alignWithLeft = alignWithLeft === undefined ? true : !!alignWithLeft;
        if (alignWithLeft) {
          util.scrollLeft(container, containerScroll.left + diffTop.left);
        } else {
          util.scrollLeft(container, containerScroll.left + diffBottom.left);
        }
      }
    }
  }
}
/////////////////////////////////////
var  findDOMNode = ReactDOM.findDOMNode;
var IMPERATIVE_API = ['blur', 'checkValidity', 'click', 'focus', 'select', 'setCustomValidity', 'setSelectionRange', 'setRangeText'];
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
class Autocomplete extends React.Component {
  static defaultProps = {
    value: '',
    wrapperProps: {},
    wrapperStyle: {
      display: 'inline-block'
    },
    inputProps: {},
    onChange: function onChange() {},
    onSelect: function onSelect() {},
    renderMenu: function renderMenu(items, value, style) {
      return React.createElement('div', { style: _extends({}, style, this.menuStyle), children: items });
    },

    menuStyle: {
      borderRadius: '3px',
      boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
      background: 'rgba(255, 255, 255, 0.9)',
      padding: '2px 0',
      fontSize: '90%',
      position: 'relative',
      overflow: 'auto',
      maxHeight: '50%' },
    autoHighlight: true,
    onMenuVisibilityChange: function onMenuVisibilityChange() {}
  };
  static keyDownHandlers = {
    ArrowDown: function ArrowDown(event) {
      event.preventDefault();
      var itemsLength = this.getFilteredItems(this.props).length;
      if (!itemsLength) return;
      var highlightedIndex = this.state.highlightedIndex;

      var index = highlightedIndex === null || highlightedIndex === itemsLength - 1 ? 0 : highlightedIndex + 1;
      this.setState({
        highlightedIndex: index,
        isOpen: true
      });
    },
    ArrowUp: function ArrowUp(event) {
      event.preventDefault();
      var itemsLength = this.getFilteredItems(this.props).length;
      if (!itemsLength) return;
      var highlightedIndex = this.state.highlightedIndex;

      var index = highlightedIndex === 0 || highlightedIndex === null ? itemsLength - 1 : highlightedIndex - 1;
      this.setState({
        highlightedIndex: index,
        isOpen: true
      });
    },
    Enter: function Enter(event) {
      var _this5 = this;

      if (!this.isOpen()) {
        // menu is closed so there is no selection to accept -> do nothing
        return;
      } else if (this.state.highlightedIndex == null) {
        // input has focus but no menu item is selected + enter is hit -> close the menu, highlight whatever's in input
        this.setState({
          isOpen: false
        }, function () {
          _this5.refs.input.select();
        });
      } else {
        // text entered + menu item has been highlighted + enter is hit -> update value to that of selected menu item, close the menu
        event.preventDefault();
        var item = this.getFilteredItems(this.props)[this.state.highlightedIndex];
        var value = this.props.getItemValue(item);
        this.setState({
          isOpen: false,
          highlightedIndex: null
        }, function () {
          //this.refs.input.focus() // TODO: file issue
          _this5.refs.input.setSelectionRange(value.length, value.length);
          _this5.props.onSelect(value, item);
        });
      }
    },
    Escape: function Escape() {
      // In case the user is currently hovering over the menu
      this.setIgnoreBlur(false);
      this.setState({
        highlightedIndex: null,
        isOpen: false
      });
    },
    Tab: function Tab() {
      // In case the user is currently hovering over the menu
      this.setIgnoreBlur(false);
    }
  };
  static propTypes = {
    /**
     * The items to display in the dropdown menu
     */
    items: PropTypes.array.isRequired,
    /**
     * The value to display in the input field
     */
    value: PropTypes.any,
    /**
     * Arguments: `event: Event, value: String`
     *
     * Invoked every time the user changes the input's value.
     */
    onChange: PropTypes.func,
    /**
     * Arguments: `value: String, item: Any`
     *
     * Invoked when the user selects an item from the dropdown menu.
     */
    onSelect: PropTypes.func,
    /**
     * Arguments: `item: Any, value: String`
     *
     * Invoked for each entry in `items` and its return value is used to
     * determine whether or not it should be displayed in the dropdown menu.
     * By default all items are always rendered.
     */
    shouldItemRender: PropTypes.func,
    /**
     * Arguments: `itemA: Any, itemB: Any, value: String`
     *
     * The function which is used to sort `items` before display.
     */
    sortItems: PropTypes.func,
    /**
     * Arguments: `item: Any`
     *
     * Used to read the display value from each entry in `items`.
     */
    getItemValue: PropTypes.func.isRequired,
    /**
     * Arguments: `item: Any, isHighlighted: Boolean, styles: Object`
     *
     * Invoked for each entry in `items` that also passes `shouldItemRender` to
     * generate the render tree for each item in the dropdown menu. `styles` is
     * an optional set of styles that can be applied to improve the look/feel
     * of the items in the dropdown menu.
     */
    renderItem: PropTypes.func.isRequired,
    /**
     * Arguments: `items: Array<Any>, value: String, styles: Object`
     *
     * Invoked to generate the render tree for the dropdown menu. Ensure the
     * returned tree includes `items` or else no items will be rendered.
     * `styles` will contain { top, left, minWidth } which are the coordinates
     * of the top-left corner and the width of the dropdown menu.
     */
    renderMenu: PropTypes.func,
    /**
     * Styles that are applied to the dropdown menu in the default `renderMenu`
     * implementation. If you override `renderMenu` and you want to use
     * `menuStyles` you must manually apply them (`this.props.menuStyles`).
     */
    menuStyle: PropTypes.object,
    /**
     * Props that are applied to the `<input />` element rendered by
     * `Autocomplete`. Any properties supported by `HTMLInputElement` can be
     * specified, apart from the following which are set by `Autocomplete`:
     * value, autoComplete, role, aria-autocomplete
     */
    inputProps: PropTypes.object,
    /**
     * Props that are applied to the element which wraps the `<input />` and
     * dropdown menu elements rendered by `Autocomplete`.
     */
    wrapperProps: PropTypes.object,
    /**
     * This is a shorthand for `wrapperProps={{ style: <your styles> }}`.
     * Note that `wrapperStyle` is applied before `wrapperProps`, so the latter
     * will win if it contains a `style` entry.
     */
    wrapperStyle: PropTypes.object,
    /**
     * Whether or not to automatically highlight the top match in the dropdown
     * menu.
     */
    autoHighlight: PropTypes.bool,
    /**
     * Arguments: `isOpen: Boolean`
     *
     * Invoked every time the dropdown menu's visibility changes (i.e. every
     * time it is displayed/hidden).
     */
    onMenuVisibilityChange: PropTypes.func,
    /**
     * Used to override the internal logic which displays/hides the dropdown
     * menu. This is useful if you want to force a certain state based on your
     * UX/business logic. Use it together with `onMenuVisibilityChange` for
     * fine-grained control over the dropdown menu dynamics.
     */
    open: PropTypes.bool,
    debug: PropTypes.bool
  };
  constructor(){
    super();//function Autocomplete(props) {
    //_classCallCheck(this, Autocomplete);

    //var _this = _possibleConstructorReturn(this, (Autocomplete.__proto__ || Object.getPrototypeOf(Autocomplete)).call(this, props));

    this.state = {
      isOpen: false,
      highlightedIndex: null
    };
    this._debugStates = [];
    this.exposeAPI = this.exposeAPI.bind(this);
    this.handleInputFocus = this.handleInputFocus.bind(this);
    this.handleInputBlur = this.handleInputBlur.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleInputClick = this.handleInputClick.bind(this);
  }

  componentWillMount() {
      // this.refs is frozen, so we need to assign a new object to it
      this.refs = {};
      this._ignoreBlur = false;
  }
  componentWillReceiveProps(nextProps) {
      if (this.state.highlightedIndex !== null) {
        this.setState(this.ensureHighlightedIndex);
      }
      if (nextProps.autoHighlight && this.props.value !== nextProps.value) {
        this.setState(this.maybeAutoCompleteText);
      }
  }
  componentDidMount() {
      if (this.isOpen()) {
        this.setMenuPositions();
      }
  }
  componentDidUpdate(prevProps, prevState) {
      if ((this.state.isOpen && !prevState.isOpen) || ('open' in this.props && this.props.open && !prevProps.open)) this.setMenuPositions();

      this.maybeScrollItemIntoView();
      if (prevState.isOpen !== this.state.isOpen) {
        this.props.onMenuVisibilityChange(this.state.isOpen);
      }
      // Capture the input's focus as long as the ignoreBlur flag is set
      if (this._ignoreBlur) {
        this.refs.input.focus();
      }
  }
  exposeAPI(el) {
      var _this2 = this;

      this.refs.input = el;
      IMPERATIVE_API.forEach(function (ev) {
        return _this2[ev] = el && el[ev] && el[ev].bind(el);
      });
  }
  maybeScrollItemIntoView() {
      if (this.isOpen() && this.state.highlightedIndex !== null) {
        var itemNode = this.refs['item-' + this.state.highlightedIndex];
        var menuNode = this.refs.menu;
        scrollIntoView(findDOMNode(itemNode), findDOMNode(menuNode), { onlyScrollIfNeeded: true });
      }
  }
  handleKeyDown(event) {
      if (Autocomplete.keyDownHandlers[event.key]) Autocomplete.keyDownHandlers[event.key].call(this, event);else if (!this.isOpen()) {
        this.setState({
          isOpen: true
        });
      }
  }
  handleChange(event) {
      this.props.onChange(event, event.target.value);
  }
  getFilteredItems(props) {
      var items = props.items;

      if (props.shouldItemRender) {
        items = items.filter(function (item) {
          return props.shouldItemRender(item, props.value);
        });
      }

      if (props.sortItems) {
        items.sort(function (a, b) {
          return props.sortItems(a, b, props.value);
        });
      }

      return items;
  }
  maybeAutoCompleteText(state, props) {
      var highlightedIndex = state.highlightedIndex;
      var value = props.value,
          getItemValue = props.getItemValue;

      var index = highlightedIndex === null ? 0 : highlightedIndex;
      var matchedItem = this.getFilteredItems(props)[index];
      if (value !== '' && matchedItem) {
        var itemValue = getItemValue(matchedItem);
        var itemValueDoesMatch = itemValue.toLowerCase().indexOf(value.toLowerCase()) === 0;
        if (itemValueDoesMatch) {
          return { highlightedIndex: index };
        }
      }
      return { highlightedIndex: null };
  }
  ensureHighlightedIndex(state, props) {
      if (state.highlightedIndex >= this.getFilteredItems(props).length) {
        return { highlightedIndex: null };
      }
  }
  setMenuPositions() {
      var node = this.refs.input;
      var rect = node.getBoundingClientRect();
      // var computedStyle = global.window.getComputedStyle(node);
      // var marginBottom = parseInt(computedStyle.marginBottom, 10) || 0;
      // var marginLeft = parseInt(computedStyle.marginLeft, 10) || 0;
      // var marginRight = parseInt(computedStyle.marginRight, 10) || 0;
      // console.log("setMenuPositions================");
      // console.log(rect);
      // console.log(computedStyle);
      this.setState({
        menuTop: 0,//rect.bottom,
        menuLeft:0,// rect.left ,
        menuWidth: rect.width
      });
  }
  highlightItemFromMouse(index) {
      this.setState({ highlightedIndex: index });
  }
  selectItemFromMouse=(item)=>{
    console.log(this);
    console.log(item);
      var _this3 = this;

      var value = this.props.getItemValue(item);
      this.setState({
        isOpen: false,
        highlightedIndex: null
      }, function () {
        // Clear the ignoreBlur flag after the component has
        // updated to release control over the input's focus
        _this3.setIgnoreBlur(false);
        _this3.props.onSelect(value, item);
      });
  }
  setIgnoreBlur(ignore) {
      this._ignoreBlur = ignore;
  }
  renderMenu=()=> {
      var _this4 = this;

      var items = this.getFilteredItems(this.props).map(function (item, index) {
        var element = _this4.props.renderItem(item, _this4.state.highlightedIndex === index, { cursor: 'default' });
        return React.cloneElement(element, {
          onMouseEnter: function onMouseEnter() {
            return _this4.highlightItemFromMouse(index);
          },
          onClick: function onClick() {
            return _this4.selectItemFromMouse(item);
          },
          ref: function ref(e) {
            return _this4.refs['item-' + index] = e;
          }
        });
      });
      var style = {
        left: this.state.menuLeft,
        top: this.state.menuTop,
        minWidth: this.state.menuWidth
      };
      var menu = this.props.renderMenu(items, this.props.value, style);
      return React.cloneElement(menu, {
        ref: function ref(e) {
          return _this4.refs.menu = e;
        },
        // Ignore blur to prevent menu from de-rendering before we can process click
        onMouseEnter: function onMouseEnter() {
          return _this4.setIgnoreBlur(true);
        },
        onMouseLeave: function onMouseLeave() {
          return _this4.setIgnoreBlur(false);
        }
      });
  }
  handleInputBlur(event) {
      if (this._ignoreBlur) {
        return;
      }
      this.setState({
        isOpen: false,
        highlightedIndex: null
      });
      var onBlur = this.props.inputProps.onBlur;

      if (onBlur) {
        onBlur(event);
      }
  }
  handleInputFocus(event) {
      if (this._ignoreBlur) {
        return;
      }
      this.setState({ isOpen: true });
      var onFocus = this.props.inputProps.onFocus;

      if (onFocus) {
        onFocus(event);
      }
  }
  isInputFocused() {
      var el = this.refs.input;
      return el.ownerDocument && el === el.ownerDocument.activeElement;
  }
  handleInputClick() {
      // Input will not be focused if it's disabled
      if (this.isInputFocused() && !this.isOpen()) this.setState({ isOpen: true });
  }
  composeEventHandlers(internal, external) {
      return external ? function (e) {
        internal(e);external(e);
      } : internal;
  }
  isOpen() {
      return 'open' in this.props ? this.props.open : this.state.isOpen;
  }
  render() {
      if (this.props.debug) {
        // you don't like it, you love it
        this._debugStates.push({
          id: this._debugStates.length,
          state: this.state
        });
      }

      var inputProps = this.props.inputProps;

      var open = this.isOpen();
      return React.createElement(
        'div',
        _extends({ style: _extends({}, this.props.wrapperStyle) }, this.props.wrapperProps),
        React.createElement('input', _extends({}, inputProps, {
          role: 'combobox',
          'aria-autocomplete': 'list',
          'aria-expanded': open,
          autoComplete: 'off',
          ref: this.exposeAPI,
          onFocus: this.handleInputFocus,
          onBlur: this.handleInputBlur,
          onChange: this.handleChange,
          onKeyDown: this.composeEventHandlers(this.handleKeyDown, inputProps.onKeyDown),
          onClick: this.composeEventHandlers(this.handleInputClick, inputProps.onClick),
          value: this.props.value
        })),
        open && this.renderMenu(),
        this.props.debug && React.createElement(
          'pre',
          { style: { marginLeft: 300 } },
          JSON.stringify(this._debugStates.slice(Math.max(0, this._debugStates.length - 5), this._debugStates.length), null, 2)
        )
      );
  }
}
///////////////////////////////////////////////////////////////////////////////////
var {Bar,Table,Modal,Navbar,Nav,NavItem,DropdownButton,MenuItem}=ReactBootstrap;
let styles = {
  item: {
    padding: '2px 6px',
    cursor: 'default'
  },

  highlightedItem: {
    color: 'white',
    background: 'hsl(200, 50%, 50%)',
    padding: '2px 6px',
    cursor: 'default'
  },

  menu: {
    border: 'solid 1px #ccc'
  }
}
class PackItemEditNew extends React.Component{
  state={ 
      showModal: false,
      packitem:{},
      hiddenPacks:true,
      bg:{},
      date_open:false,
  }
  // componentWillReceiveProps(nextProps) {
  //   this.setState({ showModal: nextProps.showModal });
  //   if (nextProps.index==null){
  //     this.old={};
  //   }
  //   else{
  //     this.parent=nextProps.parent;
  //     this.old=this.parent.state.items[nextProps.index];
  //   }
  //   this.setState({packitem:this.old});
  // }
  close=()=>{
    this.setState({ showModal: false });
  }

  open2=(idx)=>{
    this.setState({ showModal: true });
    this.index=idx;
    if (this.index==null){
      this.old={};
    }
    else{
      this.parent=this.props.parent;
      this.old=this.parent.state.items[this.index];
    }
    this.setState({packitem:this.old});
  }
  handleSave=(data)=>{
    var url="/PackItem";
    Client.put(url,this.state.packitem,(res) => {
      console.log("/put/PackItem");
      console.log(res);
        this.setState({contact:res.data});
        this.parent.handlePackItemChange(this.index,res.data);
        this.old=res.data;
        this.close();
    });
  }
  quehuoChange=(e)=>{
    var quehuo=this.state.packitem.quehuo;
    quehuo=!quehuo;
    if(this.old.quehuo===quehuo)
    {
      const bg2=update(this.state.bg,{[e.target.name]:{$set:"#ffffff"}})
      this.setState({bg:bg2});
    }
    else{
       const bg2=update(this.state.bg,{[e.target.name]:{$set:"#8888ff"}})
      this.setState({bg:bg2}); 
    }
    const contact2=update(this.state.packitem,{quehuo: {$set:quehuo}});
    console.log(contact2);
    this.setState({packitem:contact2});
  }
  handleChange_item=(e)=>{
    console.log("change");
    console.log(e);
    console.log(e.target);
    console.log(e.target.value);
    console.log(e.target.name);
    if(this.old.Item[e.target.name]===e.target.value)
    {
      const bg2=update(this.state.bg,{[e.target.name]:{$set:"#ffffff"}})
      //this.state.bg[e_target_name]="#ffffff";
      //console.log("equal");
      this.setState({bg:bg2});
    }
    else{
       const bg2=update(this.state.bg,{[e.target.name]:{$set:"#8888ff"}})
      //this.state.bg[e_target_name]="#ffffff";
      //console.log("equal");
      this.setState({bg:bg2}); 
    }
    const contact2=update(this.state.packitem,{Item:{[e.target.name]: {$set:e.target.value}}});
    console.log(contact2);
    this.setState({packitem:contact2});
  }
  handleChange=(e)=>{
    console.log("change");
    console.log(e);
    console.log(e.target);
    console.log(e.target.value);
    console.log(e.target.name);
    if(this.old[e.target.name]===e.target.value)
    {
      const bg2=update(this.state.bg,{[e.target.name]:{$set:"#ffffff"}})
      //this.state.bg[e_target_name]="#ffffff";
      //console.log("equal");
      this.setState({bg:bg2});
    }
    else{
       const bg2=update(this.state.bg,{[e.target.name]:{$set:"#8888ff"}})
      //this.state.bg[e_target_name]="#ffffff";
      //console.log("equal");
      this.setState({bg:bg2}); 
    }
    const contact2=update(this.state.packitem,{[e.target.name]: {$set:e.target.value}});
    console.log(contact2);
    this.setState({packitem:contact2});
  }
  render=()=>{
    let item={};
    if(this.state.packitem.Item){
      item=this.state.packitem.Item;
    }
    return (
        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>编辑备件信息</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <table id="table_input" className="table-condensed" >
            <tbody> 
            <tr >
                <td >
                    ID:
                </td>
                <td >
                    <input type="text" id="id" name="id" readOnly="true"  disabled="disabled"    defaultValue={this.state.packitem.id} />
                </td>
            </tr>
            <tr >
                <td >
                    ItemID:
                </td>
                <td >
                    <input type="text" id="itemid" name="item_id" readOnly="true"  disabled="disabled"    
                    defaultValue={item.id} />
                </td>
            </tr>
            <tr>
                <td>
                    名称:
                </td>
                <td>
                    <input  style={{"backgroundColor":this.state.bg.addr}}  type="text" id="addr" name="name" value={item.name}
                     onChange={this.handleChange_item} />
                </td>
            </tr><tr>
                <td>
                    <label>规格:</label>
                </td>
                <td>
                    <input style={{"backgroundColor":this.state.bg.yiqixinghao}} type="text"  
                    name="guige" value={item.guige}  onChange={this.handleChange_item} />
                </td>
            </tr>
            <tr>
                <td>
                    <label>编号:</label>
                </td>
                <td>
                    <input style={{"backgroundColor":this.state.bg.baoxiang}} type="text" 
                    id="baoxiang" name="bh" value={item.bh}  onChange={this.handleChange_item} />
                </td>
            </tr>
            <tr>
                <td>
                    <label>单位:</label>
                </td>
                <td>
                    <input style={{"backgroundColor":this.state.bg.baoxiang}} type="text" 
                    id="danwei" name="danwei" value={item.danwei}  onChange={this.handleChange_item} />
                </td>
            </tr>
            <tr>
                <td>
                    <label>数量:</label>
                </td>
                <td>
                    <input type="text" style={{"backgroundColor":this.state.bg.ct}}
                    id="yujifahuo_date" name="ct"  value={this.state.packitem.ct} onChange={this.handleChange} />
                </td>
            </tr>  
            <tr>
                <td>
                    <label>缺货:</label>
                </td>
                <td>
                    <input type="checkbox" id="quehuo" name="quehuo" checked={this.state.packitem.quehuo}  onChange={this.quehuoChange} />
                </td>
            </tr>        
            </tbody>
            </table>
       <div> 
       <button className="btn btn-primary" id="bt_save" onClick={this.handleSave} >保存</button> 
       </div>
                </Modal.Body>
        </Modal>
    );
  }
}
var socket=io();
class Client{
static getRaw=(url,cb)=>{
  socket.emit("/get"+url,{},cb);
}
static get=(url,data,cb)=>{
  console.log("emit")
  console.log(url);
  console.log(data);
  socket.emit("/get"+url,data,cb)
}
static delete1=(url,data,cb)=>{
  socket.emit("/delete"+url,data,cb)
}
static post=(url,data,cb)=>{
  socket.emit("/post"+url,data,cb)
}
static put=(url,data,cb)=>{
  socket.emit("/put"+url,data,cb)
}
static postOrPut=(url,data,cb)=>{
  var method="post"
  if (data.id){
    method="put"
  }
  socket.emit("/"+method+url,data,cb)
}
static postForm=(url,data,cb)=>{
  socket.emit("/post"+url,data,cb)
}
static contacts=(data, cb)=>{
  socket.emit("/get/Contact",data,cb)
}
static UsePacks=(query, cb)=> {
  console.log("UsePacks");
  console.log(query);
  socket.emit("/get/UsePack",{contact_id:query},cb)
}
static PackItems=(query, cb)=> {
  socket.emit("/get/PackItem",{pack_id:query,limit:200},cb)
}
static items=(query, cb)=>{
  socket.emit("/get/Item",{search:query},cb)
}
}
// Imagine you have a list of languages that you'd like to autosuggest.
const languages = [
  {
    name: 'C',
    year: 1972
  },
  {
    name: 'Elm',
    year: 2012
  },
  {
    name: 'Easy',
    year: 2012
  }
];
// Teach Autosuggest how to calculate suggestions for any given input value.
class Example extends React.Component {
  constructor() {
    super();

    // Autosuggest is a controlled component.
    // This means that you need to provide an input value
    // and an onChange handler that updates this value (see below).
    // Suggestions also need to be provided to the Autosuggest,
    // and they are initially empty because the Autosuggest is closed.
    this.state = {
      value: '',
      suggestions: []
    };
  }
  getSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? [] : languages.filter(lang =>
      lang.name.toLowerCase().slice(0, inputLength) === inputValue
    );
  }
  // When suggestion is clicked, Autosuggest needs to populate the input
  // based on the clicked suggestion. Teach Autosuggest how to calculate the
  // input value for every given suggestion.
  getSuggestionValue = (suggestion) => {
    return suggestion.name
  }

  // Use your imagination to render suggestions.
  renderSuggestion =(suggestion) => {
    return (<div>
      {suggestion.name}
    </div>);
  }
  onChange = (event, { newValue }) => {
    console.log(newValue);
    this.setState({
      value: newValue
    });
  };
  onSuggestionSelected=(event,data)=>{// { suggestion, suggestionValue, suggestionIndex, sectionIndex, method })
    console.log(data);
  }
  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  render() {
    const { value, suggestions } = this.state;

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: 'Type a programming language',
      value,
      onChange: this.onChange
    };

    // Finally, render it!
    return (
      <Autocomplete
                      value={this.state.value}
                      inputProps={
                        { 
                          id: 'channels-autocomplete',
                        }
                      }
                      items={[
                        "1O(低氧)",
                        "1O(高氧)",
                        "1O(低氧)+2N",
                        "1C(低碳)+2S",
                        "1C(高碳)+2S",
                        "2C+1S(低硫)",
                        "2C+1S(高硫)",
                        "2C+2S",
                        "2O+2N",
                        "2O",
                      ]}
                      getItemValue={(item) => item}
                      onSelect={this.channels_select}
                      onChange={this.channels_change}
                      shouldItemRender={this.matchStateToTerm}
                      renderItem={(item, isHighlighted) => (
                        <div
                          style={isHighlighted ? styles.highlightedItem : styles.item}
                          key={item}
                        >{item}</div>
                      )}
                    />
    );
  }
}
///////////////////////////////////////////////////////////////////////////////
// Teach Autosuggest how to calculate suggestions for any given input value.
class Example2 extends React.Component {
  constructor() {
    super();

    // Autosuggest is a controlled component.
    // This means that you need to provide an input value
    // and an onChange handler that updates this value (see below).
    // Suggestions also need to be provided to the Autosuggest,
    // and they are initially empty because the Autosuggest is closed.
    this.state = {
      value: '',
      suggestions: []
    };
  }
  getSuggestions = (value) => {
    console.log("getSuggestions===========");
    const inputValue = value;//.trim().toLowerCase();
    const inputLength = inputValue.length;

    if(inputLength >0) {
      Client.get("/Item",{search:value} ,(items) => {
          this.setState({ suggestions: items.data});
      });
    }
    return this.state.suggestions;
  }
  // When suggestion is clicked, Autosuggest needs to populate the input
  // based on the clicked suggestion. Teach Autosuggest how to calculate the
  // input value for every given suggestion.
  getSuggestionValue = (suggestion) => {
    return suggestion.name
  }

  // Use your imagination to render suggestions.
  renderSuggestion =(suggestion) => {
    return (<div>
      {suggestion.name}
    </div>);
  }
  onChange = (event, { newValue }) => {
    console.log(newValue);
    this.setState({
      value: newValue
    });
  };
  onSuggestionSelected=(event,data)=>{// { suggestion, suggestionValue, suggestionIndex, sectionIndex, method })
    console.log(data);
  }
  onChange=(event, value)=>{
    this.onSelect(null,value);
  }
  onSelect=(value, item)=>{
    this.setState({value:item});
  }
  render() {
    const { value, suggestions } = this.state;

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: 'Type a programming language',
      value,
      onChange: this.onChange
    };

    // Finally, render it!
    return (
      <Autocomplete
                      value={this.state.value}
                      inputProps={
                        { 
                          id: 'channels-autocomplete',
                        }
                      }
                      items={[
                        "1O(低氧)",
                        "1O(高氧)",
                        "1O(低氧)+2N",
                        "1C(低碳)+2S",
                        "1C(高碳)+2S",
                        "2C+1S(低硫)",
                        "2C+1S(高硫)",
                        "2C+2S",
                        "2O+2N",
                        "2O",
                      ]}
                      getItemValue={(item) => item}
                      onSelect={this.onSelect}
                      onChange={this.onChange}
                      shouldItemRender={this.matchStateToTerm}
                      renderItem={(item, isHighlighted) => (
                        <div
                          style={isHighlighted ? styles.highlightedItem : styles.item}
                          key={item}
                        >{item}</div>
                      )}
                    />
    );
  }
}
// class PackItems extends React.Component {
//   state = {
//     items: [],
//     showRemoveIcon: false,
//     newPackName: '',
//     auto_value: '',
//     auto_items:[],
//     auto_loading: false,
//     release:true,
//   };
//   componentDidMount=()=> {
//     console.log(this.props.pack_id);
//       Client.PackItems(this.props.pack_id, (items) => {
//         console.log("PackItems componentDidMount");
//         console.log(items);
//         this.setState({
//           items: items.data,//.slice(0, MATCHING_ITEM_LIMIT),
//         });
//       });
//   };
//   auto_select=(event,data) => {
//       console.log("selected");
//       console.log(data)
//       this.addrow(data.suggestion.id);
//       //this.setState({auto_value:value, auto_items: [ item ] })
//   }
//   auto_change=(data)=>{
//     var value=data.value;
//     console.log("auto_change");
//     if (value.length>1)
//     {
//       Client.get("/Item",{search:value} ,(items) => {
//           this.setState({ auto_items: items.data, auto_loading: false })
//       });
//     }
//   };
//   new_packitem= (id) => {
//     var url="/PackItemEx";
//     var data={danwei:"",bh:"",guige:"",ct:0,name:this.state.newPackName,pack_id:this.props.pack_id};
//     console.log(data);
//     Client.postOrPut(url,data,(res) => {
//         var p=res.data;
//         const newFoods = this.state.items.concat(p);
//         this.setState({ items: newFoods });
//     });
//   };
//   handlePackItemChange = (idx,contact) => {
//     console.log(idx);
//     const contacts2=update(this.state.items,{[idx]: {$set:contact}});
//     console.log(contacts2);
//     this.setState({items:contacts2});
//   };
//   addrow=(item_id)=>{
//     var url="/PackItem";
//     var data={pack_id:this.props.pack_id,item_id:item_id,ct:1,quehuo:false};
//     Client.post(url,data,(res) => {
//         var p=res.data;
//         const newFoods = this.state.items.concat(p);
//         this.setState({ items: newFoods });
//     });
//   };
//   newpackChange=(e)=>{
//     this.setState({newPackName:e.target.value});
//   };
//   onEditClick = (id) => {
//   };
//   onDeleteClick = (itemIndex) => {
//     var url="/PackItem";
//     Client.delete1(url,{id:this.state.items[itemIndex].id},(res) => {
//         const filteredFoods = this.state.items.filter(
//           (item, idx) => itemIndex !== idx,
//         );
//         this.setState({ items: filteredFoods });
//     });
//   };
//   handleEdit=(idx)=>{
//     this.refs.dlg.open2(idx);
//   }
//   onChange=(event, { newValue })=>{
//     console.log(newValue);
//     this.setState({auto_value:newValue});
//   }
//   render() {
//     console.log("render");
//     console.log(this.state);
//     const { items } = this.state;
//     const itemRows = items.map((item, idx) => (
//       <tr key={idx}>
//         <td >{item.id}</td>
//         <td >{item.Item.name}</td>
//         <td>{item.Item.guige}</td>
//         <td>{item.ct}</td>
//         <td>{item.Item.bh}</td>
//         <td  hidden={this.state.release}>{item.pack}</td>
//         <td><input type="checkbox" disabled="disabled" name="quehuo" checked={item.quehuo}  /></td>
//         <td>
//         <a onClick={()=>this.handleEdit(idx)}>编辑</a>
//         <a style={{marginLeft:"10px"}} onClick={() => this.onDeleteClick(idx)}>删除</a>
//         </td>
//       </tr>
//     ));
//     return (
//     <div>
//         <Table  responsive bordered condensed>
//           <thead>
//              <tr>
//               <td>id</td>
//               <td>名称</td>
//               <td>规格</td>
//               <td>数量</td>
//               <td>编号</td>
//               <td  hidden={this.state.release}>pack</td>
//               <td>缺货</td>
//               <td>操作</td>
//             </tr>
//           </thead>
//           <tbody>
//             {itemRows}
//           </tbody>
//         </Table>
//         输入备件<Autocomplete
//                       value={this.state.contact.channels}
//                       inputProps={
//                         { 
//                           id: 'channels-autocomplete',
//                           style:{backgroundColor:this.state.bg.channels}
//                         }
//                       }
//                       items={[
//                         "1O(低氧)",
//                         "1O(高氧)",
//                         "1O(低氧)+2N",
//                         "1C(低碳)+2S",
//                         "1C(高碳)+2S",
//                         "2C+1S(低硫)",
//                         "2C+1S(高硫)",
//                         "2C+2S",
//                         "2O+2N",
//                         "2O",
//                       ]}
//                       getItemValue={(item) => item}
//                       onSelect={this.channels_select}
//                       onChange={this.channels_change}
//                       shouldItemRender={this.matchStateToTerm}
//                       renderItem={(item, isHighlighted) => (
//                         <div
//                           style={isHighlighted ? styles.highlightedItem : styles.item}
//                           key={item}
//                         >{item}</div>
//                       )}
//                     />
//       <p>新备件名称：
//         <input id="new_pack1"  placeholder="新备件" value={this.state.newPackName} onChange={this.newpackChange}/>
//         <button className="btn btn-info" id="id_new_item" onClick={this.new_packitem}>新备件</button>
//       </p>
//       <PackItemEditNew ref="dlg" parent={this} />
//       </div>
//     );
//   }
// }
class App extends React.Component {
  render() {
    return (
      <div><Example /><Example2 />
      </div>
    );
  }
}
ReactDOM.render(<App />, document.getElementById('app'));
