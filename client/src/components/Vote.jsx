import {
  addDoc,
  collection,
  onSnapshot,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";

import React, { useEffect, useState } from "react";
import { PiArrowFatUpBold } from "react-icons/pi";
import { db } from "../firebase";
import { SwalError, SwalSuccess } from "./Alert";

export default function Vote({ id }) {
  const [upVote, setUpVote] = useState();
  const [downVote, setDownVote] = useState();

  const fetchUpVote = async () => {
    const q = query(
      collection(db, "Votes"),
      where("postId", "==", "/Posts/" + id),
      where("upVote", "==", true),
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const upVoteArray = [];
      querySnapshot.forEach((doc) => {
        upVoteArray.push(doc.data());
      });
      console.log(upVoteArray);
      setUpVote(upVoteArray.length);
    });

    return () => unsubscribe();
  };

  const fetchDownVote = async () => {
    const q = query(
      collection(db, "Votes"),
      where("postId", "==", "/Posts/" + id),
      where("downVote", "==", true),
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const downVoteArray = [];
      querySnapshot.forEach((doc) => {
        downVoteArray.push(doc.data());
      });
      console.log(downVoteArray);
      setDownVote(downVoteArray.length);
    });

    return () => unsubscribe();
  };

  useEffect(() => {
    fetchUpVote();
    fetchDownVote();
  }, []);

  const postUpVote = async (e) => {
    try {
      const commentsRef = collection(db, "Votes");
      await addDoc(commentsRef, {
        upVote: true,
        user: "/Users/" + localStorage.uid,
        postId: "/Posts/" + id,
        createdAt: serverTimestamp(),
      });
    } catch (error) {
      SwalError(error);
    }
  };

  const postDownVote = async (e) => {
    try {
      const voteRef = collection(db, "Votes");
      await addDoc(voteRef, {
        downVote: true,
        user: "/Users/" + localStorage.uid,
        postId: "/Posts/" + id,
        createdAt: serverTimestamp(),
      });
    } catch (error) {
      SwalError(error);
    }
  };

  console.log(id);
  return (
    <div className="z-10 flex w-full flex-col items-center gap-3">
      <div className="flex gap-5">
        <div className="flex flex-col items-center justify-center">
          <PiArrowFatUpBold
            className="text-4xl font-bold text-primary hover:text-[38px]"
            onClick={postUpVote}
          />
          <p className="text-xl font-bold text-primary">{upVote}</p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <PiArrowFatUpBold
            className="rotate-180 text-4xl font-bold text-warning hover:text-[38px]"
            name="vote"
            onClick={postDownVote}
          />
          <p className="text-xl font-bold text-warning">{downVote}</p>
        </div>
      </div>
    </div>
  );
}
