import type { NextPage } from 'next';
import PostData from '../components/PostData';
import Posts from '../components/Posts';

const Home: NextPage = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', minHeight: '100vh' }}>
      <PostData />
      <Posts />
    </div>
  );
};

export default Home;
