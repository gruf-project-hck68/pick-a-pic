import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SwalError, SwalSuccess } from "../components/Alert";
import Swal from "sweetalert2"

export const UpdateProfile = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    displayName: "",
    photoURL: "",
  });

  useEffect(() => {
    const savedData = {
      displayName: localStorage.getItem("displayName"),
      photoURL: localStorage.getItem("photoURL"),
    };
    setInput(savedData);
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    const newInput = {
      ...input,
      [name]: value,
    };

    setInput(newInput);
  };

 const handleUpdateProfile = () => {
  if (!input.displayName || !input.photoURL) {
    SwalError({ name: "fieldRequired" });
  } else {
    localStorage.setItem("displayName", input.displayName);
    localStorage.setItem("photoURL", input.photoURL);
    navigate("/my-profile");
    SwalSuccess("Profile Updated", "Success Update My Profile");
  }
};

  return (
    <>
      <div className="relative mx-auto mb-6 mt-36 w-full min-w-0 max-w-md break-words rounded-xl bg-white shadow-lg md:max-w-2xl">
        <div className="px-6">
          <form onSubmit={handleUpdateProfile}>
            <div className="flex flex-wrap justify-center">
              <div className="flex w-full justify-center"></div>
              <div className="mt-10 w-full text-center">
                <div className="flex justify-center pb-0 pt-8 lg:pt-4">
                  <h1 className="mb-6 font-serif text-3xl text-black">
                    Update Your Profile Here
                  </h1>
                </div>
              </div>
            </div>
            <div className="mt-2 text-center ">
              <div className="join my-4 lg:mx-6 lg:my-5">
                <input
                  className="input join-item input-bordered"
                  placeholder="Your Name"
                  name="displayName"
                  value={input.displayName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="join my-4 lg:mx-6 lg:my-3">
                <input
                  className="input join-item input-bordered"
                  placeholder="Profile Pict"
                  name="photoURL"
                  value={input.photoURL}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="mt-6 border-t border-slate-200 py-6 text-center">
              <div className="flex flex-wrap justify-center">
                <div className="w-full px-4">
                  <button
                    to={"/update-profile"}
                    className="font-normal text-slate-700 hover:text-slate-400"
                  >
                    Update My Profile
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
