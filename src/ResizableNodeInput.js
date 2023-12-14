import { memo } from 'react';
import { Handle, Position, NodeResizer } from 'reactflow';

const ResizableNodeInputSelected = ({ data}) => {
    return (
        <>
          <NodeResizer minWidth={100} minHeight={200} color='black' />
         
          <Handle type="source" position={Position.Right} />
        </>
      );
    };

export default memo(ResizableNodeInputSelected);
