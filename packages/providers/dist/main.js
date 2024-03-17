var $kNwlg$plonecomponents = require("@plone/components");
var $kNwlg$react = require("react");


function $parcel$exportWildcard(dest, source) {
  Object.keys(source).forEach(function(key) {
    if (key === 'default' || key === '__esModule' || Object.prototype.hasOwnProperty.call(dest, key)) {
      return;
    }

    Object.defineProperty(dest, key, {
      enumerable: true,
      get: function get() {
        return source[key];
      }
    });
  });

  return dest;
}

function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}

$parcel$export(module.exports, "FlattenToAppURLProvider", () => $07f11bb96daddfa5$re_export$FlattenToAppURLProvider);
$parcel$export(module.exports, "useFlattenToAppURL", () => $07f11bb96daddfa5$re_export$useFlattenToAppURL);
var $6b45467ed2a85b8f$exports = {};

$parcel$export($6b45467ed2a85b8f$exports, "RouterLocationProvider", () => $6b45467ed2a85b8f$export$e7fdc1b6fa5da308);
$parcel$export($6b45467ed2a85b8f$exports, "useRouterLocation", () => $6b45467ed2a85b8f$export$38fb88547c864450);

const $6b45467ed2a85b8f$var$RouterLocationContext = /*#__PURE__*/ (0, $kNwlg$react.createContext)({
    useLocation: ()=>({
            href: "",
            pathname: "",
            search: {},
            searchStr: "",
            hash: ""
        })
});
function $6b45467ed2a85b8f$export$e7fdc1b6fa5da308(props) {
    let { children: children, useLocation: useLocation } = props;
    let ctx = (0, $kNwlg$react.useMemo)(()=>({
            useLocation: useLocation
        }), [
        useLocation
    ]);
    return /*#__PURE__*/ (0, ($parcel$interopDefault($kNwlg$react))).createElement($6b45467ed2a85b8f$var$RouterLocationContext.Provider, {
        value: ctx
    }, children);
}
function $6b45467ed2a85b8f$export$38fb88547c864450() {
    const { useLocation: useLocation } = (0, $kNwlg$react.useContext)($6b45467ed2a85b8f$var$RouterLocationContext);
    return useLocation();
}


var $48db561b7adf8160$exports = {};

$parcel$export($48db561b7adf8160$exports, "PloneClientContext", () => $48db561b7adf8160$export$e5817bae8c6774ca);
$parcel$export($48db561b7adf8160$exports, "usePloneClient", () => $48db561b7adf8160$export$c364d46a4835ee07);
$parcel$export($48db561b7adf8160$exports, "PloneClientProvider", () => $48db561b7adf8160$export$a073e354f094ee99);

const $48db561b7adf8160$export$e5817bae8c6774ca = /*#__PURE__*/ $kNwlg$react.createContext(undefined);
const $48db561b7adf8160$export$c364d46a4835ee07 = ()=>{
    const client = $kNwlg$react.useContext($48db561b7adf8160$export$e5817bae8c6774ca);
    if (!client) throw new Error("No PloneClient set, use PloneClientProvider to set one");
    return client;
};
const $48db561b7adf8160$export$a073e354f094ee99 = ({ client: client, children: children })=>{
    return /*#__PURE__*/ $kNwlg$react.createElement($48db561b7adf8160$export$e5817bae8c6774ca.Provider, {
        value: client
    }, children);
};



$parcel$exportWildcard(module.exports, $6b45467ed2a85b8f$exports);
$parcel$exportWildcard(module.exports, $48db561b7adf8160$exports);


//# sourceMappingURL=main.js.map
