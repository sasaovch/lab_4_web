import React, { useRef, useEffect } from 'react'
import {connect} from "react-redux";
import { fetchAddAttempts } from '../../redux/action.js'
import { graphColor } from './constants.js'
import './Canvas.css'

const Canvas = ({props, attempts, r, addAttempt}) => {

  const canvasRef = useRef(null);

  useEffect(() => {  
    const canvas = canvasRef.current
    if (window.innerWidth >= 768) {
      canvas.width = 600
      canvas.height = 600
    } else {
      canvas.width = 300
      canvas.height = 300
    }
    const metrik = canvas.width / 2
    const canvasR = canvas.width / 6 * 2
    const heightLine = metrik / 30
    const graph = canvas.getContext('2d')

    initialilzeGraph(graph, canvas, metrik, canvasR, heightLine,
       attempts, r, addAttempt)
  });

return <canvas ref={canvasRef} {...props}  width="600%" height="600%" alt="Graph" />
}
 
function drawLine(graph, startX, startY, endX, endY) {
  graph.moveTo(startX, startY);
  graph.lineTo(endX, endY);
  graph.stroke(); 
}

function fillText(graph, text, coordX, coordY) {
  graph.fillText(text, coordX, coordY);
}

function drawGraph(graph, metrik, canvasR, heightLine, attempts, r) {
  graph.strokeStyle = graphColor;
  graph.fillStyle = graphColor;
  graph.clearRect(-metrik, -metrik, metrik * 2, metrik * 2);
  graph.globalAlpha = 1;
  graph.beginPath();

  // draw x and y
  drawLine(graph, -metrik, 0, metrik, 0);
  drawLine(graph, 0, -metrik, 0, metrik);
  
  // draw strokes on x
  drawLine(graph, -(canvasR), -heightLine, -(canvasR), heightLine);
  drawLine(graph, -(canvasR / 2), -heightLine, -(canvasR / 2), heightLine);
  drawLine(graph, (canvasR), -heightLine, (canvasR), heightLine);
  drawLine(graph, (canvasR / 2), -heightLine, (canvasR / 2), heightLine);
  drawLine(graph, -(canvasR * 2), -heightLine, -(canvasR * 2), heightLine);
  drawLine(graph, -(canvasR * 1.5), -heightLine, -(canvasR * 1.5), heightLine);
  drawLine(graph, (canvasR * 2), -heightLine, (canvasR * 2), heightLine);
  drawLine(graph, (canvasR * 1.5), -heightLine, (canvasR * 1.5), heightLine);
  
  // draw strokes on y
  drawLine(graph, -heightLine, -(canvasR), heightLine, -(canvasR));
  drawLine(graph, -heightLine, -(canvasR / 2), heightLine, -(canvasR / 2));
  drawLine(graph, -heightLine, (canvasR), heightLine, (canvasR));
  drawLine(graph, -heightLine, (canvasR / 2), heightLine, (canvasR / 2));
  drawLine(graph, -heightLine, -(canvasR * 2), heightLine, -(canvasR * 2));
  drawLine(graph, -heightLine, -(canvasR * 1.5), heightLine, -(canvasR * 1.5));
  drawLine(graph, -heightLine, (canvasR * 2), heightLine, (canvasR * 2));
  drawLine(graph, -heightLine, (canvasR * 1.5), heightLine, (canvasR * 1.5));
  
  //draw arrows
  drawLine(graph, metrik, 0, metrik * 0.9, -heightLine * 2);
  drawLine(graph, metrik, 0, metrik * 0.9, heightLine * 2);
  drawLine(graph, 0, -metrik, heightLine * 2, -metrik * 0.9);
  drawLine(graph, 0, -metrik, -heightLine * 2, -metrik * 0.9);
  
  graph.beginPath();
  graph.font = "16px Arial blod";
  fillText(graph, "x", (metrik * 0.9), -heightLine * 3);
  fillText(graph, "y", heightLine * 3, -(metrik * 0.9));
  
  fillText(graph, "-R", -(canvasR), heightLine * 4);
  fillText(graph, "-R/2", -(canvasR / 2), heightLine * 4);
  fillText(graph, "R", (canvasR), heightLine * 4);
  fillText(graph, "R/2", (canvasR / 2), heightLine * 4);
  
  fillText(graph, "R", -heightLine * 6, -(canvasR));
  fillText(graph, "R/2", -heightLine * 6, -(canvasR / 2));
  fillText(graph, "-R", -heightLine * 6, (canvasR));
  fillText(graph, "-R/2", -heightLine * 6, (canvasR / 2));

  // draw rectangle
  graph.beginPath();
  graph.globalAlpha = 0.3;
  graph.fillStyle = "blue";
  graph.fillRect(0, 0, (canvasR) / 2, -(canvasR)); 
  
  // draw sphere
  graph.arc(0, 0, (canvasR / 2), Math.PI, Math.PI * 3 / 2);
  // graph.arc(0, 0, (canvasR), Math.PI / 2, Math.PI);
  graph.lineWidth = 0;
  graph.fill();
  graph.stroke();
  
  graph.beginPath();
  graph.moveTo(0, 0);
  graph.lineTo(-(canvasR / 2), 0);
  graph.lineTo(0, -(canvasR / 2));
  graph.fill();

  // draw triangle
  graph.beginPath();
  graph.moveTo(0, 0);
  graph.lineTo(-(canvasR), 0);
  graph.lineTo(0, (canvasR) / 2);
  graph.fill();

  graph.globalAlpha = 0.5;
  drawDots(graph, heightLine, attempts, r, metrik);
}

