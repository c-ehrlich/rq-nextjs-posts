import axios from 'axios';
import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';

const CreatePost = () => {
  const [title, setTitle] = useState<string>('');
  const [text, setText] = useState<string>('');

  const queryClient = useQueryClient();

  const createPost = useMutation((newPost: Partial<Post>) => {
    return axios.post('/api/posts', newPost);
  }, {
    onError: (error: any) => window.alert(error.response),
    onSettled: () => queryClient.invalidateQueries(['posts'])
  })

  const handleButtonClick = (e: React.FormEvent, title: string, text: string) => {
    e.preventDefault();
    createPost.mutate({ title, text })
  }

  return (
    <div style={{ minWidth: '400px' }}>
      <h2>New Post</h2>
      <form style={{ display: 'flex', flexDirection: 'column' }}>
        <label htmlFor='title'>Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          name='title'
          type='text'
          placeholder='title'
        />
        <label htmlFor='text'>Text</label>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          name='text'
          type='text'
          placeholder='text'
        />
        <button onClick={(e) => handleButtonClick(e, title, text)} style={{ marginTop: '8px' }}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
