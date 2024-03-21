import { useEffect, useState } from "react";
import { db } from "../src/firebase";
import { onSnapshot, collection } from "firebase/firestore";

const [posts, setPosts] = useState([]);
useEffect(() => {
  onSnapshot(collection(db, "Posts"), (querySnapshot) => {
    let listPost = [];
    querySnapshot.forEach((item) => {
      const post = item.data();
      post.id = item.id;
      listPost.push(post);
    });
    setPosts((prev) => [...listPost]);
  });
}, []);

const [details, setDetails] = useState([]);
const [votes, setVotes] = useState(null);
useEffect(() => {
  const fetchData = async () => {
    const querySnapshot = await getDocs(collection(db, "PostsDetails"));
    const listDetails = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setDetails(listDetails);
  };

  fetchData();
}, []);

useEffect(() => {
  // Menggunakan kondisi untuk memastikan bahwa detail sudah diambil sebelum memproses votes
  if (details.length > 0) {
    const newVotes = details.flatMap((detail) => detail.votes);
    setVotes(newVotes);
  }
}, [details]);
