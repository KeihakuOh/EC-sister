import React, { useState } from 'react';
import { Box, Container, Typography, Grid, Checkbox, TextField, Button, FormControlLabel } from '@mui/material';
import axios from 'axios';

const ResearchPage = () => {
  const [amazonChecked, setAmazonChecked] = useState(false);
  const [rakutenChecked, setRakutenChecked] = useState(false);
  const [itemName, setItemName] = useState('');
  const [result, setResult] = useState(null); // レスポンスデータを保存するステート

  const handleSubmit = () => {
    const data = {
      amazon: amazonChecked,
      rakuten: rakutenChecked,
      item_name: itemName,
    };

    // Send the data to the backend
    axios
      .post('http://localhost:5000/result', data, { withCredentials: true })
      .then((response) => {
        console.log('Response from backend:', response.data);
        setResult(response.data.data); // レスポンスデータを保存
      })
      .catch((error) => {
        console.error('Error sending data to backend:', error);
      });
  };

  const handleBuy = (source, itemId) => {
    console.log(`Buying item ${itemId} from ${source}`);
    // 購入ロジックをここに追加
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Research Items
      </Typography>
      <Box>
        <FormControlLabel
          control={<Checkbox checked={amazonChecked} onChange={(e) => setAmazonChecked(e.target.checked)} />}
          label="Amazon"
        />
        <FormControlLabel
          control={<Checkbox checked={rakutenChecked} onChange={(e) => setRakutenChecked(e.target.checked)} />}
          label="Rakuten"
        />
      </Box>
      <TextField
        label="Item Name"
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
        fullWidth
        sx={{ mt: 2 }}
      />
      <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ mt: 3 }}>
        Search
      </Button>

      {/* 結果を表示する部分 */}
      {result && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5">Results</Typography>
          {result.amazon_data && result.amazon_data.length > 0 && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="h6">Amazon Data</Typography>
              {result.amazon_data.map((item) => (
                <Box key={item.id} sx={{ mt: 1, display: 'flex', alignItems: 'center' }}>
                  <Box>
                    <Typography>Price: {item.price}</Typography>
                    <Typography>Other Conditions: {item.other_conditions}</Typography>
                  </Box>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleBuy('Amazon', item.id)}
                    sx={{ ml: 2 }}
                  >
                    Buy it
                  </Button>
                </Box>
              ))}
            </Box>
          )}
          {result.rakuten_data && result.rakuten_data.length > 0 && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="h6">Rakuten Data</Typography>
              {result.rakuten_data.map((item) => (
                <Box key={item.id} sx={{ mt: 1, display: 'flex', alignItems: 'center' }}>
                  <Box>
                    <Typography>Price: {item.price}</Typography>
                    <Typography>Other Conditions: {item.other_conditions}</Typography>
                  </Box>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleBuy('Rakuten', item.id)}
                    sx={{ ml: 2 }}
                  >
                    Buy it
                  </Button>
                </Box>
              ))}
            </Box>
          )}
        </Box>
      )}
    </Container>
  );
};

export default ResearchPage;
