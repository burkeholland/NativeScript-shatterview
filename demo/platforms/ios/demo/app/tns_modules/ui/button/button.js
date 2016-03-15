var common = require("./button-common");
var stateChanged = require("ui/core/control-state-change");
var style = require("ui/styling/style");
var utils = require("utils/utils");
var enums = require("ui/enums");
var TapHandlerImpl = (function (_super) {
    __extends(TapHandlerImpl, _super);
    function TapHandlerImpl() {
        _super.apply(this, arguments);
    }
    TapHandlerImpl.initWithOwner = function (owner) {
        var handler = TapHandlerImpl.new();
        handler._owner = owner;
        return handler;
    };
    TapHandlerImpl.prototype.tap = function (args) {
        var owner = this._owner.get();
        if (owner) {
            owner._emit(common.Button.tapEvent);
        }
    };
    TapHandlerImpl.ObjCExposedMethods = {
        "tap": { returns: interop.types.void, params: [interop.types.id] }
    };
    return TapHandlerImpl;
})(NSObject);
global.moduleMerge(common, exports);
var Button = (function (_super) {
    __extends(Button, _super);
    function Button() {
        var _this = this;
        _super.call(this);
        this._ios = UIButton.buttonWithType(UIButtonType.UIButtonTypeSystem);
        this._tapHandler = TapHandlerImpl.initWithOwner(new WeakRef(this));
        this._ios.addTargetActionForControlEvents(this._tapHandler, "tap", UIControlEvents.UIControlEventTouchUpInside);
        this._stateChangedHandler = new stateChanged.ControlStateChangeListener(this._ios, function (s) {
            _this._goToVisualState(s);
        });
    }
    Object.defineProperty(Button.prototype, "ios", {
        get: function () {
            return this._ios;
        },
        enumerable: true,
        configurable: true
    });
    return Button;
})(common.Button);
exports.Button = Button;
var ButtonStyler = (function () {
    function ButtonStyler() {
    }
    ButtonStyler.setColorProperty = function (view, newValue) {
        var btn = view._nativeView;
        btn.setTitleColorForState(newValue, UIControlState.UIControlStateNormal);
    };
    ButtonStyler.resetColorProperty = function (view, nativeValue) {
        var btn = view._nativeView;
        btn.setTitleColorForState(nativeValue, UIControlState.UIControlStateNormal);
    };
    ButtonStyler.getNativeColorValue = function (view) {
        var btn = view._nativeView;
        return btn.titleColorForState(UIControlState.UIControlStateNormal);
    };
    ButtonStyler.setFontInternalProperty = function (view, newValue, nativeValue) {
        var btn = view._nativeView;
        btn.titleLabel.font = newValue.getUIFont(nativeValue);
    };
    ButtonStyler.resetFontInternalProperty = function (view, nativeValue) {
        var btn = view._nativeView;
        btn.titleLabel.font = nativeValue;
    };
    ButtonStyler.getNativeFontInternalValue = function (view) {
        var btn = view._nativeView;
        return btn.titleLabel.font;
    };
    ButtonStyler.setTextAlignmentProperty = function (view, newValue) {
        var btn = view._nativeView;
        utils.ios.setTextAlignment(btn.titleLabel, newValue);
        switch (newValue) {
            case enums.TextAlignment.left:
                btn.contentHorizontalAlignment = UIControlContentHorizontalAlignment.UIControlContentHorizontalAlignmentLeft;
                break;
            case enums.TextAlignment.center:
                btn.contentHorizontalAlignment = UIControlContentHorizontalAlignment.UIControlContentHorizontalAlignmentCenter;
                break;
            case enums.TextAlignment.right:
                btn.contentHorizontalAlignment = UIControlContentHorizontalAlignment.UIControlContentHorizontalAlignmentRight;
                break;
            default:
                break;
        }
    };
    ButtonStyler.resetTextAlignmentProperty = function (view, nativeValue) {
        var btn = view._nativeView;
        btn.titleLabel.textAlignment = nativeValue.textAlign;
        btn.contentHorizontalAlignment = nativeValue.contentAlign;
    };
    ButtonStyler.getNativeTextAlignmentValue = function (view) {
        var btn = view._nativeView;
        return {
            textAlign: btn.titleLabel.textAlignment,
            contentAlign: btn.contentHorizontalAlignment
        };
    };
    ButtonStyler.setPaddingProperty = function (view, newValue) {
        var top = newValue.top + view.borderWidth;
        var left = newValue.left + view.borderWidth;
        var bottom = newValue.bottom + view.borderWidth;
        var right = newValue.right + view.borderWidth;
        view._nativeView.contentEdgeInsets = UIEdgeInsetsFromString("{" + top + "," + left + "," + bottom + "," + right + "}");
    };
    ButtonStyler.resetPaddingProperty = function (view, nativeValue) {
        view._nativeView.contentEdgeInsets = UIEdgeInsetsFromString("{0,0,0,0}");
    };
    ButtonStyler.setTextDecorationProperty = function (view, newValue) {
        utils.ios.setTextDecorationAndTransform(view, newValue, view.style.textTransform);
    };
    ButtonStyler.resetTextDecorationProperty = function (view, nativeValue) {
        utils.ios.setTextDecorationAndTransform(view, enums.TextDecoration.none, view.style.textTransform);
    };
    ButtonStyler.setTextTransformProperty = function (view, newValue) {
        utils.ios.setTextDecorationAndTransform(view, view.style.textDecoration, newValue);
    };
    ButtonStyler.resetTextTransformProperty = function (view, nativeValue) {
        utils.ios.setTextDecorationAndTransform(view, view.style.textDecoration, enums.TextTransform.none);
    };
    ButtonStyler.setWhiteSpaceProperty = function (view, newValue) {
        utils.ios.setWhiteSpace(view.ios.titleLabel, newValue, view.ios);
    };
    ButtonStyler.resetWhiteSpaceProperty = function (view, nativeValue) {
        utils.ios.setWhiteSpace(view.ios.titleLabel, enums.WhiteSpace.normal, view.ios);
    };
    ButtonStyler.registerHandlers = function () {
        style.registerHandler(style.colorProperty, new style.StylePropertyChangedHandler(ButtonStyler.setColorProperty, ButtonStyler.resetColorProperty, ButtonStyler.getNativeColorValue), "Button");
        style.registerHandler(style.fontInternalProperty, new style.StylePropertyChangedHandler(ButtonStyler.setFontInternalProperty, ButtonStyler.resetFontInternalProperty, ButtonStyler.getNativeFontInternalValue), "Button");
        style.registerHandler(style.textAlignmentProperty, new style.StylePropertyChangedHandler(ButtonStyler.setTextAlignmentProperty, ButtonStyler.resetTextAlignmentProperty, ButtonStyler.getNativeTextAlignmentValue), "Button");
        style.registerHandler(style.nativePaddingsProperty, new style.StylePropertyChangedHandler(ButtonStyler.setPaddingProperty, ButtonStyler.resetPaddingProperty), "Button");
        style.registerHandler(style.textDecorationProperty, new style.StylePropertyChangedHandler(ButtonStyler.setTextDecorationProperty, ButtonStyler.resetTextDecorationProperty), "Button");
        style.registerHandler(style.textTransformProperty, new style.StylePropertyChangedHandler(ButtonStyler.setTextTransformProperty, ButtonStyler.resetTextTransformProperty), "Button");
        style.registerHandler(style.whiteSpaceProperty, new style.StylePropertyChangedHandler(ButtonStyler.setWhiteSpaceProperty, ButtonStyler.resetWhiteSpaceProperty), "Button");
    };
    return ButtonStyler;
})();
exports.ButtonStyler = ButtonStyler;
ButtonStyler.registerHandlers();