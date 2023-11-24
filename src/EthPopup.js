import { useState , useEffect } from 'react';
import url1 from './url1';

import './EthPopup.css';

function EthPopup(props) {

  const [adminStatus, setadminStatus] = useState("");
  const [alias, setalias] = useState("");
  const [autoNegotiate, setautoNegotiate] = useState("");
  const [breakoutMode, setbreakoutMode] = useState("");
  const [description, setdescription] = useState("");
  const [fec, setfec] = useState("");
  const [inBroadcastPkts, setinBroadcastPkts] = useState("");
  const [inDiscards, setinDiscards] = useState("");
  const [inErrors, setinErrors] = useState("");
  const [inMulticastPkts, setinMulticastPkts] = useState("");
  const [inOctets, setinOctets] = useState("");
  const [inUnicastPkts, setinUnicastPkts] = useState("");
  const [inUnknownProtos, setinUnknownProtos] = useState("");
  const [interfaceType, setinterfaceType] = useState("");
  const [lagValue, setlagValue] = useState("");
  const [lanes, setlanes] = useState("");
  const [mtu, setmtu] = useState("");
  const [name, setname] = useState("");
  const [operationStatus, setoperationStatus] = useState("");
  const [outBroadcastPkts, setoutBroadcastPkts] = useState("");
  const [outDiscards, setoutDiscards] = useState("");
  const [outErrors, setoutErrors] = useState("");
  const [outMulticastPkts, setoutMulticastPkts] = useState("");
  const [outOctets, setoutOctets] = useState("");
  const [outUnicastPkts, setoutUnicastPkts] = useState("");
  const [sourcePortLabel, setsourcePortLabel] = useState("");
  const [speed, setspeed] = useState("");
  const [id, setid] = useState("");

  const fetchData = async () => {
    try {
      const url = `${url1}/Ethernet/${props.nodeId}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const responseData = await response.json();

      setid(responseData.id);
    setadminStatus(responseData.adminStatus);
    setalias(responseData.alias);
    setautoNegotiate(responseData.autoNegotiate);
    setbreakoutMode(responseData.breakoutMode);
    setdescription(responseData.description);
    setfec(responseData.fec);
    setinBroadcastPkts(responseData.inBroadcastPkts);
    setinDiscards(responseData.inDiscards);
    setinErrors(responseData.inErrors);
    setinMulticastPkts(responseData.inMulticastPkts);
    setinOctets(responseData.inOctets);
    setinUnicastPkts(responseData.inUnicastPkts);
    setinUnknownProtos(responseData.inUnknownProtos);
    setinterfaceType(responseData.interfaceType);
    setlagValue(responseData.lagValue);
    setlanes(responseData.lanes);
    setmtu(responseData.mtu);
    setname(responseData.name);
    setoperationStatus(responseData.operationStatus);
    setoutBroadcastPkts(responseData.outBroadcastPkts);
    setoutDiscards(responseData.outDiscards);
    setoutErrors(responseData.outErrors);
    setoutMulticastPkts(responseData.outMulticastPkts);
    setoutOctets(responseData.outOctets);
    setoutUnicastPkts(responseData.outUnicastPkts);
    setsourcePortLabel(responseData.sourcePortLabel);
    setspeed(responseData.speed);

    } 
    catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  });

  const handleChange = (event) => {
    setTextarea(event.target.value)
  }

  return (
    <>
    <form>
      <table>
      <tbody>
        <tr className='b1'>
          <td>
            <label>Id</label> 
          </td>
          <td>
            <label>Name</label> 
          </td>
          <td>
            <label>Admin Status</label> 
          </td>
          <td>
            <label>Alias</label> 
          </td>
        </tr>
        <tr>
          <td className='b2'>
            <input
              className="form-control"
              type="text" 
              value={id}
              onChange={(e) => setid(e.target.value)}
            />
          </td>
          <td className='b2'>
            <input
              className="form-control"
              type="text" 
              value={name}
              onChange={(e) => setname(e.target.value)}
            />
          </td>
          <td className='b2'>
            <input
              className="form-control"
              type="text" 
              value={adminStatus}
              onChange={(e) => setadminStatus(e.target.value)}
            />
          </td>
          <td className='b1'>
            <input
              className="form-control"
              type="text" 
              value={alias}
              onChange={(e) => setalias(e.target.value)}
            />
          </td>
        </tr>
        <tr className='b1'>
          <td>
            <label>Auto Negotiate</label> 
          </td>
          <td>
            <label>Breakout Mode</label> 
          </td>
          <td>
            <label>Description</label> 
          </td>
          <td>
            <label>Fec</label> 
          </td>
        </tr>
        <tr>
          <td className='b2'>
            <input
              className="form-control"
              type="text" 
              value={autoNegotiate}
              onChange={(e) => setautoNegotiate(e.target.value)}
            />
          </td>
          <td className='b2'>
            <input
              className="form-control"
              type="text" 
              value={breakoutMode}
              onChange={(e) => setbreakoutMode(e.target.value)}
            />
          </td>
          <td className='b2'>
            <input
              className="form-control"
              type="text" 
              value={description}
              onChange={(e) => setdescription(e.target.value)}
            />
          </td>
          <td className='b2'>
            <input
              className="form-control"
              type="text" 
              value={fec}
              onChange={(e) => setfec(e.target.value)}
            />
          </td>
        </tr>
        <tr className='b1'>
          <td>
            <label>In Broadcast Pkts</label> 
          </td>
          <td>
            <label>In Discards</label> 
          </td>
          <td>
            <label>In Errors</label> 
          </td>
          <td>
            <label>In Multicast Pkts</label> 
          </td>
        </tr>
        <tr>
          <td className='b2'>
            <input
              className="form-control"
              type="text" 
              value={inBroadcastPkts}
              onChange={(e) => setinBroadcastPkts(e.target.value)}
            />
          </td>
          <td className='b2'>
            <input
              className="form-control"
              type="text" 
              value={inDiscards}
              onChange={(e) => setinDiscards(e.target.value)}
            />
          </td>
          <td className='b2'>
            <input
              className="form-control"
              type="text" 
              value={inErrors}
              onChange={(e) => setinErrors(e.target.value)}
            />
          </td>
          <td className='b2'>
            <input
              className="form-control"
              type="text" 
              value={inMulticastPkts}
              onChange={(e) => setinMulticastPkts(e.target.value)}
            />
          </td>
        </tr>
        <tr className='b1'>
          <td>
            <label>In Octets</label> 
          </td>
          <td>
            <label>In Unicast Pkts</label> 
          </td>
          <td>
            <label>In Unknown Protos</label> 
          </td>
          <td>
            <label>Interface Type</label> 
          </td>
        </tr>
        <tr>
          <td className='b2'>
            <input
              className="form-control"
              type="text" 
              value={inOctets}
              onChange={(e) => setinOctets(e.target.value)}
            />
          </td>
          <td className='b2'>
            <input
              className="form-control"
              type="text" 
              value={inUnicastPkts}
              onChange={(e) => setinUnicastPkts(e.target.value)}
            />
          </td>
          <td className='b2'>
            <input
              className="form-control"
              type="text" 
              value={inUnknownProtos}
              onChange={(e) => setinUnknownProtos(e.target.value)}
            />
          </td>
          <td className='b2'>
            <input
              className="form-control"
              type="text" 
              value={interfaceType}
              onChange={(e) => setinterfaceType(e.target.value)}
            />
          </td>
        </tr>
        <tr className='b1'>
          <td>
            <label>Lag Value</label> 
          </td>
          <td>
            <label>Lanes</label> 
          </td>
          <td>
            <label>Mtu</label> 
          </td>
        </tr>
        <tr>
          <td className='b2'>
            <input
              className="form-control"
              type="text" 
              value={lagValue}
              onChange={(e) => setlagValue(e.target.value)}
            />
          </td>
          <td className='b2'>
            <input
              className="form-control"
              type="text" 
              value={lanes}
              onChange={(e) => setlanes(e.target.value)}
            />
          </td>
          <td className='b2'>
            <input
              className="form-control"
              type="text" 
              value={mtu}
              onChange={(e) => setmtu(e.target.value)}
            />
          </td>
        </tr>
        <tr className='b1'>
          <td>
            <label>Operation Status</label> 
          </td>
        <td>
            <label>Out Broadcast Pkts</label> 
          </td>
          <td>
            <label>Out Discards</label> 
          </td>
        </tr>
        <tr>
          <td className='b2'>
            <input
              className="form-control"
              type="text" 
              value={operationStatus}
              onChange={(e) => setoperationStatus(e.target.value)}
            />
          </td>
          <td className='b2'>
            <input
              className="form-control"
              type="text" 
              value={outBroadcastPkts}
              onChange={(e) => setoutBroadcastPkts(e.target.value)}
            />
          </td>
          <td className='b2'>
            <input
              className="form-control"
              type="text" 
              value={outDiscards}
              onChange={(e) => setoutDiscards(e.target.value)}
            />
          </td>
        </tr>
        <tr className='b1'>
          <td>
            <label>Out Errors</label> 
          </td>
          <td>
            <label>Out Multicast Pkts</label> 
          </td>
          <td>
            <label>Out Octets</label> 
          </td>
        </tr>
        <tr>
          <td className='b2'>
            <input
              className="form-control"
              type="text" 
              value={outErrors}
              onChange={(e) => setoutErrors(e.target.value)}
            />
          </td>
          <td className='b2'>
            <input
              className="form-control"
              type="text" 
              value={outMulticastPkts}
              onChange={(e) => setoutMulticastPkts(e.target.value)}
            />
          </td>
          <td className='b2'>
            <input
              className="form-control"
              type="text" 
              value={outOctets}
              onChange={(e) => setoutOctets(e.target.value)}
            />
          </td>
        </tr>
        <tr className='b1'>
          <td>
            <label>Out Unicast Pkts</label> 
          </td>
          <td>
            <label>Source Port Label</label> 
          </td>
          <td>
            <label>Speed</label> 
          </td>
        </tr>
        <tr>
          <td className='b2'>
            <input
              className="form-control"
              type="text" 
              value={outUnicastPkts}
              onChange={(e) => setoutUnicastPkts(e.target.value)}
            />
          </td>
          <td className='b2'>
            <input
              className="form-control"
              type="text" 
              value={sourcePortLabel}
              onChange={(e) => setsourcePortLabel(e.target.value)}
            />
          </td>
          <td className='b2'>
            <input
              className="form-control"
              type="text" 
              value={speed}
              onChange={(e) => setspeed(e.target.value)}
            />
          </td>
        </tr>
      </tbody>
      </table>
    </form>
   </>
  );
}
export default EthPopup;