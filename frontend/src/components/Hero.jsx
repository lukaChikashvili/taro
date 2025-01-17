import { useNavigate } from 'react-router';
import lang from '../assets/lang.png';

const Hero = () => {

    let navigate = useNavigate();
  return (
    <div className="flex flex-col xl:flex-row items-center  xl:items-center xl:justify-between px-6 md:px-12 lg:px-16 xl:px-24 py-12 mt-12 md:-mt-8  ">
     
      <div className="flex flex-col gap-8 max-w-5xl md:max-w-2xl justify-center text-center xl:text-left">
        <h1 className="text-white text-4xl md:text-5xl lg:text-6xl leading-tight">
          Flow into <span className="text-main">Fluency</span>, One Word at a Time
        </h1>
        <span className="w-24 md:w-full h-[0.5px] bg-main self-center xl:self-start"></span>
        <p className="text-slate-500 text-lg md:text-xl">
          Practice, connect, and master languages with ease
        </p>

        <div className="flex justify-center xl:justify-start items-center gap-6">
          <button onClick={() => navigate('/profile')} className="bg-main text-white py-3 px-6 rounded-lg w-40 md:w-56 hover:bg-main-dark transition">
            Start for free
          </button>
          <button className="bg-transparent border-2 border-main text-main py-3 px-6 rounded-lg w-40 md:w-56 hover:bg-main hover:text-white transition">
            Learn more
          </button>
        </div>
      </div>

      
      <div className="mt-12 xl:mt-0 xl:ml-16">
        <img
          src={lang}
          alt="Language Illustration"
          className="hidden xl:block w-80 md:w-96 lg:w-[30rem]"
        />
      </div>
    </div>
  );
};

export default Hero;
