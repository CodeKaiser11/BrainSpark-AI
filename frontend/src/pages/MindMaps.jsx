import React, { useState, useCallback } from 'react';
import axios from '../api/axios';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import dagre from 'dagre';

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const getLayoutedElements = (nodes, edges, direction = 'TB') => {
  const nodeWidth = 172;
  const nodeHeight = 36;
  dagreGraph.setGraph({ rankdir: direction });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  const newNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    const newNode = {
      ...node,
      targetPosition: 'top',
      sourcePosition: 'bottom',
      position: {
        x: nodeWithPosition.x - nodeWidth / 2,
        y: nodeWithPosition.y - nodeHeight / 2,
      },
    };

    return newNode;
  });

  return { nodes: newNodes, edges };
};

export default function MindMaps() {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const processTree = (node, currentNodes, currentEdges, parentId = null) => {
    if (!node || !node.id) return;

    // Create node
    const isRoot = parentId === null;
    currentNodes.push({
      id: node.id,
      data: { label: node.label },
      position: { x: 0, y: 0 },
      style: { 
        background: isRoot ? '#d4500a' : '#fff',
        color: isRoot ? '#fff' : '#1a1208',
        border: '1px solid #d4500a',
        borderRadius: '8px',
        fontWeight: isRoot ? 'bold' : 'normal',
        width: 150,
      }
    });

    // Create edge
    if (parentId) {
      currentEdges.push({
        id: `e-${parentId}-${node.id}`,
        source: parentId,
        target: node.id,
        animated: true,
        style: { stroke: '#d4500a' }
      });
    }

    if (node.children && Array.isArray(node.children)) {
      node.children.forEach(child => processTree(child, currentNodes, currentEdges, node.id));
    }
  };

  const generateMap = async (targetTopic) => {
    if (!targetTopic) return;
    setLoading(true);
    setError(null);
    setNodes([]);
    setEdges([]);

    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('/ai/mindmap', 
        { topic: targetTopic }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      const mindmapData = res.data.mindmap;
      
      const rawNodes = [];
      const rawEdges = [];
      processTree(mindmapData, rawNodes, rawEdges);
      
      const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
        rawNodes,
        rawEdges
      );

      setNodes(layoutedNodes);
      setEdges(layoutedEdges);
    } catch (err) {
      console.error(err);
      setError('Failed to generate mind map. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12 py-8 px-4 h-full flex flex-col">
      
      {/* Header Area */}
      <section className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mt-4">🧠 AI Mind Maps</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Visualize complex topics instantly. Type any subject and let AI generate a beautifully structured mind map.
        </p>
      </section>

      {/* Input Area */}
      <section className="bg-brand-dark p-8 rounded-3xl text-white shadow-md max-w-4xl mx-auto w-full">
        <div className="flex flex-col sm:flex-row gap-4">
          <input 
            type="text" 
            placeholder="E.g., Quantum Mechanics, The French Revolution..." 
            className="flex-1 bg-white/10 border border-white/20 rounded-xl py-4 px-6 text-white placeholder-gray-400 outline-none"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && generateMap(topic)}
          />
          <button 
            onClick={() => generateMap(topic)}
            disabled={loading || !topic}
            className="px-8 py-4 bg-brand-orange hover:bg-orange-600 font-bold rounded-xl transition-colors shadow-sm text-lg flex items-center justify-center disabled:opacity-50"
          >
            {loading ? 'Generating...' : 'Generate'}
          </button>
        </div>
      </section>

      {/* Examples (Hide if map exists) */}
      {!loading && nodes.length === 0 && (
        <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 max-w-4xl mx-auto w-full">
          <h2 className="text-xl font-bold mb-6 text-center">Try These Topics</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {['Photosynthesis', 'World War II Causes', 'JavaScript Ecosystem'].map((ex, i) => (
              <button 
                key={i}
                onClick={() => {
                  setTopic(ex);
                  generateMap(ex);
                }}
                className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 font-medium hover:bg-gray-100 hover:border-gray-300 transition-colors"
              >
                {ex}
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Error Message */}
      {error && (
        <div className="p-4 bg-red-50 text-red-600 rounded-xl text-center max-w-4xl mx-auto w-full">
          {error}
        </div>
      )}

      {/* Map Area */}
      {nodes.length > 0 && (
        <div className="w-full h-[600px] border border-gray-200 rounded-3xl overflow-hidden bg-white shadow-sm">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            fitView
            attributionPosition="bottom-right"
          >
            <Controls />
            <MiniMap zoomable pannable />
            <Background color="#ccc" gap={16} />
          </ReactFlow>
        </div>
      )}

    </div>
  );
}
