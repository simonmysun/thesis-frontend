import { useState, useEffect, useRef, useCallback } from 'react';
import * as d3 from 'd3';
import './style.css';
import Stats from 'stats.js';

const overlap = 4;

function Ridgeline(props: {
  currentData: VisDatum[],
  newData: VisDatum[],
  connectStatus: string,
  sampleRate: number
}) {
  const componentRef = useRef<SVGSVGElement>(null);
  const { currentData, connectStatus, sampleRate } = props;
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
  const margin = { top: 80, right: 120, bottom: 30, left: 0 };
  useEffect(() => {
    stats.dom.style.cssText = 'position: absolute; bottom: 0px; left: 0px; z-index: 100000';
    stats.showPanel(1);
    document.body.appendChild(stats.dom);
    const svg = d3.select(componentRef.current as SVGElement);
    svg.selectAll('*').remove();
    handleResize();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    stats.begin();
    if (outerHeight > 0 && outerWidth > 0) {
      const svg = d3.select(componentRef.current as SVGElement);
      svg.selectAll("*").remove();
      if (connectStatus === 'Disconnected') {
        svg.append('text').text('Cannot establish connection to the stream server');
      } else {
        currentData.sort((a, b) => (new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()));
        const data: { tag: string, values: number[] }[] = [];
        const dates: Date[] = [];
        const tag2id: { [tag: string]: number } = {};
        let idx = 0;
        for (let d in currentData) {
          if (currentData[d].tag in tag2id) {
            data[tag2id[currentData[d].tag]].values.push(currentData[d].value)
          } else {
            tag2id[currentData[d].tag] = idx;
            idx += 1;
            data[tag2id[currentData[d].tag]] = {
              tag: currentData[d].tag,
              values: [currentData[d].value],
            };
          }
          if (dates.length === 0) {
            dates.push(currentData[d].timestamp);
          } else if (currentData[d].timestamp > dates[dates.length - 1]) {
            dates.push(currentData[d].timestamp);
          }
        }
        const x = d3.scaleTime()
          .domain(([new Date(new Date().getTime() - 60 * 1000), new Date()]))
          .range([margin.left, outerWidth - margin.right]);
        const y = d3.scalePoint()
          .domain(data.map(d => d.tag))
          .range([margin.top, outerHeight - margin.bottom]);
        const z = d3.scaleLinear()
          .domain([0, 1]).nice()
          .range([0, -overlap * y.step()]);
        const xAxis = (g: any) => g
          .attr("transform", `translate(0,${outerHeight - margin.bottom})`)
          .call(d3.axisBottom(x)
            .ticks(outerWidth / 60)
            .tickSizeOuter(0));
        const yAxis = (g: any) => g
          .attr("transform", `translate(${outerWidth - margin.right},0)`)
          .call(d3.axisRight(y).tickSize(0).tickPadding(4))
          .call((g: any) => g.select(".domain").remove());
        const area = d3.area()
          .curve(d3.curveBasis)
          .defined((d: any) => !isNaN(d))
          .x((d, i) => x(dates[i]))
          .y0(0)
          .y1((d: any) => z(d));
        const line = area.lineY1();

        const svg = d3.select(componentRef.current as SVGElement);

        svg.append("g")
          .call(xAxis);

        svg.append("g")
          .call(yAxis);

        const group = svg.append("g")
          .selectAll("g")
          .data(data)
          .join("g")
          .attr("transform", d => {
            const tY = y(d.tag);
            if (tY) {
              return `translate(0,${tY + 1})`;
            } else {
              return '';
            }
          });

        group.append("path")
          .attr("fill", "#ddd")
          .attr("d", d => area(d.values as any));

        group.append("path")
          .attr("fill", "none")
          .attr("stroke", "black")
          .attr("d", d => line(d.values as any));

        // const chart = svg.node();
      }
    }
    stats.end();
  }, [currentData, outerWidth, outerHeight, connectStatus, stats]); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <svg ref={componentRef} width={outerWidth} height={outerHeight} role="img" />
  );
}

export default Ridgeline;
