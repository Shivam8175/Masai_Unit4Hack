import React, { useContext, useEffect, useRef } from "react";
import { FinanceContext } from "../context/FinanceContext";
import * as d3 from "d3";
import "./Visualization.css";

const Visualization = () => {
  const { scenarios, finances } = useContext(FinanceContext);
  const chartRef = useRef(null);

  useEffect(() => {
    if (scenarios.length === 0) return;

    d3.select(chartRef.current).selectAll("*").remove();

    const margin = { top: 60, right: 40, bottom: 80, left: 80 };
    const width = 800 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;

    const svg = d3
      .select(chartRef.current)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const data = scenarios.map((s) => ({
      title: s.title,
      projectedValue: finances.savings + s.amount * (s.timeframe / 12),
      monthlyContribution: s.amount,
      timeframe: s.timeframe,
      roi: s.roi || 0,
      currentSavings: finances.savings,
    }));

    const xScale = d3
      .scaleBand()
      .domain(data.map((d) => d.title))
      .range([0, width])
      .padding(0.3);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.projectedValue) * 1.1])
      .nice()
      .range([height, 0]);

    const colorScale = d3
      .scaleSequential(d3.interpolateBlues)
      .domain([0, data.length - 1]);

    svg
      .append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(xScale))
      .selectAll("text")
      .attr("transform", "rotate(-15)")
      .style("text-anchor", "end");

    svg
      .append("g")
      .attr("class", "y-axis")
      .call(d3.axisLeft(yScale).ticks(8).tickFormat(d3.format("$,.0f")));

    svg
      .append("text")
      .attr("class", "axis-label")
      .attr("transform", "rotate(-90)")
      .attr("y", -60)
      .attr("x", -height / 2)
      .attr("text-anchor", "middle")
      .text("Projected Value ($)");

    svg
      .append("text")
      .attr("class", "chart-title")
      .attr("x", width / 2)
      .attr("y", -20)
      .attr("text-anchor", "middle")
      .text("Financial Scenario Comparison");

    const bars = svg.selectAll(".bar").data(data).enter().append("g");

    bars
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d) => xScale(d.title))
      .attr("y", (d) => yScale(d.projectedValue))
      .attr("width", xScale.bandwidth())
      .attr("height", (d) => height - yScale(d.projectedValue))
      .attr("fill", (d, i) => colorScale(i))
      .on("mouseover", function (event, d) {
        d3.select(this).attr("fill", "#ff7f0e");

        tooltip
          .style("opacity", 1)
          .html(
            `
            <div class="tooltip-title">${d.title}</div>
            <div><strong>Projected Value:</strong> $${d3.format(",.0f")(
              d.projectedValue
            )}</div>
            <div><strong>Monthly Contribution:</strong> $${d3.format(",.0f")(
              d.monthlyContribution
            )}</div>
            <div><strong>Timeframe:</strong> ${d.timeframe} months</div>
            <div><strong>ROI:</strong> ${d3.format(".1%")(d.roi)}</div>
            <div><strong>Current Savings:</strong> $${d3.format(",.0f")(
              d.currentSavings
            )}</div>
          `
          )
          .style("left", event.pageX + 10 + "px")
          .style("top", event.pageY - 28 + "px");
      })
      .on("mouseout", function (d, i) {
        d3.select(this).attr("fill", (d, i) => colorScale(i));
        tooltip.style("opacity", 0);
      });

    bars
      .append("text")
      .attr("class", "value-label")
      .attr("x", (d) => xScale(d.title) + xScale.bandwidth() / 2)
      .attr("y", (d) => yScale(d.projectedValue) - 5)
      .attr("text-anchor", "middle")
      .text((d) => `$${d3.format(",.0f")(d.projectedValue)}`);

    const tooltip = d3
      .select(chartRef.current)
      .append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);

    const legend = svg
      .append("g")
      .attr("class", "legend")
      .attr("transform", `translate(${width - 200}, -30)`);

    legend
      .append("rect")
      .attr("width", 15)
      .attr("height", 15)
      .attr("fill", colorScale(0));

    legend
      .append("text")
      .attr("x", 20)
      .attr("y", 12)
      .text("Scenario Projections")
      .style("font-size", "12px");

    if (finances.savings > 0) {
      svg
        .append("line")
        .attr("class", "current-savings-line")
        .attr("x1", 0)
        .attr("x2", width)
        .attr("y1", yScale(finances.savings))
        .attr("y2", yScale(finances.savings))
        .attr("stroke", "#e41a1c")
        .attr("stroke-width", 2)
        .attr("stroke-dasharray", "5,5");

      svg
        .append("text")
        .attr("class", "current-savings-label")
        .attr("x", width - 10)
        .attr("y", yScale(finances.savings) - 5)
        .attr("text-anchor", "end")
        .text(`Current Savings: $${d3.format(",.0f")(finances.savings)}`)
        .style("fill", "#e41a1c");
    }

    return () => {
      d3.select(chartRef.current).selectAll("*").remove();
    };
  }, [scenarios, finances]);

  return (
    <div className="visualization-container">
      <h2 className="visualization-title">Financial Scenario Analysis</h2>
      <p className="visualization-subtitle">
        Compare how different savings strategies affect your financial future
      </p>
      <div ref={chartRef} className="chart-container"></div>
      <div className="visualization-footer">
        <p>Hover over bars for detailed scenario information</p>
      </div>
    </div>
  );
};

export default Visualization;
