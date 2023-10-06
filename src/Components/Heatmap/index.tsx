import { useState, useEffect, useRef, useCallback } from 'react';
import * as d3 from 'd3';
import './style.css';
import Stats from 'stats.js';

function Heatmap(props: {
  currentData: VisDatum[],
  newData: VisDatum[],
  connectStatus: string,
  sampleRate: number
}) {
  const componentRef = useRef<SVGSVGElement>(null);
  const { currentData, newData, connectStatus, sampleRate } = props;
  const [componentUpdated, setComponentUpdated] = useState(false);
  const [outerWidth, setOuterWidth] = useState(0);
  const [outerHeight, setOuterHeight] = useState(0);
  const handleResize = useCallback(() => {
    setOuterWidth(componentRef.current!.parentElement!.offsetWidth);
    setOuterHeight(componentRef.current!.parentElement!.offsetHeight);
  }, [componentRef]);
  const [d3svg, setD3svg] = useState<d3.Selection<SVGElement, unknown, null, undefined>>(d3.select(componentRef.current as SVGElement));
  const [d3X, setD3X] = useState(() => d3.scaleLinear());
  const [d3Y, setD3Y] = useState(() => d3.scaleBand());
  const [d3$X, setD3$X] = useState<d3.Selection<SVGGElement, unknown, null, undefined>>();
  const [d3$Y, setD3$Y] = useState<d3.Selection<SVGGElement, unknown, null, undefined>>();
  const [d3$Vis, setD3$Vis] = useState<d3.Selection<SVGGElement, unknown, null, undefined>>();
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
    stats.dom.style.cssText = 'position: absolute; bottom: 0px; left: 0px; z-index: 100000';
    stats.showPanel(1);
    document.body.appendChild(stats.dom);
    handleResize();
    return () => {
      stats.dom.remove();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    setD3svg(d3.select(componentRef.current as SVGElement));
    setComponentUpdated(false);
    setComponentUpdated(true);
  }, [componentRef]);
  useEffect(() => {
    d3X.range([0, outerWidth - margin.left - margin.right - outerWidth / 60]);
    d3Y.range([outerHeight - margin.top - margin.bottom, 0]);
    d3svg.selectAll('*').remove();
    d3svg.append('rect')
      .attr('width', outerWidth - margin.left - margin.right)
      .attr('height', outerHeight - margin.top - margin.bottom)
      .attr('fill', '#222');
    setD3$X(d3svg.append('g')
      .attr('class', 'x axis')
      .attr('transform', `translate(0, ${outerHeight - margin.top - margin.bottom + 1})`));
    setD3$Y(d3svg.append('g')
      .attr('class', 'y axis')
      .attr('transform', `translate(${outerWidth - margin.left - margin.right + 3}, 0)`));
    setD3$Vis(d3svg.append('g').attr('class', 'heat-group'));
  }, [outerWidth, outerHeight, componentUpdated]);
  useEffect(() => {
    stats.begin();
    if (outerHeight > 0 && outerWidth > 0) {
      setD3svg(d3.select(componentRef.current as SVGElement));
      if (connectStatus === 'Disconnected') {
        d3svg.append('text').text('Cannot establish connection to the stream server');
      } else {
        d3X.domain([-60, 0]);
        const xAxis = d3.axisBottom(d3X).tickFormat(t => `${t}s`);
        d3$X?.call(xAxis)
          .selectAll('text')
          .attr('transform', 'translate(0, 5)')
          .style('text-anchor', 'start');
        d3Y.domain(d3.map(currentData, d => d.tag));
        const yAxis = d3.axisRight(d3Y).tickSize(0);
        d3$Y?.call(yAxis);
        d3svg.selectAll("g.y.axis g.tick")
          .append("line")
          .attr("class", "gridline")
          .attr("x1", - outerWidth + margin.left + margin.right)
          .attr("y1", 0)
          .attr("x2", -10)
          .attr("y2", 0)
          .attr("stroke", "#000")
          .attr("stroke-width", d3Y.bandwidth() - 2);
        d3$Vis?.selectAll().data(newData.filter(x => x !== undefined))
          .enter()
          .append('rect')
          .attr('class', 'heat')
          .attr('x', d => d3X(new Date().getDate() - new Date(d.timestamp).getDate()) - outerWidth / 60 * sampleRate / 1000 * 0.2)
          .attr('y', d => d3Y(d.tag)!)
          .attr('width', outerWidth / 60 * sampleRate / 1000 * 1.1 + 5)
          .attr('height', d3Y.bandwidth())
          .style('fill', d => d3.scaleSequential()
            .interpolator(d3.interpolateInferno)
            .domain([0, 1])(d.value))
          .style('stroke', 'none')
          .attr('transform`', null)
          .transition()
          .ease(d3.easeLinear)
          .duration(60000)
          .attr('transform', `translate(${- outerWidth})`)
          .remove();
      }
    }
    stats.end();
  }, [currentData, newData, outerWidth, outerHeight, connectStatus, stats]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <svg ref={componentRef} width={outerWidth} height={outerHeight} role="img" />
  );
}

export default Heatmap;