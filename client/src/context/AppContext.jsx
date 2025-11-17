import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('user')); } catch(e){ return null; }
  });

  const fetchInitial = async () => {
    setLoading(true);
    try {
      const postsRes = await api.get('/posts');
      const catsRes = await api.get('/categories');
      setPosts(postsRes.data.data || postsRes.data);
      setCategories(catsRes.data);
    } catch (err) { console.error(err); }
    setLoading(false);
  };

  useEffect(() => { fetchInitial(); }, []);

  const createPost = async (payload) => {
    // optimistic update
    const temp = { ...payload, _id: 'temp-' + Date.now(), createdAt: new Date().toISOString() };
    setPosts(prev => [temp, ...prev]);
    try {
      const res = await api.post('/posts', payload);
      setPosts(prev => prev.map(p => p._id === temp._id ? res.data : p));
      return res.data;
    } catch (err) {
      setPosts(prev => prev.filter(p => p._id !== temp._id));
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AppContext.Provider value={{ posts, setPosts, categories, loading, createPost, user, setUser, logout }}>
      {children}
    </AppContext.Provider>
  );
};
