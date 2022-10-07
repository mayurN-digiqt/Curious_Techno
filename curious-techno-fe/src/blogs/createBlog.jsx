import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextareaAutosize from '@mui/base/TextareaAutosize';


const theme = createTheme();


const CreateBlog = () => {
  let history = useNavigate();
  const userData = JSON.parse(localStorage.getItem('userDetails'));
  const [data, setdata] = useState({ title: "", description: "", uuid: userData.uuid });
  const [selectFile, setSelectedFile] = useState(null);
  const onChangeData = (e) => {
    const { name, value } = e.target;
    setdata({ ...data, [name]: value });

  }

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0])
    // setdata({...data,imageData: event.target.files[0] })
  }

  const onSubmitData = async (event) => {
    event.preventDefault()
    const formData = new FormData();
    formData.append("imageData", selectFile);
    console.log(formData)
    console.log(data)
    const blogDetails =   await axios.post("http://localhost:5000/users/blogs", data,{ headers: {"Authorization" : `Bearer ${userData.token}`} });
    console.log(blogDetails.data.blog.uuid)
    const uuid =  blogDetails.data.blog.uuid;  
    const blogData = await axios.post(`http://localhost:5000/users/blogs/image-upload/${uuid}`, formData,{ headers:{"Content-Type" : "multipart/form-data"}   });
    console.log(blogData)
    history("/home");
  }


  useEffect(() => {
    loadUser()
  }, []);
  console.log(data)
  const loadUser = async () =>{
  
        const result =  await axios.get(`http://localhost:5000/users/blogs/create-blog/${userData.uuid}`,  { headers: {"Authorization" : `Bearer ${userData.token}`} });
        console.log(result)
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
              Create Blog
            </Typography>
            <Box component="form" noValidate sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} >
                  <TextField
                    autoComplete="given-name"
                    name="title"
                    fullWidth
                    id="title"
                    label="Enter Title"
                    autoFocus

                    value={data.title} onChange={onChangeData}
                  />
                </Grid>
                <Grid item xs={12}>
                    <Button
                    variant="contained"
                    component="label"
                    name="imageData"
                  >
                    Upload File
                    <input
                      type="file"
                      name="imageData"
                      onChange={handleFileSelect}
                      hidden
                    />
                  </Button> 
                </Grid>
                <Grid item xs={12}>
                  <TextareaAutosize
                    fullWidth
                    aria-label="minimum height"
                    minRows={3}
                    placeholder="Minimum 3 rows"
                    style={{ width: 200 }}
                    name="description"
                    value={data.description} 
                    onChange={onChangeData}
                  />
                </Grid>
              </Grid>
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={onSubmitData}
                // disabled={disabled}
              >
                Create Blog
              </Button>

            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>

  )
}

export default CreateBlog;