import React, { useEffect, useState } from "react";
import { collection, query, where, onSnapshot, doc } from "firebase/firestore";
import { db } from "../firebase";
import { MyCard } from "../components";

export default function MyCollection() {
  const [myPictures, setMyPictures] = useState();

  const fetchMyCollection = () => {
    const unsubscribeFns = [];

    const q = query(
      collection(db, "Posts"),
      where("user", "==", "/Users/" + localStorage.uid),
    );
    const unsubscribePosts = onSnapshot(q, (querySnapshot) => {
      const collections = [];
      querySnapshot.forEach((d) => {
        let data = d.data();
        data.id = d.id;
        collections.push(data);
      });
      setMyPictures(collections);
    });
    unsubscribeFns.push(unsubscribePosts);

    return () => unsubscribeFns.forEach((fn) => fn());
  };
  useEffect(() => {
    const unsubscribe = fetchMyCollection();
    return () => unsubscribe();
  }, []);
  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-5 py-2 lg:justify-evenly">
      {myPictures?.map((picture, index) => (
        <MyCard picture={picture} key={`${index}${picture.id}`} />
      ))}
    </div>
  );
}
