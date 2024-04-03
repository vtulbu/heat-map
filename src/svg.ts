import * as d3 from "d3";
import { SVG_HEIGHT, SVG_WIDTH } from "./constants";

export const svg = d3
  .select("#app")
  .append("svg")
  .attr("width", SVG_WIDTH)
  .attr("height", SVG_HEIGHT);
