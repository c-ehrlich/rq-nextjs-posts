import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { FC, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import PostComponent from '../../components/Post';
import PostData from '../../components/PostData';
import { usePost } from '../../hooks/usePost';
import Post from '../../types/Post';

const PostPage: FC = () => {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState<string>('');
  const [text, setText] = useState<string>('');
  const handleEditButtonClick = (e: React.FormEvent, title: string, text: string) => {
    e.preventDefault();
    editPost.mutate({ title, text })
    setTitle('');
    setText('');
  }

  const editPost = useMutation((editedPost: Partial<Post>) => {
    return axios.patch(`/api/posts/${post.data!.id}`, editedPost)
  },
  {
    onMutate: (newPost) => {
      const tempPost = {
        id: post.data?.id || 0,
        title: newPost.title || post.data!.title,
        text: newPost.text || post.data!.text,
        createdAt: post.data?.createdAt || 0,
        updatedAt: post.data?.updatedAt || 0,
      }
      queryClient.setQueryData<Post>(['post', String(post.data!.id)], () => {
        return tempPost;
      })
    },
    onError: (error: any) => window.alert(JSON.stringify(error.response)),
    onSettled: () => queryClient.invalidateQueries(['post', String(post.data?.id)])
  })

  let { query } = useRouter();
  let postId = query.id || 0;
  const post = usePost(String(postId));

  return (
    <div style={{ display: 'flex', flexDirection: 'row', minHeight: '100vh' }}>
      <PostData />
      <div>
        <Link href='/' passHref>
          <button style={{ margin: '8px', padding: '8px' }}>Back</button>
        </Link>
        {post.data ? <PostComponent post={post.data} /> : <div>fetching</div>}
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
    </div>
  );
};

export default PostPage;
