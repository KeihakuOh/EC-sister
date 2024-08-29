import React, { useEffect } from 'react';
import Router from 'next/router';
import useRequest from '../../hooks/use-request';

const SignOut = () => {
  const { doRequest } = useRequest({
    url: 'http://localhost:5000/logout',
    method: 'post',
    body: {},
    onSuccess: () => Router.push('/'), // ログアウト成功後、ホームページにリダイレクト
  });

  useEffect(() => {
    doRequest(); // コンポーネントがマウントされたときにリクエストを送信
  }, []);

  return <div>Signing you out...</div>;
};

export default SignOut;
