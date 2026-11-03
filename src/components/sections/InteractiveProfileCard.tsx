"use client";

import Image from "next/image";
import { ArrowUpRight, ArrowLeft } from "lucide-react";
import { useState } from "react";

export default function InteractiveProfileCard() {
  const [isHovered, setIsHovered] = useState(false);
  const [isPinnedOpen, setIsPinnedOpen] = useState(false);
  const isOpen = isHovered || isPinnedOpen;

  return (
    <div
      aria-label="Profile photograph and About Me"
      className={`hero-art interactive-profile-card${isOpen ? " is-open" : ""}`}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          setIsHovered(false);
          setIsPinnedOpen(false);
        }
      }}
      onPointerEnter={(event) => {
        if (event.pointerType !== "touch") setIsHovered(true);
      }}
      onPointerLeave={(event) => {
        if (event.pointerType !== "touch") setIsHovered(false);
      }}
      role="group"
    >
      <div className="profile-stage">
        <Image
          aria-hidden={isOpen}
          alt="Portrait of Md Shaqib Hussain"
          className="profile-image"
          fill
          priority
          sizes="(max-width: 640px) calc(100vw - 44px), (max-width: 1100px) min(100vw - 56px, 560px), (max-width: 1439px) 50vw, 560px"
          src="/images/profile/profile.jpg"
        />
        <div aria-hidden={!isOpen} className="profile-about" id="profile-about">
          <span aria-hidden="true" className="profile-number">01</span>
          <div className="profile-about-copy">
            <p className="profile-about-label">01 / ABOUT ME</p>
            <h2>Curious by nature.<br />Driven by perspective.</h2>
            <p>
              I&apos;m naturally curious about how things work and enjoy exploring unfamiliar problems. I approach challenges from different perspectives, look beyond the obvious, and consider the broader context before identifying the most effective solution.
            </p>
            <p>
              I enjoy learning new things and technologies, and I&apos;m comfortable figuring out how to learn something unfamiliar efficiently. I believe that understanding how to learn is just as important as what you learn. I take ownership of my work and continuously look for ways to improve.
            </p>
            <p className="profile-keywords">CURIOSITY · ADAPTABILITY · OWNERSHIP · CONTINUOUS LEARNING</p>
          </div>
        </div>
      </div>
      <div className="art-bottomline profile-bottomline">
        {!isOpen && <span>MD SHAQIB HUSSAIN</span>}
        <button
          aria-controls="profile-about"
          aria-expanded={isOpen}
          aria-label={isOpen ? "Return to profile photograph" : "Read about me"}
          className="profile-action"
          onClick={() => {
            setIsHovered(false);
            setIsPinnedOpen((open) => !open);
          }}
          type="button"
        >
          {isOpen ? <>BACK TO PROFILE <ArrowLeft size={13} /></> : <>ABOUT ME <ArrowUpRight size={13} /></>}
        </button>
      </div>
    </div>
  );
}
