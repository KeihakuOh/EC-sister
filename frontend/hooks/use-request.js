import axios from 'axios';

export default ({ url, method, body, onSuccess }) => {
  
  const doRequest = async () => {
    try {
      const response = await axios({
        method,
        url,
        data: body,
        withCredentials: true, // クレデンシャルを含むリクエストを送信する
      });

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