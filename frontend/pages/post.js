import { useRouter } from 'next/router'; 
import { Box, Container, Typography, Grid, Button } from '@mui/material';

const PostPage = () => {
  const router = useRouter(); 

  return (
    <Box
      position="relative"
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      sx={{
        backgroundImage: 'url(/../images/image1.jpg)', 
        backgroundSize: 'cover', 
        backgroundPosition: 'center', 
      }}
    >
    </Box>
  );
};

export default PostPage;
