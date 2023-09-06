/* eslint-disable react/jsx-key */
import { getDocs, collection, doc, deleteDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, db } from "../firebase/firebase-config";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const createReferenceToDatabase = collection(db, "posts");
  useEffect(() => {
    const getData = async () => {
      try {
        const data = await getDocs(createReferenceToDatabase);
        setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        /* The line `console.log(data.docs.map((doc)=>({...doc.data(),id:doc.id})));` is logging the
        data retrieved from the Firestore database. */
        // console.log(data.docs.map((doc)=>({...doc.data(),id:doc.id})));
      } catch (e) {
        console.error(e);
      }
    };
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  });
  const deletePost=async(id)=>{
    const postDoc=  doc(db,"posts",id);
    await deleteDoc(postDoc);
  }
  return (
    <div>
      {posts.map((post) => {
        // eslint-disable-next-line react/jsx-key
        return (
          <div className=" p-4 m-4 border shadow-sm mx-auto max-w-2xl">
            <div className="flex">
              <h2 className="font-semibold capitalize text-lg ">
                {post.title}
              </h2>
              {post.author.id===auth.currentUser.uid&&<button className="ml-auto" 
              onClick={()=>{deletePost(post.id)}}>&#128465;</button>}
            </div>
            <div className="my-3 ">{post.post}</div>
            <h4 className="text-sm">@{post.author.name}</h4>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
