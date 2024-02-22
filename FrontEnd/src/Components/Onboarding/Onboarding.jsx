import onboaringImg from "../../assets/Onboarding.png";
const Onboarding = () => {
  const handleOnBoardingClick = () => {
    location.href = "/login";
  };
  return (
    <div className=" w-4/5 h-screen ml-auto mr-auto flex flex-col">
      <div className=" h-1/2 flex justify-center">
        <img className="w-full h-full" src={onboaringImg} alt="" />
      </div>
      <div className="h-1/2 p-4 flex flex-col justify-evenly items-center">
        <h1 className=" text-4xl font-bold font-mono">
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          Let's connect with each other
        </h1>

        <p className="text-center">
          Welcome to our social-media app! Connect with friends, share moments,
          and explore endless possibilities. Start your journey today!
        </p>
        <button
          className="text-white bg-green-500 p-3 rounded w-2/3 lg:w-1/3 active:bg-green-700 transition-all delay-100 ease-in"
          onClick={handleOnBoardingClick}
        >
          Get started
        </button>
      </div>
    </div>
  );
};

export default Onboarding;
