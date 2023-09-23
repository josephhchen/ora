import React, { useEffect, useState } from "react";
import "../styles/landing-page.css";
import arrow from "../assets/arrow.png";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-scroll';

function Landing() {
  const navigate = useNavigate();
  const fullText = ["Hello!", "I'm", "ORA", "Your Organized Responsive Assistant"];
  const [currentText, setCurrentText] = useState(["", "", "", ""]);
  const [pulsate, setPulsate] = useState(false);

  useEffect(() => {
    let index = 0;
    let subIndex = 0;

    const intervalId = setInterval(() => {
      if (index < fullText.length) {
        setPulsate(true);  // Begin pulsating
        const currentStr = fullText[index];
        setCurrentText((prev) => {
          const newArr = [...prev];
          newArr[index] = currentStr.substring(0, subIndex);
          return newArr;
        });

        subIndex++;
        if (subIndex > currentStr.length) {
          setPulsate(false); 
          index++;
          subIndex = 0;
        }
      } else {
        clearInterval(intervalId);
      }
    }, 100);

    return () => clearInterval(intervalId);
  }, []);

  const goToChat = () => {
    navigate('/chat');
  };

return (
  <>
    <div className="bg h-screen flex flex-col items-center justify-center relative">
    {/* <div className="waveContainer">
        <div className={pulsate ? "animated-orb pulsate" : "animated-orb"}></div>
      </div> */}
      <div className="inter-font text-white text-5xl text-center">
        <div className="mt-2">{currentText[0]}</div>
        <div className="flex justify-center mt-2">
          <div>{currentText[1]}</div>
          <div className="ml-2 non-inter-font">{currentText[2]}</div>
        </div>
        <div className="mt-2">{currentText[3]}</div>
      </div>
      <div className="py-10 flex justify-center">
        <button 
          className="transparent-button font-bold py-2 px-8 rounded-lg text-white text-bold"
          onClick={goToChat}
        >
          Get Started
        </button>
      </div>
      <Link
          to="About"
          spy={true}
          smooth={true}
          offset={0}
          className="absolute inset-x-0 bottom-2 flex flex-col items-center justify-center text-white text-md text-center bounce">
            <p>About</p>
            <div className="mt-auto">
              <img src={arrow} className="h-8 w-9" alt="Arrow" />
            </div>
        </Link>
      </div>

      <div className="h-screen" id="About">
        

      </div>
  </>
);
}

export default Landing;