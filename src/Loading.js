import React, { useEffect, useState } from 'react';
 
const LoadingPage = () => {
  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, 3000);
 
    return () => {
      // Clear the timeout to avoid memory leaks
      clearTimeout(timeoutId);
    };
  }, []); // Empty dependency array means the effect runs once on mount
 
  return (
    <div style={{opacity:'0.5',height:'100%'}} >
      {loading ? (
        <div >
          <h1 style={{textAlign:'center',marginTop:'300px'}}>Loading...</h1>
          {/* You can add a loading spinner or any other content here */}
        </div>
      ) : (
        // Redirect or transition to the main content
        <div>
            
          {/* Your main content goes here */}
        </div>
      )}
    </div>
  );
};
 
export default LoadingPage;