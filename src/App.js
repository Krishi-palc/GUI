import React, { useState, useRef, useCallback,useEffect } from "react";
import ReactFlow, { ReactFlowProvider, addEdge, useNodesState, useEdgesState, Controls, Panel } from "reactflow";
import 'bootstrap/dist/css/bootstrap.min.css';
import "reactflow/dist/style.css";
import Sidebar from "./Sidebar";
import "./index.css";
import "./panel.css";
import Modal from "./Model";
import ContextMenu from "./ContextMenu";
import url1 from "./url1";
import dagre from "dagre";
import LoadingPage from './Loading';
import "./app.css";

import ResizeNode from "./ResizeNode";

let fid = 1; // Filter id
const getFId = () => `${fid++}`;

const createEid = (id) => `${id*1000}`;
const getEid = (id) => `${++id}`;

let gid = 2000; // Group id
const getGId = () => `${gid++}`;

const nodeTypes = {
  ResizeNode
}

const panOnDrag = [2, 2];

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));
 
const nodeWidth = 390;
const nodeHeight = 10;
 
// For Dagre Tree Layout
const getLayoutedElements = (nodes, edges, direction = "TB") => {
  const isHorizontal = direction === "LR";
  dagreGraph.setGraph({ rankdir: direction });
 
  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });
 
  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });
 
  dagre.layout(dagreGraph);
 
  nodes.forEach((node) => {
      const nodeWithPosition = dagreGraph.node(node.id);
      node.targetPosition = isHorizontal ? "left" : "top";
      node.sourcePosition = isHorizontal ? "right" : "bottom";
      node.position = {
          x: nodeWithPosition.x - nodeWidth / 2,
          y: nodeWithPosition.y - nodeHeight / 2
      };
      return node;
  });
 
  return { nodes, edges };
};


