import React, { useEffect, useRef } from 'react'
import * as d3 from 'd3';
import { Box } from '@mui/material';
import { IBarChartData } from '../../models/analytic';
import style from './JetCharts.module.css';

interface IJetBarChart {
  data: IBarChartData[] 
}

const JetBarChart: React.FC<IJetBarChart> = ({data}) => {
  const svgRef = useRef<SVGSVGElement>(null);

  const drawChart = () => {
     // setting up svg container
     const w = 500;
     const h = 300;
     const barWidth = 35;
     
     const svg = d3.select(svgRef.current)
         .attr('width', w)
         .attr('height', h)
         .style('overflow', 'visible')
         .style('margin-top', '25px')
         .style('margin-left', '75px')
         .style('font-weight', 'bold')
         
     // setting the scaling
     const xScale: any = d3.scaleBand()
          .domain(data.map((val,i) => val.name))
          .range([0,w])
          .padding(0.5);
         
     const yScale = d3.scaleLinear()
         .domain([0,h])
         .range([h,0]);
 
     // setting the axes
     const xAxis = d3.axisBottom(xScale)
         .ticks(data.length);
     
     const yAxis = d3.axisLeft(yScale)
         .ticks(5);
     
     svg.append('g')
         .call(xAxis)
         .attr('transform', `translate(0, ${h})`);
 
     svg.append('g')
         .call(yAxis);
 
     // setting the svg data
      svg.selectAll('rect')
        .data(data)
        .enter().append('rect')
          .style('fill', '#3853D8')
          .attr('width', barWidth) 
          .attr('height', (val,i) => h - yScale(val.value))
          .attr('x', (val,i) => xScale(val.name) + 10)
          .attr('y', (val,i) => h - val.value)
          
          .append('title')
          .text((d: any) => {
            return d.value;
          })

          
          
          
          
            
          
  }

  useEffect(() => {
    drawChart();
  }, [])
  return (
    <>
      <div>
        <svg ref={svgRef}></svg>
      </div>
    </>
  )
}

export default JetBarChart;