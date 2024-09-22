import HomeImage from "../../assets/HomeImage.png";

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

export default HeroSection_two;
