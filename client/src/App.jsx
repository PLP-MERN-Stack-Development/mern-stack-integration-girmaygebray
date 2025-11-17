import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import Home from './pages/Home';
import PostView from './components/PostView';
import PostForm from './components/PostForm';
import Login from './components/Login';
import Register from './components/Register';

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <nav style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
          <Link to="/">Home</Link> | <Link to="/create">Create</Link>
        </nav>
        <div style={{ padding: '16px' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/post/:id" element={<PostView />} />
            <Route path="/create" element={<PostForm />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}


function NavBar() {
  const token = localStorage.getItem('token');
  const userJson = localStorage.getItem('user');
  const user = userJson ? JSON.parse(userJson) : null;
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
  };
  return (
    <nav style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
      <a href="/">Home</a> | <a href="/create">Create</a>
      {user ? (
        <span style={{ marginLeft: 12 }}>Welcome, {user.name} <button onClick={handleLogout}>Logout</button></span>
      ) : (
        <span style={{ marginLeft: 12 }}><a href="/login">Login</a> | <a href="/register">Register</a></span>
      )}
    </nav>
  );
}
