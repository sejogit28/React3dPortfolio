import React, {useRef} from 'react';

import 
{
    Grid, Typography, Card, CardActionArea, CardContent, CardMedia, 
    CardActions, Tooltip, Zoom
} 
from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import GitHubIcon from '@material-ui/icons/GitHub';
import DescriptionIcon from '@material-ui/icons/Description';


import {useFrame, useLoader} from "@react-three/fiber";
import{OrbitControls, Html, Stars} from '@react-three/drei';
import * as THREE from 'three';
import {TextureLoader} from 'three';

//import HTMLContent from './HtmlContent';
import {Section} from './Section';

import Earth3dDayMap from "../textures/8k_earth_daymap.jpg";
import Earth3dNormalMap from "../textures/8k_earth_normal_map.jpg";
import Earth3dSpecularMap from "../textures/8k_earth_specular_map.jpg";
import Earth3dCloudsMap from "../textures/8k_earth_clouds.jpg";

const useStyles = makeStyles((theme) => ({
  root:
  {
       /* display:"flex", */
        maxWidth: "25rem"
  },
  whiteFont:
  {
    color: "#f6f3ea"
  },
  htmlContainer:
  {
    /* margin: "0 auto", */
    paddingTop: '2em',
    width: "65%",
    paddingLeft: "6rem",
    /* paddingRight: "3rem" */
    maxWidth:"65%",
    height: "70%",
     justifyItems: "left" 
  }, 
  cardMedia:
  {
      width: "100%"
  },
  cardGitHubButtonColor:
  {
      color: "#000000"
  },
  
}))




const Earth3dScene = props =>
{
    const classes = useStyles();
    
    const [colorMap, normalMap, specularMap, cloudsMap] = useLoader(
    TextureLoader,
    [Earth3dDayMap, Earth3dNormalMap, Earth3dSpecularMap, Earth3dCloudsMap]
    )

    const earthRef = useRef();
    const cloudsRef = useRef();
    
    useFrame(({clock}) =>
    {
        const elaspedTime = clock.getElapsedTime();
        earthRef.current.rotation.y = elaspedTime/10;
        earthRef.current.position.x = 5; 
        cloudsRef.current.rotation.y = elaspedTime/10;
        cloudsRef.current.position.x = 5; 
    })

   
    return (
        <>
        <Section factor={1.5} offset={1}>
        <group position={[0,11.5,0]}>
        <pointLight 
        color="#f6f3ea"
        position={[-165, 0, -80]}
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
        <mesh ref={cloudsRef} position={[0,0,0]}>
            <sphereGeometry args={[3.005, 32, 32]} />
            <meshPhongMaterial
             map={cloudsMap}
             opacity={.5}
             depthWrite={true}
             transparent={true}
             side={THREE.DoubleSide}
             />
        </mesh>
        <mesh ref={earthRef} position={[0,0,0]}>
            <sphereGeometry args={[3, 32, 32]}/>
            <meshPhongMaterial specularMap={specularMap}/>
            <meshStandardMaterial map={colorMap} normalMap={normalMap}/>
            <OrbitControls enablePan={true}/>
        </mesh>
        <Html fullscreen portal={props.domContent} >
            <Grid container  alignItems="center" className={classes.htmlContainer}>                   
                <Grid item xs={12}>

                <Card className={classes.root}>
                    <CardActionArea>

                        <CardMedia
                            /* className={classes.cardMedia} */
                            component="img"
                            image={`/Photos/SeanJosephShorterHeadShot.jpg`}
                            height="370em"
                            title="Sean Joseph Head Shot"
                            
                        />
                        <CardContent>
                            
                            <Typography variant="body1">
                                Hello! My name is Sean Joseph and I'm a fullstack (React | .NET) developer.
                                Welcome to my portfolio, check out more below!
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                        <CardActions disableSpacing>
                            <Tooltip 
                                interactive
                                arrow 
                                title='My Resume' 
                                TransitionComponent={Zoom}>
                                <IconButton aria-label="share">
                                    <DescriptionIcon fontSize="large"  />
                                </IconButton>
                            </Tooltip>
                            <Tooltip 
                                interactive
                                arrow 
                                title='My LinkedIn Profile' 
                                TransitionComponent={Zoom}>
                                <IconButton 
                                color="primary" 
                                href="https://www.linkedin.com/in/sean-joseph-41ab49114/" 
                                aria-label="share"
                                >
                                    <LinkedInIcon fontSize="large" />
                                </IconButton>
                            </Tooltip>
                            <Tooltip 
                                interactive
                                arrow 
                                title='My Github Profile' 
                                TransitionComponent={Zoom}>
                                <IconButton 
                                className={classes.cardGitHubButtonColor} 
                                aria-label="share"
                                href="https://github.com/sejogit28"
                                >
                                    <GitHubIcon fontSize="large" />
                                </IconButton>

                            </Tooltip>
                        </CardActions>              
                    </Card>
                </Grid>
            </Grid>
        </Html>
      </group>
      
    </Section>
        
        </>
    )
}

export default Earth3dScene;
