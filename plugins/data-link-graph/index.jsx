import React from 'react';
import * as d3 from "d3";

import hierarchy, {node_types} from './hierarchy';

// TODO 待实现功能
// - [x] 根据输入过滤节点、连线
// - [x] 仅显示指定类型的节点
// - [x] 根据页面设置画布宽度
// - [x] 全屏弹窗
// - [x] 数据实体之间需能够明显区分源和目标节点
// - [x] 合理排列节点，减少交叉
// - [x] 画布可拖动

const fontSize = 12;
const arrowMarkerSize = 8;

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

function _updateSvgViewBox(svg, viewBox) {
  svg.attr("viewBox", [viewBox.x, viewBox.y, viewBox.width, viewBox.height]);
  svg.select("foreignObject[role='filter']")
    .attr("x", viewBox.x)
    .attr("y", viewBox.y);
}

function _dragGraph(svg) {
  function dragstarted(event) {
    svg.node().style.cursor = 'move';
  }

  function dragged(event) {
    const viewBox = svg.node().viewBox.baseVal;
    const newViewBox = {
      x: viewBox.x - event.dx,
      y: viewBox.y - event.dy,
      width: viewBox.width,
      height: viewBox.height
    };

    _updateSvgViewBox(svg, newViewBox);
  }

  function dragended(event) {
    svg.node().style.cursor = '';
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
    parent.querySelector(".graph-text").style.display = "";
    parent.ownerDocument.body.style.overflow = "visible";
  } else {
    parent.fullscreen = true;
    parent.style = `position: fixed;top: 0;left: 0;background-color: rgba(0,0,0,.5);padding: ${padding}px;width: 100%;height: 100%;z-index: 10000;`;
    parent.querySelector(".graph-text").style.display = "none";
    parent.ownerDocument.body.style.overflow = "hidden";
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

  _updateSvgViewBox(svg, newViewBox);
}

function _filter(svg, nodes, links, viewBox) {
  const contains = (obj, v) => (obj.value + '').includes(v);
  const filterCondition = {
    [node_types.model]: true
    , [node_types.prop]: true
    , [node_types.data]: true
    , keyword: ''
  };

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

  const canNodeShow = (node) => !!filterCondition[node.type];

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

  // buttons.append("input")
  //   .attr("class", "btn" + (filterCondition.data ? " active" : ""))
  //   .attr("type", "button")
  //   .attr("value", "显示数据节点")
  //   .on("click", function() { btnClick(this, node_types.data) });
  buttons.append("div").attr("class", "divider");
  buttons.append("input")
    .attr("class", "btn" + (filterCondition.prop ? " active" : ""))
    .attr("type", "button")
    .attr("value", "显示属性节点")
    .on("click", function() { btnClick(this, node_types.prop) });
  buttons.append("div").attr("class", "divider");
  buttons.append("input")
    .attr("class", "btn" + (filterCondition.model ? " active" : ""))
    .attr("type", "button")
    .attr("value", "显示数据结构")
    .on("click", function() { btnClick(this, node_types.model) });

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
  filter.append("div").attr("style", "display:flex;align-items:center;background:#fff;")
    .append("span")
      .attr("class", "fullscreen")
      .on("click", (e) => _fullscreen(svg, viewBox));
}

function _drawLinkPath(link, targetMarkerSize) {
  const source = link.source;
  const target = link.target;
  const x0 = source.x, y0 = source.y;
  const x1 = target.x, y1 = target.y;
  const d = x1 - x0, h = y1 - y0;
  const l = Math.sqrt(d * d + h * h);
  const cosA = d / l, sinA = h / l;
  const sourceGap = source.weight;
  const x01 = x0 + (cosA * sourceGap), y01 = y0 + (sinA * sourceGap);
  const targetGap = link.type == node_types.data ? target.weight + targetMarkerSize : target.weight;
  const x11 = x1 - (cosA * targetGap), y11 = y1 - (sinA * targetGap);

  // Note: 通过 path 绘制的路径，无法与 arrow 准确连接上，而且会出现闪动
  // const path = d3.path();
  // path.moveTo(x01, y01);
  // path.lineTo(x11, y11);
  // path.closePath();
  // return path;

  return `M${x01},${y01} L${x11},${y11} C`;
}

function _drawArrow(svg, id, markerSize) {
  svg.append("svg:defs")
    .append("svg:marker")
      .attr("id", id)
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", 0)
      .attr("refY", 0)
      .attr("fill", "#999")
      .attr("markerWidth", markerSize)
      .attr("markerHeight", markerSize)
      .attr("orient", "auto")
      .append("path")
      .attr("d", "M0,-5L10,0L0,5");

  return id;
}

// https://observablehq.com/@sandraviz/force-directed-layout?collection=@observablehq/featured-creators
// https://observablehq.com/@d3/force-directed-graph
// https://observablehq.com/@d3/line-with-tooltip?collection=@d3/charts
// http://using-d3js.com/05_01_paths.html
function _graph(svg, nodes, links, viewBox) {
  const simulation = d3.forceSimulation(nodes)
      .force("link", d3.forceLink(links).id(d => d.id).distance((d) => d.weight).strength(1))
      .force("charge", d3.forceManyBody().strength(-540))
      .force("x", d3.forceX())
      .force("y", d3.forceY());

  svg.call(_dragGraph(svg));

  const dataLinkTargetArrowId = 'data-link-target-arrow';
  _drawArrow(svg, dataLinkTargetArrowId, arrowMarkerSize);

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
          .attr('marker-end', (d) => d.type == node_types.data ? `url(#${dataLinkTargetArrowId})` : '')
        ;
        g.append("title").text((d) => d.value);

        g.append("text")
          .attr("pointer-events", "none")
        .append("textPath")
          .attr("startOffset", "50%")
          .attr("text-anchor", "middle")
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
      .attr("d", (d) => _drawLinkPath(d, arrowMarkerSize))
    ;

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
      <svg class="graph-area" ref={svgRef}
        preserveAspectRatio="xMidYMid meet"
        style={{border: 'solid 2px #dadde1', backgroundColor: '#fff'}}
      />
      <p class="graph-text" style={{textAlign: 'center', color: '#6a737d'}}>{children}</p>
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