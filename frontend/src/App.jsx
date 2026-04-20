import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Home from './pages/home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminPortal from './pages/AdminPortal';
import AdminPending from './pages/AdminPending';
import AdminDashboard from './pages/AdminDashboard';
import AdminLeaderboard from './pages/AdminLeaderboard';
import UserWorks from './pages/UserWorks';
import LeaderboardPage from './pages/LeaderboardPage';
import LiveFeed from './pages/LiveFeed';
import Loading from './components/Loading';
import Account from './pages/Account';


import React from 'react';
import { useStore } from './store/useStore';

function App() {
  const { fetchMe, token, fetchLeaderboard } = useStore();

  React.useEffect(() => {
    fetchLeaderboard();
    if (token) {
      fetchMe();
    }
  }, [token, fetchMe, fetchLeaderboard]);

  return (
    <BrowserRouter>
      <Toaster position="bottom-center" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin" element={<AdminPortal />} />
        <Route path="/admin/feed" element={<LiveFeed />} />
        <Route path="/user-works" element={<UserWorks />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/pending" element={<AdminPending />} />
        <Route path="/admin/leaderboard" element={<AdminLeaderboard />} />
        <Route path="/loading" element={<Loading />} />
        <Route path="/account" element={<Account />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;