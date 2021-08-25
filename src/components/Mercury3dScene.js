import React, {useRef} from 'react';

import 
{
    Grid, Typography, ImageList, ImageListItem, ImageListItemBar, Tooltip
} 
from '@material-ui/core';

import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';


import {makeStyles} from '@material-ui/core/styles';

import {useFrame, useLoader} from "@react-three/fiber";
import{/* OrbitControls, */ Html, Stars} from '@react-three/drei';
import {TextureLoader} from 'three';
//import * as THREE from 'three';

import {Section} from './Section';
import imageListData from './ImageListData';

import Mercury3dTexture from "../textures/8k_mercury.jpg";

const useStyles = makeStyles((theme) =>({
  
  whiteFont:
  {
    color: "#f6f3ea"
  },
  htmlContainer:
  {
    width: "80%",
    maxWidth:"80%",
    height: "80%",
    paddingLeft: "3em"
    /* justifyItems: "center" */
  },
   root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  imageList: {
    width: 500,
    height: 450,
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0) 100%)',
  }
}));

const Mercury3dScene = props =>
{
    const classes = useStyles();

    const [colorMap,] = useLoader(
    TextureLoader,
    [Mercury3dTexture ]
    )

    const mercuryRef = useRef();
    
    

    useFrame(({clock}) =>
    {
        const elaspedTime = clock.getElapsedTime();
        mercuryRef.current.rotation.y = elaspedTime/10;
        mercuryRef.current.position.x = 4; 
    })
         
    return (
        <>     
        <Section factor={1.5} offset={1}>
        <group position={[0,-24,0]}> 
        <pointLight 
        color="#f6f3ea"
        position={[-165, 0, 10]}
        intensity={1.5}
        />
        <Stars 
          radius={300} 
          depth={60}
          count={20000}
          factor={7}
          saturation={0}
          fade={true}
          /> 
         
        <mesh ref={mercuryRef} position={[0,0,0]}>
            <sphereGeometry args={[1.3, 32, 32]}/>
            <meshPhongMaterial />
            <meshStandardMaterial map={colorMap}/>
            {/* <OrbitControls enablePan={true} /> */}
        </mesh>

        <Html portal={props.domContent} fullscreen>
            <Grid container alignItems="center"  justifyContent="space-evenly" className={classes.htmlContainer} >
                <Grid item xs={12}>
                    <Typography align='left' gutterBottom className={classes.whiteFont} variant='h2'>
                        My Skills:
                    </Typography>
                    <Typography align='left' gutterBottom className={classes.whiteFont} variant='caption'>
                        On mobile? Hold down on the "i" icon for a description
                    </Typography>
                </Grid>
                <Grid container /* justifyContent="space-evenly" */ >

                    <div className={classes.root}>
                        <ImageList rowHeight={220} className={classes.imageList}>
                            <ImageListItem key="Subheader" cols={2} style={{ height: 'auto' }}>
                            {/* <ListSubheader component="div">December</ListSubheader> */}
                            </ImageListItem>
                            {imageListData.map((item) => (
                            <ImageListItem key={item.id}>
                                <img src={item.imageSrc} alt={item.title} />
                                <ImageListItemBar
                                /* title={item.title} */
                                classes=
                                {{
                                root: classes.titleBar,
                                title: classes.title,
                                 }}
                                actionIcon={
                                    <Tooltip title={item.title} arrow disableTouchListener>
                                    <IconButton aria-label={`info about ${item.title}`} className={classes.icon}>
                                    <InfoIcon htmlColor='white'/>
                                    </IconButton>
                                    </Tooltip>
                                }
                                />
                            </ImageListItem>
                            ))}
                        </ImageList>
                    </div>
                </Grid>
                
            </Grid>
        </Html>
        </group> 
        </Section>
        </>
    )
}

export default Mercury3dScene;
