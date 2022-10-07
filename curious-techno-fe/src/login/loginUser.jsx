import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Modal from '@mui/material/Modal';

const theme = createTheme();
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const LoginPage = (props) => {
  let history = useNavigate();
  const {getUser} = props
  const [data, setdata] = useState({ email: "", password: "" });
  const [email,setEmail] = useState({email:""})
  const [formerror, setformerror] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [open, setOpen] = useState(false);
  const [otpText,setOTPText] = useState(false) 
  const [emailText,setEmailText] = useState(true)
  const [passText,setPassText] = useState(false)
  const [otpBtn, setOTPBtn] = useState(true)
  const [verifyBtn, setVerifyBtn] = useState(true)
  const [userId, setUserId] = useState(); 
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setOTPText(false);
  }

  const onSubmitData = async () => {
    if (Object.keys(formerror).length === 0 && isSubmit) {
      const userData = await axios.post("http://localhost:5000/users/loginUser", data);
      history("/home");
      const userDetails = {
        'token':userData.data.token,
        'uuid':userData.data.userData.uuid
      }
      localStorage.setItem('userDetails',JSON.stringify(userDetails))
      getUser(userData)
      
    }
  }
  const sendOTP = async () => {
    if (Object.keys(formerror).length === 0 && isSubmit) {
      await axios.post("http://localhost:5000/users/send-otp", email);
      setOTPText(true)
      setOTPBtn(false)
      setVerifyBtn(true)
  
    }
  }

  const verifyOTP = async () => {
    if (Object.keys(formerror).length === 0 && isSubmit) {
      const id = await axios.post("http://localhost:5000/users/verify-otp", email);
      console.log(id)
      setUserId(id.data)
      setOTPText(false)
      setOTPBtn(false)
      setVerifyBtn(false)
      setEmailText(false)
      setPassText(true)
      setEmail('')
      // history("/");
    }
  }

  const changePass = async () => {
    if (Object.keys(formerror).length === 0 && isSubmit) {
      await axios.put(`http://localhost:5000/users//resetPassword/${userId}`, email);
      setEmailText(true)
      setOTPBtn(true)
      setOpen(false);
      setPassText(false)
    
      // history("/");
    }
  }
  useEffect(() => {
    setTimeout(() => {
      setIsSubmit(true);
    }, 3000);
  }, []);

  const onChangeData = (e) => {
    const { name, value } = e.target;
    // console.log("Work .....",e.target.value);
    setdata({ ...data, [name]: value });
    setformerror(validation(data));
  }
  const onChangeEmail = (e) => {
    const { name, value } = e.target;
    // console.log("Work .....",e.target.value);
    setEmail({ ...email, [name]: value });
    console.log(email)
    setformerror(emailValidation(email));
  }
  const onChangePass = (e) => {
    const { name, value } = e.target;
    // console.log("Work .....",e.target.value);
    setEmail({ ...email, [name]: value });
    console.log(email)
    setformerror(passValidation(email));
  }
  const passValidation = (value) => {
    const error = {};
    const regexpassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
    if (!value.password) {
      error.password = "password Required....";
    } else if (!regexpassword.test(value.password)) {
      error.password = "Enter Character Only....";
    }
   
    
    if (Object.keys(formerror).length === 0) {
      setDisabled(false);
    }
    return error;
  }
  const emailValidation = (value) => {
    const error = {};
    const regexemail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!value.email) {
      error.email = "Email Address Required....";
    } else if (!regexemail.test(value.email)) {
      error.email = "email address or mobile no....";
    }
    
    if (Object.keys(formerror).length === 0) {
      setDisabled(false);
    }
    return error;
  }
  const validation = (value) => {
    const error = {};
    // const regexnum = /^\b\d{3}[-.]?\d{3}[-.]?\d{4}\b$/;
    const regexemail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const regexpassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/

    if (!value.email) {
      error.email = "Email Address Required....";
    } else if (!regexemail.test(value.email)) {
      error.email = "email address or mobile no....";
    }
    // }else if(value.email.length !== 10){
    //   console.log("enter 10  digit only");
    //   error.email = "you can not enter less than 10 digits....";
    // }
    if (!value.password) {
      error.password = "password Required....";
    } else if (!regexpassword.test(value.password)) {
      error.password = "Enter Character Only....";
    }
    if (Object.keys(formerror).length === 0) {
      setDisabled(false);
    }
    return error;
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
              Login 
            </Typography>
            <Box component="form" noValidate sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} >
                  <TextField
                    autoComplete="given-name"
                    name="email"
                    fullWidth
                    id="email"
                    label="Email Address"
                    autoFocus
                    value={data.email} onChange={onChangeData}
                  />
                  <Typography component="h4" color="red" >
                    {formerror.email}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="Password"
                    label="Password"
                    name="password"
                    autoComplete="family-name"
                    value={data.password} onChange={onChangeData}
                  />
                  <Typography component="h4" color="red" >
                    {formerror.password}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography component="h4" color="blue" onClick={handleOpen} >
                    Forgot Password
                  </Typography>
                  <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box sx={style}>
                      {
                        emailText?
                        <TextField
                        autoComplete="given-name"
                        name="email"
                        fullWidth
                        id="email"
                        label="Email Address"
                        autoFocus
                        value={email.email} onChange={onChangeEmail}
                      />
                        :
                        null
                      }
                       {
                         otpText ? <TextField
                         autoComplete="given-name"
                         name="otp"
                         fullWidth
                         id="otp"
                         label="Enter OTP"
                         autoFocus
                         value={email.otp} onChange={onChangeEmail}
                       /> : passText ? 
                       <TextField
                       autoComplete="given-name"
                       name="password"
                       fullWidth
                       id="password"
                       label="Enter Password"
                       autoFocus
                       value={email.password} onChange={onChangePass}
                     />:
                     null
                      }
                      {
                        otpBtn ?
                        <Button
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={sendOTP}
                        disabled={disabled}
                      >
                        Send OTP
                      </Button>
                        :
                        verifyBtn ?
                        <Button
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={verifyOTP}
                        disabled={disabled}
                      >
                        Verify OTP
                      </Button>
                      :
                      <Button
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                      onClick={changePass}
                      // disabled={disabled}
                    >
                      Save Password
                    </Button>
                      }
                      </Box>
                  </Modal>
                </Grid>
              </Grid>
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={onSubmitData}
                disabled={disabled}
              >
                Login
              </Button>
              <Typography component="h4" color="red" >
                Don't have an account?
                <Link to="/sign-up" class="nav-link" style={{ "text-decoration": "none" }}>
                  Register Here..
                </Link>
              </Typography>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>

  )
}

export default LoginPage;