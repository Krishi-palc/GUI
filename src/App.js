import React, { useState, useRef, useCallback } from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
} from "reactflow";
import { Panel } from "reactflow";
import 'bootstrap/dist/css/bootstrap.min.css';
import "reactflow/dist/style.css";
import Sidebar from "./Sidebar";
import "./index.css";
import "./panel.css";
import Modal from "./Model";
import ContextMenu from "./ContextMenu";

// import CustomNode from './CustomNode';

let fid = 1002; // Filter id
const getFId = () => `${fid++}`;

const panOnDrag = [2, 2];

// const nodeTypes = {
//   custom: CustomNode,
// };

const DnDFlow = () => {
  
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [showModal, setshowModal] = useState(false);
  const [menu, setMenu] = useState(null);
  const ref = useRef(null);
 
  // On Connect
  const onConnect = useCallback(
    (params,) => {

      console.log(params);

      // console.log(edges);
      // console.log(nodes);

      const e1 = edges.filter((edge) => edge.source === params.source || edge.target === params.source);
      const e2 = edges.filter((edge) => edge.source === params.target || edge.target === params.target);
      console.log(e1);
      console.log(e2);
      setEdges((eds) => addEdge(params, eds));
      
    },
    [setEdges, edges, nodes]
    );

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
      const id = event.dataTransfer.getData("id");
      const name = event.dataTransfer.getData("name");

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
      if(position.x <= 490){
        sourcePos = "right";
        type2 = "input";
      }
      else{
        targetPos = "left";
        type2 = "output";
      }

      const newNode = {
        id: id,
        type,
        position,
        sourcePosition: sourcePos,
        targetPosition: targetPos,
        data: { label: `${name}`},
        type: type2
      };

      setNodes((nds) => nds.concat(newNode));

      // Update the ethernet is used
      fetch(`http://localhost:8080/Ethernet`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({id: `${id}`,name : `${name}`,usage : "yes"}),
      }).then((response) => {
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
    },
    [reactFlowInstance, nodes, setNodes]
  );

  // Menu
  const onPaneClick = useCallback(() => setMenu(null), [setMenu]);

  const onNodeContextMenu = useCallback(
    (e, node) => {
      // Prevent native context menu from showing
      e.preventDefault();
      
      setMenu({
        id: node.id,
        name: node.data.label,
        top: e.clientY,
        left: e.clientX,
        right: false,
        bottom: false
      });
    },
    [setMenu]
  );

  // onclick the filter 
  const onclick = useCallback((event) => {
    const ID1 = getFId();
    const pos = 50 * (ID1 % 1000);
    const newnode = {
      id: ID1,
      position:{ x:490, y: pos},
      sourcePosition: 'right',
      targetPosition: 'left',
      data: { label: `Filter ${ID1 % 1000}` },
      type1: "filter"
    };

    setNodes((nds) => nds.concat(newnode));
    console.log(edges);
  }, []);

  // Click the filter node
  const onNodeClick = (event, node) => {
    if (node.type1 === "filter") {
      // Check the connection 
      const connectedEdges = edges.filter((edge) => edge.source === node.id || edge.target === node.id);
      const hasLeftConnection = connectedEdges.some((edge) => edge.target === node.id);
      const hasRightConnection = connectedEdges.some((edge) => edge.source === node.id);
  
      if (hasLeftConnection && hasRightConnection) {
        setshowModal(true);
      }
    }
  };
  
  return (
    <div className="dndflow">
      <Sidebar />
      <ReactFlowProvider>
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>

           { showModal && (
          <Modal close={setshowModal}/>
          )}

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
            // nodeTypes={nodeTypes}  
          >
            <Panel position="top-left" style={{ border: '10px solid black',backgroundColor:'black',color:'white',width:'120px',marginLeft:'55px',textAlign:'center',fontWeight:'bold'}}>Network Port</Panel>
            <Panel position="top-right" style={{ border: '10px solid black',backgroundColor:'black',color:'white',width:'120px',marginRight:'55px',textAlign:'center',fontWeight:'bold'}} >Tool Port</Panel>
            <Panel position="center" style={{ border: '10px solid black',backgroundColor:'black',color:'white',width:'120px',justifyContent:'center',textAlign:'center',fontWeight:'bold'}} >
              Filter  <img src="plus.png" alt="no image" style={{height:'20px',width:'20px',marginLeft:'10px'}} onClick={onclick}></img></Panel>
              
          </ReactFlow>
        </div>
        {menu && <ContextMenu onClick={onPaneClick} {...menu} />}
      </ReactFlowProvider>
    </div>
  );
};

export default DnDFlow;
