import React, { useEffect, useState } from 'react';
import { Box, Container, Grid, Typography, Button } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router'; // Import the useRouter hook

const PostPage = () => {
  // ポストデータと画像パスを保存するためのステート
  const [posts, setPosts] = useState([]);
  const [showBuyButton, setShowBuyButton] = useState({}); // Track which posts should show the "Go to buy it" button
  const router = useRouter(); // Initialize the router

  const imagePaths = [
    '/images/image2.jpg',
    '/images/image3.jpg',
    '/images/image4.jpg',
    '/images/image5.jpg',
    '/images/image6.jpg',
    '/images/image7.jpg',
    '/images/image8.jpg',
  ];

  // サーバーからポストデータを取得する
  useEffect(() => {
    axios.get('http://localhost:5000/post', { withCredentials: true })
      .then(response => {
        setPosts(response.data.posts);
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
      });
  }, []);

  // いいねボタンのクリック処理
  const handleLike = (postId) => {
    axios.post(`http://localhost:5000/post/${postId}/like`, {}, { withCredentials: true })
      .then(response => {
        // いいねが成功したらポストデータを更新
        setPosts(prevPosts => prevPosts.map(post => 
          post.id === postId ? { ...post, likes_count: post.likes_count + 1 } : post
        ));
        // Show the "Go to buy it" button for the liked post
        setShowBuyButton(prevState => ({ ...prevState, [postId]: true }));
      })
      .catch(error => {
        console.error('Error liking post:', error);
      });
  };

  // "Go to buy it"ボタンのクリック処理
  const handleGoToBuy = () => {
    router.push('/research'); // Navigate to the /research page
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, bgcolor: 'lightblue', py: 2, borderRadius: 2 }}>
      {imagePaths.map((src, index) => (
        <Grid container spacing={2} key={index} alignItems="center">
          <Grid item xs={6}>
            <img src={src} alt={`Image ${index + 2}`} style={{ width: '100%', display: 'block' }} />
          </Grid>
          <Grid item xs={6}>
            {posts[index] ? (
              <Box>
                <Typography variant="h6">{posts[index].content}</Typography>
                <Typography variant="body2">Likes: {posts[index].likes_count}</Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleLike(posts[index].id)}
                  sx={{ mt: 1 }}
                >
                  Like
                </Button>
                {showBuyButton[posts[index].id] && ( // Show "Go to buy it" button if post is liked
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleGoToBuy}
                    sx={{ mt: 1, ml: 2 }}
                  >
                    Go to buy it
                  </Button>
                )}
              </Box>
            ) : (
              <Typography variant="body2">Loading...</Typography>
            )}
          </Grid>
        </Grid>
      ))}
    </Container>
  );
};

export default PostPage;
