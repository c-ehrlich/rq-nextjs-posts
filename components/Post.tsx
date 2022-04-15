import axios from 'axios';
import { useRouter } from 'next/router';
import React from 'react';
import { useMutation, useQueryClient } from 'react-query';
import Post from '../types/Post';

const Post = ({ post }: { post: Post }) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const handleDelete = () => {
    console.log('delete');
    const deletedPost = deleteMutation.mutate(String(post.id));
    queryClient.invalidateQueries(['posts']);
    router.push('/');
  }

  const deleteMutation = useMutation((postId: string) => {
    return axios.delete(`/api/posts/${postId}`)
  },{
    onMutate: (deletedPostId) => {
      queryClient.setQueryData<Post[]>(['posts'], (oldPosts) => {
        if (!oldPosts) return [];
        return [...oldPosts.filter(post => post.id !== Number(deletedPostId))];
      })
    },
    onSettled: () => queryClient.invalidateQueries(['posts']),
  })

  return (
    <div>
      <h1>
        {post.id} - {post.title}
      </h1>
      <div>{post.text}</div>
      <div>Created: {post.createdAt}</div>
      <div>Updated: {post.updatedAt}</div>
      <button style={{ margin: '8px', padding: '8px' }} onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
};

export default Post;
