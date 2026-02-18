import React, { useRef, useEffect } from 'react';
import Globe from 'react-globe.gl';

const LiveGlobe = () => {
  const globeRef = useRef();

  useEffect(() => {
    if (globeRef.current) {
      globeRef.current.controls().autoRotate = true;
      globeRef.current.controls().autoRotateSpeed = 1.5;
    }
  }, []);

  return (
    <div className="w-60 h-60 sm:w-100 sm:h-100 rounded-full shadow-lg mb-25 sm:mb-0 sm:mr-8 flex-shrink-0">
      <Globe
        ref={globeRef}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        backgroundColor="rgba(0,0,0,0)"
        width={400}
        height={400}
      />
    </div>
  );
};

export default LiveGlobe;
