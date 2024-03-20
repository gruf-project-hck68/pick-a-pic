import React, { useEffect, useState } from "react";
import { CollectionCard } from "../components";
import { db } from "../firebase";
import { collection, doc, onSnapshot, query } from "firebase/firestore";

export default function Collection() {
  const [pictures, setPictures] = useState([]);

  const fetchAllCollection = () => {
    const unsubscribeFns = [];  
  
    const q = query(collection(db, "Posts"));
    const unsubscribePosts = onSnapshot(q, (querySnapshot) => {
      const collections = [];
      querySnapshot.forEach((d) => {
        let data = d.data();
        data.id = d.id;
        const commentsQuery = query(collection(doc(db, "Posts", d.id), "Comments"));
        const unsubscribeComments = onSnapshot(commentsQuery, (commentsSnapshot) => {
          data.comments = [];
          commentsSnapshot.forEach((commentDoc) => {
            let commentData = commentDoc.data();
            commentData.id = commentDoc.id;
            data.comments.push(commentData);
          });
        });
        collections.push(data);
        unsubscribeFns.push(unsubscribeComments); 
      });
      setPictures(collections);
    });
  
    unsubscribeFns.push(unsubscribePosts); 
  
    return () => unsubscribeFns.forEach(fn => fn());
  };

  useEffect(() => {
    const unsubscribe = fetchAllCollection();
    return () => unsubscribe();  
  }, []);

  return (
    <content className="flex w-full flex-wrap items-center justify-center gap-5 py-2 lg:justify-evenly">
      {pictures?.map((picture, index) => (
        <CollectionCard picture={picture} key={`${index}${picture.id}`} />
      ))}
    </content>
  );
}
