import React from 'react';
import * as d3 from "d3";

import hierarchy from './hierarchy';

// TODO 待实现功能
// - [x] 根据输入过滤节点、连线
// - [x] 仅显示指定类型的节点
// - [x] 根据页面设置画布宽度
// - [x] 全屏弹窗

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

function _fullscreen(svg, viewBox) {
  const padding = 32;
  const parent = viewBox.parent;

  if (parent.fullscreen) {
    parent.fullscreen = false;
    parent.style = "";
  } else {
    parent.fullscreen = true;
    parent.style = `position: absolute;top: 0;left: 0;background-color: rgba(0,0,0,.5);padding: ${padding}px;width: 100%;height: 100%;z-index: 10000;`;
  }

  const parentRect = parent.getBoundingClientRect();
  const sizeDiff = parent.fullscreen ? padding * 2 : 0;
  const width = parentRect.width - sizeDiff;
  const height = (parent.fullscreen ? parentRect.height : viewBox.height) - sizeDiff;
  const newViewBox = {
    x: -width / 2,
    y: -height / 2,
    width: width,
    height: height,
    parent: parent
  };

  svg.attr("viewBox", [newViewBox.x, newViewBox.y, newViewBox.width, newViewBox.height]);
  svg.select("foreignObject[role='filter']")
    .attr("x", newViewBox.x)
    .attr("y", newViewBox.y);
}

function _filter(svg, nodes, links, viewBox) {
  const contains = (obj, v) => (obj.value + '').includes(v);
  const filterCondition = {model: true, prop: true, data: true, keyword: ''};
  const btnClick = function(el, type) {
    if (el.className.includes("active")) {
      el.className = "btn";
      filterCondition[type] = false;
    } else {
      el.className = "btn active";
      filterCondition[type] = true;
    }

    search();
  };
  const canNodeShow = (node) => (node.type == "model" && filterCondition.model)
    || (node.type == "prop" && filterCondition.prop)
    || (node.type == "data" && filterCondition.data);
  const search = () => {
    const keyword = filterCondition.keyword;

    const filteredLinks = links
      .filter((link) => contains(link, keyword) || (contains(link.source, keyword) && contains(link.target, keyword)))
      .filter((link) => canNodeShow(link.source) && canNodeShow(link.target));
    const filteredLinkNodeIdMap = filteredLinks.reduce((map, link) => {
      map[link.source.id] = map[link.target.id] = true;
      return map;
    }, {});

    const filteredNodes = nodes
      .filter((node) => filteredLinkNodeIdMap[node.id] || contains(node, keyword))
      .filter(canNodeShow);

    _graph(svg, filteredNodes, filteredLinks, viewBox);
  };

  const body = svg
    .append("foreignObject")
    .attr("role", "filter")
    .attr("width", "100%")
    .attr("height", 34)
    .attr('x', viewBox.x)
    .attr('y', viewBox.y)
    .append("xhtml:body")
    .attr('xmlns','http://www.w3.org/1999/xhtml');
  body.append("style")
    .html(".buttons { display:flex; }"
      + ".buttons .btn { height:32px;border:none;padding:6px;cursor:pointer;color:#fff;background-color:#0d6efd;border-color:#0d6efd;transition:color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out; }"
      + ".buttons .btn:hover {  }"
      + ".buttons .btn.active { color:#fff;background-color:#0a58ca;border-color:#0a53be; }"
      + ".buttons .divider { display:inline-block;align-self:stretch;width:1px;min-height:1em;opacity:.25;background-color:#000; }"
      + ".fullscreen { font-size:2em;margin:4px;cursor:pointer;vertical-align:middle;box-sizing:border-box;display:inline-block;border:.1em solid rgb(28, 206, 206);width:1em;height:1em;position:relative; }"
      + ".fullscreen::before { width:.333em;height:1.1em;left:.233em;top:-.1em; }"
      + ".fullscreen::before, .fullscreen::after { content:'';background:#fff;position:absolute; }"
      + ".fullscreen::after { width:1em;height:.333em;top:.233em;left:-.1em; }"
      + ".search { width:100%;height:32px;padding:6px;border:none;border-left:2px solid #dadde1; }");

  const filter = body.append("div")
      .attr("style", "display:flex;border-bottom:2px solid #dadde1;");
  const buttons = filter.append("div").attr("class", "buttons");

  buttons.append("input")
    .attr("class", "btn" + (filterCondition.data ? " active" : ""))
    .attr("type", "button")
    .attr("value", "显示数据节点")
    .on("click", function() { btnClick(this, "data") });
  buttons.append("div").attr("class", "divider");
  buttons.append("input")
    .attr("class", "btn" + (filterCondition.prop ? " active" : ""))
    .attr("type", "button")
    .attr("value", "显示属性节点")
    .on("click", function() { btnClick(this, "prop") });
  buttons.append("div").attr("class", "divider");
  buttons.append("input")
    .attr("class", "btn" + (filterCondition.model ? " active" : ""))
    .attr("type", "button")
    .attr("value", "显示数据结构")
    .on("click", function() { btnClick(this, "model") });

  filter.append("div")
    .attr("style", "flex-grow:1;")
    .append("input")
      .attr("class", "search")
      .attr("type", "text")
      .attr("placeholder", "输入关键字过滤数据...")
      .on("change", (e) => {
        filterCondition.keyword = e.target.value;
        search();
      });
  filter.append("div").attr("style", "display:flex;align-items:center;")
    .append("span")
      .attr("class", "fullscreen")
      .on("click", (e) => _fullscreen(svg, viewBox));
}