const DnDFlow = () => {
  
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [showModal, setshowModal] = useState(false);
  const [nodeId, setNodeId] = useState(0);
  const [menu, setMenu] = useState(null);
  const ref = useRef(null);
  const [connectionMade, setConnectionMade] = useState(false);


  // OnLayout
  const onLayout = useCallback(
    (direction) => {
        const { 
          nodes: layoutedNodes,
          edges: layoutedEdges
        } = getLayoutedElements(nodes, edges, direction);

        // Update the position of each node to start a few steps below its original position
        const yOffset = 90; // Adjust this value to set the desired vertical offset
        const xOffSet = 40;
        const adjustedNodes = layoutedNodes.map((node) => (
          {
              ...node,
             position: { x: node.position.x + xOffSet, y: node.position.y + yOffset }
          }
        ));
        
        setNodes([...adjustedNodes]);
        setEdges([...layoutedEdges]);
    },
    [nodes, edges]
);

  // On Connect
  const onConnect = useCallback(
    (params) => {
      const sourceNode = nodes.filter((node) => node.id === params.source);
      const targetNode = nodes.filter((node) => node.id === params.target);
      const hasSource = edges.some((edge) => edge.source === params.source);
      const hasTarget = edges.some((edge) => edge.target === params.target);
      
      if(sourceNode[0].type1 !== targetNode[0].type1){ // Same type nodes does not connect
          //if(!hasSource && !hasTarget){ // Node has old connection 
              setEdges((eds) => addEdge(
                {
                  ...params,
                  style: {
                    stroke: 'black'
                  }
                }, 
              eds))
          
              setConnectionMade(true);
      }
    },
    [edges,nodes,onLayout]
  );


// // On Connect
// const onConnect = useCallback(
//   (params) => {
//     const sourceNode = nodes.find((node) => node.id === params.source);
//     const targetNode = nodes.find((node) => node.id === params.target);

//     if (sourceNode && targetNode && sourceNode.type1 !== targetNode.type1) {
//       const existingConnections = edges.filter(
//         (edge) => edge.target === targetNode.id
//       );

//       const port =
//         existingConnections.length > 0
//           ? existingConnections[0].port
//           : targetNode.port; // Use the existing port or the initial port

//       setEdges((eds) =>
//         addEdge(
//           {
//             ...params,
//             style: {
//               stroke: 'black',
//             },
//             port, // Pass the port associated with the filter node
//           },
//           eds
//         )
//       );

//       // Update the leftConnections or rightConnections based on the side of the connection
//       if (params.targetPosition === 'left') {
//         setNodes((nds) =>
//           nds.map((node) =>
//             node.id === targetNode.id
//               ? { ...node, leftConnections: node.leftConnections + 1 }
//               : node
//           )
//         );
//       } else if (params.targetPosition === 'right') {
//         setNodes((nds) =>
//           nds.map((node) =>
//             node.id === targetNode.id
//               ? { ...node, rightConnections: node.rightConnections + 1 }
//               : node
//           )
//         );
//       }
//     }
//   },
//   [edges, nodes]
// );

useEffect(() => {
  if (connectionMade) {
    onLayout('LR');
    setConnectionMade(false);
  }
}, [connectionMade, onLayout]);

  // On Dragover 
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  // On Drop 
  const onDrop = useCallback(
    (event) => {
        event.preventDefault();
        const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
        const type = event.dataTransfer.getData("application/reactflow");
        let id = event.dataTransfer.getData("id");
        const name = event.dataTransfer.getData("name");

        id = createEid(id);
        while(nodes.some((node) => node.id === id)){
          id = getEid(id);
          console.log(id);
        }
        
        // check if the dropped element is valid
        if (typeof type === "undefined" || !type) {
            return;
        }

        const position = reactFlowInstance.project({
            x: event.clientX - reactFlowBounds.left,
            y: event.clientY - reactFlowBounds.top
        });

        // Handler Position on nodes based on the PORT (Network | Tool)
        let sourcePos = null;
        let targetPos = null;
        let type2 = null;
        if (position.x <= 490) {
            sourcePos = "right";
            type2 = "input";
        } else {
            targetPos = "left";
            type2 = "output";
        }
        let newNode = {};

        if(type === "group"){
          newNode = {
            id: getGId(),
            position,
            sourcePosition: sourcePos,
            targetPosition: targetPos,
            data: { label: `${name}` },
            type: "ResizeNode",
            type1: "normal",
                    
        };
        }
        else{
          newNode = {
            id: id,
            position,
            sourcePosition: sourcePos,
            targetPosition: targetPos,
            data: { label: `${name}` },
            type: type2,
            type1: "normal",
            draggable: false
        };
        }        

        setNodes((nds) => nds.concat(newNode));

        // // Update the ethernet is used
        // fetch(`${url1}/Ethernet`, {
        //         method: 'PUT',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify({
        //             id: `${id}`,
        //             name: `${name}`,
        //             usage: "yes"
        //         }),
        //     }).then((response) => {
        //         if (!response.ok) {
        //             throw new Error('Network response was not ok');
        //         }
        //         return response.json();
        //     })
        //     .then((data) => {
        //         console.log('Change Node usability : ', data);
        //     })
        //     .catch((error) => {
        //         console.error('Error:', error);
        //     });

        // Insert the node into db
        fetch(`${url1}/Node`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: newNode.id,
                    x: newNode.position.x,
                    y: newNode.position.y,
                    sourcePosition: newNode.sourcePosition,
                    targetPosition: newNode.targetPosition,
                    name: newNode.data.label,
                    type1: newNode.type1,
                    type: newNode.type
                }),
            })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                // console.log('Updated data:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    },
    [reactFlowInstance, nodes, setNodes]
  );

  // Menu
  const onPaneClick = useCallback(() => setMenu(null), [setMenu]);

  const onNodeContextMenu = useCallback(
    (e, node) => {
      // Prevent native context menu from showing
      e.preventDefault();
      
      //if (node.type1 === "filter") {
        setMenu({
          id: node.id,
          name: node.data.label,
          type1: node.type1,
          top: e.clientY,
          left: e.clientX,
          right: true,
          bottom: false,
          draggable: false,
        });
      },
    //},
    [setMenu]
  );

  // onclick the filter 
  const onclick = useCallback((event) => {
    const ID1 = getFId();
    const pos = 70 * ((ID1 % 1000)+1);
    const newnode = {
      id: ID1,
      position: { x: 490, y: pos },
      sourcePosition: 'right',
      targetPosition: 'left',
      //data: { label: `Filter ${ID1 % 1000}` },
      data: { label: `Filter ${ID1}` },
      type1: "filter",
      type: "default",
      draggable: false,
      // leftConnection,  // Initialize the left side connections count
      // rightConnections, // Initialize the right side connections count
      };

    //   setNodes((nds) => nds.concat(newnode));
    // }, []);

    // Insert the node
    fetch(`${url1}/Node`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          id: newnode.id,
          x: newnode.position.x,
          y: newnode.position.y,
          sourcePosition: newnode.sourcePosition,
          targetPosition: newnode.targetPosition,
          name: newnode.data.label,
          type1: newnode.type1,
          type: newnode.type
      }),
    })
    .then((response) => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.json();
    })
    .then((data) => {
          // console.log('Updated data:', data);
    })
    .catch((error) => {
          console.error('Error:', error);
    });

    setNodes((nds) => nds.concat(newnode));
  }, []);

  //Click the filter node
  const onNodeClick = (event, node) => {
    if (node.type1 === "filter") {
      // Check the connection 
      const connectedEdges = edges.filter((edge) => edge.source === node.id || edge.target === node.id);
      const hasLeftConnection = connectedEdges.some((edge) => edge.target === node.id);
      const hasRightConnection = connectedEdges.some((edge) => edge.source === node.id);
  
      if (hasLeftConnection && hasRightConnection) {
        setshowModal(true);
        // Set the node for model
        setNodeId(node.id);

        // Insert the Map
        const target1 = connectedEdges.filter((edge) => edge.source === node.id);
        const source1 = connectedEdges.filter((edge) => edge.target === node.id);

        fetch(`${url1}/Map`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id : node.id,
                source : source1[0].source,
                destination : target1[0].target,
                description : node.data.label
            }),
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
    }
  };

