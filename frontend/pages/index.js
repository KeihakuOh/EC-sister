import { useRouter } from 'next/router'; 
import { Box, Container, Typography, Grid, Button } from '@mui/material';
import useCurrentUser from '../hooks/current-user'; // フックをインポート

const LandingPage = () => {
  const router = useRouter();
  const { currentUser, loading } = useCurrentUser(); // フックを使用

  const handleSelectFindClient = () => {
    router.push('/auth/login'); 
  };

  const handleSelectApp2 = () => {
    router.push('/auth/signup'); 
  };

  // ローディング中の場合は何も表示しない
  if (loading) return null;

  // currentUserが存在する場合、/postにリダイレクト
  if (currentUser) {
    router.push('/post');
    return null; // リダイレクト中は何もレンダリングしない
  }

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
      <Container>
        <Typography variant="h3" align="center" gutterBottom>
          Welcome to our service
        </Typography>
        <Box display="flex" justifyContent="center" mt={4}>
          <Grid container spacing={3} justifyContent="center">
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSelectFindClient}
                sx={{ padding: '10px 20px', fontSize: '16px' }}
              >
                Login
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleSelectApp2}
                sx={{ padding: '10px 20px', fontSize: '16px' }}
              >
                Signup
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default LandingPage;
