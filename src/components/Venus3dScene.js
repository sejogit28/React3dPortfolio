import React, {useRef} from 'react';

import 
{
    Grid, Typography, Card, CardContent, CardMedia, CardActions
} 
from '@material-ui/core';

import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import GitHubIcon from '@material-ui/icons/GitHub';

import {makeStyles} from '@material-ui/core/styles';

import {useFrame, useLoader} from "@react-three/fiber";
import{OrbitControls, Html, Stars} from '@react-three/drei';
import {TextureLoader} from 'three';
import * as THREE from 'three';

import {Section} from './Section';
import SpaceXShipScene from './SpaceXShipScene';
import MaintenanceRobotScene from './MaintenanceRobotScene';

import Venus3dTexture from "../textures/8k_venus_surface.jpg";
import VenusAtmosphereTexture from "../textures/4k_venus_atmosphere.jpg"
const useStyles = makeStyles({
  
  whiteFont:
  {
    color: "#f6f3ea"
  },
  htmlContainer:
  {
    width: "65%",
    maxWidth:"65%",
    height: "80%",
    paddingLeft: "2em"
    /* justifyItems: "center" */
  },
  root: 
  {
    maxHeight: "23em",
    maxWidth: "15rem",
    marginBottom: "3em"
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
  cardButtonColor:
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
            <OrbitControls enablePan={true} />
        </mesh>
        <SpaceXShipScene/>
        <MaintenanceRobotScene/>
        <Html portal={props.domContent} fullscreen>
            <Grid container alignItems="center"  justifyContent="space-evenly" className={classes.htmlContainer} >
                <Grid item xs={12}>
                    <Typography align='center' gutterBottom className={classes.whiteFont} variant='h2'>
                        My Projects
                    </Typography>
                </Grid>
                <Grid container  justifyContent="space-evenly">

                <Card className={classes.root}>
                    {/* <CardHeader
                        avatar={
                        <Avatar aria-label="recipe" className={classes.avatar}>
                            $
                        </Avatar>
                        }
                        
                        title=
                        {
                            <Typography variant='h6'>
                                Expen$e Track
                            </Typography>
                            }
                        subheader="May 9, 2021"
                    /> */}
                    <CardMedia
                        className={classes.media}
                        component="img"
                        src={'https://media.giphy.com/media/YqnXaLTb68GAJ8ZHFR/giphy.gif'}
                        height={200}
                        title="Placeholder Gif"
                    />
                    <CardContent>
                        <Typography variant="body2" color="textSecondary" component="p">
                            An expense tracker built with Blazor Web Assembly, .NET 5 Web Api, 
                            and Microsoft SQL Server 
                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                        <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                        </IconButton>
                        <IconButton aria-label="share">
                        <GitHubIcon />
                        </IconButton>
                        
                    </CardActions>
                </Card>
                <Card className={classes.root}>
                    <CardMedia
                        className={classes.media}
                        component="img"
                        src={'https://media.giphy.com/media/YqnXaLTb68GAJ8ZHFR/giphy.gif'}
                        height={200}
                        title="Placeholder Gif"
                    />
                    <CardContent>
                        <Typography variant="body2" color="textSecondary" component="p">
                            An expense tracker built with Blazor Web Assembly, .NET 5 Web Api, 
                            and Microsoft SQL Server 
                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                        <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                        </IconButton>
                        <IconButton aria-label="share">
                        <GitHubIcon />
                        </IconButton>
                        
                    </CardActions>
                </Card>
                <Card className={classes.root}>
                    
                    <CardMedia
                        
                        component="img"
                        src={'https://media.giphy.com/media/YqnXaLTb68GAJ8ZHFR/giphy.gif'}
                        height={200}
                        title="Placeholder Gif"
                    />
                    <CardContent>
                        <Typography variant="body2" color="textSecondary" component="p">
                            An expense tracker built with Blazor Web Assembly, .NET 5 Web Api, 
                            and Microsoft SQL Server 
                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                        <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                        </IconButton>
                        <IconButton aria-label="share">
                        <GitHubIcon />
                        </IconButton>
                        
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

export default Venus3dScene;
