"use client";
import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { AiOutlineClose, AiOutlineMenu, AiOutlineMoon, AiOutlineSun } from "react-icons/ai";
import dynamic from "next/dynamic";
import Footer from "./Footer";

const pages = {
  Home: dynamic(() => import("../(pages)/Home/page")),
  Services: dynamic(() => import("../(pages)/Services/page")),
  Resume: dynamic(() => import("../(pages)/Resume/page")),
  Projects: dynamic(() => import("../(pages)/Projects/page")),
  Contact: dynamic(() => import("../(pages)/Contact/page")),
};
const list = Object.keys(pages);

const AppBar = () => {
  const [activePage, setActivePage] = useState<keyof typeof pages>("Home");
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState("dark");

  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const setItemRef = (index: number) => (el: HTMLDivElement | null): void => {
    itemsRef.current[index] = el;
  };
  
  const phoneScreenRef = useRef(null);
    
useEffect(() => {
  if (typeof window !== "undefined") {
    const storedPage = localStorage.getItem("activePage") as keyof typeof pages;
    if (storedPage) {
      setActivePage(storedPage);
    }
  }
}, []);
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("activePage", activePage);
    }
  }, [activePage]);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme") || "light";
      setTheme(savedTheme);
      document.documentElement.classList.add(savedTheme);
    }
  }, []);

  useEffect(() => {
    itemsRef.current.forEach((item, index) => {
      if (item) {
        gsap.to(item, {
          scale: activePage === list[index] ? 1.2 : 1,
          duration: 0.3,
          ease: "power3.out",
        });
      }
    });
  }, [activePage]);

  useEffect(() => {
    gsap.to(phoneScreenRef.current, {
      x: open ? "0%" : "-100%",
      opacity: open ? 1 : 0,
      duration: 0.5,
      ease: "power3.inOut",
    });
  }, [open]);

  const CurrentPageComponent = pages[activePage];

  return (
    <div className="flex flex-col h-screen">
      {/* AppBar */}
      <div className="bg-foreground relative z-10 py-4 shadow-sm  800px:px-[12%] px-2 flex justify-between items-center w-full">
        <div className="flex items-center justify-between w-full 800px:w-max">
        <div className="cursor-pointer text-background" onClick={() => setOpen(!open)}>
          <AiOutlineMenu size={25} className="800px:hidden" />
        </div>
        <h1 className="text-[30px] text-gray-300 font-bold hover:text-blue-500 cursor-pointer" onClick={() => setActivePage("Home")}>
          Timothy
        </h1>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden 800px:flex gap-5">
            {list.map((item, index) => (
              <div
                key={item}
                ref={setItemRef(index)}
                className={`cursor-pointer transition-all ${activePage === item ? "text-blue-500 font-bold" : "text-background"}`}
                onClick={() => setActivePage(item as keyof typeof pages)}
              >
                <h1 className="px-3 py-1">{item}</h1>
              </div>
            ))}
          </div>
          <div className="hidden 800px:block cursor-pointer text-background" onClick={() => {
            const newTheme = theme === "light" ? "dark" : "light";
            setTheme(newTheme);
            localStorage.setItem("theme", newTheme);
            document.documentElement.classList.replace(theme, newTheme);
          }}>
            {theme === "dark" ? <AiOutlineMoon size={35} /> : <AiOutlineSun size={35} />}
          </div>
        </div>
      </div>

      {/* Sidebar for mobile */}
      {open && (
        <div ref={phoneScreenRef} className="absolute shadow-lg top-0 left-0 h-full w-[12rem] bg-foreground p-4 z-50">
          <div className="flex justify-end cursor-pointer text-background mb-4" onClick={() => setOpen(false)}>
            <AiOutlineClose size={28} />
          </div>
          {list.map((item) => (
            <div
              key={item}
              className={`cursor-pointer transition-all ${activePage === item ? "text-blue-500 font-bold" : "text-background"}`}
              onClick={() => {
                setActivePage(item as keyof typeof pages);
                setOpen(false);
              }}
            >
              <h1 className="px-3 py-1">{item}</h1>
            </div>
          ))}
          <div className=" my-6 cursor-pointer flex gap-2 items-center text-background" onClick={() => {
            const newTheme = theme === "light" ? "dark" : "light";
            setTheme(newTheme);
            localStorage.setItem("theme", newTheme);
            document.documentElement.classList.replace(theme, newTheme);
          }}>
            {theme === "dark" ? <AiOutlineMoon size={35} /> : <AiOutlineSun size={35} />} <span>Change theme</span>
          </div>
        </div>
      )}

      {/* Page Content */}
      <div className="flex-grow w-full overflow-auto">
        <CurrentPageComponent />
        <Footer />
      </div>
    </div>
  );
};

export default AppBar;
