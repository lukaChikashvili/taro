import React, { useEffect, useState } from 'react'

const SpotLight = () => {
    const [mousePosition, setMousePosition] = useState({x: 0, y: 0});

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({
                x: e.clientX,
                y: e.clientY
            })
        }

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
          };
    }, []);

  return (
    <div className="">
    <div
        className="absolute rounded-full  opacity-20 pointer-events-none transition-all duration-1000 ease-out"
        style={{
          left: `${mousePosition.x - 100}px`,  
          top: `${mousePosition.y - 100}px`,   
          width: '200px',                      
          height: '200px',                     
        }}
      ></div>
    </div>
  )
}

export default SpotLight
