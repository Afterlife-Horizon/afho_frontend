import{R as c,c as g,j as s}from"./index-bY9GCegc.js";import{B as v,s as y}from"./button-BHrX42f3.js";var m={color:void 0,size:void 0,className:void 0,style:void 0,attr:void 0},d=c.createContext&&c.createContext(m),i=function(){return i=Object.assign||function(e){for(var n,t=1,r=arguments.length;t<r;t++){n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},i.apply(this,arguments)},x=function(e,n){var t={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&n.indexOf(r)<0&&(t[r]=e[r]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var a=0,r=Object.getOwnPropertySymbols(e);a<r.length;a++)n.indexOf(r[a])<0&&Object.prototype.propertyIsEnumerable.call(e,r[a])&&(t[r[a]]=e[r[a]]);return t};function f(e){return e&&e.map(function(n,t){return c.createElement(n.tag,i({key:t},n.attr),f(n.child))})}function w(e){return function(n){return c.createElement(O,i({attr:i({},e.attr)},n),f(e.child))}}function O(e){var n=function(t){var r=e.attr,a=e.size,l=e.title,h=x(e,["attr","size","title"]),u=a||t.size||"1em",o;return t.className&&(o=t.className),e.className&&(o=(o?o+" ":"")+e.className),c.createElement("svg",i({stroke:"currentColor",fill:"currentColor",strokeWidth:"0"},t.attr,r,h,{className:o,style:i(i({color:e.color||t.color},t.style),e.style),height:u,width:u,xmlns:"http://www.w3.org/2000/svg"}),l&&c.createElement("title",null,l),e.children)};return d!==void 0?c.createElement(d.Consumer,null,function(t){return n(t)}):n(m)}function b(e){return w({tag:"svg",attr:{viewBox:"0 0 640 512"},child:[{tag:"path",attr:{d:"M524.531,69.836a1.5,1.5,0,0,0-.764-.7A485.065,485.065,0,0,0,404.081,32.03a1.816,1.816,0,0,0-1.923.91,337.461,337.461,0,0,0-14.9,30.6,447.848,447.848,0,0,0-134.426,0,309.541,309.541,0,0,0-15.135-30.6,1.89,1.89,0,0,0-1.924-.91A483.689,483.689,0,0,0,116.085,69.137a1.712,1.712,0,0,0-.788.676C39.068,183.651,18.186,294.69,28.43,404.354a2.016,2.016,0,0,0,.765,1.375A487.666,487.666,0,0,0,176.02,479.918a1.9,1.9,0,0,0,2.063-.676A348.2,348.2,0,0,0,208.12,430.4a1.86,1.86,0,0,0-1.019-2.588,321.173,321.173,0,0,1-45.868-21.853,1.885,1.885,0,0,1-.185-3.126c3.082-2.309,6.166-4.711,9.109-7.137a1.819,1.819,0,0,1,1.9-.256c96.229,43.917,200.41,43.917,295.5,0a1.812,1.812,0,0,1,1.924.233c2.944,2.426,6.027,4.851,9.132,7.16a1.884,1.884,0,0,1-.162,3.126,301.407,301.407,0,0,1-45.89,21.83,1.875,1.875,0,0,0-1,2.611,391.055,391.055,0,0,0,30.014,48.815,1.864,1.864,0,0,0,2.063.7A486.048,486.048,0,0,0,610.7,405.729a1.882,1.882,0,0,0,.765-1.352C623.729,277.594,590.933,167.465,524.531,69.836ZM222.491,337.58c-28.972,0-52.844-26.587-52.844-59.239S193.056,219.1,222.491,219.1c29.665,0,53.306,26.82,52.843,59.239C275.334,310.993,251.924,337.58,222.491,337.58Zm195.38,0c-28.971,0-52.843-26.587-52.843-59.239S388.437,219.1,417.871,219.1c29.667,0,53.307,26.82,52.844,59.239C470.715,310.993,447.538,337.58,417.871,337.58Z"}}]})(e)}const j=()=>{async function e(){await y.auth.signInWithOAuth({provider:"discord",options:{scopes:"identify",redirectTo:"http://localhost:5173/"}})}return s.jsx("div",{className:"discord-login",children:s.jsx("div",{children:s.jsxs(v,{className:"blue-button",onClick:async()=>await e(),children:[s.jsx(b,{size:"1.5rem",className:"mr-2"}),"Login with Discord"]})})})},N=g("/auth")({component:j});export{N as Route};
