import React from "react";
import { BackgroundBeamsWithCollision } from "../ui/BackgroundBeanUi";
import SearchBtn from "../SearchBtn";

function HeroSection() {
  return (
    (<BackgroundBeamsWithCollision>
      <div className="w-full ">
      <h2
        className="relative z-20 font-sans text-2xl font-bold tracking-tight text-center text-black md:text-4xl lg:text-6xl dark:text-white">
        Find Tutor's{" "}
        <div
          className="relative mx-auto inline-block w-max [filter:drop-shadow(0px_1px_3px_rgba(27,_37,_80,_0.14))]">
          <div
            className="absolute left-0 top-[1px] bg-clip-text bg-no-repeat text-transparent bg-gradient-to-r py-4 from-purple-500 via-violet-500 to-pink-500 [text-shadow:0_0_rgba(0,0,0,0.1)]">
            <span className="">For Free.</span>
          </div>
          <div
            className="relative py-4 text-transparent bg-no-repeat bg-clip-text bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500">
            <span className="">For Free.</span>
          </div>
        </div>
      </h2>
      <SearchBtn/>
      </div>
    </BackgroundBeamsWithCollision>)
  );
}

export default HeroSection;