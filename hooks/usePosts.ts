import axios from 'axios';
import { useQuery } from 'react-query';

const fetchPosts = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const posts: Post[] = await axios
    .get('http://localhost:3000/api/posts')
    .then((res) => res.data);
  return posts;
};

export function usePosts() {
  const posts = useQuery<Post[]>(['posts'], fetchPosts, {
    staleTime: 1000 * 10,
  });
  return posts;
}
