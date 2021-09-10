import React from 'react';

import 
{
    Grid, Typography, TextField, Button , Paper
} 
from '@material-ui/core';

import {makeStyles} from '@material-ui/core/styles';
import DoneIcon from '@material-ui/icons/Done';

import{ Html, Stars} from '@react-three/drei';

import {Section} from './Section';


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
    width: "90%",
    maxWidth:"90%",
    height: "80%",
    paddingLeft: "2em" ,
    /* justifyItems: "left"  */
  },
  contactFormGrid:
  {
    padding: "1em"
  },
  buttonStyles:
   {
        marginBottom: "1em",
        marginLeft:"1em"

   },
   marginBottom: 
   {
        marginBottom: "1em"
   },
   
   marginRight:
   {
       marginRight:'1em'
   }
})

const ContactForm = props => {
    const classes = useStyles();

    return (
        <>     
        <Section factor={1.5} offset={1}>
        <group position={[0,-34,0]}> 
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
         
        

        <Html portal={props.domContent} fullscreen>
            <Grid container alignItems="center"  justifyContent="space-evenly" className={classes.htmlContainer} >
                <Grid item xs={12}>
                    <Typography align='center' gutterBottom className={classes.whiteFont} variant='h2'>
                        Contact Me:
                    </Typography>
                </Grid>
                <Grid container alignItems="center" justifyContent="space-evenly"  spacing={3} >
                   <Paper elevation={3} className={classes.contactFormGrid}>
                    <form action="https://formsubmit.co/6c3b1eb7d56edb5c1551bc6d6e45f59a" method="POST">
                        <Grid  className={classes.marginBottom} item xs='auto'>
                             
                                <TextField className={classes.marginRight} required type="text" name="name" label="Your Name" variant="filled" margin="normal"/>
                           
                                <TextField required type="email" name="email" label="Your Email" variant="filled"  margin="normal"/>
                            
                        </Grid>
                        
                                <input required  type="hidden" name="_subject" value="Email from Your Portfolio"/>    
                                {/* <input required  type="hidden" name="_next" /> */}                           
                        

                        <Grid className={classes.marginBottom} item xs={12}>                         
                                <TextField required  type="text" name="message" label="Your Message" variant="filled" fullWidth multiline rows={5}/>                           
                        </Grid>
                        <Grid className={classes.buttonStyles} item xs={12}>

                            <Button 
                                variant="contained"
                                type="submit"
                                color="primary"
                                size="large"
                                startIcon={<DoneIcon />}
                            >
                                Send
                            </Button>
                        </Grid>
                    </form>
                    </Paper>
                    
                </Grid>
                
            </Grid>
        </Html>
        </group> 
        </Section>
        </>

    )
}

export default ContactForm;
