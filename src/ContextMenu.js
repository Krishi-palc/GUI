import React, { useCallback, useEffect, useRef } from "react";
import { useReactFlow } from "reactflow";

import "./ContextMenu.css";
import url1 from "./url1";

export default function ContextMenu({
  node1,
  edges1,
  top,
  left,
  right,
  bottom,
  ...props
}) {
  const { getNode, setNodes, addNodes, setEdges } = useReactFlow();
    
  const deleteNode = useCallback(() => {
    

    setNodes((nodes) => nodes.filter((node) => node.id !== node1.id));
    setEdges((edges) => edges.filter((edge) => edge.source !== node1.id && edge.target !== node1.id)); // Filter out edges related to the deleted node

    if(node1.type1 == "normal" ){
        // Change the information of deleted normal node
        fetch(`${url1}/Ethernet`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: `${node1.id}`, name: `${node1.data.label}`, usage: "no" }),
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
    }
  }, [node1 , edges1, setNodes, setEdges]);

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
