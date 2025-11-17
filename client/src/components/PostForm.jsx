import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

export default function PostForm() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const { createPost } = useContext(AppContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { title, body };
      const created = await createPost(payload);
      navigate(`/post/${created._id}`);
    } catch (err) {
      alert('Failed to create post');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title</label>
        <input value={title} onChange={e => setTitle(e.target.value)} required />
      </div>
      <div>
        <label>Body</label>
        <textarea value={body} onChange={e => setBody(e.target.value)} required />
      </div>
      <button type="submit">Create</button>
    </form>
  );
}
