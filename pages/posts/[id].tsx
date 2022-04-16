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
  let { query } = useRouter();
  let postId = query.id || 0;
  const post = usePost(String(postId));

  return (
    <div style={{ display: 'flex', flexDirection: 'row', minHeight: '100vh' }}>
      <PostData />
      <div>
        <Link href='/' passHref>
          <button style={{ marginTop: '8px', padding: '8px' }}>« Back</button>
        </Link>
        {post.data ? <PostComponent post={post.data} /> : <div>fetching</div>}
      </div>
    </div>
  );
};

export default PostPage;
