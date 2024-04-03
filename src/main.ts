import "./style.css";
import * as d3 from "d3";
import { TemperatureData } from "./types";
import { svg } from "./svg";
import { axisBottom, axisLeft, xScale } from "./axis";
import { PADDING, SVG_HEIGHT, RECT_HEIGHT, RECT_WIDTH } from "./constants";
import { TemperatureLegend } from "./temps-legend";
import { toFixedNumber } from "./utils";
import { createLegend } from "./legend";

const {
  TWO_POINT_EIGHT,
  THREE_POINT_EIGHT,
  THREE_POINT_NINE,
  FOUR_POINT_NINE,
  FIVE,
  SIX,
  SIX_POINT_ONE,
  SEVEN_POINT_ONE,
  SEVEN_POINT_TWO,
  EIGHT_POINT_TWO,
  EIGHT_POINT_THREE,
  NINE_POINT_FOUR,
  NINE_POINT_FIVE,
  TEN_POINT_FIVE,
  TEN_POINT_SIX,
  ELEVEN_POINT_SIX,
  ELEVEN_POINT_SEVEN,
} = TemperatureLegend;

d3.json<TemperatureData>(
  "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/global-temperature.json"
).then((data) => {
  if (!data) {
    throw new Error("Data is empty");
  }

  const base = data.baseTemperature;
  const years = new Set(data.monthlyVariance.map((d) => d.year));
  const x = xScale(years, (d) => d);
  const tooltip = d3
    .select("body")
    .append("div")
    .attr("id", "tooltip")
    .style("display", "none")
    .style("position", "absolute");

  // create rects
  const rects = svg
    .append("g")
    .selectAll("rect")
    .data(data.monthlyVariance)
    .enter()
    .append("rect")
    .attr("class", "cell")
    .attr("x", (d) => x(d.year))
    .attr("y", (d) => RECT_HEIGHT * (d.month - 1) + PADDING / 2)
    .attr("width", RECT_WIDTH)
    .attr("height", RECT_HEIGHT)
    .attr("data-temp", (d) => toFixedNumber(base + d.variance))
    .attr("fill", (d) => {
      const totalTemp = toFixedNumber(base + d.variance, 1);

      switch (true) {
        case totalTemp >= TWO_POINT_EIGHT.num &&
          totalTemp <= THREE_POINT_EIGHT.num:
          return TWO_POINT_EIGHT.color;
        case totalTemp >= THREE_POINT_NINE.num &&
          totalTemp <= FOUR_POINT_NINE.num:
          return THREE_POINT_NINE.color;
        case totalTemp >= FIVE.num && totalTemp <= SIX.num:
          return FIVE.color;
        case totalTemp >= SIX_POINT_ONE.num && totalTemp <= SEVEN_POINT_ONE.num:
          return SIX_POINT_ONE.color;
        case totalTemp >= SEVEN_POINT_TWO.num &&
          totalTemp <= EIGHT_POINT_TWO.num:
          return SEVEN_POINT_TWO.color;
        case totalTemp >= EIGHT_POINT_THREE.num &&
          totalTemp <= NINE_POINT_FOUR.num:
          return EIGHT_POINT_THREE.color;
        case totalTemp >= NINE_POINT_FIVE.num &&
          totalTemp <= TEN_POINT_FIVE.num:
          return NINE_POINT_FIVE.color;
        case totalTemp >= TEN_POINT_SIX.num &&
          totalTemp <= ELEVEN_POINT_SIX.num:
          return TEN_POINT_SIX.color;
        case totalTemp >= ELEVEN_POINT_SEVEN.num:
          return ELEVEN_POINT_SEVEN.color;
        default:
          return "white";
      }
    });

  // Display tooltip on hover of rect
  rects
    .on("mouseover", (e, d) => {
      tooltip
        .style("display", "block")
        .style("left", `${e.pageX + 10}px`)
        .style("top", `${e.pageY - 50}px`)
        .attr("data-year", d.year);

      const month = new Date(0, d.month - 1).toLocaleString("default", {
        month: "long",
      });

      tooltip.html(
        `<p>${d.year} - ${month}</p>
        <p>${toFixedNumber(base + d.variance)}°C</p>
        <p>${toFixedNumber(base + d.variance)}°C</p>
        `
      );
    })
    .on("mouseout", () => {
      tooltip.style("display", "none");
    });

  // Add the x-axis
  svg
    .append("g")
    .attr("transform", `translate(${0}, ${SVG_HEIGHT - PADDING - 30})`)
    .attr("id", "x-axis")
    .style("font-size", "10px")
    .call(axisBottom(x));

  // Add the y-axis
  svg
    .append("g")
    .attr("transform", `translate(${PADDING}, ${PADDING / 2})`)
    .attr("id", "y-axis")
    .call(axisLeft);

  //Create legend
  createLegend(svg);
});
