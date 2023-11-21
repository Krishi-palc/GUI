import React, { useCallback, useEffect, useRef } from "react";
import { useReactFlow } from "reactflow";

import "./ContextMenu.css";
import url1 from "./url1";

export default function ContextMenu({
  id,
  name,
  type1,
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
  
    //DB
    fetch(`${url1}/Node/${id}`, {
      method: 'DELETE',
      headers: {
          'Content-Type': 'application/json',
      },
    })
      .then((response) => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          // Parse the JSON here and return the result
          return response;
      })
      .then((data) => {
          // Now you can use the parsed JSON data
          // console.log("Delete : "+id);
      })
      .catch((error) => {
          console.error('Error:', error);
      });
      

  }, [id, name, type1, setNodes, setEdges]);

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
