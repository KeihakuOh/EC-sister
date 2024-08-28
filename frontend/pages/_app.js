import 'bootstrap/dist/css/bootstrap.css';
import Header from '../components/header';

const AppComponent = ({ Component, currentUser }) => {
  return (
    <div>
      <Header currentUser = {currentUser}/>
      <Component />
    </div>
  );
};

export default AppComponent;
