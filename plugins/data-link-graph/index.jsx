import React from 'react';
import * as d3 from "d3";

import hierarchy from './hierarchy';

// TODO 待实现功能
// - [ ] 根据输入实时过滤节点、连线
// - [ ] 画布缩放
// - [ ] 透视图
// - [ ] 紧凑、稀疏按钮

const fontSize = 12;

function _drag(simulation) {
  function dragstarted(event, d) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }

  function dragged(event, d) {
    d.fx = event.x;
    d.fy = event.y;
  }

  function dragended(event, d) {
    if (!event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }

  return d3.drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended);
}

// https://observablehq.com/@sandraviz/force-directed-layout?collection=@observablehq/featured-creators
// https://observablehq.com/@d3/force-directed-graph
// https://observablehq.com/@d3/line-with-tooltip?collection=@d3/charts
// http://using-d3js.com/05_01_paths.html
function _graph(svg, nodes, links) {
  const simulation = d3.forceSimulation(nodes)
      .force("link", d3.forceLink(links).id(d => d.id).distance((d) => d.weight).strength(1))
      .force("charge", d3.forceManyBody().strength(-240))
      .force("x", d3.forceX())
      .force("y", d3.forceY());

  // const link = svg
  //   .append("g")
  //   .selectAll("line")
  //   .data(links)
  //   .join("line")
  //     .attr("stroke", (d) => d.color)
  //     .attr("stroke-width", 1)
  //     .attr("stroke-opacity", 0.8);

  // const node = svg
  //   .append("g")
  //     .attr("fill", "#fff")
  //     .attr("stroke", "#000")
  //     .attr("stroke-width", 1.5)
  //   .selectAll("circle")
  //   .data(nodes)
  //   .join("circle")
  //     .attr("fill", (d) => d.color)
  //     .attr("r", (d) => d.weight)
  //   .call(_drag(simulation));

  // 文本路径跟随方案
  // const node = svg
  //   .append("g")
  //     .attr("fill", "#fff")
  //     .attr("stroke", "#000")
  //     .attr("stroke-width", 1.5)
  //   .selectAll("path")
  //   .data(nodes)
  //   .join("path")
  //     .attr("fill", (d) => d.color)
  //     .attr("id", (d) => `node-${d.id}`)
  //     .attr("d", (d) => {
  //       const path = d3.path();
  //       path.arc(d.x, d.y, d.weight, 0, Math.PI * 2);
  //       path.closePath();
  //       return path;
  //     })
  //   .call(_drag(simulation));
  // const nodeText = svg
  //   .append("g")
  //   .selectAll("text")
  //   .data(nodes)
  //   .join("text")
  //     .attr("pointer-events", "none")
  //     .call((text) =>
  //       text.append("textPath")
  //         .attr("xlink:href", (d) => `#node-${d.id}`)
  //         .text((d) => d.value)
  //     );

  // const node = svg
  //   .append("g")
  //     .attr("fill", "#fff")
  //     .attr("stroke", "#000")
  //     .attr("stroke-width", 1.5)
  //   .selectAll("g")
  //   .data(nodes)
  //   .join("g")
  //     .call((g) => {
  //       g.append("circle")
  //         .attr("fill", (d) => d.color)
  //         .attr("r", (d) => d.weight);
  //       g.append("path")
  //         .attr("id", (d) => `node-${d.id}`)
  //         .attr("fill", "transparent")
  //         .attr("stroke", "transparent")
  //         .attr("d", (d) => {
  //           const path = d3.path();
  //           path.moveTo(d.x - 2 * d.weight, d.y);
  //           path.lineTo(d.x + 2 * d.weight, d.y);
  //           // path.arc(d.x, d.y, d.weight, 0, Math.PI * 2);
  //           path.closePath();
  //           return path;
  //         });
  //       g.append("text")
  //         .attr("pointer-events", "none")
  //         // .text((d) => d.value)
  //         .append("textPath")
  //         .attr("xlink:href", (d) => `#node-${d.id}`)
  //         .text((d) => d.value);
  //       return g;
  //     })
  //   .call(_drag(simulation));


  const link = svg
    .append("g")
    .selectAll("g")
    .data(links)
    .join("g")
      .call((g) => {
        g.append("path")
          .attr("id", (d) => `line-${d.id}`)
          .attr("stroke", (d) => d.color)
          .attr("stroke-width", 1.5)
          .attr("stroke-opacity", 0.8)
          .attr("d", (d) => {
            const path = d3.path();
            path.moveTo(d.source.x, d.source.y);
            path.lineTo(d.target.x, d.target.y);
            path.closePath();
            return path;
          });
        g.append("title").text((d) => d.value);

        g.append("text")
          .attr("pointer-events", "none")
        .append("textPath")
          .attr("startOffset", (d) => d.source.weight * 2 + fontSize)
          .attr("xlink:href", (d) => `#line-${d.id}`)
          .text((d) => d.value);

        return g;
      });

  const node = svg
    .append("g")
    .selectAll("g")
    .data(nodes)
    .join("g")
      .call((g) => {
        g.append("circle")
          .attr("id", (d) => `node-${d.id}`)
          .attr("fill", (d) => d.color)
          .attr("stroke", "#828282")
          .attr("stroke-width", 1.5)
          .attr("stroke-opacity", 0.8)
          .attr("r", (d) => d.weight);
        g.append("title").text((d) => d.value);

        g.append("text")
          .attr("pointer-events", "none")
          .selectAll("tspan")
          .data((d) =>
            `${d.value}`.split(/\n/g)
              .map((v) => ({value: v, source: d}))
          )
          .join("tspan")
            .attr("text-anchor", "middle")
            .attr("dx", "0")
            .attr("dy", (d, i) => `${i}em`)
            .text((d) => d.value);

        return g;
      })
    .call(_drag(simulation));


  simulation.on("tick", () => {
    link.selectAll("path")
      .attr("d", (d) => {
        const path = d3.path();
        path.moveTo(d.source.x, d.source.y);
        path.lineTo(d.target.x, d.target.y);
        path.closePath();
        return path;
      });
    // link.selectAll("text")
    //   .attr("x", (d) => Math.min(d.source.x, d.target.x) + (Math.abs(d.target.x - d.source.x) / 2))
    //   .attr("y", (d) => Math.min(d.source.y, d.target.y) + (Math.abs(d.target.y - d.source.y) / 2));

    // link
    //   .attr("x1", (d) => d.source.x)
    //   .attr("y1", (d) => d.source.y)
    //   .attr("x2", (d) => d.target.x)
    //   .attr("y2", (d) => d.target.y);

    node.selectAll("circle")
      .attr("cx", (d) => d.x)
      .attr("cy", (d) => d.y);
    node.selectAll("text")
      .attr("x", (d) => d.x)
      .attr("y", (d) => {
        const lines = `${d.value}`.split(/\n/g).length - 1;
        return d.y + (fontSize / 2) - (lines * fontSize / 2);
      });
    node.selectAll("tspan")
      .attr("x", (d) => d.source.x);

    // node.selectAll("circle")
    //   .attr("cx", (d) => d.x)
    //   .attr("cy", (d) => d.y);
    // node.selectAll("path").attr("d", (d) => {
    //   const path = d3.path();
    //   path.moveTo(d.x - 2 * d.weight, d.y);
    //   path.lineTo(d.x + 2 * d.weight, d.y);
    //   path.closePath();
    //   return path;
    // });

    // node.attr("d", (d) => {
    //   const path = d3.path();
    //   path.arc(d.x, d.y, d.weight, 0, Math.PI * 2);
    //   path.closePath();
    //   return path;
    // });
  });

  return svg.node();
}

