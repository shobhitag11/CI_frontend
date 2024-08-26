import React, { useEffect, useRef } from 'react';

const knowledgeGraph = {
  nodes: [
    { id: 'Contract', x: 250, y: 150 },
    { id: 'Parties', x: 100, y: 300 },
    { id: 'Terms', x: 250, y: 300 },
    { id: 'Obligations', x: 400, y: 300 }
  ],
  links: [
    { source: 'Contract', target: 'Parties' },
    { source: 'Contract', target: 'Terms' },
    { source: 'Contract', target: 'Obligations' }
  ]
};

const SimpleKnowledgeGraph = () => {
  const svgRef = useRef(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (svg) {
      // Clear existing content
      while (svg.firstChild) {
        svg.removeChild(svg.firstChild);
      }

      // Draw links
      knowledgeGraph.links.forEach(link => {
        const source = knowledgeGraph.nodes.find(node => node.id === link.source);
        const target = knowledgeGraph.nodes.find(node => node.id === link.target);
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', source.x);
        line.setAttribute('y1', source.y);
        line.setAttribute('x2', target.x);
        line.setAttribute('y2', target.y);
        line.setAttribute('stroke', 'black');
        svg.appendChild(line);
      });

      // Draw nodes
      knowledgeGraph.nodes.forEach(node => {
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', node.x);
        circle.setAttribute('cy', node.y);
        circle.setAttribute('r', 20);
        circle.setAttribute('fill', 'lightblue');
        svg.appendChild(circle);

        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', node.x);
        text.setAttribute('y', node.y);
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('dominant-baseline', 'middle');
        text.textContent = node.id;
        svg.appendChild(text);
      });
    }
  }, []);

  return (
    <div className="w-full h-[500px] bg-gray-100">
      <svg ref={svgRef} width="100%" height="100%" viewBox="0 0 500 500">
        {/* SVG content will be added here dynamically */}
      </svg>
    </div>
  );
};

export default SimpleKnowledgeGraph;