import Link from 'next/link';
import React from 'react';
import { fetchPost } from '../hooks/usePost';
import { usePosts } from '../hooks/usePosts';

const Posts = () => {
  const posts = usePosts();

  return (
    <div>
      <h1>Posts</h1>
      {posts.isFetched ? (
        <ul>
          {posts.data!.map((post) => (
            <li key={post.id} onMouseEnter={() => {
              queryClient?.prefetchQuery(['post', String(post.id)], () => {
                return fetchPost(String(post.id));
              }, {staleTime: 1000 * 60 * 10})
            }}>
              <Link href={`/posts/${post.id}`}>
                <a>{post.title}</a>
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
