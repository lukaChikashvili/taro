import React from "react";
import sun from '../assets/sun.png'
import Button from "./Button";
import { ChevronRight } from "lucide-react";

const Home = () => {
  return (
  <div className=" ">
    <div className="flex items-center justify-between px-[10rem] ">

        <div className="flex flex-col gap-4">
            <h1 className="text-5xl leading-[4rem]">
            Unlock the Mysteries of <span className="text-main font-light">Tarot:</span> Your Path to Insight and Guidance
            </h1>

            <p className="leading-[2rem]">
            Whether you're seeking a deeper connection with yourself or looking for professional guidance, our Tarot card platform connects you with experienced readers and offers a space to learn and grow in your spiritual journey.
            </p>
            <div className="flex items-center gap-8">
            <Button name = "Get a free reading now" width="15rem" />
            <Button name = "Become a Tarot Reader" width="15rem" bg = "#81BFDA" border = "2px solid #fff" color = "white" />
            </div>
        </div>
    <img src = {sun} className="mt-12" />
    </div>
    
      </div>

  );
};

export default Home;
