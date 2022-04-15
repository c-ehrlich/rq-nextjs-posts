import axios from 'axios';
import { useQuery } from 'react-query';

const fetchPost = async (postId: string) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const post: Post = await axios
    .get(`http://localhost:3000/api/posts/${postId}`)
    .then((res) => res.data);
  return post;
};

export function usePost(postId: string) {
  const post = useQuery<Post>(['post', postId], () => fetchPost(postId), {
    staleTime: 1000 * 10,
  });
  return post;
}
