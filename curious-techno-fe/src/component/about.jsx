import React from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { Link } from "react-router-dom";

export default function About() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh'
      }}
    >
      <Container maxWidth="md">
        <Grid container spacing={2}>
          <Grid xs={6}>
            <Typography variant='h2'>About Us</Typography>
            <Typography variant="h5">
            Curious Techno presents non-technical and technical knowledge for you. 
            you can see different different technologies blogs and article in this website so enjoy and learning. 
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}