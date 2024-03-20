import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchPexelAPI } from "../utils";
import { SwalError } from "../components/Alert";
import { Card, MyCard } from "../components";
import { db } from "../firebase";
import { collection, doc, onSnapshot, query } from "firebase/firestore";

export default function Collection() {
  const [pictures, setPictures] = useState([]);

  const fetchAllCollection = () => {
    const q = query(collection(db, "Posts"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const posts = [];
      querySnapshot.forEach((doc) => {
        posts.push(doc.data());
      });
      console.log(posts);
      setPictures(posts);
    });
  };

  useEffect(() => {
    fetchAllCollection();
    console.log(pictures);
  }, []);

  return (
    <content className="flex w-full flex-wrap items-center justify-center gap-5 lg:justify-evenly py-2">
      {pictures?.map((picture, index) => (
        <MyCard picture={picture} key={`${index}${picture.id}`} />
      ))}
    </content>
  );
}