// https://observablehq.com/@sandraviz/force-directed-layout?collection=@observablehq/featured-creators
// https://observablehq.com/@d3/force-directed-graph
// https://observablehq.com/@d3/line-with-tooltip?collection=@d3/charts
// http://using-d3js.com/05_01_paths.html
function _graph(svg, nodes, links, viewBox) {
  const simulation = d3.forceSimulation(nodes)
      .force("link", d3.forceLink(links).id(d => d.id).distance((d) => d.weight).strength(1))
      .force("charge", d3.forceManyBody().strength(-240))
      .force("x", d3.forceX())
      .force("y", d3.forceY());

  const link = svg.select("[role='links']").size() > 0
    ? svg.select("[role='links']")
    : svg.append("g").attr("role", "links");
  link.selectAll("*").remove();

  link
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

  const node = svg.select("[role='nodes']").size() > 0
    ? svg.select("[role='nodes']")
    : svg.append("g").attr("role", "nodes");
  node.selectAll("*").remove();

  node.selectAll("g")
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
  });
}

const DataLinkGraph = ({ data, height, children }) => {
  const svgRef = React.useRef(null);

  React.useEffect(() => {
    const nodes = data.nodes;
    const links = data.links;
    const parent = svgRef.current.parentNode;
    const parentRect = parent.getBoundingClientRect();
    const width = parentRect.width;
    const viewBox = {
      x: -width / 2,
      y: -height / 2,
      width: width,
      height: height,
      parent: parent
    };

    // Create root container where we will append all other chart elements
    const svg = d3.select(svgRef.current)
      .attr("viewBox", [viewBox.x, viewBox.y, viewBox.width, viewBox.height])
      // .attr("style", "max-width: 100%; height: auto; height: intrinsic;")
      .attr("font-size", fontSize)
      // .attr("font-family", "sans-serif")
      .attr("font-weight", "normal")
      .attr("text-anchor", "middle");
    svg.selectAll("*").remove(); // Clear svg content before adding new elements

    _graph(svg, nodes, links, viewBox);
    _filter(svg, nodes, links, viewBox);
  }, [data]); // Redraw chart if data changes

  return (
    <div>
      <svg ref={svgRef}
        preserveAspectRatio="xMidYMid meet"
        style={{border: 'solid 2px #dadde1', backgroundColor: '#fff'}}
      />
      <p style={{textAlign: 'center', color: '#6a737d'}}>{children}</p>
    </div>
  );
};

// https://github.com/d3/d3/blob/main/API.md
export default function ({
  children,
  data,
  height,
}) {
  return (
    <DataLinkGraph
      data={hierarchy(data)}
      height={height}
      children={children}
    />
  );
}