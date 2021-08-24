import React, {useEffect, useState, useRef, Suspense} from 'react';

import state from './components/State';

import Earth3dScene from './components/Earth3dScene';
import Venus3dScene from './components/Venus3dScene';
import Mercury3dScene from './components/Mercury3dScene';
import SpaceShipScene from './components/SpaceshipScene';
import UfoScene from './components/UfoScene';
import ContactForm from './components/ContactForm';

import {makeStyles} from '@material-ui/core/styles';


import {Canvas} from "@react-three/fiber";
//import { Html,useProgress } from '@react-three/drei';

const useStyles = makeStyles((theme) => ({
  canvasContainer:
  {
    width: "100%",
    height: "600px"
  },
  domContentDiv:
  {
    position:"sticky",
    top: 0
  },
  pageHeight: 
  {
    height: `${state.pages * 100}vh`,
    width: 'auto'
  },
  exampleWrapper: {
    position: 'relative',
    marginTop: theme.spacing(3),
    height: 900,
  },
  speedDial: {
    position: 'absolute',
      bottom: theme.spacing(2),
    
      left: theme.spacing(2),
    
  },
}))



function App() {
  const classes = useStyles();

  const domContent = useRef();
  const scrollArea = useRef();
  const handleScroll = (e) =>(state.top.current = e.target.scrollTop)

 const [dimensions, setDimensions] = useState({ 
    height: window.innerHeight,
    width: window.innerWidth
  })

  useEffect(()=> void handleScroll({target: scrollArea.current}), [])
  useEffect(() => 
  {
    
    function handleResize()
    {
      setDimensions({
        height: window.outerHeight,
        width: window.outerWidth
      })
    
    }
    
      window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
    
  }, /* [dimensions.height, dimensions.width] */)
  
/*   function Loader() {
  const { active, progress, errors, item, loaded, total } = useProgress()
  return <Html center>{progress} % loaded</Html> 
}*/

  return (
    <div className={classes.canvasContainer}>
      <Canvas concurrent>      
        <Suspense fallback={null}>   
          <Earth3dScene domContent={domContent}/>
          <Venus3dScene domContent={domContent}/>       
          <Mercury3dScene domContent={domContent}/>
          <ContactForm domContent={domContent}/> 
          <SpaceShipScene domContent={domContent}/>
          <UfoScene/>
        </Suspense>
      </Canvas>  
      <div 
        style=
          {
            {
              position: "absolute",
              top: 0,
              left: 0,
              width: /* `${208}vh` */dimensions.width,
              height: /* `${100}vh` */ dimensions.height,
              overflow: "auto"
            }
          } 
        className={classes.scrollArea} 
        ref={scrollArea} 
        onScroll={handleScroll}
          >
            
          <div className={classes.domContentDiv} ref={domContent}/>
            <div 
              /* style={{height: `${state.pages * dimensions.height}`}} */
              className={classes.pageHeight} 
            />
      

        </div> 
        
    </div>
  );
}

export default App;
