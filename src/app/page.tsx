import Landing from "./Landing";

const Home = () => {
  return (
    <>
      <main className="flex h-fit min-h-[calc(100vh-16px)]  w-full flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]  ">
        <div className="w-full px-5 md:w-[90%]  md:px-0 lg:w-[80%]">
          <div className="flex h-fit w-full flex-col items-center justify-center">
            <div className="flex h-fit w-[88%] flex-col items-center justify-around  md:flex-row">
              <div className="flex h-[40%] w-full flex-col gap-5 md:mt-16 md:h-fit md:w-3/5 md:gap-10">
                <p className="text-3xl text-base-100 md:text-6xl">
                  ORIGINAL ACADEMIC WRITING ON DEMAND
                </p>
                <p className="text-xl italic text-base-100">
                  Any Subject. Brilliant Writers. No AI or Plagiarism.
                </p>
                <a href={"/order"}>
                  <button className="btn-accent btn relative my-6 w-full max-w-xs">
                    {" "}
                    Order
                  </button>
                </a>
              </div>
              <Landing />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
