// import React, { useCallback, useEffect, useRef } from "react";
// import { useReactFlow } from "reactflow";

// import "./ContextMenu.css";
// import UpdatedContextMenu from "./UpdatedContextMenu.js";

// export default function ContextMenu({
//   id,
//   name,
//   type1,
//   top,
//   left,
//   right,
//   bottom,
//   ...props
// }) {
//   const { getNode, setNodes, addNodes, setEdges } = useReactFlow();
    
//   const deleteNode = useCallback(() => {
//     setNodes((nodes) => nodes.filter((node) => node.id !== id));
//     setEdges((edges) => edges.filter((edge) => edge.source !== id && edge.target !== id)); // Filter out edges related to the deleted node
  
//     if(type1 == "normal"){
//         // Change the infoemation of deleted normal node
//         fetch(`http://localhost:8080/Ethernet`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ id: `${id}`, name: `${name}`, usage: "no" }),
//       })
//         .then((response) => {
//           if (!response.ok) {
//             throw new Error('Network response was not ok');
//           }
//           return response.json();
//         })
//         .then((data) => {
//           console.log('Updated data:', data);
//         })
//         .catch((error) => {
//           console.error('Error:', error);
//         });
//     }
//   }, [id, name, type1, setNodes, setEdges]);

//   return (
//     <div
//       style={{ top, left, right, bottom}}
//       className="context-menu"
//       {...props}
//     >
//       <button onClick={deleteNode}>delete</button>
//     </div>
//   );
// }


// ContextMenu.js

import React from "react";
import { useReactFlow } from "reactflow";

import "./ContextMenu.css";

const ContextMenu = ({ id, name, type1, top, left, right, bottom, onClick }) => {
  const { setNodes, setEdges } = useReactFlow();

  const deleteNode = () => {
    // Implement deletion logic here
    setNodes((nodes) => nodes.filter((node) => node.id !== id));
    setEdges((edges) => edges.filter((edge) => edge.source !== id && edge.target !== id));

    if (type1 === "normal") {
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
    }

    onClick(); // Close the context menu after deletion
  };

  return (
    <div className="context-menu" style={{ top, left, right, bottom }}>
      
        <div>
          <div onClick={deleteNode}>Delete</div>
        </div>
    
    </div>
  );
};

export default ContextMenu;
