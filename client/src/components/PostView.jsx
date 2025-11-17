import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useApi from '../hooks/useApi';

export default function PostView() {
  const { id } = useParams();
  const { request, loading, error } = useApi();
  const [post, setPost] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await request({ url: `/posts/${id}`, method: 'get' });
        setPost(data);
      } catch (err) { console.error(err); }
    })();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!post) return <p>Post not found</p>;

  return (
    <article>
      <h1>{post.title}</h1>
      <p>By {post.author}</p>
      <div dangerouslySetInnerHTML={{ __html: post.body }} />
    </article>
  );
}
