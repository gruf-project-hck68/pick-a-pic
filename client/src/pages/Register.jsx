// import React from "react";

export const Register = () => {
  return (
    // <div>Register</div>

    <main className="min-h-screen flex flex-col md:grid md:grid-cols-2">
      <section className=" text-white h-screen md:col-span-1 bg-gray-800 flex flex-col justify-center items-center">
        <form className="w-3/5 flex flex-col gap-3">
          <h1 className="text-3xl md:text-md lg:text-4xl text-center">Register</h1>
          <p className="text-sm lg:text-lg mb-5">
            Enter your information below to register
          </p>
          <label className="text-sm lg:text-lg">Full Name :</label>
          <input
            className="input input-sm lg:input-md input-bordered w-full"
            type="text"
            name="fullName"
            placeholder="Full Name"
          />
          <label className="text-sm lg:text-lg">Email :</label>
          <input
            className="input input-sm lg:input-md input-bordered w-full invalid:border-error invalid:text-error
              focus:invalid:border-error focus:invalid:ring-error"
            type="email"
            name="email"
            placeholder="Email"
          />
          <label className="text-sm lg:text-lg">Password :</label>
          <input
            className="input input-sm lg:input-md input-bordered w-full"
            type="password"
            name="password"
            placeholder="Password"
            // value={input.password}
            // onChange={handleInput}
          />
          <p className="text-sm lg:text-lg text-end">Forgot password?</p>
          <button className="btn btn-sm lg:btn-md btn-primary mt-5">
            Submit
          </button>
          <div className="divider text-sm lg:text-lg">or continue with</div>
        </form>
        <div className="mt-10">
          <p className="text-start text-sm lg:text-lg">
            Have an account?{" "}
            <a
              //   to="/login"
              className="text-primary link-hover text-sm lg:text-lg "
            >
              Login
            </a>
          </p>
        </div>
      </section>
      <section className="hidden md:flex md:col-span-1 max-h-dvh bg-gray-900 bg-cover">
        <div className="h-full carousel carousel-vertical w-full flex opacity-50">
          <div className="carousel-item relative w-full h-full">
            <img
              src="https://images.pexels.com/photos/2670898/pexels-photo-2670898.jpeg"
              className="w-full object-cover"
            />
          </div>
          <div className="carousel-item relative w-full h-full">
            <img
              src="https://images.pexels.com/photos/360912/pexels-photo-360912.jpeg"
              className="w-full object-cover"
            />
          </div>
          <div className="carousel-item relative w-full h-full">
            <img
              src="https://images.pexels.com/photos/54124/pexels-photo-54124.jpeg"
              className="w-full object-cover"
            />
          </div>
          <div className="carousel-item relative w-full h-full">
            <img
              src="https://images.pexels.com/photos/1820563/pexels-photo-1820563.jpeg"
              className="w-full object-cover"
            />
          </div>
          <div className="carousel-item relative w-full h-full">
            <img
              src="https://images.pexels.com/photos/902756/pexels-photo-902756.jpeg"
              className="w-full object-cover"
            />
          </div>
          <div className="carousel-item relative w-full h-full">
            <img
              src="https://images.pexels.com/photos/20463592/pexels-photo-20463592/free-photo-of-the-cube.jpeg"
              className="w-full object-cover"
            />
          </div>
          <div className="carousel-item relative w-full h-full">
            <img
              src="https://images.pexels.com/photos/204946/pexels-photo-204946.jpeg"
              className="w-full object-cover"
            />
          </div>
        </div>
      </section>
    </main>
  );
};
