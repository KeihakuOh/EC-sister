import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const useCurrentUser = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true); // ローディング状態を追加
  const router = useRouter();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await axios.get('http://localhost:5000/currentuser', { withCredentials: true }); // クッキーを含むリクエスト
        setCurrentUser(response.data.user); // ユーザー情報をセット
        setLoading(false);

        if (response.data.user) {
          router.push('/post'); // ユーザーがログインしている場合、/postにリダイレクト
        }
      } catch (error) {
        console.error('Failed to fetch current user:', error);
        setLoading(false);
      }
    };

    fetchCurrentUser();
  }, [router]);

  return { currentUser, loading };
};

export default useCurrentUser;