const DataLinkGraph = ({ data, dimensions, children }) => {
  const svgRef = React.useRef(null);
  const { width, height, margin } = dimensions;
  const svgWidth = width + margin.left + margin.right;
  const svgHeight = height + margin.top + margin.bottom;

  React.useEffect(() => {
    const nodes = data.nodes;
    const links = data.links;

    // Create root container where we will append all other chart elements
    const svg = d3.select(svgRef.current)
                  .attr("viewBox", [-width / 2, -height / 2, width, height])
                  // .attr("style", "max-width: 100%; height: auto; height: intrinsic;")
                  .attr("font-size", fontSize)
                  // .attr("font-family", "sans-serif")
                  .attr("font-weight", "normal")
                  .attr("text-anchor", "middle");
    svg.selectAll("*").remove(); // Clear svg content before adding new elements

    _graph(svg, nodes, links);
  }, [data]); // Redraw chart if data changes

  return (
    <div>
      <svg ref={svgRef} width={svgWidth} height={svgHeight} style={{border: 'solid 2px #dadde1'}} />
      <p style={{textAlign: 'center', color: '#6a737d'}}>{children}</p>
    </div>
  );
};

// https://github.com/d3/d3/blob/main/API.md
export default function ({
  children,
  data,
  dimensions,
}) {
  return (
    <DataLinkGraph
      data={hierarchy(data)}
      dimensions={dimensions}
      children={children}
    />
  );
}