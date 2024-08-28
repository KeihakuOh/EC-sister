import axios from 'axios';

export default ({ url, method, body, onSuccess }) => {

  const doRequest = async () => {
    const response = await axios[method](url, body);

    if (onSuccess) {
      onSuccess(response.data);
    }

    return response.data;
  };

  return { doRequest };
};