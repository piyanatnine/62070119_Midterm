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
          class={`px-2 ${
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
          class={`px-2 ${tagSelect === val.id ? "text-light fw-bold" : ""}`}
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
      return (<span class="badge rounded-pill m-1" key= {`ctgB-${ value[0].id }`} style={{backgroundColor: "#2D4263"}}>• {value[0].name}</span>);
    })
  }

  const TagBadges = (props) => {
    return props.tagId.map((id) => {
      var value = tag.filter((val) => {
        return val.id === id;
      })
      return (<span class="badge rounded-pill mx-1" key= {`tagB-${ value[0].id }`} style={{backgroundColor: "#461111"}}>• {value[0].name}</span>);
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
      if ((categorySelect === -1 || val.categories.includes(categorySelect)) && (tagSelect === -1 || val.tags.includes(tagSelect)) && (val.title.rendered.includes(search)))
        return (
            <div class="col-6" key= {`pst-${ val.id }`} >
              <Link to={`/post/${val.id}`} style={{ textDecoration: "none"}}>
              <div class="card mb-3" style={{ height: "180px" }}>
                <div class="row g-0" style={{ height: "100%", backgroundColor: "#FBF8F1" }}>
                  <div class={`col ${"status-"+val.status} rounded-start` } ></div>
                  <div class="col-md-11 ">
                    <div class="card-body ">
                      <div class="row mx-1">
                        <h5 class="card-title col-12 text-black fw-bold fs-5" >
                          {val.title.rendered}
                        </h5>
                        <label class="col fw-bolder" style={{ color: "#524A4E" }}>{"Author: "}
                          <label class="fw-bold" style={{ color: "#362706" }}>{findAuthor(val.author)}</label>
                        </label>
                      </div>
                      <div class="position-absolute bottom-0 mb-2 mx-1">
                        <div class="row">
                          <div class="col-12">
                            <CategoryBadges categoryId={val.categories}/>
                          </div> 
                        </div>
                          <div class="col-12">
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
      class="bg-dark"
      style={{ height: "100%" , overflow: "auto", width: "100%", position: "absolute" }}
    >
      <div class="container my-5">
        <div
          class="py-4 px-5 kanitFont"
          style={{
            backgroundColor: "#1F292E",
            color: "white",
            fontSize: "2vh",
          }}
        >
          Search Posts
        </div>
        <div class="bg-secondary">
          <div
            class="p-5 bg-img"
            style={{
              color: "rgb(49,55,59)",
              backgroundImage: `url(${background})`,
              opacity: "0.6",
            }}
          >
            <input
              class="form-control p-2 kanitFont"
              type="textbox"
              name="search"
              placeholder="ค้นหาด้วยชื่อกระทู้..."
              onChange={(event) => setSearch(event.target.value)}
            />
            <div class="row pt-4">
              <div class="col-1 fw-bold text-white">
                <p>หมวดหมู่</p>
              </div>
              <div class="col" style={{ color: "#B8D3C5" }}>
                <CategorySelection />
              </div>
            </div>
            <div class="row">
              <div class="col-1 fw-bold text-white">
                <p>ประเภท</p>
              </div>
              <div class="col" style={{ color: "#B8D3C5" }}>
                <TagSelection />
              </div>
            </div>
          </div>
        </div>
        <div
          class="mt-2 py-4"
          style={{ backgroundColor: "rgb(46,53,56)" }}
        ></div>
        <div
          class="my-1"
          style={{ backgroundColor: "rgb(34,40,42)", height: "100vh" }}
        >
          <div class="row py-3">
            <PostHearder/>
          </div>
        </div>
      </div>
    </div>
  );
}
