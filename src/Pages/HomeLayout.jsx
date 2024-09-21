import React from "react";
import HomeImage from "../assets/HomeImage.png";

function HomeLayout() {
  return (
    <>
      <HeroSection />
      <HeroSection_two />
    </>
  );
}

export default HomeLayout;

const HeroSection = () => {
  return (
    <div className="bg-gradient-to-br from-[#e20074] via-[#e94057] to-[#f27121] text-white flex flex-col gap-y-4 sm:gap-y-8 pt-12 sm:pt-20">
      <h1 className="font-poppins text-[50px] sm:text-[80px] font-semibold leading-tight self-center text-center">
        Build amazing <br /> things
      </h1>
      <p className="font-arimo text-[13px] sm:text-[16px] self-center w-2/3 text-center">
        We're GitHub, the company behind the npm Registry and npm CLI. We offer
        those to the community for free, but our day job is building and selling
        useful tools for developers like you.
      </p>
      <span className="font-poppins text-[24px] sm:text-[36px] font-semibold leading-tight self-center text-center w-full">
        Take your JavaScript development up a notch
      </span>
      <p className="font-arimo text-[13px] sm:text-[16px] self-center text-center w-2/3">
        Get started today for free, or step up to npm Pro to enjoy a premium
        JavaScript development experience, with features like private packages.
      </p>
      <div className="font-poppins font-bold text-[13px] sm:text-[16px] self-center flex flex-col gap-y-3 sm:gap-y-0 sm:flex-row sm:gap-x-10 py-7 sm:py-10">
        <button className="bg-[#ffc329] shadow-lg rounded-full py-3 sm:py-4 px-10 sm:px-12 text-black">
          Sign up for free
        </button>
        <button className="border-2 border-white rounded-full py-3 sm:py-4 px-10 sm:px-12 bg-[#cb3837]">
          Learn about Pro
        </button>
      </div>
    </div>
  );
};

const HeroSection_two = () => {
  return (
    <div className="flex flex-col pt-12 sm:pt-16 pb-16 sm:pb-40 gap-y-5 sm:gap-y-8">
      <img src={HomeImage} alt="home-image" className="self-center" />
      <h1 className="self-center font-poppins text-[24px] px-5 sm:px-0 sm:text-[36px] font-semibold w-full sm:w-1/3 text-center">
        Bring the best of open source to you, your team, and your company
      </h1>
      <p className="self-center font-arimo text-[13px] sm:text-[16px] w-full sm:w-1/3 px-12 sm:px-0 text-center">
        Relied upon by more than 17 million developers worldwide, npm is
        committed to making JavaScript development elegant, productive, and
        safe. The free npm Registry has become the center of JavaScript code
        sharing, and with more than two million packages, the largest software
        registry in the world. Our other tools and services take the Registry,
        and the work you do around it, to the next level.
      </p>
    </div>
  );
};
