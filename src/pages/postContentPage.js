import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import axios from "axios";

export default function PostContent() {
    let { postId } = useParams();
    const [ post, setPost ] = useState({})
    
    const getPostData = async (id) => {
        const data = await axios.get(
          `https://fswd-wp.devnss.com/wp-json/wp/v2/posts/${id}`
        );
        setPost(data.data);
    };

    const Card = () => {
        const isEmpty = Object.keys(post).length === 0
        if (!isEmpty)
            return (
                <div class>
                    {post.title.rendered}
                </div>
            );

        return <></>     
    }

    useEffect( () => {
        getPostData(postId);
    },[])

    return (
        <div>
            <Card/>
        </div>
    );
}