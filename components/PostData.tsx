import React from 'react';
import { usePosts } from '../hooks/usePosts';

const PostData = () => {
  const posts = usePosts();
  return (
    <div
      style={{
        borderRight: '1px solid black',
        marginLeft: '8px',
        marginRight: '8px',
        paddingRight: '8px',
      }}
    >
      <h3>Post stats</h3>
      <div>{posts.isSuccess ? `count: ${posts.data.length}` : '...'}</div>
    </div>
  );
};

export default PostData;
