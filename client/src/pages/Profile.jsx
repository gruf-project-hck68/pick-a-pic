import { useContext, useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, doc, getDoc } from "firebase/firestore";
import { ThemeContext } from "../context/ThemeContext";
import { Link } from "react-router-dom"

export const MyProfile = () => {
  const [email, setEmail] = useState(null);

  const fetchUserEmail = async () => {
    try {
      const userRef = doc(db, "Users", localStorage.uid);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists) {
        const userData = userDoc.data();
        setEmail(userData.email);
      } else {
        console.log("Dokumen pengguna tidak ditemukan!");
      }
    } catch (error) {
      console.error("Terjadi kesalahan saat mengambil data pengguna:", error);
    }
  };

  useEffect(() => {
    fetchUserEmail();
  }, []);

  const { theme, currentTheme, setCurrentTheme } = useContext(ThemeContext);
  const bgColor = theme[currentTheme].bgColor;
  return (
    <>
        <div className="relative mx-auto mb-6 mt-36 w-full min-w-0 max-w-md break-words rounded-xl bg-white shadow-lg md:max-w-2xl">
          <div className="px-6 ">
            <div className="flex flex-wrap justify-center">
              <div className="flex w-full justify-center">
                <div className="relative">
                  <img
                    src={localStorage.photoURL}
                    className="absolute w-[150px] h-[150px] max-w-[150px] -m-16 -ml-20  rounded-full border-none align-middle shadow-xl lg:-ml-16 object-cover"
                  />
                </div>
              </div>
              <div className="mt-20 w-full text-center">
                <div className="flex justify-center pb-0 pt-8 lg:pt-4"></div>
              </div>
            </div>
            <div className="mt-2 text-center">
              <h3 className="mb-1 text-2xl font-bold leading-normal text-slate-700">
                {localStorage.displayName}
              </h3>
              <div className="mb-2 mt-0 text-xs font-bold text-slate-400">
                <i className="fas fa-map-marker-alt mr-2 text-slate-400 opacity-75" />
                {email}
              </div>
            </div>
            <div className="mt-6 border-t border-slate-200 py-6 text-center">
              <div className="flex flex-wrap justify-center">
                <div className="w-full px-4">
                  <p className="mb-4 font-light leading-relaxed text-slate-600">
                    © This is a social media platform where you as a user can
                    add various types of pictures that we provide to your
                    collection.
                  </p>
                  <Link
                    to={"/update-profile"}
                    className="font-normal text-slate-700 hover:text-slate-400"
                  >
                    Edit Your Account
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
    </>
  );
};
