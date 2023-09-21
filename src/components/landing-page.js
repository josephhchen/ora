import React from "react";
import css from "../styles/landing-page.css";
import arrow from "../assets/arrow.png";
function Landing() {
  const navigate = useNavigate();  // <-- Get navigate function

  // Function to navigate to Chat
  const goToChat = () => {
    navigate('/chat');
  }

return (
    <>
      <div class="bg h-screen px-10 md:px-20 pt-36 md:pt-50 lg:pt-60 pb-20">
        <div className="text-white text-5xl">
          <div className="mt-2">Hello,</div>
          <div className="mt-2">
            I'm <b>ORA</b>
          </div>
          <div className="mt-2">Your Organizational Responsive Assistant</div>
        </div>
        <div className="py-10">
          <button class="transparent-button font-bold py-2 px-8 rounded-lg text-white text-bold">
            Get Started
          </button>
        </div>
        <div className="absolute inset-x-0 bottom-2 flex flex-col items-center justify-center text-white text-md text-center">
          <p>About</p>
          <div className="mt-auto">
            <img src={arrow} className="h-8 w-9" alt="Arrow" />
          </div>
        </div>
      </div>
      <div>
        
      </div>
    </>
  );
}

export default Landing;
