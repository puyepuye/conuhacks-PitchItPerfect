import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="relative flex items-center justify-center h-screen w-screen bg-gradient-to-br from-blue-400 to-blue-900 text-white">
      
      {/* Logo in the Top-Right */}
      <div className="logo-container">
        <Image src="/icons/pitchlogo.svg" alt="Pitch Logo" width={50} height={50} className="logo"/>
        <span className="logo-text">Pitch</span>
      </div>

      {/* Adjusted Hero Text with Button */}
      <div className="hero-text">
        <h2>Let's</h2>
        <Link href="/select" className="pitch-button">
          <div className="pitch-container">
            <h1>Pitch</h1>
            <span className="arrow">→</span>
          </div>
        </Link>
      </div>
      
    </div>
  );
}
