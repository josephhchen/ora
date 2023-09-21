import React from 'react'
import { useNavigate } from 'react-router-dom'

function Landing() {
  const navigate = useNavigate();  // <-- Get navigate function

  // Function to navigate to Chat
  const goToChat = () => {
    navigate('/chat');
  }

return (
    <>
    <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ...">
      Hello
      <button onClick={goToChat}>Go to Chat</button> {/* <-- Button to go to Chat */}
    </div>
    </>
  )
}

export default Landing