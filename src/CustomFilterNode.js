import React, { memo } from 'react';
import { Handle } from 'reactflow';

function CustomFilterNode({ data }) {
  return (
    <div style={{ background: 'white', color: 'black', border: '2px solid #392613',borderRadius:'5px'}}>
      <div style={{  textAlign: 'center', paddingRight: '10px',fontFamily:'cursive'}}>
        {data.image && (
          <img src={data.image} alt="custom" style={{ width: '90px', height: '40px',paddingLeft:'15px'}} />
        )}
        {data.name}
      </div>
      <Handle type="target" position="left" />
      <Handle type="source" position="right" />
    </div>
  );
}

export default memo(CustomFilterNode);