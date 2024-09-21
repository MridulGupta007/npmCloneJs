import React from "react";
import HomeImage from '../assets/HomeImage.png'
function HomeLayout() {
  return (
    <>
    <div className="bg-gradient-to-br from-[#e20074] via-[#e94057] to-[#f27121] text-white flex flex-col gap-y-8 pt-20">
      <h1 className="font-poppins text-[80px] font-semibold leading-tight self-center text-center">
        Build amazing <br /> things
      </h1>
      <p className="font-arimo text-[16px] self-center w-1/3 text-center">
        We're GitHub, the company behind the npm Registry and npm CLI. We offer
        those to the community for free, but our day job is building and selling
        useful tools for developers like you.
      </p>
      <span className="font-poppins text-[36px] font-semibold leading-tight self-center text-center w-1/3">
        Take your JavaScript development up a notch
      </span>
      <p className="font-arimo text-[16px] self-center text-center w-1/3">
        Get started today for free, or step up to npm Pro to enjoy a premium
        JavaScript development experience, with features like private packages.
      </p>
      <div className="font-poppins font-bold text-[16px] self-center flex flex-col md:flex-row gap-x-10 py-10">
        <button className="bg-[#ffc329] shadow-lg rounded-full py-4 px-12 text-black">
          Sign up for free
        </button>
        <button className="border-2 border-white rounded-full py-4 px-12 bg-[#cb3837]">Learn about Pro</button>
      </div>
    </div>
    <div className="flex flex-col pt-16 pb-40 gap-y-8">
        <img src={HomeImage} alt="home-image"  className="self-center"/>
        <h1 className="self-center font-poppins text-[36px] font-semibold w-1/3 text-center">Bring the best of open source to you, your team, and your company</h1>
        <p className="self-center font-arimo text-[16px] w-1/3 text-center">Relied upon by more than 17 million developers worldwide, npm is committed to making JavaScript development elegant, productive, and safe. The free npm Registry has become the center of JavaScript code sharing, and with more than two million packages, the largest software registry in the world. Our other tools and services take the Registry, and the work you do around it, to the next level.</p>
    </div>
    </>
  );
}

export default HomeLayout;
