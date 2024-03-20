import React, { useEffect, useState } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { MyCard } from "../components";

export default function MyCollection() {
  const [myPictures, setMyPictures] = useState();
  const fetchMyCollection = () => {
    const q = query(
      collection(db, "Posts"),
      where("user", "==", "/Users/" + localStorage.uid),
    );
    const myCollection = onSnapshot(q, (querySnapshot) => {
      const pictures = [];
      querySnapshot.forEach((doc) => {
        pictures.push(doc.data());
      });
      setMyPictures(pictures);
    });
  };
  useEffect(() => {
    fetchMyCollection();
  }, []);
  return (
    <content className="flex w-full flex-wrap items-center justify-center gap-5 py-2 lg:justify-evenly">
      {myPictures?.map((picture, index) => (
        <MyCard picture={picture} key={`${index}${picture.id}`} />
      ))}
    </content>
  );
}
