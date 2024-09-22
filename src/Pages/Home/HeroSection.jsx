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
      <div className="font-poppins font-bold text-[13px] sm:text-[16px] px-6 sm:px-0 sm:self-center flex flex-col gap-y-3 sm:gap-y-0 sm:flex-row sm:gap-x-10 py-7 sm:py-10">
        <button className="bg-[#ffc329] shadow-xl rounded-full py-3 sm:py-4 px-10 sm:px-12 text-black">
          Sign up for free
        </button>
        <button className="border-2 border-white rounded-full py-3 sm:py-4 px-10 sm:px-12 bg-[#cb3837]">
          Learn about Pro
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
