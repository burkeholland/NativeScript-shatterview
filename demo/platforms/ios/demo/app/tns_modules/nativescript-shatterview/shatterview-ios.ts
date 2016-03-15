import common = require("./shatterview-common");
import {PropertyMetadata} from "ui/core/proxy";
import {Property, PropertyMetadataSettings} from "ui/core/dependency-observable";

global.moduleMerge(common, exports);

export class ShatterView extends common.ShatterView {
  //public static radiusProp = radiusProp;
  //public static elevationProp = elevationProp;
  private _ios: StarWarsGLAnimator;

  constructor() {
    super();
  }

  get android(): StarWarsGLAnimator {
    return this._ios;
  }

  get _nativeView(): StarWarsGLAnimator {
    return this._ios;
  }

  //get radius(): number {
  //  return this._getValue(CardView.radiusProp);
  //}
  //set radius(value: number) {
  //  this._setValue(CardView.radiusProp, value);
  //}

  public _createUI() {

      this._ios = new StarWarsGLAnimator();

      //if (!this._androidViewId) {

      //    this._androidViewId = android.view.View.generateViewId();
      //}
      //this._android.setId(this._androidViewId);

  }
}