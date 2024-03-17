import {FlattenToAppURLProvider as $71888ef12c1a7217$re_export$FlattenToAppURLProvider, useFlattenToAppURL as $71888ef12c1a7217$re_export$useFlattenToAppURL} from "@plone/components";
import $ksXJo$react, {createContext as $ksXJo$createContext, useMemo as $ksXJo$useMemo, useContext as $ksXJo$useContext, createElement as $ksXJo$createElement} from "react";


function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}
var $ac3751dfe5678a9d$exports = {};

$parcel$export($ac3751dfe5678a9d$exports, "RouterLocationProvider", () => $ac3751dfe5678a9d$export$e7fdc1b6fa5da308);
$parcel$export($ac3751dfe5678a9d$exports, "useRouterLocation", () => $ac3751dfe5678a9d$export$38fb88547c864450);

const $ac3751dfe5678a9d$var$RouterLocationContext = /*#__PURE__*/ (0, $ksXJo$createContext)({
    useLocation: ()=>({
            href: "",
            pathname: "",
            search: {},
            searchStr: "",
            hash: ""
        })
});
function $ac3751dfe5678a9d$export$e7fdc1b6fa5da308(props) {
    let { children: children, useLocation: useLocation } = props;
    let ctx = (0, $ksXJo$useMemo)(()=>({
            useLocation: useLocation
        }), [
        useLocation
    ]);
    return /*#__PURE__*/ (0, $ksXJo$react).createElement($ac3751dfe5678a9d$var$RouterLocationContext.Provider, {
        value: ctx
    }, children);
}
function $ac3751dfe5678a9d$export$38fb88547c864450() {
    const { useLocation: useLocation } = (0, $ksXJo$useContext)($ac3751dfe5678a9d$var$RouterLocationContext);
    return useLocation();
}


var $278e08d11df192d5$exports = {};

$parcel$export($278e08d11df192d5$exports, "PloneClientContext", () => $278e08d11df192d5$export$e5817bae8c6774ca);
$parcel$export($278e08d11df192d5$exports, "usePloneClient", () => $278e08d11df192d5$export$c364d46a4835ee07);
$parcel$export($278e08d11df192d5$exports, "PloneClientProvider", () => $278e08d11df192d5$export$a073e354f094ee99);

const $278e08d11df192d5$export$e5817bae8c6774ca = /*#__PURE__*/ $ksXJo$createContext(undefined);
const $278e08d11df192d5$export$c364d46a4835ee07 = ()=>{
    const client = $ksXJo$useContext($278e08d11df192d5$export$e5817bae8c6774ca);
    if (!client) throw new Error("No PloneClient set, use PloneClientProvider to set one");
    return client;
};
const $278e08d11df192d5$export$a073e354f094ee99 = ({ client: client, children: children })=>{
    return /*#__PURE__*/ $ksXJo$createElement($278e08d11df192d5$export$e5817bae8c6774ca.Provider, {
        value: client
    }, children);
};





export {$71888ef12c1a7217$re_export$FlattenToAppURLProvider as FlattenToAppURLProvider, $71888ef12c1a7217$re_export$useFlattenToAppURL as useFlattenToAppURL, $ac3751dfe5678a9d$export$e7fdc1b6fa5da308 as RouterLocationProvider, $ac3751dfe5678a9d$export$38fb88547c864450 as useRouterLocation, $278e08d11df192d5$export$e5817bae8c6774ca as PloneClientContext, $278e08d11df192d5$export$c364d46a4835ee07 as usePloneClient, $278e08d11df192d5$export$a073e354f094ee99 as PloneClientProvider};
//# sourceMappingURL=module.mjs.map
