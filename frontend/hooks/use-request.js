import axios from 'axios';

export default ({ url, method, body, onSuccess }) => {
  
  const doRequest = async () => {
    try {
      const response = await axios[method](url, body);
      if (onSuccess) {
        onSuccess();
      }
      return response.data;
    } catch (err) {
      console.error('Request failed:', err); // エラーをログに出力
    }
  };
  return { doRequest };
  
};