import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

export default function PostList() {
  const { posts, loading } = useContext(AppContext);
  if (loading) return <p>Loading...</p>;
  return (
    <div>
      <h2>Posts</h2>
      {posts.length === 0 && <p>No posts yet</p>}
      <ul>
        {posts.map(p => (
          <li key={p._id}>
            <Link to={`/post/${p._id}`}>{p.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
