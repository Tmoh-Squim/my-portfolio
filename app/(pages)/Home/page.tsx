"use client";
import React, { useEffect, useRef } from "react";
import { FaGithub, FaLinkedin, FaTwitter, FaWhatsapp } from "react-icons/fa";
import { gsap } from "gsap";
import { AiOutlineDownload } from "react-icons/ai";
import { useRouter } from "next/navigation";
import Image from "next/image";

const HomePage = () => {
  const router = useRouter();
  const animationDone = useRef(false); // To track if the animation has already completed
  const imageRef = useRef(null); // Reference to the image element

  useEffect(() => {
    if (animationDone.current) return; // Prevent re-running the animation

    const tl = gsap.timeline();

    // Main text fade-in animation
    tl.from(".fade-in", {
      opacity: 0,
      y: 30,
      duration: 1,
      stagger: 0.2,
    })
      .from(".image-bounce", {
        scale: 0,
        duration: 1,
        ease: "elastic.out(1, 0.5)",
      })
      .from(imageRef.current, {
        opacity: 1,
        duration: 1.5,
        ease: "power4.out",
        delay: 0.5, // Delay the image reveal slightly after the main animation
      });

    animationDone.current = true; // Mark animation as completed
  }, []);

  // Hover Animation for Name
  useEffect(() => {
    const chars = document.querySelectorAll(".char");
    chars.forEach((char) => {
      char.addEventListener("mouseenter", () => {
        gsap.to(char, {
          y: -10,
          rotation: 10,
          duration: 0.3,
          ease: "power2.out",
        });
      });

      char.addEventListener("mouseleave", () => {
        gsap.to(char, {
          y: 0,
          rotation: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      });
    });
  }, []);

  // Function to split text into spans
  const splitText = (text: string) => {
    return text.split("").map((char, index) => (
      <span key={index} className="char inline-block">
        {char}
      </span>
    ));
  };

  return (
    <div className="px-[10px] z-0 1500px:px-[20%] 800px:px-[12%] py-2 bg-gray-900 min-h-screen text-white">
      {/* Main Content */}
      <div className="800px:flex block 800px:gap-10 ">
        {/* Portfolio Personal Details */}
        <div className="800px:w-[60%] fade-in">
          <p className="text-gray-500 800px:text-sm">Software Developer</p>
          <h1 className="text-4xl font-bold text-white tracking-wider">
            Hello, I&apos;m
          </h1>
          <span className="text-blue-500 text-4xl mt-2 font-bold tracking-wider">
            {splitText("Timothy  Kaingati")}
          </span>
          <div className="text-gray-400 mt-4 space-y-1">
            <p>I excel at crafting elegant digital experiences.</p>
            <p>
              I am proficient in various programming languages and technologies.
            </p>
          </div>
          <button
            className="mt-6 px-6 py-3 bg-blue-400 text-white rounded-lg hover:bg-blue-600 transition-all"
            onClick={() => router.push("/Contact")}
          >
            Contact Me
          </button>
        </div>

        {/* Portfolio Image */}
        <div className="800px:w-[40%] cursor-grab  800px:mt-8 mt-4 ">
          <img
            ref={imageRef}
            src="/Profile2.png"
            className="rounded-full  mb-2 w-[250px] 800px:w-[280px] 800px:h-[280px] mx-auto my-auto  h-[250px] image-bounce"
            alt="Portfolio of Timothy Kaingati"
          />
        </div>
      </div>

      {/* Social Icons */}
      <div className="fade-in">
        <h3 className="text-lg text-gray-400 mb-4">Connect with me:</h3>
        <div className="800px:flex 800px:gap-6 gap-3 items-center">
          {/* Download CV Section */}
          <div className="fade-in">
            <a
              href="/Squim-cv.pdf"
              download="Timothy_Kaingati_CV.pdf"
              className="px-6 py-3 text-sm flex gap-2 items-center text-green-500 border-green-500 border-[2px] rounded-full hover:bg-green-500 hover:text-black transition-all"
            >
              DOWNLOAD CV{" "}
              <AiOutlineDownload
                color="green"
                className="hover:text-black"
                size={20}
              />
            </a>
          </div>
          <div className="flex gap-3 mt-4 800px:mt-0">
            <a
              href="https://github.com/Tmoh-Squim"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-500 border-green-500 border-[2px] rounded-full p-1 hover:bg-green-500 hover:text-black transition-all text-2xl"
            >
              <FaGithub size={15} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-500 border-green-500 border-[2px] rounded-full p-1 hover:bg-green-500 hover:text-black transition-all text-2xl"
            >
              <FaLinkedin size={15} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-500 border-green-500 border-[2px] rounded-full p-1 hover:bg-green-500 hover:text-black transition-all text-2xl"
            >
              <FaTwitter size={15} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-500 border-green-500 border-[2px] rounded-full p-1 hover:bg-green-500 hover:text-black transition-all text-2xl"
            >
              <FaWhatsapp size={15} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
