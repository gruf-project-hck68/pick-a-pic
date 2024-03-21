import React, { useContext, useEffect, useState } from "react";
import { SwalError, SwalSuccess } from "./Alert";
import {
  deleteDoc,
  doc,
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { ThemeContext } from "../context/ThemeContext";
import CommentBox from "./CommentBox";
import { db } from "../firebase";

export default function MyCard({ picture }) {
  const { id, imageUrl, pexelId, title, content, Comments } = picture;
  const { theme, currentTheme, setCurrentTheme } = useContext(ThemeContext);
  const [comments, setComments] = useState([]);
  const bgColor = theme[currentTheme].bgColor;
  const border = theme[currentTheme].border;

  const handleDelete = async () => {
    try {
      console.log(title, "<< title");
      await deleteDoc(doc(db, "Posts", id));
      SwalSuccess(
        "Success Delete",
        `${title} Has Been Deleted From Your Collection`,
      );
    } catch (error) {
      SwalError(error);
    }
  };

  const fetchComments = () => {
    const q = query(
      collection(db, "Comments"),
      where("postId", "==", "/Posts/" + id),
      orderBy("createdAt", "desc"),
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const commentsArray = [];
      querySnapshot.forEach((doc) => {
        commentsArray.push(doc.data());
      });
      setComments(commentsArray);
    });

    return () => unsubscribe();
  };

  useEffect(() => {
    const unsubscribe = fetchComments();
    return unsubscribe;
  }, []);

  //

  return (
    <div
      className={`group flex h-[36rem] min-h-72 w-4/5 overflow-clip rounded-xl border ${border} bg-base-100 shadow-xl lg:card-side lg:max-h-[36rem] lg:w-1/2 lg:max-w-[40%]`}
    >
      <div className={`relative w-1/2 ${border} border-e`}>
        <div className="absolute hidden h-full w-full items-center justify-center bg-gradient-to-t from-black from-[-70%] to-[150%] py-5 group-hover:flex">
          <div className="flex w-4/5 flex-col items-center gap-5">
            <p className="text-2xl font-semibold">{title}</p>
            <p className="text-lg font-semibold">{content}</p>
          </div>
        </div>
        <div
          className="flex h-full w-full items-end justify-center bg-cover py-5"
          style={{ backgroundImage: `url(${imageUrl})` }}
        >
          <button
            className="btn btn-warning z-50 hidden group-hover:flex"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>

      <div className="bottom-0 flex w-1/2 max-w-[50%] flex-col justify-between">
        <div className="flex h-[92%] flex-col items-center px-5 pt-5">
          <p className={`sticky top-0 mb-3 w-full bg-inherit text-center text-xl font-semibold`}>
            Comment
          </p>
          <div className="overflow-clip text-pretty hover:overflow-auto w-full">
            {comments?.map((el, index) => {
              return (
                <p
                  className={`my-2 line-clamp-2 hover:line-clamp-none`}
                  key={index}
                >
                  {el.comment}
                </p>
              );
            })}
          </div>
        </div>
        <CommentBox id={id} />
      </div>
    </div>
  );
}
