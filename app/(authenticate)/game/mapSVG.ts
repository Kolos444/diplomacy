import SVGInnerHTML from "./SVGInnerHtml";

const SVGMap : HTMLElement = document.createElement("svg");

SVGMap.setAttribute("width", "517");
SVGMap.setAttribute("height", "458");
SVGMap.setAttribute("viewBox", "0 0 517 458");
SVGMap.setAttribute("fill", "none");
SVGMap.setAttribute("xmlns", "http://www.w3.org/2000/svg");

SVGMap.innerHTML = SVGInnerHTML;

export default SVGMap;