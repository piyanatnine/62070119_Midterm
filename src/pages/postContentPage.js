import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import CommentPosts from "./commentPost";

export default function PostContent() {
  const { postId } = useParams();
  const [post, setPost] = useState({});
  const [author, setAuthor] = useState([]);

  const getPostData = async(id) => {
    const data = await axios.get(
      `https://fswd-wp.devnss.com/wp-json/wp/v2/posts/${id}`
    )
    getAuthor(data.data._links.author[0].href);
    setPost(data.data);
  }; 

  const getAuthor = async (href) => {
      const data = await axios.get(href);
      setAuthor(data.data);
  };


  const Card = () => {
    const isEmpty  = Object.keys(post).length === 0;
    if (!isEmpty) {
      return (
        <div>
          <div
            className="py-4 px-5 kanitFont"
            style={{
              backgroundColor: "#1F292E",
              color: "white",
            }}
          >
            <div className="row">
              <div className="col-10 fs-3">{post.title.rendered}</div>
              <div className="col-2 text-end fs-5 mt-1">
                <Author/>
              </div>
            </div>
          </div>
          <div className="py-1" style={{ backgroundColor: "rgb(46,53,56)" }}></div>
          <div
            className="post-content text-white p-5"
            style={{ backgroundColor: "#1F292E" }}
            dangerouslySetInnerHTML={{ __html: post.content.rendered }}
          ></div>
        </div>
      );
    } else {
      return <></>;
    }
  };

  const Author = () => {
    return(
      <label>write by • 
        <Link className="px-1"
          to={`/author/${author.id}`}
          style={{  color: "white" }}
        >
          {author.name}
        </Link>
      </label>
    )
  }

  useEffect(() => {
    getPostData(postId)
  }, [postId]);

  return (
    <div className="bg-dark fullscreen main" style={{ overflow: "auto" }}>
      <div className="container bg-secondary my-5">
        <Card />
      </div>
      <div className="bg-grey p-3"></div>
      <CommentPosts postId={postId} /> 
    </div>
  );
}
