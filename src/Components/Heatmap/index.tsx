import { useState, useEffect, useRef, useCallback } from 'react';
import * as d3 from 'd3';
import './style.css';
import Stats from 'stats.js';

function Heatmap(props: {
  currentData: VisDatum[],
  retention: number,
  socketConnected: boolean,
}) {
  const componentRef = useRef<SVGSVGElement>(null);
  const { currentData, retention, socketConnected } = props;
  const [outerWidth, setOuterWidth] = useState(0);
  const [outerHeight, setOuterHeight] = useState(0);
  const handleResize = useCallback(() => {
    setOuterWidth(componentRef.current!.parentElement!.offsetWidth);
    setOuterHeight(componentRef.current!.parentElement!.offsetHeight);
  }, [componentRef]);
  useEffect(() => {
    window.addEventListener('load', handleResize);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('load', handleResize);
      window.removeEventListener('resize', handleResize);
    }
  }, [componentRef, handleResize]);
  const [stats] = useState(new Stats());
  const margin = { top: 80, right: 25, bottom: 30, left: 40 };
  useEffect(() => {
    stats.dom.style.cssText = 'position: absolute; top: 0px; right: 0px;';
    stats.showPanel(1);
    document.body.appendChild(stats.dom);
    const svg = d3.select(componentRef.current as SVGElement);
    svg.selectAll('*').remove();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    stats.begin();
    if (outerHeight > 0 && outerWidth > 0) {
      const svg = d3.select(componentRef.current as SVGElement);
      if (socketConnected === false) {
        svg.append('text').text('Cannot establish connection to the stream server');
      } else {
        const x = d3.scaleTime()
          .range([0, outerWidth - margin.left - margin.right])
          .domain([
            new Date((new Date().valueOf()) - (retention - 1) * 150),
            new Date((new Date().valueOf()) + (1) * 150)
          ]);
        const xAxis = d3.axisBottom<Date>(x).tickFormat(d3.timeFormat('%X'));
        svg.selectAll('*').remove();
        svg.append('g')
          .attr('class', 'x axis')
          .attr('transform', `translate(0, ${outerHeight - margin.top - margin.bottom + 1})`)
          .call(xAxis)
          .selectAll('text')
          .attr('transform', 'translate(0, 5) rotate(90)')
          .style('text-anchor', 'start');
        const y = d3.scaleBand()
          .range([outerHeight - margin.top - margin.bottom, 0])
          .domain(d3.map(currentData, d => d.tag));
        const yAxis = d3.axisRight(y).tickSize(0);
        svg.append('g')
          .attr('class', 'y axis')
          .attr('transform', `translate(${outerWidth - margin.left - margin.right + 3}, 0)`)
          .call(yAxis);
        svg.append('rect')
          .attr('width', outerWidth - margin.left - margin.right)
          .attr('height', outerHeight - margin.top - margin.bottom)
          .attr('fill', '#000');
        svg.append('g').attr('class', 'heat-group').selectAll()
          .data(currentData)
          .enter()
          .append('rect')
          .attr('class', 'heat')
          .attr('x', d => x(d.timestamp))
          .attr('y', d => y(d.tag)!)
          .attr('width', outerWidth / retention)
          .attr('height', y.bandwidth())
          .style('fill', d => d3.scaleSequential()
            .interpolator(d3.interpolateInferno)
            .domain([0, 1])(d.value))
          .style('stroke-width', 4)
          .style('stroke', 'none')
          .style('opacity', 0.8);
      }
    }
    stats.end();
  }, [currentData, outerWidth, outerHeight, socketConnected, retention, stats]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <svg ref={componentRef} width={outerWidth} height={outerHeight} />
  );
}

export default Heatmap;