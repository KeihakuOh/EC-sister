// import Link from 'next/link';
// import useCurrentUser from '../hooks/current-user';
// import useRequest from '../hooks/use-request'; // useRequestフックをインポート
// import { useRouter } from 'next/router';

// const Navbar = () => {
//   const { currentUser, loading } = useCurrentUser();
//   const router = useRouter();

//   const { doRequest } = useRequest({
//     url: 'http://localhost:5000/logout',
//     method: 'post',
//     body: {},
//     onSuccess: () => router.push('/')
//   });

//   // ローディング中は何も表示しない
//   if (loading) return null;

//   const handleSignOut = () => {
//     doRequest(); // サインアウトのリクエストを実行
//   };

//   const links = [
//     !currentUser && { label: 'Sign Up', href: '/auth/signup' },
//     !currentUser && { label: 'Login', href: '/auth/login' },
//     currentUser && { label: 'Sign Out', href: '#', onClick: handleSignOut }, // サインアウトリンクのonClickイベント
//   ]
//     .filter((linkConfig) => linkConfig)
//     .map(({ label, href, onClick }) => {
//       return (
//         <li key={href} className="nav-item">
//           {onClick ? (
//             <a onClick={onClick} className="nav-link" style={{ cursor: 'pointer' }}>
//               {label}
//             </a>
//           ) : (
//             <Link href={href} className="nav-link">
//               {label}
//             </Link>
//           )}
//         </li>
//       );
//     });

//   return (
//     <nav className="navbar navbar-light bg-light">
//       <Link href="/" className="navbar-brand">
//         EC-Sister
//       </Link>
//       <div className="d-flex justify-content-end">
//         <ul className="nav d-flex align-items-center">{links}</ul>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import Link from 'next/link';

export default ({ currentUser }) => {
  const links = [
    !currentUser && { label: 'Sign Up', href: '/auth/signup' },
    !currentUser && { label: 'Login', href: '/auth/login' },
    currentUser && { label: 'Sign Out', href: '/auth/signout' },
  ]
    .filter((linkConfig) => linkConfig)
    .map(({ label, href }) => {
      return (
        <li key={href} className="nav-item">
          <Link className="nav-link" href={href}>
            {label}
          </Link>
        </li>
      );
    });

  return (
    <nav className="navbar navbar-light bg-light">
      <Link className="navbar-brand" href="/">
        EC-Sister
      </Link>

      <div className="d-flex justify-content-end">
        <ul className="nav d-flex align-items-center">{links}</ul>
      </div>
    </nav>
  );
};
