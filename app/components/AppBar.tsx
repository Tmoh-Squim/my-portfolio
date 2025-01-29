"use client";
import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useRouter } from "next/navigation";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";

const AppBar = () => {
  const list = ["Home", "Services", "Resume", "Projects", "Contact"];
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  // Explicitly type the ref as an array of HTMLDivElement or null
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const phoneScreenRef = useRef(null); // Added reference for the phone screen section

  // Add GSAP animation on mount or when the active index changes
  useEffect(() => {
    if (itemsRef.current[active]) {
      gsap.to(itemsRef.current[active], {
        scale: 1.2,
        duration: 0.3,
        ease: "power3.out",
      });
    }
    itemsRef.current.forEach((item, index) => {
      if (item && index !== active) {
        gsap.to(item, {
          scale: 1,
          duration: 0.3,
          ease: "power3.out",
        });
      }
    });
  }, [active]);

  // Animate phone screen opening and closing
  useEffect(() => {
    if (open) {
      gsap.fromTo(
        phoneScreenRef.current,
        { x: "-100%", opacity: 0 }, // Initial position off-screen to the left
        {
          x: "0%",
          opacity: 1,
          duration: 0.5,
          ease: "power3.out",
        }
      );
    } else {
      gsap.to(phoneScreenRef.current, {
        x: "-100%",
        opacity: 0,
        duration: 0.5,
        ease: "power3.inOut",
      });
    }
  }, [open]);

  useEffect(() => {
    if (active !== 0) {
      setOpen(false);
    }
  }, [active]);

  return (
    <div className="bg-gray-900 800px:px-[12%] px-2 justify-between flex items-center py-4 ">
      {/* Logo */}
      <div className="px-4 800px:hidden cursor-pointer" onClick={() => setOpen(!open)}>
        <AiOutlineMenu size={25} color="white" />
      </div>
      <div className="cursor-pointer" onClick={() => router.push("/Home")}>
        <h1 className="text-[30px] text-white font-bold hover:text-green-500">
          Timothy
        </h1>
      </div>

      {/* Navigation List */}
      <div className="800px:flex gap-5 items-center hidden">
        {list.map((item, index) => (
          <div
            key={item}
            ref={(el) => {
              itemsRef.current[index] = el; // Assign element to the ref array
            }}
            className={`relative cursor-pointer transition-all ${
              active === index ? "text-blue-500 font-bold" : "text-white"
            }`}
            onClick={() => {
              setActive(index);
              router.push(`${item}`);
            }}
          >
            {/* Rounded background for active text */}
            {active === index && (
              <span className="absolute inset-0 rounded-full bg-blue-500 opacity-20 -z-10" />
            )}
            <h1 className="px-3 py-1 relative">{item}</h1>
          </div>
        ))}
      </div>
      {/* Phone screen section */}
      {open && (
        <div
          ref={phoneScreenRef}
          className="h-max px-3 pt-4 pb-8 w-[50%] absolute top-0 left-0 z-50 bg-gray-800 block gap-[60px]"
        >
          <div
            className="cursor-pointer justify-end w-full flex mb-2"
            onClick={() => setOpen(false)}
          >
            <AiOutlineClose color="white" size={28} />
          </div>
          {list.map((item, index) => (
            <div
              key={item}
              ref={(el) => {
                itemsRef.current[index] = el; // Assign element to the ref array
              }}
              className={`relative cursor-pointer transition-all ${
                active === index ? "text-blue-500 font-bold" : "text-white"
              }`}
              onClick={() => {
                setActive(index);
                router.push(`${item}`);
              }}
            >
              {/* Rounded background for active text */}
              {active === index && (
                <span className="absolute inset-0 rounded-full bg-blue-500 opacity-20 -z-10" />
              )}
              <h1 className="px-3 py-1 relative">{item}</h1>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AppBar;
