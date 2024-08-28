//サインアップ画面
import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import useRequest from '../../hooks/use-request';
import Router from 'next/router';

const LoginScreen = ({ handleBack }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { doRequest } = useRequest({
    url: 'http://localhost:5000/login',
    method: 'post',
    body: {
      username,
      password
    },
    onSuccess: () => Router.push('/post')
  });
  
  const handleLogin = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert('パスワードが一致しません');
      return;
    }
    onSubmit(event);
  };

  const onSubmit = async event => {
    event.preventDefault();

    await doRequest();
  };


  return (
    <Box
      position="relative"
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      sx={{
        backgroundImage: 'url(/../images/image1.jpg)', // Make sure image1.jpg is in the public directory
        backgroundSize: 'cover', // Cover the entire background
        backgroundPosition: 'center', // Center the image
      }}
    >
      <Container maxWidth="xs">
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          minHeight="100vh"
        >
          <Typography variant="h4" gutterBottom>
            Login
          </Typography>
          <form onSubmit={handleLogin}>
            <TextField
              label="username"
              variant="outlined"
              fullWidth
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <TextField
              label="password"
              variant="outlined"
              type="password"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <TextField
              label="password confirm"
              variant="outlined"
              type="password"
              fullWidth
              margin="normal"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ marginTop: 2 }}
            >
              Login
            </Button>
          </form>
        </Box>
      </Container>
    </Box>
  );
};

export default LoginScreen;
