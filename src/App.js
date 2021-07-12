import './App.css';
import { CreatePost } from './components/CreatePost';
import { DisplayPosts } from './components/DisplayPost';

function App() {
  return (
    <div className="App">
      <CreatePost />
      <DisplayPosts />
    </div>
  );
}

export default App;