//  const onNodeClick = (event, node) => {
//   if (node.type1 === "filter") {
//     // Check the connection
//     const connectedEdges = edges.filter((edge) => edge.source === node.id || edge.target === node.id);

//     // Collect all connected node IDs
//     const connectedNodeIds = connectedEdges.reduce((acc, edge) => {
//       acc.push(edge.source, edge.target);
//       return acc;
//     }, []);

//     // Remove the filter node and all connected nodes
//     const newNodes = nodes.filter((n) => !connectedNodeIds.includes(n.id));

//     // Remove all connected edges
//     const newEdges = edges.filter((e) => !connectedEdges.includes(e));

//     // Delete the Map associated with the filter
//     fetch(`${url1}/Map/${node.id}`, {
//       method: 'DELETE',
//     })
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
//       return response.json();
//     })
//     .then((data) => {
//       console.log('Deleted Map data:', data);
//     })
//     .catch((error) => {
//       console.error('Error deleting Map:', error);
//     });

//     // Update the state to reflect the changes
//     setNodes(newNodes);
//     setEdges(newEdges);
//   }
// };

  
  
  //retain data even after refreshing
  useEffect(() => {
    // Load data from local storage on component mount
    const storedNodes = localStorage.getItem('flowchart-nodes');
    const storedEdges = localStorage.getItem('flowchart-edges');

    if (storedNodes && storedEdges) {
      setNodes(JSON.parse(storedNodes));
      setEdges(JSON.parse(storedEdges));
    }
  }, []);

  useEffect(() => {
    // Save data to local storage whenever nodes or edges change
    localStorage.setItem('flowchart-nodes', JSON.stringify(nodes));
    localStorage.setItem('flowchart-edges', JSON.stringify(edges));
  }, [nodes, edges]);
  


  return (
    <div className="dndflow">
      <Sidebar />
      
      <ReactFlowProvider>
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>

        { showModal && (
          <Modal close={setshowModal} nodeId={nodeId}/>
          )
        }

          <ReactFlow
            ref={ref}
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}      
            onNodeClick={onNodeClick}
            onPaneClick={onPaneClick}
            onNodeContextMenu={onNodeContextMenu}
            panOnDrag={panOnDrag}
            nodeTypes={nodeTypes}
            zoomOnScroll={false}
            panOnScroll
            minZoom={1}
            maxZoom={1}
          >
            
            <Panel position="top-left" className='z1'>Network Port</Panel>
            <Panel position="top-right" className='z1'>Tool Port</Panel>
            <Panel position="center" id='z2' onClick={onclick} >Filter <img src="plus.png" alt="Mapping"></img></Panel>
            <Panel position="bottom-right" className='z3' onClick={() => onLayout("LR")}>horizontal layout</Panel>
            <LoadingPage />
          </ReactFlow>
        </div>
        {menu && <ContextMenu onClick={onPaneClick} {...menu} />}
      </ReactFlowProvider>
    </div>
  );
};

export default DnDFlow;