import React, { useEffect, useState } from "react";
import axios from "axios";
import background from "../assets/bg-img.png";
import { Link } from "react-router-dom";

export default function Category() {
  const [category, setCategory] = useState([]);
  const [categorySelect, setCategorySelect] = useState(-1);

  const [tag, setTag] = useState([]);
  const [tagSelect, setTagSelect] = useState(-1);

  const [author, setAuthor] = useState([]);
  const [post, setPost] = useState([]);
  const [search, setSearch] = useState("")
  
  const CategorySelection = () => {
    return category.map((val) => {
      return (
        <label
          key= {`ctg-${ val.id }`}
          className={`px-2 ${
            categorySelect === val.id ? "text-light fw-bold" : ""
          }`}
          onClick={() => {
            if (categorySelect !== val.id) {
              setCategorySelect(val.id);
            } else {
              setCategorySelect(-1);
            }
          }}
        >
          {val.name}
        </label>
      );
    });
  };

  const TagSelection = () => {
    return tag.map((val) => {
      return (
        <label
          key= {`tag-${ val.id }`}
          className={`px-2 ${tagSelect === val.id ? "text-light fw-bold" : ""}`}
          onClick={() => {
            if (tagSelect !== val.id) {
              setTagSelect(val.id);
            } else {
              setTagSelect(-1);
            }
          }}
        >
          {val.name}
        </label>
      );
    });
  };

  const CategoryBadges = (props) => {
    return props.categoryId.map((id) => {
      var value = category.filter((val) => {
        return val.id === id;
      })
      return (<span className="badge rounded-pill m-1" key= {`ctgB-${ value[0].id }`} style={{backgroundColor: "#2D4263"}}>• {value[0].name}</span>);
    })
  }

  const TagBadges = (props) => {
    return props.tagId.map((id) => {
      var value = tag.filter((val) => {
        return val.id === id;
      })
      return (<span className="badge rounded-pill mx-1" key= {`tagB-${ value[0].id }`} style={{backgroundColor: "#461111"}}>• {value[0].name}</span>);
    })
  }

  const findAuthor = (user) => {
    var authorValue = author.filter((val) => {
      return val.id === user
    })
    return authorValue[0].name;
  }

  const PostHearder = () => {
    return post.map((val) => {
      if ((categorySelect === -1 || val.categories.includes(categorySelect)) && (tagSelect === -1 || val.tags.includes(tagSelect)) && ((val.title.rendered).toUpperCase().includes(search.toUpperCase())))
        return (
            <div className="col-6" key= {`pst-${ val.id }`} >
              <Link to={`/post/${val.id}`} style={{ textDecoration: "none"}}>
              <div className="card mb-3 cardPost" style={{ height: "180px" }}>
                <div className="row g-0" style={{ height: "100%", backgroundColor: "#FBF8F1" }}>
                  <div className={`col ${"status-"+val.status} rounded-start` } ></div>
                  <div className="col-md-11 ">
                    <div className="card-body ">
                      <div className="row mx-1">
                        <h5 className="card-title col-12 text-black fw-bold fs-5" >
                          {val.title.rendered}
                        </h5>
                        <label className="col fw-bolder" style={{ color: "#524A4E" }}>{"Author: "}
                          <label className="fw-bold" style={{ color: "#362706" }}>{findAuthor(val.author)}</label>
                        </label>
                      </div>
                      <div className="position-absolute bottom-0 mb-2 mx-1">
                        <div className="row">
                          <div className="col-12">
                            <CategoryBadges categoryId={val.categories}/>
                          </div> 
                        </div>
                          <div className="col-12">
                            <TagBadges tagId={val.tags}/>
                          </div> 
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              </Link>
            </div>
        );
      return(<></>)
      });
  }

  const getCategoryData = async () => {
    const data = await axios.get(
      `https://fswd-wp.devnss.com/wp-json/wp/v2/categories`
    );
    setCategory(data.data);
  };

  const getTagData = async () => {
    const data = await axios.get(
      `https://fswd-wp.devnss.com/wp-json/wp/v2/tags`
    );
    setTag(data.data);
  };

  const getPostData = async () => {
    const data = await axios.get(
      `https://fswd-wp.devnss.com/wp-json/wp/v2/posts`
    );
    setPost(data.data);
  };

  const getAuthorData = async () => {
    const data = await axios.get(
      `https://fswd-wp.devnss.com/wp-json/wp/v2/users`
    );
    setAuthor(data.data);
  };

  useEffect(() => {   
    getCategoryData();
    getTagData();
    getPostData();
    getAuthorData();
  }, []);

  return (
    <div
      className="bg-dark fullscreen main"
      style={{ overflow: "auto"}}
    >
      <div className="container my-5 ">
        <div
          className="py-4 px-5 kanitFont"
          style={{
            backgroundColor: "#1F292E",
            color: "white",
            fontSize: "2vh",
          }}
        >
          Search Posts
        </div>
        <div className="bg-secondary">
          <div
            className="p-5 bg-img"
            style={{
              color: "rgb(49,55,59)",
              backgroundImage: `url(${background})`,
              opacity: "0.6",
            }}
          >
            <input
              className="form-control p-2 kanitFont"
              type="textbox"
              name="search"
              placeholder="type in keywords..."
              onChange={(event) => setSearch(event.target.value)}
            />
            <div className="row pt-4">
              <div className="col-1 fw-bold text-white">
                <p>Categorys</p>
              </div>
              <div className="col" style={{ color: "#B8D3C5" }}>
                <CategorySelection />
              </div>
            </div>
            <div className="row">
              <div className="col-1 fw-bold text-white">
                <p>Tags</p>
              </div>
              <div className="col" style={{ color: "#B8D3C5" }}>
                <TagSelection />
              </div>
            </div>
          </div>
        </div>
        <div
          className="mt-2 py-4"
          style={{ backgroundColor: "rgb(46,53,56)" }}
        ></div>
        <div
          className="my-1"
          style={{ backgroundColor: "rgb(34,40,42)" }}
        >
          <div className="row py-3">
            <PostHearder/>
          </div>
        </div>
      </div>
    </div>
  );
}