function drawDots(graph, heightLine, attempts, r, metrik) {
  graph.globalAlpha = 1;
  for (let i = 0; i < attempts.length; i++) {
    const x_r = attempts[i].x;
    const y_r = attempts[i].y;
    const x = convertXForCanvas(x_r, r, metrik);
      const y = convertYForCanvas(y_r, r, metrik);
      if (checkRectangle(x_r, y_r, r) || checkTriangle(x_r, y_r, r) || checkCircle(x_r, y_r, r)) {
          graph.fillStyle = "#00FF00";
          graph.strokeStyle = "#00FF00";
      } else {
        graph.fillStyle = "#FF0000";
        graph.strokeStyle = "#FF0000";
      }    
      graph.beginPath();
      graph.arc(x, y, heightLine, 0, Math.PI * 2);
      graph.fill();
    }
  }
  
  function checkRectangle(x, y, r) {
    return x >= 0 && y >= 0 && (2 * x) <= r && y <= r;
  }

function checkTriangle(x, y, r) {
  return x <= 0 && y <= 0 && (2*y) >= -x - r;
}

function checkCircle(x, y, r) {
  return x <= 0 && y >= 0 && x*x+y*y <= r*r/4;
}

function setOnMouseMove(graph, canvas, metrik, canvasR, heightLine,
  attempts, r, addAttempt) {
  canvas.onmousemove = (e) => {
    drawGraph(graph, metrik, canvasR, heightLine, attempts, r);
    graph.fillStyle = "#00BFFF";
    graph.strokeStyle = "#00BFFF";
    graph.beginPath();
    graph.arc(e.offsetX - metrik, e.offsetY - metrik, heightLine, 0, Math.PI*2);
    graph.fill();
  };
  
    canvas.onmouseleave = (e) => {
      drawGraph(graph, metrik, canvasR, heightLine, attempts, r);
    };

    canvas.onmousedown = function(event) {
      const x = convertXToRadiusOf(event.offsetX, r, metrik);
      const y = convertYToRadiusOf(event.offsetY, r, metrik);
      addAttempt({x: x, y: y, r: r, hit: checkRectangle(x, y, r) || checkTriangle(x, y, r) || checkCircle(x, y, r)});
    };
}
function convertXForCanvas(x, r, metrik) {
  return x / r * metrik / 3 * 2;
}

function convertYToRadiusOf(y, r, metrik) {
  return ((metrik - y) / metrik * 3 / 2) * r;
}

function convertXToRadiusOf(x, r, metrik) {
  return ((x - metrik) / metrik * 3 / 2) * r;
}

function convertYForCanvas(y, r, metrik) {
  return -y / r * metrik / 3 * 2;
}

function initialilzeGraph(graph, canvas, metrik, canvasR, heightLine,
  attempts, r, addAttempt) {
  graph.resetTransform();
  graph.translate(metrik, metrik);
  drawGraph(graph, metrik, canvasR, heightLine, attempts, r);
  setOnMouseMove(graph, canvas, metrik, canvasR, heightLine,
    attempts, r, addAttempt);
}

function mapDispatchToGraphProps(dispatch) {
  return {
    addAttempt: (attempt) => dispatch(fetchAddAttempts(attempt)),
  }
}

function mapStateToGraphProps(state) {
  return {
      attempts: state.attempts,
      r: state.r
  }
}

export default connect(mapStateToGraphProps, mapDispatchToGraphProps)(Canvas);
// export default Canvas;