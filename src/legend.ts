import * as d3 from "d3";
import { SVG_HEIGHT, PADDING, SVG_WIDTH } from "./constants";
import { TemperatureLegend } from "./temps-legend";

export const createLegend = (
  svg: d3.Selection<SVGSVGElement, unknown, HTMLElement, any>
) => {
  const legend = svg
    .append("g")
    .attr("id", "legend")
    .attr("transform", `translate(${120}, ${460})`);

  Array.from({
    length: 9,
  }).forEach((_, i) => {
    const fillColor = TemperatureLegend.iterable[i * 2].color;

    legend
      .append("rect")
      .attr("x", i * 37)
      .attr("y", 15)
      .attr("width", 37)
      .attr("height", 27)
      .attr("fill", fillColor)
      .style("stroke", "black");
  });

  const legendX = d3
    .scaleLinear()
    .domain([1.5, TemperatureLegend.iterable.slice(-1)[0].num + 1.5])
    .range([0, 428]);

  const legendAxis = d3
    .axisBottom(legendX)
    .tickValues([
      ...TemperatureLegend.iterable
        .filter((_, i) => i % 2 === 0)
        .map((d) => d.num),
      TemperatureLegend.iterable.slice(-1)[0].num,
    ])
    .tickFormat(d3.format(".1f"));

  legend
    .append("g")
    .attr("transform", `translate(${-45}, ${42})`)
    .call(legendAxis);

  svg
    .append("text")
    .attr("text-anchor", "end")
    .attr("y", 20)
    .attr("x", -200)
    .attr("transform", "rotate(-90)")
    .text("Months")
    .style("font-size", "12px");

  svg
    .append("text")
    .attr("text-anchor", "end")
    .attr("y", SVG_HEIGHT - PADDING / 2)
    .attr("x", (SVG_WIDTH + PADDING) / 2)
    .text("Years")
    .style("font-size", "12px");
};
