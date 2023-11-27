import React, { useEffect, useState } from 'react';
import { Oval} from  'react-loader-spinner'
const LoadingPage = () => {
  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, 1000);
 
    return () => {
      // Clear the timeout to avoid memory leaks
      clearTimeout(timeoutId);
    };
  }, []); // Empty dependency array means the effect runs once on mount
 
  return (
    <div>
    {loading ? (
      <div id="yourDiv" className="loading-screen" >
        
         <Oval height={500}
                width={80}
                color="#4d3319"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel='oval-loading'
                secondaryColor="gray"
                strokeWidth={2}
                strokeWidthSecondary={2}/> 
                
      </div>
      ) : (
        // Redirect or transition to the main content
        <div>
         
        </div>
      )}
    </div>
  );
};
 
export default LoadingPage;