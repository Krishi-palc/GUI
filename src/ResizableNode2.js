import { memo } from 'react';
import { Handle, Position, NodeResizer } from 'reactflow';

const ResizableNodeSelected2= ({ data}) => {
  return (
    <>
      <NodeResizer minWidth={100} minHeight={200} color='black' />

      {/* <Handle type="target" position={Position.Left} /> */}
      {/* <div style={{ padding: 10 }}>{data.label}</div> */}
      <Handle type="source" position={Position.Right} />
    </>
  );
};
export default memo(ResizableNodeSelected2);