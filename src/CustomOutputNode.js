import React, { memo } from 'react';
import { Handle} from 'reactflow';
import "./customoutput.css";
function CustomInputNode({ data }) {
    return (
        <div id="a1">
            <div id="a2">
                {data.image && (
                  <img src={data.image} alt="custom" />
                )}
                {data.name}
             </div>
             <Handle type="target" position="left" />
        </div>
      );
    }

export default memo(CustomInputNode);



       