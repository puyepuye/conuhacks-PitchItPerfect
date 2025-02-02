"use client"; 

import Link from "next/link";
import Image from "next/image";
import "./select.css"; // Import the updated styles
import { useRouter } from "next/navigation";


export default function SelectPage() {
  const router = useRouter();
  const handleProjectNavigation = () => {
    router.push("/settings"); // Change to your desired path
  };
  
  return (

    <div className="select-container">
      {/* Logo in the Top-Left */}
      <div className="logo-container">
        <Image src="/icons/pitchlogo.svg" alt="Pitch Logo" width={50} height={50} className="logo"/>
        <span className="logo-text">Pitch</span>
      </div>

      {/* Navigation Buttons */}
      <div className="nav-buttons">
      <div className="toggle-container">
      <div className="toggle">
        <button className="toggle-btn active">Practice</button>
        <button className="toggle-btn">Profile</button>
      </div>
    </div>
      </div>

      {/* Heading */}
      <h1 className="heading">How would you like to practice pitching today?</h1>

      <div className="card-container">
        <div className="card card-dark">
            <h2>PROJECT</h2>
            <div className="card-content">
            <p>Upgrade your presentation</p>
            <p>Include slides</p>
            <p>Build your confidence</p>
            <p>Learn your strengths and weaknesses</p>
          </div>
          <button className="btn" onClick={handleProjectNavigation}>Get Started →</button>
        </div>

        <div className="card card-light">
            <h2>ELEVATOR</h2>
            <div className="card-content">
            <p>Practice your elevator pitch</p>
            <p>30-60 seconds long</p>
            <p>Be clear, concise & engaging</p>
            <p>Make a strong first impression</p>
          </div>
          <button className="btn btn-outline">Get Started →</button>
        </div>

    </div>


    </div>
  );
}
