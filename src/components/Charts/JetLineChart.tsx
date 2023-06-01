import React, { useEffect, useRef } from 'react'
import { ILineChartData } from '../../models/analytic'
import * as d3 from 'd3';
import { Box } from '@mui/material';
import style from './JetCharts.module.css';

interface IJetLineChart {
  data: ILineChartData[]
}

const JetLineChart: React.FC<IJetLineChart> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  const drawChart = () => {
    const width = 500;
    const height = 250;
    const padding = 20;
    const maxValue = Math.max.apply(null, data.map(d => d.value)); // Maximum data value

    // Setup functions for scales

    // xScales
    const xScale: any = d3.scalePoint()
      .domain(data.map((d) => d.name))
      .range([(0 + padding + 40), (width - padding - 40)])
    console.log('Start-End', xScale(data[0].name), xScale(data[1].name));
    // yScales
    const yScale: any = d3.scaleLinear()
      .domain([0, maxValue])
      .range([(height - padding - 100), (0 + padding)]) // largest to smallest  

    console.log('Start-End', yScale(data[0].value), yScale(data[1].value));

    // Setup functions to draw lines

    const line: any = d3.line<ILineChartData>()
      .x((d: ILineChartData) => xScale(d.name))
      .y((d: ILineChartData) => yScale(d.value))
      .curve(d3.curveMonotoneX)

    console.log('chart draw commands', line(data));

    // Draw Line
    d3.select(svgRef.current)
      .select('path')
      .attr('d', (value) => line(data))
      .attr('fill', 'none')
      .attr('stroke', '#fff')
      .attr('stroke-width', 2)
      .attr('transform', `translate(-30,${-10})`)
      .transition()
      .duration(2000)
      .delay(100)
      .attr('stroke', '#ff4569')
      .attr('stroke-width', 2)

    // Setup functions to draw X and Y Axes
    const xAxis: any = d3.axisBottom(xScale);
    const yAxis: any = d3.axisLeft(yScale).ticks(maxValue);

    // Draw x and y Axes
    d3.select('#xaxis').remove()
    d3.select(svgRef.current)
      .append('g')
      .attr('transform', `translate(-30,${120})`)
      .attr('id', 'xaxis')
      .attr('fill', '#ff4569')
      .call(xAxis)

    d3.select('#yaxis').remove()
    d3.select(svgRef.current)
      .append('g')
      .attr('transform', `translate(${padding + 10}, -10)`)
      .attr('id', 'yaxis')
      .attr('fill', '#ff4569')
      .call(yAxis)

  }

  useEffect(() => {
    drawChart();
  }, [])

  return (
    <>
      <Box className={style.lineChartContainer}>
        {/*<svg ref={svgRef} id="line-chart" viewBox='0 0 500 150'>
          <path d="" fill="none" stroke="blue" strokeWidth="5" />
        </svg>*/}
        <svg ref={svgRef} id="line-chart" viewBox='0 0 500 150'>
          <path />
        </svg>
      </Box>
    </>
  )
}

export default JetLineChart