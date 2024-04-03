import * as d3 from "d3";
import { PADDING, RECT_HEIGHT, RECT_WIDTH } from "./constants";

export const xScale = (
  dataset: Iterable<number>,
  accessor: (datum: number, index: number, array: Iterable<number>) => any
) =>
  d3
    .scaleLinear()
    .domain([d3.min(dataset, accessor), d3.max(dataset, accessor)])
    .range([PADDING, RECT_WIDTH * Array.from(dataset).length - PADDING / 2]);

export const yScale = d3
  .scaleTime()
  .domain([new Date().setMonth(0), new Date().setMonth(12)])
  .range([0, RECT_HEIGHT * 12]);

export const axisBottom = (x: d3.ScaleLinear<number, number, never>) =>
  d3.axisBottom(x).tickFormat(d3.format("d"));

export const axisLeft = d3.axisLeft(yScale).tickFormat((_t, i) => {
  const date = new Date(new Date().setMonth(i));
  return d3.timeFormat("%B")(date);
});
