import React, {useEffect, useState, useRef, Suspense, lazy} from 'react';

import state from './components/State';


//import Earth3dScene from './components/Earth3dScene';
//import Venus3dScene from './components/Venus3dScene';
// import Mercury3dScene from './components/Mercury3dScene';
// import SpaceShipScene from './components/SpaceshipScene';
// import UfoScene from './components/UfoScene';
// import ContactForm from './components/ContactForm';

import {makeStyles} from '@material-ui/core/styles';


import {Canvas} from "@react-three/fiber";
import { useProgress } from '@react-three/drei';
import { a, useTransition } from 'react-spring'

const Earth3dScene = lazy(()=> import('./components/Earth3dScene'));
const Venus3dScene = lazy(()=> import('./components/Venus3dScene'));
const Mercury3dScene = lazy(()=> import('./components/Mercury3dScene'));
const SpaceshipScene = lazy(()=> import('./components/SpaceshipScene'));
const UfoScene = lazy(()=> import('./components/UfoScene'));
const ContactForm = lazy(()=> import('./components/ContactForm'));


const useStyles = makeStyles((theme) => ({
  canvasContainer:
  {
    width: "100%",
    height: "100%",
    //The overflow, position and margin were neede to fix the screen on mobile
    overflow:"hidden",
    position: "fixed",
    margin: 0,
    

  },
  domContentDiv:
  {
    position:"sticky",
    
    top: 0,
    
  },
  pageHeight: 
  {
    height: `${state.pages * 100}vh`,
    width: '100%'
  },
  exampleWrapper: 
  {
    position: 'relative',
    marginTop: theme.spacing(3),
    height: 900,
  },
  speedDial: 
  {
    position: 'absolute',
      bottom: theme.spacing(2),
    
      left: theme.spacing(2),
    
  },
  loading:
  {
    position: 'absolute',
    top: '0px',
    left: '0px',
    width: '100%',
    height: '100%',
    backgroundColor: '#171717',
    display:'flex',
    justifyItems: "center",
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000
  },
  loadingBar:
  {
    height: '32px',
    backgroundColor: '#0276FD'
  },
  loadingBarContainer: 
  {
    width: '100px',
    height: '32px',
    backgroundColor: '#272727'
  }
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
function Loader() {

  const { active, progress } = useProgress();
  const transition = useTransition(active, {
    from: { opacity: 1, progress: 0 },
    leave: { opacity: 0 },
    update: { progress },
  });
  return transition(
    ({ progress, opacity }, active) =>
      active && (
        <a.div className={classes.loading} style={{ opacity }}>
          <div className={classes.loadingBarContainer}>
            <a.div className={classes.loadingBar} style={{ width: progress }}></a.div>
          </div>
        </a.div>
      )
  );
}
  return (
    <div className={classes.canvasContainer}>
      <Canvas concurrent>      
        <Suspense fallback={null}>   
          <Earth3dScene domContent={domContent}/>
          <Venus3dScene domContent={domContent}/>       
          <Mercury3dScene domContent={domContent}/>
          <ContactForm domContent={domContent}/> 
          <SpaceshipScene domContent={domContent}/>
          <UfoScene/>
        </Suspense>
      </Canvas>
      <Loader/>  
      <div 
        style=
          {
            {
              position: "absolute",
              top: 0,
              left: 0,
              width: /* `${208}vh` */dimensions.width,
              height: /* `${100}vh` */ dimensions.height,
              overflow: "auto",
              
            }
          } 
        /* className={classes.scrollArea}  */
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
