import React, {useRef} from 'react';

import 
{
    Grid, Typography, Card, CardContent, CardMedia, CardActions, Tooltip, Zoom
} 
from '@material-ui/core';

import IconButton from '@material-ui/core/IconButton';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkIcon from '@material-ui/icons/Link';

import {makeStyles} from '@material-ui/core/styles';

import {useFrame, useLoader} from "@react-three/fiber";
import{/* OrbitControls, */ Html, Stars} from '@react-three/drei';
import {TextureLoader} from 'three';
import * as THREE from 'three';

import {Section} from './Section';
import SpaceXShipScene from './SpaceXShipScene';
import MaintenanceRobotScene from './MaintenanceRobotScene';

import projectCardListData from './ProjectCardListData';

import Venus3dTexture from "../textures/8k_venus_surface.jpg";
import VenusAtmosphereTexture from "../textures/4k_venus_atmosphere.jpg"
const useStyles = makeStyles({
  
  whiteFont:
  {
    color: "#f6f3ea",
   /*  justifyItems: "center",
    width: "60%",
    maxWidth:"60%", */
  },
  htmlContainer:
  {
    width: "80%",
    maxWidth:"80%",
    height: "80%",
    paddingLeft: "3em" ,
    /* justifyItems: "left"  */
  },
  card: 
  {
    maxHeight: "35em",
    maxWidth: "32rem",
    marginBottom: "5em"
  },
  
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  avatar: {
    backgroundColor: "#000b01",
  },
 
  media:
  {
     maxWidth: "70rem"
  },
  cardGitHubButtonColor:
  {
      color: "#000000"
  }
})

const Venus3dScene = props =>
{
    const classes = useStyles();

    const [colorMap, atmosphereMap] = useLoader(
    TextureLoader,
    [Venus3dTexture,VenusAtmosphereTexture ]
    )

    const venusRef = useRef();
    const venusAtmosphereRef = useRef();
    
    useFrame(({clock}) =>
    {
        const elaspedTime = clock.getElapsedTime();
        venusRef.current.rotation.y = elaspedTime/10;
        venusRef.current.position.x = 6; 
        venusAtmosphereRef.current.position.x = 6; 
        venusAtmosphereRef.current.rotation.y = elaspedTime/10
    })

    return (
        <>     
        <Section factor={1.5} offset={1}>
        <group position={[0,0,0]}> 
        <pointLight 
        color="#f6f3ea"
        position={[-165, 10, -180]}
        intensity={1.1}
        />
        <Stars 
          radius={300} 
          depth={60}
          count={20000}
          factor={7}
          saturation={0}
          fade={true}
          /> 
        <mesh ref={venusAtmosphereRef} position={[0,0,0]}>
            <sphereGeometry args={[2.805, 32, 32]} />
            <meshPhongMaterial
             map={atmosphereMap}
             opacity={1}
             depthWrite={true}
             /* transparent={true} */
             side={THREE.DoubleSide}
             />
        </mesh>  
        <mesh ref={venusRef} position={[0,0,0]}>
            <sphereGeometry args={[2.8, 32, 32]}/>
            <meshPhongMaterial />
            <meshStandardMaterial map={colorMap}/>
           {/*  <OrbitControls enablePan={true} /> */}
        </mesh>
        <SpaceXShipScene/>
        <MaintenanceRobotScene/>
        <Html portal={props.domContent} fullscreen>
            <Grid container  alignItems="center"  justifyContent="space-evenly"  className={classes.htmlContainer} >
                <Grid item xs={12}>
                    <Typography align='left' gutterBottom className={classes.whiteFont} variant='h2'>
                        My Projects:
                    </Typography>
                </Grid>
               
        <Grid container /* justifyContent="space-evenly" */ >
            {
                projectCardListData.map(projCard =>
                {
                    return(
                            <Card key={projCard.id} className={classes.card}>               
                            <CardMedia
                                //className={classes.media} 
                                component="img"
                                image={projCard.imageSrc}
                                height={325}
                               
                                title={projCard.title}
                            />
                            <CardContent>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    {projCard.description}
                                </Typography>
                            </CardContent>
                            <CardActions disableSpacing>
                                {
                                    projCard.liveLink ?

                                        <Tooltip 
                                            interactive
                                            arrow 
                                            title={projCard.title}
                                            TransitionComponent={Zoom}>
                                            <IconButton 
                                            className={classes.cardGitHubButtonColor} 
                                            href={projCard.liveLink}
                                            aria-label="share"
                                        >
                                            <LinkIcon fontSize="large" />
                                            </IconButton>
                                        </Tooltip>


                                    :
                                        <Tooltip 
                                            interactive
                                            arrow 
                                            title='Live link coming soon' 
                                            TransitionComponent={Zoom}>
                                            <IconButton 
                                            className={classes.cardGitHubButtonColor} 
                                            href='#'
                                            aria-label="share"
                                        >
                                            <LinkIcon fontSize="large" />
                                            </IconButton>
                                        </Tooltip>
                                }
                                <Tooltip 
                                interactive
                                arrow 
                                title='Project GitHub' 
                                TransitionComponent={Zoom}>
                                <IconButton 
                                className={classes.cardGitHubButtonColor} 
                                href={projCard.gitHubLink}
                                aria-label="share"
                                >
                                    <GitHubIcon fontSize="large" />
                                </IconButton>
                            </Tooltip>
                                
                            </CardActions>
                            </Card>
                
                    );
                })
            }
                
                
               
                
                </Grid>
            </Grid>
        </Html>
        </group> 
        </Section>
        </>
    )
}

export default Venus3dScene;
