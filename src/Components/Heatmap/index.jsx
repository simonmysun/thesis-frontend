import { useState, useEffect, useRef, useCallback } from 'react';
import { io } from "socket.io-client";
import * as d3 from "d3";
import './style.css';

const serverScheme = 'ws';
const serverHost = 'localhost';
const serverPort = 3001;

const retention = 30;

const socket = io(`${serverScheme}://${serverHost}:${serverPort}`);

function Heatmap(props) {
  const componentRef = useRef();
  const [currentData, updateData] = useState([]);
  const [outerWidth, setOuterWidth] = useState(0);
  const [outerHeight, setOuterHeight] = useState(0);
  const [socketConnected, setConnected] = useState(socket.connected);
  const handleResize = useCallback(() => {
    setOuterWidth(componentRef.current.parentElement.offsetWidth);
    setOuterHeight(componentRef.current.parentElement.offsetHeight);
  }, [componentRef]);
  useEffect(() => {
    window.addEventListener('load', handleResize);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('load', handleResize);
      window.removeEventListener('resize', handleResize);
    }
  }, [componentRef, handleResize]);
  useEffect(() => {
    socket.on('connect', () => {
      setConnected(true);
      socket.emit('client hello', props.source);
    });
    socket.on('disconnect', () => {
      setConnected(false);
    });
    socket.on('update:' + props.source, (message) => {
      const ts = new Date().valueOf();
      const newData = JSON.parse(message).map((x, i) => ({ tag: i, timestamp: ts, value: x }));
      updateData(prev => {
        if(prev.length === 0) {
          return new Array(retention - 1).fill(0).map((tmp, t) => new Array(newData.length).fill(0).map((x, i) => ({ tag: i, timestamp: t, value: 0 }))).flat().concat(...newData)
        } else {
          return [...prev.slice((1 - retention) * newData.length), ...newData];
        }
      });
    });
    return () => {
      if(socketConnected) {
        socket.emit('client goodbye', props.source);
      }
      socket.off('connect');
      socket.off('disconnect');
      socket.off('update:' + props.source);
    };
  }, [props.source]);
  useEffect(() => {
    const margin = { top: 80, right: 25, bottom: 30, left: 40 };
    const width = outerWidth - margin.left - margin.right;
    const height = outerHeight - margin.top - margin.bottom;
    const svgEl = d3.select(componentRef.current);
    svgEl.selectAll("*").remove();
    const svg = svgEl
      .append("g")
      .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");
    const x = d3.scaleBand()
      .range([0, width])
      .domain(d3.map(currentData, d => d.timestamp))
    const y = d3.scaleBand()
      .range([height, 0])
      .domain(d3.map(currentData, d => d.tag))
    svg.append("g")
      .style("font-size", 15)
      .call(d3.axisLeft(y).tickSize(0))
      .select(".domain").remove();
    const colorScale = d3.scaleSequential()
      .interpolator(d3.interpolateInferno)
      .domain([-1, 1]);
    svg.append('g').selectAll()
      .data(currentData, d => d.timestamp + ':' + d.tag)
      .enter()
      .append("rect")
      .attr("x", d => x(d.timestamp))
      .attr("y", d => y(d.tag))
      .attr("width", outerWidth / retention)
      .attr("height", y.bandwidth())
      .style("fill", d => colorScale(d.value))
      .style("stroke-width", 4)
      .style("stroke", "none")
      .style("opacity", 0.8);
    if(socketConnected === false) {
      svg.append("text").text("Cannot establish connection to the stream server");
    }
  }, [currentData, outerWidth, outerHeight, socketConnected]);

  return (
    <svg ref={componentRef} width={outerWidth} height={outerHeight} />
  );
}

export default Heatmap;