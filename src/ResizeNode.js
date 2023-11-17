import { memo } from 'react';
import { Handle, Position, NodeResizer } from 'reactflow';
import "./index.css";

const ResizableNode = (node) => {
    console.log(node);
    // if(node.targetPosition === "left"){
    //     return (
    //         <div className='dndflow'>
    //           <NodeResizer color="#ff0071" isVisible={node.selected} minWidth={100} minHeight={30} />
    //           <Handle type="target" position={node.targetPosition} />
    //           <div style={{ padding: 10 }}>{node.data.label}</div>
    //         </div>
    //       );
    // }
    // if(node.sourcePosition === "right"){
    //     return (
    //         <div className='dndflow'>
    //           <NodeResizer color="#ff0071" isVisible={node.selected} minWidth={100} minHeight={30} />
    //           <div style={{ padding: 10 }}>{node.data.label}</div>
    //           <Handle type="source" position={node.sourcePosition} />
    //         </div>
    //       );
    // }

    return (
        <div>
          <NodeResizer color="#ff0071" minWidth={100} minHeight={100}/>
          <div style={{ padding: 100 }}></div>
        </div>
      );
    
  
};

export default memo(ResizableNode);
