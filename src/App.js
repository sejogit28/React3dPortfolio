import React, {useEffect, useState, useRef, Suspense} from 'react';

import state from './components/State';

import Earth3dScene from './components/Earth3dScene';
import Venus3dScene from './components/Venus3dScene';
import Mercury3dScene from './components/Mercury3dScene';
import SpaceShipScene from './components/SpaceshipScene';
import UfoScene from './components/UfoScene';


import {makeStyles} from '@material-ui/core/styles';
//import { SpeedDial, SpeedDialIcon, SpeedDialAction} from '@material-ui/lab';

/* //Speed Dial Icons
import FileCopyIcon from '@material-ui/icons/FileCopyOutlined';
import SaveIcon from '@material-ui/icons/Save';
import PrintIcon from '@material-ui/icons/Print';
import ShareIcon from '@material-ui/icons/Share';
import FavoriteIcon from '@material-ui/icons/Favorite'; */

import {Canvas} from "@react-three/fiber";


const useStyles = makeStyles((theme) => ({
  canvasContainer:
  {
    width: "100%",
    height: "100%"
  },
  domContentDiv:
  {
    position: "sticky",
    top: 0
  },
  pageHeight: 
  {
    height: `${state.pages * 100}vh`
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

/* const actions = [
  { icon: <FileCopyIcon />, name: 'Copy' },
  { icon: <SaveIcon />, name: 'Save' },
  { icon: <PrintIcon />, name: 'Print' },
  { icon: <ShareIcon />, name: 'Share' },
  { icon: <FavoriteIcon />, name: 'Like' },
]; */

function App() {
  const classes = useStyles();
/*     const [open, setOpen] = useState(false);
    const [hidden, setHidden] = useState(false); */

   /*  const handleHiddenChange = (event) => {
        setHidden(event.target.checked);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    }; */


  //let timerID = useRef(null);
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
        height: window.innerHeight,
        width: window.innerWidth
      })
    
    }
    
      window.addEventListener('resize', handleResize)
    
    
  }, [])
  
  return (
    <div className={classes.canvasContainer}>
      <Canvas concurrent>      
        <Suspense fallback={null}>   
          <Earth3dScene domContent={domContent}/>
          <Venus3dScene domContent={domContent}/>       
          <Mercury3dScene domContent={domContent}/>
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
              style={{height: `${state.pages * dimensions.height}`}}
              className={classes.pageHeight} 
            />
      

        </div> 
        
    </div>
  );
}

export default App;
