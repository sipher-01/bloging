/* eslint-disable react/no-unknown-property */

import { useEffect, useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../firebase/firebase-config";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const Blog = ({isAuth}) => {
  // eslint-disable-next-line no-unused-vars
  const [title, setTitle] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [post, setPost] = useState("");

  const createReferenceToDatabase = collection(db, "posts");
  const navigate = useNavigate();

  // eslint-disable-next-line no-unused-vars
  const createPost = async () => {
    await addDoc(createReferenceToDatabase, {
      title,
      post,
      author: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
    });
    navigate("/");
  };
  useEffect(() => {
    if (!isAuth) {
      navigate("/signin");
    }
    // else{
    //   navigate("/blog")
    // }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className="heading text-center font-bold text-2xl m-5 text-gray-800">
        New Post
      </div>

      <div className="editor mx-auto w-10/12 flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl">
        <label htmlFor="title">Title</label>
        <input
          className="title bg-gray-100 border border-gray-300 p-2 mb-4 outline-none"
          spellCheck="false"
          placeholder="Title"
          type="text"
          id="title"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />

        <label htmlFor="description">Description</label>
        <textarea
          className="description bg-gray-100 sec p-3 h-60 border border-gray-300 outline-none"
          spellCheck="false"
          placeholder="Describe everything about this post here"
          onChange={(e) => {
            setPost(e.target.value);
          }}
        ></textarea>

        <div className="icons flex text-gray-500 m-2">
          <div className="count ml-auto text-gray-400 text-xs font-semibold">
            0/300
          </div>
        </div>
        <div className="buttons flex">
          <div className="btn border border-gray-300 p-1 px-4 font-semibold cursor-pointer text-gray-500 ml-auto">
            Cancel
          </div>
          <div className="btn border border-indigo-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 bg-indigo-500">
            <button onClick={createPost}>Post</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;


