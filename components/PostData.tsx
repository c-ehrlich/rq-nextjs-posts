import React from 'react';
import { usePosts } from '../hooks/usePosts';

const PostData = () => {
  const posts = usePosts();
  return (
    <div style={{ borderRight: '1px solid black' }}>
      <h3>Post stats</h3>
      <div>{posts.isSuccess ? `count: ${posts.data.length}` : '...'}</div>
    </div>
  );
};

export default PostData;
