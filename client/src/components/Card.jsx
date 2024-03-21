import React, { useContext, useState } from "react";
import { SwalError, SwalSuccess } from "./Alert";
import { db } from "../firebase";
import {
  collection,
  getFirestore,
  onSnapshot,
  addDoc,
  getDocs, 
  getDoc,
  doc,
} from "firebase/firestore";
import { ThemeContext } from "../context/ThemeContext";

// Vertical
export default function Card({ picture }) {
  const {
    id: pexelId,
    photographer,
    photographer_url,
    alt,
    url,
    src,
  } = picture;



  const [input, setInput] = useState({
    user: "/Users/" + localStorage.uid,
    pexelId,
    title: "",
    content: "",
    imageUrl: src.portrait,
    comment:[],
    upVote:[],
    downVote:[]
  });

  const addToCollection = async (e) => {
    e.preventDefault();
    try {
      if (input.pexelId == "" || input.pexelId == 0) throw { name: "noImage" };

      if (input.title == "") throw { name: "noTitle" };

      if (input.content == "") throw { name: "noContent" };

      const querySnapshot = await getDocs(collection(db, "Posts"));
      querySnapshot.forEach((doc) => {
        const docData = doc.data()
        if (docData.pexelId === input.pexelId && '/Users/'+localStorage.uid === docData.user) {
          throw {name: 'DuplicateImage'}
        }
      });
      const usersCollectionRef = doc(db, 'Users', localStorage.displayName);
      const usersCollectionRef1 = doc(db, 'Users', localStorage.uid);
      const usersCollectionRef2 = collection(db, 'Users');

      const docRef = await addDoc(collection(db, "Posts"), input);

      input.id = docRef.id;

      SwalSuccess("Added", "Succes Add This Pict to Your Collection")
    } catch (e) {
      SwalError(e);
    }
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const { theme, currentTheme, setCurrentTheme } = useContext(ThemeContext);
  const bgColor = theme[currentTheme].bgColor;
  const border = theme[currentTheme].border;

  return (
    <>
      <div className={`group card max-h-[50rem] overflow-clip border ${border} shadow-xl lg:card-side sm:max-w-[48%] md:max-w-[31%] xl:max-w-[23%]`}>
        <div className="w-full">
          <img className="w-full" src={src.portrait} alt="" />
        </div>

        <div className="absolute hidden h-full w-full gap-5 bg-gradient-to-t from-black to-[160%] hover:block group-hover:block">
          <div className="flex h-2/6 flex-col items-center justify-evenly md:mt-10">
            <p className="px-3 text-center text-xl font-semibold md:text-2xl">
              {alt ? alt : "Untitled"}
            </p>
          </div>
          <form
            className="form-control flex w-full flex-col items-center justify-center gap-3 lg:py-3"
            onSubmit={addToCollection}
          >
            <label className="text-md font-semibold md:text-xl">
              Add to collection
            </label>
            <input
              type="text"
              className="input input-sm input-bordered w-2/3 border-info"
              placeholder="Title"
              name="title"
              value={input.title}
              onChange={handleInput}
            />
            <textarea
              type="text"
              className="input input-sm input-bordered h-16 w-2/3 resize-none border-info"
              placeholder="Content"
              name="content"
              value={input.content}
              onChange={handleInput}
            />
            <button className="btn btn-primary btn-sm">
              Add to collection
            </button>
          </form>
          {/* <Interaction /> */}
        </div>
      </div>
    </>
  );
}
