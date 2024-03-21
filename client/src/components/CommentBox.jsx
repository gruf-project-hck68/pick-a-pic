import React, { useContext, useEffect, useState } from "react";
import { SwalError, SwalSuccess } from "./Alert";
import { CiLocationArrow1 } from "react-icons/ci";
import {
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";
import { ThemeContext } from "../context/ThemeContext";

export default function CommentBox({ id }) {
  const { theme, currentTheme, setCurrentTheme } = useContext(ThemeContext);
  const bgColor = theme[currentTheme].bgColor;
  const border = theme[currentTheme].border;
  const [input, setInput] = useState({
    comment: "",
    user: "/Users/" + localStorage.uid,
  });
  const submitComment = async (e) => {
    e.preventDefault();
    try {
      const commentsRef = collection(db, "Comments");
    await addDoc(commentsRef, {
      ...input,
      postId: "/Posts/" + id,
      createdAt: serverTimestamp(),
    });
    } catch (error) {
      SwalError(error);
    }
  };

  const handleComment = (e) => {
    const { name, value } = e.target;

    setInput({ ...input, [name]: value });
  };

  return (
    <form
      className={`flex justify-between rounded-br-lg ${border} border-t ${bgColor}`}
      onSubmit={submitComment}
    >
      <input
        className="input w-full rounded-none"
        name="comment"
        placeholder="comment"
        value={input.comment}
        onChange={handleComment}
      />
      <div className={`flex items-center justify-center rounded-br-xl ${border} border-s`}>
        <button>
          <CiLocationArrow1 className="w-12 text-3xl font-bold text-primary" />
        </button>
      </div>
    </form>
  );
}
