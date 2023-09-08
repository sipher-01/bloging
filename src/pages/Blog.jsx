/* eslint-disable react/no-unknown-property */

import { useEffect, useState } from "react";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase-config";
import { useNavigate } from "react-router-dom";
import { storage } from "../firebase/firebase-config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
// eslint-disable-next-line react/prop-types
const Blog = ({ isAuth }) => {
  // eslint-disable-next-line no-unused-vars
  const [title, setTitle] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [post, setPost] = useState("");
  const [imageUpload, setImageUpload] = useState(null);

  const createReferenceToDatabase = collection(db, "posts");
  const navigate = useNavigate();

  // eslint-disable-next-line no-unused-vars
  const createPost = async () => {
    const postRef = await addDoc(createReferenceToDatabase, {
      title,
      post,
      author: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
    });
    if (imageUpload){
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
      await uploadBytes(imageRef, imageUpload);
      const url = await getDownloadURL(imageRef)
      await setDoc(doc(db,"posts",postRef.id),{imageUrl:url},{merge:true});
    }
    navigate("/");
  };

  useEffect(() => {
    if (!isAuth) {
      navigate("/signin");
    }
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
          <div className="count ml-auto text-gray-400 text-xs font-semibold">
            0/300
          </div>
        <label htmlFor="thumbnail" className="mt-3">
          Thumbnail
        </label>
          <input
            id="thumbnail"
            className=" bg-gray-100 border border-gray-300 p-2  outine-none grow"
            type="file"
            onChange={(e) => setImageUpload(e.target.files[0])}
          ></input>
        <div className="icons flex text-gray-500 m-2">
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
