import React, { useCallback, useEffect, useRef } from "react";
import { useReactFlow } from "reactflow";

import "./ContextMenu.css";

export default function ContextMenu({
  id,
  name,
  top,
  left,
  right,
  bottom,
  ...props
}) {
  const { getNode, setNodes, addNodes, setEdges } = useReactFlow();
    
  const deleteNode = useCallback(() => {
    setNodes((nodes) => nodes.filter((node) => node.id !== id));
    setEdges((edges) => edges.filter((edge) => edge.source !== id && edge.target !== id)); // Filter out edges related to the deleted node
  
    // Rest of your code...
    fetch(`http://localhost:8080/Ethernet`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: `${id}`, name: `${name}`, usage: "no" }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Updated data:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, [id, name, setNodes, setEdges]);

  return (
    <div
      style={{ top, left, right, bottom}}
      className="context-menu"
      {...props}
    >
      <button onClick={deleteNode}>delete</button>
    </div>
  );
}
