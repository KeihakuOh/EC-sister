import React, { useEffect, useState } from 'react';
import { Box, Container, Grid, Typography, Button, TextField } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router';

const PostPage = () => {
  const [posts, setPosts] = useState([]);
  const [showBuyButton, setShowBuyButton] = useState({});
  const [showAllPosts, setShowAllPosts] = useState(true); // 初期状態で全文ポストを表示
  const router = useRouter();

  const imagePaths = [
    '/images/image2.jpg',
    '/images/image3.jpg',
    '/images/image4.jpg',
    '/images/image5.jpg',
    '/images/image6.jpg',
    '/images/image7.jpg',
    '/images/image8.jpg',
  ];

  // 全てのポストデータを取得
  useEffect(() => {
    fetchPosts(); // 初回読み込み時に全てのポストを取得
  }, [showAllPosts]); // showAllPostsの変更に基づいて再取得

  const fetchPosts = () => {
    const url = showAllPosts ? 'http://localhost:5000/post' : 'http://localhost:5000/profile';

    axios
      .get(url, { withCredentials: true })
      .then((response) => {
        setPosts(response.data.posts);
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
      });
  };

  const handleLike = (postId) => {
    axios
      .post(`http://localhost:5000/post/${postId}/like`, {}, { withCredentials: true })
      .then((response) => {
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.id === postId ? { ...post, likes_count: post.likes_count + 1 } : post
          )
        );
        setShowBuyButton((prevState) => ({ ...prevState, [postId]: true }));
      })
      .catch((error) => {
        console.error('Error liking post:', error);
      });
  };

  const handleGoToBuy = () => {
    router.push('/research');
  };

  const handleTogglePosts = () => {
    setShowAllPosts(!showAllPosts); // 状態を切り替え
  };

  const handleRelatedItemSearch = () => {
    console.log(`Searching for related items: ${relatedItem}`);
    // ここに関連記事商品の検索処理を追加
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, bgcolor: 'lightblue', py: 2, borderRadius: 2 }}>
      <Button variant="contained" color="primary" onClick={handleTogglePosts} sx={{ mb: 2 }}>
        {showAllPosts ? '自分の記事を確認する' : '全部の記事を見る'}
      </Button>

      {showAllPosts && (
        <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
          <TextField
            label="関連記事商品を入力"
            variant="outlined"
            sx={{ mr: 2, flexGrow: 1 }}
          />
          <Button variant="contained" color="primary" onClick={handleRelatedItemSearch}>
            検索
          </Button>
        </Box>
      )}

      {/* posts が空でない場合のみ画像と投稿を表示 */}
      {posts.length > 0 ? (
        imagePaths.map((src, index) => (
          <Grid container spacing={2} key={index} alignItems="center">
            <Grid item xs={6}>
              <img src={src} alt={`Image ${index + 2}`} style={{ width: '100%', display: 'block' }} />
            </Grid>
            <Grid item xs={6}>
              {posts[index] ? (
                <Box>
                  <Typography variant="h6">{posts[index].content}</Typography>
                  <Typography variant="body2">Posted by: {posts[index].username}</Typography>
                  <Typography variant="body2">Likes: {posts[index].likes_count}</Typography>
                  {/* showAllPosts が true のときのみ "Like" ボタンを表示 */}
                  {showAllPosts && (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleLike(posts[index].id)}
                      sx={{ mt: 1 }}
                    >
                      Like
                    </Button>
                  )}
                  {showBuyButton[posts[index].id] && (
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
        ))
      ) : (
        <Typography variant="body2">No posts available.</Typography>
      )}
    </Container>
  );
};

export default PostPage;
