import React, { useState, useRef, useCallback,useEffect  } from "react";
import ReactFlow, { ReactFlowProvider, addEdge, useNodesState, useEdgesState, Controls, Panel} from "reactflow";
import 'bootstrap/dist/css/bootstrap.min.css';
import "reactflow/dist/style.css";
import Sidebar from "./Sidebar";
import "./index.css";
import "./panel.css";
import Modal from "./Model";
import ContextMenu from "./ContextMenu";
import url1 from "./url1";
import dagre from "dagre";
import "./app.css";
import LoadingPage from "./LoadingPage";
import ResizableNodeSelected from "./ResizableNode";
import EthModal from "./EthModal";

let fid = 1; // Filter id
const getFId = () => `${fid++}`;

let gid = 1; // Filter id
const getGId = () => `Group${gid++}`;

const createEid = (id) => `${id*1000}`;
const getEid = (id) => `${++id}`;

const nodeTypes = {
  ResizableNodeSelected
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
  const [showEthModal, setshowEthModal] = useState(false);
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
      console.log(params);
      const sourceNode = nodes.filter((node) => node.id === params.source);
      console.log(sourceNode);
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

        let newNode;

        let sourcePos = null;
        let targetPos = null;
        let type2 = null;

        // check if the dropped element is valid
        if (typeof type === "undefined" || !type) {
            return;
        }
        
        const position = reactFlowInstance.project({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top
        });
      
        if (position.x <= 490) {
            sourcePos = "right";
            type2 = "input";
        } else {
            targetPos = "left";
            type2 = "output";
        }

        if (type==="group"){
            do{
              id = getGId();
            }while(nodes.some((node) => node.id === id));
            console.log(id);
            newNode = {
              id: id,
              position,
              sourcePosition: sourcePos,
              targetPosition: targetPos,
              data: { label: `${name}` },
              type:"ResizableNodeSelected",
              type1: "normal",
              draggable: true,
          };
        }
        else{

          //Create the id for all node Ethernet
        id = createEid(id);
        while(nodes.some((node) => node.id === id)){
          id = getEid(id);
          console.log(id);
        }
            // Handler Position on nodes based on the PORT (Network | Tool)
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

    },
    [reactFlowInstance, nodes, setNodes]
  );

  // Menu
  const onPaneClick = useCallback(() => setMenu(null), [setMenu]);

  const onNodeContextMenu = useCallback(
    (e, node) => {
      // Prevent native context menu from showing
      e.preventDefault();
      console.log(e);
      console.log(node);
      
      setMenu({
        id: node.id,
        name: node.data.label,
        type1: node.type1,
        top: e.clientY,
        left: e.clientX,
        right: false,
        bottom: false,
        draggable: false
      });
    },
    [setMenu]
  );


  // onclick the filter 
  const onclick = useCallback((event) => {
    let ID1 = getFId();
    while(nodes.some((node) => node.id === ID1)){
      ID1 = getFId();
    }

    const pos = 60 * (ID1);
    const newnode = {
      id: ID1,
      position: { x: 490, y: pos },
      sourcePosition: 'right',
      targetPosition: 'left',
      data: { label: `${ID1}` },
      type1: "filter",
      type: "default",
      // draggable: false
    };
    setNodes((nds) => nds.concat(newnode));
  }, [nodes]);

  // Click the filter node
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
        onLayout('LR'); 
        // Insert the Map
        const target1 = connectedEdges.filter((edge) => edge.source === node.id);
        const source1 = connectedEdges.filter((edge) => edge.target === node.id);
      } 
    }
    else{
      setshowEthModal(true);
    }
  };

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

  // OnConnect Left Right Layout is there
  useEffect(() => {
    if (connectionMade) {
      onLayout('LR');
      setConnectionMade(false);
    }
  }, [connectionMade, onLayout]);

  return (
    <div className="dndflow">
      <Sidebar />
      <ReactFlowProvider>
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>

        { showModal && (
          <Modal close={setshowModal} nodeId={nodeId}/>
          )
        }
        { showEthModal && (
          <EthModal close={setshowEthModal} nodeId={nodeId}/>
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
            zoomOnScroll={false}
            nodeTypes={nodeTypes}
            panOnScroll
            minZoom={1}
            maxZoom={1}
          >
            <Controls/>
            <Panel position="top-left" className='z1'>Network Port</Panel>
            <Panel position="top-right" className='z1'>Tool Port</Panel>
            <Panel position="center" id='z2' onClick={onclick} >Filter <img src="plus.png" alt="Mapping"></img></Panel>
           <LoadingPage/>
          </ReactFlow>
        </div>
        {menu && <ContextMenu onClick={onPaneClick} {...menu} />}
      </ReactFlowProvider>
         
    </div>
  );
};

export default DnDFlow;