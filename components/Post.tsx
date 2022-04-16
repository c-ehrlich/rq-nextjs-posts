import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import Post from '../types/Post';

const Post = ({ post }: { post: Post }) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [title, setTitle] = useState<string>('');
  const [text, setText] = useState<string>('');

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

  const handleEditButtonClick = (e: React.FormEvent, title: string, text: string) => {
    e.preventDefault();
    editPost.mutate({ title, text })
    setTitle('');
    setText('');
  }

  const editPost = useMutation((editedPost: Partial<Post>) => {
    return axios.patch(`/api/posts/${post.id}`, editedPost)
  },
  {
    onMutate: (newPost) => {
      const tempPost = {
        id: post.id || 0,
        title: newPost.title || post.title,
        text: newPost.text || post.text,
        createdAt: post.createdAt || 0,
        updatedAt: post.updatedAt || 0,
      }
      queryClient.setQueryData<Post>(['post', String(post.id)], () => {
        return tempPost;
      })
    },
    onError: (error: any) => window.alert(JSON.stringify(error.response)),
    onSettled: () => queryClient.invalidateQueries(['post', String(post.id)])
  })

  return (
    <div>
      <h1>
        {post.id} - {post.title}
      </h1>
      <div>{post.text}</div>
      <div>Created: {post.createdAt}</div>
      <div>Updated: {post.updatedAt}</div>
      <button style={{ marginTop: '8px', padding: '8px' }} onClick={handleDelete}>
        Delete
      </button>
      <h3>Edit post</h3>
        <form style={{ display: 'flex', flexDirection: 'column'}}>
          <label htmlFor='title'>Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            name='title'
            placeholder='Title'
            type='text'
          />
          <label htmlFor='text'>Text</label>
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            name='text'
            placeholder='Text'
            type='text'
          />
          <button
            onClick={(e) => handleEditButtonClick(e, title, text)}
            style={{ marginTop: '8px', padding: '8px' }}
          >
            Submit
          </button>
        </form>
    </div>
  );
};

export default Post;
