// /* eslint-disable react/jsx-key */
// import { getDocs, collection, doc, deleteDoc } from "firebase/firestore";
// import { useEffect, useState } from "react";
// import { auth, db, storage } from "../firebase/firebase-config";
// import { deleteObject, ref } from "firebase/storage";

// const Home = () => {
//   const [posts, setPosts] = useState([]);
//   const createReferenceToDatabase = collection(db, "posts");
//   useEffect(() => {
//     const getData = async () => {
//       try {
//         const data = await getDocs(createReferenceToDatabase);
//         setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
//         /* The line `console.log(data.docs.map((doc)=>({...doc.data(),id:doc.id})));` is logging the
//         data retrieved from the Firestore database. */
//         // console.log(data.docs.map((doc)=>({...doc.data(),id:doc.id})));
//       } catch (e) {
//         console.error(e);
//       }
//     };
//     getData();
//   },[]);
//   const deletePost=async(id,url)=>{
//     const imageRef = ref(storage,url);
//     await deleteObject(imageRef);
//     const postDoc=  doc(db,"posts",id);
//     await deleteDoc(postDoc);
//   }
//   return (
//     <div>
//       {posts.map((post) => {
//         // eslint-disable-next-line react/jsx-key
//         console.log(post.imageUrl)
//         return (
//           <div className=" p-4 m-4 border shadow-sm mx-auto max-w-2xl">
//             <div className="flex">
//               <h2 className="font-semibold capitalize text-lg ">
//                 {post?.title}
//               </h2>
//               {post?.author.id===auth.currentUser.uid&&<button className="ml-auto" 
//               onClick={()=>{deletePost(post?.id,post?.imageUrl)}}>&#128465;</button>}
//             </div>
//             <div className="w-48">
//               <img src={post?.imageUrl} alt="image" />
//             </div>
//             <div className="my-3 ">{post?.post}</div>
//             <h4 className="text-sm">@{post?.author.name}</h4>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default Home;
/* eslint-disable react/jsx-key */
import { getDocs, collection, doc, deleteDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, db, storage } from "../firebase/firebase-config";
import { deleteObject, ref } from "firebase/storage";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const createReferenceToDatabase = collection(db, "posts");
  useEffect(() => {
    const getData = async () => {
      try {
        const data = await getDocs(createReferenceToDatabase);
        setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      } catch (e) {
        console.error(e);
      }
    };
    getData();
  }, []);

  const deletePost = async (id, url) => {
    // Optimistic rendering: Remove the post from the UI immediately
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));

    try {
      // Delete the image from Firebase Storage
      const imageRef = ref(storage, url);
      await deleteObject(imageRef);

      // Delete the post from Firestore
      const postDoc = doc(db, "posts", id);
      await deleteDoc(postDoc);
    } catch (error) {
      console.error("Error deleting post:", error);
      // If there's an error, you can handle it here and potentially roll back the UI change.
      // For example, by re-fetching the data and updating the state.
    }
  };

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id} className="p-4 m-4 border shadow-sm mx-auto max-w-2xl">
          <div className="flex">
            <h2 className="font-semibold capitalize text-lg ">{post?.title}</h2>
            {post?.author.id === auth.currentUser.uid && (
              <button
                className="ml-auto"
                onClick={() => {
                  deletePost(post?.id, post?.imageUrl);
                }}
              >
                &#128465;
              </button>
            )}
          </div>
          <div className="w-48">
            <img src={post?.imageUrl} alt="image" />
          </div>
          <div className="my-3 ">{post?.post}</div>
          <h4 className="text-sm">@{post?.author.name}</h4>
        </div>
      ))}
    </div>
  );
};

export default Home;
