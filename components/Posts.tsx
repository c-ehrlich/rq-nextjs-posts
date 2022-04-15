import Link from 'next/link';
import React from 'react';
import { usePosts } from '../hooks/usePosts';

const Posts = () => {
  const posts = usePosts();

  return (
    <div>
      <h1>Posts</h1>
      {posts.isFetched ? (
        <ul>
          {posts.data!.map((post) => (
            <li key={post.id}>
              <Link href={`/posts/${post.id}`}>
              <a>
                {post.title}
              </a>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <div>fetching...</div>
      )}
    </div>
  );
};

export default Posts;
