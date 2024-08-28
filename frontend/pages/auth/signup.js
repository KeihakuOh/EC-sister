//サインアップ画面
import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';

const SignUpScreen = ({ handleBack }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = (event) => {
    event.preventDefault();
    // サインアップ処理をここに記述
    if (password !== confirmPassword) {
      alert('パスワードが一致しません');
      return;
    }
    console.log('Password:', password);
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
            Signup
          </Typography>
          <form onSubmit={handleSignUp}>
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
              Signup
            </Button>
          </form>
        </Box>
      </Container>
    </Box>
  );
};

export default SignUpScreen;
