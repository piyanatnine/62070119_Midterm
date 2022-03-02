import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function AuthorProfile() {
  const { authorId } = useParams();
  const [author, setAuthor] = useState([]);
  const [post, setPost] = useState([]);

  const getAuthor = async (id) => {
    const data = await axios.get(
      `https://fswd-wp.devnss.com/wp-json/wp/v2/users/${id}`
    );

    setAuthor(data.data);
  };

  const Posts = () => {
      return post.map((val, index) => {
        return (
        <div className="col-5 mx-4 my-2">
            <Link to={`/post/${val.id}`} style={{ textDecoration: "none"}}>
              <div className="card mb-3 cardPost" style={{ height: "12vh" }}>
                <div className="row g-0" style={{ height: "100%", backgroundColor: "#FBF8F1" }}>
                  <div className={`col ${"status-"+val.status} rounded-start` } ></div>
                  <div className="col-md-11 ">
                    <div className="card-body ">
                      <div className="row mx-1">
                        <h5 className="card-title col-12 text-black fw-bold fs-5" >
                          {val.title.rendered}
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              </Link>
        </div>)
      })
  }

  const getPostAuthor = async (id) => {
    const data = await axios.get(
      `https://fswd-wp.devnss.com/wp-json/wp/v2/posts`
    );

    const postAuthor = data.data.filter( (value) => {
        return value.author === parseInt(id);
    })
    setPost(postAuthor);
  };

  const Profile = () => {
    const isEmpty = Object.keys(author).length === 0;
    if (!isEmpty) {
      return (
        <div className="container mt-5">
          <div className="row">
            <div className="col-3 px-5 kanit-font" style={{backgroundColor: "#1F292E", color: "white"}}>
              <div className="pt-5">
                <img
                  className="rounded-circle"
                  src={`${author.avatar_urls[96]}`}
                  alt="user"
                  width="200"
                />
              </div>
              <div className="px-4 py-2 fw-bold">
                <label> <label className="fs-3">{author.name}</label> {" ("+author.slug+") "} </label>
              </div>
              <p className="bg-white p-1 rounded mt-1"></p>
              <div className="p-3">
                <h5>Description</h5>
                <p></p>
                <div className="rounded" style={{height: "30vh", overflow: "auto", border: "solid 0.5px white"}}>
                    <p className="fs-5 fw-light px-2">{author.description === "" ? "description...":author.description}</p>
                </div>
              </div>
            </div>
            <div className="col mx-3 px-5 kanit-font" style={{backgroundColor: "#1F292E", color: "white"}}>
                <div className="pt-5">
                    <h2 className="mb-3 fw-bold">Collection Posts</h2>
                    <div className="row">
                        <Posts/>
                    </div>
                    
                </div>
            </div>
          </div>
        </div>
      );
    }
    else {
        return <></>
    }
  };

  useEffect(() => {
    getAuthor(authorId);
    getPostAuthor(authorId);
  }, [authorId]);

  return (
    <div className="bg-dark fullscreen main" style={{ overflow: "auto" }}>
      <Profile />
    </div>
  );
}
