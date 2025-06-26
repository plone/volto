import { i as instrument } from "./index-BX6B_iXa.js";
var runStep = instrument({ step: (label, play, context) => play(context) }, { intercept: true }).step, parameters = { throwPlayFunctionExceptions: false };
export {
  parameters,
  runStep
};
