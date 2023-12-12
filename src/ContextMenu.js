import React, { useCallback, useEffect, useRef ,useState} from "react";
import { useReactFlow } from "reactflow";
import "./ContextMenu.css";
import url1 from "./url1";
export default function ContextMenu({
  nodes,
  node,
  id,
  name,
  type1,
  top,
  left,
  right,
  bottom,
  ...props
}) {
  const {setNodes, setEdges} = useReactFlow();
  let gid = 1;
  const [grps, setGrps] = useState([]);
  const createGId= () => {
    gid = 1
  };
  const getGId = () => `Group${gid++}`;

  const deleteNode = useCallback(() => {
    setNodes((nodes) => nodes.filter((node) => node.id !== id));
    setEdges((edges) => edges.filter((edge) => edge.source !== id && edge.target !== id)); // Filter out edges related to the deleted node
   
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
  

  const grpNew = useCallback(() =>{
    let newNode;
    let gid = createGId(); // Group id
    const GroupNodes = nodes.filter((node) => node.type === "group");
    do{
      gid = getGId();
    }while(GroupNodes.some((node) => node.id === gid));

    //setGrps((prevGrps) => [...prevGrps, gid]);
    setGrps((grps) => grps.concat(gid));
    console.log(grps);

    newNode = {
      id: gid,
      data: { label: `${gid}`},
      ariaLabel:'Grp',
      position: node.position,
      style: {
        width: 270,
        height: 240,
      },
      type: 'group',
      className: 'light',
      draggable: true,
      isHidden: false,
    }
    
    const childNodePosition = {
      x: node.position.x - newNode.position.x,
      y: node.position.y - newNode.position.y,
    };

    const updatedNode = {
      ...node,
      parentNode: newNode.id,
      extent: 'parent',
      position: childNodePosition,
      draggable: true,
      isHidden: false,
      zIndex:1
    };
    deleteNode(); // Deletion for 
    setNodes((prevNodes) => [...prevNodes, newNode, updatedNode]);
    console.log(nodes);
    
  }, [node, nodes, setNodes]);

  
  
  return (
    <div
      style={{ top, left, right, bottom}}
      className="context-menu"
      {...props}
    >
     
      <button onClick={deleteNode}>delete</button>
      <button onClick={grpNew}>Add to new group</button>
      {/* <button onClick={grpEx}>Add to existing group</button>
       */}
    </div>
  );
}