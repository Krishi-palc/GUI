import { memo } from 'react';
import { Handle, Position, NodeResizer } from 'reactflow';

const ResizableNodeOutputSelected = ({ data}) => {
    return (
        <>
          <NodeResizer minWidth={100} minHeight={200} color='black' />
          <Handle type="target" position={Position.Left} />
         
        </>
      );
    };

export default memo(ResizableNodeOutputSelected);
