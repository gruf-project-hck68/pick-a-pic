import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";

import React, { useEffect, useState } from "react";
import { PiArrowFatUpBold } from "react-icons/pi";
import { db } from "../firebase";
import { SwalError, SwalSuccess } from "./Alert";

export default function Vote({ id }) {
  const [upVote, setUpVote] = useState();
  const [downVote, setDownVote] = useState();

  const checkDownVoteExists = async () => {
    const querySnapshot = await getDocs(collection(db, "Votes"));
    let checkDownVote = false;
    querySnapshot.forEach((doc) => {
      if (
        doc.data().postId == "/Posts/" + id &&
        doc.data().user == "/Users/" + localStorage.uid &&
        doc.data().downVote == true
      )
        checkDownVote = true;
    });
    return checkDownVote;
  };

  const checkUpVoteExists = async () => {
    const querySnapshot = await getDocs(collection(db, "Votes"));
    let checkUpVote = false;
    querySnapshot.forEach((doc) => {
      if (
        doc.data().postId == "/Posts/" + id &&
        doc.data().user == "/Users/" + localStorage.uid &&
        doc.data().upVote == true
      )
        checkUpVote = true;
    });
    return checkUpVote;
  };
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
      const x = await checkUpVoteExists();
      if (x == true) throw { name: "upVoted" };
  
      // Create a DocumentReference for a specific document
      const voteRef = doc(collection(db, "Votes"), localStorage.uid + "_" + id);
  
      // Check if the document exists
      const docSnap = await getDoc(voteRef);
  
      if (docSnap.exists()) {
        // Update the existing document
        await updateDoc(voteRef, {
          upVote: true,
          downVote: false,
          updatedAt: serverTimestamp(),
        });
      } else {
        // Create a new document
        await setDoc(voteRef, {
          upVote: true,
          downVote: false,
          user: "/Users/" + localStorage.uid,
          postId: "/Posts/" + id,
          createdAt: serverTimestamp(),
        });
      }
    } catch (error) {
      SwalError(error);
    }
  };
  
  const postDownVote = async (e) => {
    try {
      const x = await checkDownVoteExists();
      if (x == true) throw { name: "downVoted" };
  
      // Create a DocumentReference for a specific document
      const voteRef = doc(collection(db, "Votes"), localStorage.uid + "_" + id);
  
      // Check if the document exists
      const docSnap = await getDoc(voteRef);
  
      if (docSnap.exists()) {
        // Update the existing document
        await updateDoc(voteRef, {
          upVote: false,
          downVote: true,
          updatedAt: serverTimestamp(),
        });
      } else {
        // Create a new document
        await setDoc(voteRef, {
          upVote: false,
          downVote: true,
          user: "/Users/" + localStorage.uid,
          postId: "/Posts/" + id,
          createdAt: serverTimestamp(),
        });
      }
    } catch (error) {
      SwalError(error);
    }
  };

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
