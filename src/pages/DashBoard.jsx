import React, { useEffect } from 'react';
import DashSidebar from '../components/DashSidebar';
import { useState } from 'react';
import DashProfile from '../components/DashProfile';
import { useLocation } from 'react-router-dom';

const DashBoard = () => {
  const location = useLocation();
  const [tab, setTab] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  return (
    <div className='flex min-h-screen flex-col md:flex-row'>
      <div className='md:w-[250px]'>
          {/* left */}
          <DashSidebar />
      </div>
          {/* right */}
          {tab === 'profile' && <DashProfile />}
        </div>
  );
};

export default DashBoard;