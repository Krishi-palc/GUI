import React, { memo } from 'react';
import { Handle} from 'reactflow';
import "./CustomInput.css";

function CustomInputNode({ data }) {
    return (
          <div id='a1'>
            <div id='a2'>
                {data.image && (
                  <img src={data.image} alt="custom"/>
                )}
                {data.name}
            </div>
            <Handle type="source" position="right" />
        </div>
      );
    }

export default memo(CustomInputNode);
