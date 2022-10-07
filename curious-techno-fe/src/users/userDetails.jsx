import axios from "axios";
import React ,{useState,useEffect} from "react";
import {useNavigate} from "react-router-dom";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();


const UserDetails = () => {
    let history = useNavigate();
    const user = JSON.parse(localStorage.getItem('userDetails'))
    const [data, setdata] = useState({ username:"", email:"",  password:"",role:"",mobile:""});
    const [formerror, setformerror]= useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const onChangeData = (e) => {
        const {name, value} = e.target;
     
      // console.log("Work .....",e.target.value);
          setdata({...data, [name] : value});
          setformerror(validation(data));
          
        }
        const onSubmitData = async () => {
            console.log("Console is called");
        
            console.log(isSubmit)
            if(Object.keys(formerror).length === 0 && isSubmit){
              await axios.put(`http://localhost:5000/users/${user.uuid}`, data,{ headers: {"Authorization" : `Bearer ${user.token}`} });  
              history("/home");
            }
          } 

     
     
          useEffect(() =>{
            loadData()
            setTimeout(()=>{
                setIsSubmit(true);
             },3000);
          },[]);
          
          const validation = (value) => {
            const error = {};
            // eslint-disable-next-line
            const regexnum = /^\b\d{4}[-.]?\d{3}[-.]?\d{3}\b$/;
            const regexemail =/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i;
            const regexpassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
            const regexchar = /^[A-Za-z]+$/;
            if(!value.username){
              error.username = "Username Required....";
            }else if(!regexchar.test(value.username)){
              error.username = "Enter Character Only....";
            } 
            if(!value.email){
              error.email = "Email Address Required....";
            }else if(!regexemail.test(value.email)){
              error.email = "Enter Valid email Address....";
            }
            if(!value.password){
              error.password = "Password  Required....";
            }else if(!regexpassword.test(value.password)){
              error.password = "Please Enter Valid Password";
            }
            if(!value.role){
              error.role = "Role are Required....";
            }else if(!regexchar.test(value.role)){
              error.role = "Enter Character Only....";
            } 
            if(!value.mobile){
              console.log("Required");
              error.mobile = "Mobile Number Required....";
            }else if(!regexnum.test(value.mobile)){
              console.log("only number",(regexnum.test(value.mobile)));
              error.mobile = "Enter Number Only....";
            }else if(value.mobile.length !== 10){
              console.log("enter 10  digit only");
              error.mobile = "you can not enter less than 10 digits....";
            }
            if(Object.keys(formerror).length === 0){
              setDisabled(false);
            }
            return error;
          }

          const loadData = async () =>{
            console.log(user.uuid)
            const result = await axios.get(`http://localhost:5000/users/${user.uuid}`,{ headers: {"Authorization" : `Bearer ${user.token}`} });
            console.log(result);
            setdata(result.data.userData);
          }  
    return (
        <>
            <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
            <Box
              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Typography component="h1" variant="h5">
                Profile Details
              </Typography>
              <Box component="form" noValidate  sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} >
                    <TextField
                      autoComplete="given-name"
                      name="username"
                      fullWidth
                      id="username"
                      label="User Name"
                      autoFocus
                      inputProps={{
                        maxLength: 10
                      }}
                       
                      value={data.username} onChange={onChangeData}
                    />
                     <Typography component="h4"  color="red" >
                     {formerror.username}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email" value={data.email} onChange={onChangeData}
                    />
                     <Typography component="h4" color="red" >
                     {formerror.email}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      id="Password"
                      label="Password"
                      name="password"
                      autoComplete="family-name"
                      inputProps={{
                        maxLength: 10
                      }}
                      value={data.password} onChange={onChangeData}
                    />
                    <Typography component="h4" color="red" >
                     {formerror.password}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      id="role"
                      label="Role"
                      name="role"
                      autoComplete="family-name"
                      inputProps={{
                        maxLength: 20
                      }}
                      value={data.role} onChange={onChangeData}
                    />
                    <Typography component="h4" color="red" >
                     {formerror.role}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Mobile"
                      type="text"
                      id="mobile"
                      name="mobile"
                      inputProps={{
                        maxLength: 11
                      }} 
                      value={data.mobile} onChange={onChangeData}
                    />
                     <Typography component="h4" color="red" >
                     {formerror.mobile}
                    </Typography>
                  </Grid>
                </Grid>
                <Button
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={onSubmitData}
                  disabled={disabled}
                >
                  Update Details
                </Button>
              
                </Box>
              </Box>
            </Container>
          </ThemeProvider>
        </>
        
    )
}

export default UserDetails;