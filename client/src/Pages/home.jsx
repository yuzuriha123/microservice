import Footer from "../Components/Layout/Footer";
import Navbar from "../Components/Layout/NavBar";

const { useState, useCallback, useEffect } = require("react");
const { default: PostCard } = require("../Components/Card/PostCard");
const { default: Sidebar } = require("../Components/Layout/Sidebar");

function Home() {
  const [posts, setPosts] = useState([]);

  const getPosts = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:4000/posts");
      const data = await response.json();
      setPosts(data.posts);
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  }, []);
  useEffect(() => {
    getPosts();
  }, [getPosts]);
  return (
    <>
     
      <header className="page-header" />
      {/* end of page header */}
      <div className="container">
        <hr />
        <div className="page-container">
          <div className="page-content">
            {posts.map((value, index) => {
              return <PostCard value={value} key={index} />;
            })}

            <button className="btn btn-primary btn-block my-4">
              Load More Posts
            </button>
          </div>
          {/* Sidebar */}
          <Sidebar />
        </div>
      </div>
      
    </>
  );
}
export default Home;
