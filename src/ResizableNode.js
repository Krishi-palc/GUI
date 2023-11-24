import { memo } from 'react';
import { Handle, Position, NodeResizer } from 'reactflow';

const ResizableNodeSelected = ({ data}) => {
    return (
        <div>
          <NodeResizer minWidth={10} minHeight={10} /> 
          <div style={{ padding: 10 }}>{data.label}</div>
        </div>
      );
    };

export default memo(ResizableNodeSelected);
