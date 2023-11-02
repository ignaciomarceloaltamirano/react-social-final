/* eslint-disable react/prop-types */
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import { getCurrentUser } from '../services/auth.service';

const RootLayout = ({ handleChange }) => {
  const user = getCurrentUser();
  return (
    <main>
      <Navbar handleChange={handleChange} user={user} />
      <Outlet />
    </main>
  );
};

export default RootLayout;
