import type { NextPage } from 'next';
import CreatePost from '../components/CreatePost';
import PostData from '../components/PostData';
import Posts from '../components/Posts';

const Home: NextPage = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', minHeight: '100vh' }}>
      <PostData />
      <div>
        <CreatePost />
        <Posts />
      </div>
    </div>
  );
};

export default Home;
