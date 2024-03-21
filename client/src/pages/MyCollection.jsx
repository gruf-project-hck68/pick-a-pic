import React, { useEffect, useState, useContext } from "react";
import { collection, query, where, onSnapshot, doc } from "firebase/firestore";
import { db } from "../firebase";
import { MyCard } from "../components";
import { ThemeContext } from "../context/ThemeContext";

export default function MyCollection() {
  const [myPictures, setMyPictures] = useState();
  const { theme, currentTheme, setCurrentTheme } = useContext(ThemeContext);
  const bgColor = theme[currentTheme].bgColor;
  const border = theme[currentTheme].border;

  const fetchMyCollection = () => {
    const unsubscribeFns = [];
    const q = query(
      collection(db, "Posts"),
      where("user", "==", "/Users/" + localStorage.uid),
    );
    const myCollection = onSnapshot(q, (querySnapshot) => {
      const collections = [];
      querySnapshot.forEach((doc) => {
        const picture = doc.data();
        picture.id = doc.id;
        collections.push(picture);
      });
      setMyPictures(collections);
    });
    unsubscribeFns.push(myCollection);
    return () => unsubscribeFns.forEach((fn) => fn());
  };

  useEffect(() => {
    const unsubscribe = fetchMyCollection();
    return () => unsubscribe();
  }, []);

  return (
    <div
      className={`flex w-full flex-wrap items-center ${bgColor} justify-center gap-5 py-2 lg:justify-evenly`}
    >
      {myPictures?.map((picture, index) => (
        <MyCard picture={picture} key={`${index}${picture.id}`} />
      ))}
    </div>
  );
}
