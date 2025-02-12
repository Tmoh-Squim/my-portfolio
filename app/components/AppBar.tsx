"use client";
import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { AiOutlineClose, AiOutlineMenu, AiOutlineMoon, AiOutlineSun } from "react-icons/ai";
import Home from "../page";
import ServicesPage from "../(pages)/Services/page";
import ResumePage from "../(pages)/Resume/page";
import ProjectsPage from "../(pages)/Projects/page";
import ContactPage from "../(pages)/Contact/page";

const AppBar = () => {
  const pages = { Home, ServicesPage, ResumePage, ProjectsPage, ContactPage };
  const list = Object.keys(pages);
  
  const [activePage, setActivePage] = useState<keyof typeof pages>("Home");
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState("dark");

  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  const setItemRef = (index: number) => (el: HTMLDivElement | null) => {
    itemsRef.current[index] = el;
  };
    const phoneScreenRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme") || "light";
      setTheme(savedTheme);
      document.documentElement.classList.add(savedTheme);
    }
  }, []);

  useEffect(() => {
    if (itemsRef.current[list.indexOf(activePage)]) {
      gsap.to(itemsRef.current[list.indexOf(activePage)], {
        scale: 1.2,
        duration: 0.3,
        ease: "power3.out",
      });
    }
    itemsRef.current.forEach((item, index) => {
      if (item && list[index] !== activePage) {
        gsap.to(item, { scale: 1, duration: 0.3, ease: "power3.out" });
      }
    });
  }, [activePage]);

  useEffect(() => {
    if (open) {
      gsap.fromTo(
        phoneScreenRef.current,
        { x: "-100%", opacity: 0 },
        { x: "0%", opacity: 1, duration: 0.5, ease: "power3.out" }
      );
    } else {
      gsap.to(phoneScreenRef.current, {
        x: "-100%",
        opacity: 0,
        duration: 0.5,
        ease: "power3.in",
      });
    }
  }, [open]);

  const CurrentPageComponent = pages[activePage];

  return (
    <div className="bg-foreground 800px:px-[12%] px-2 justify-between flex items-center py-4">
      <div className="800px:hidden cursor-pointer text-background" onClick={() => setOpen(!open)}>
        <AiOutlineMenu size={25} />
      </div>
      <div className="cursor-pointer" onClick={() => setActivePage("Home")}>
        <h1 className="text-[30px] text-gray-300 font-bold hover:text-blue-500">Timothy</h1>
      </div>

      <div className="flex items-center gap-6">
        <div className="800px:flex gap-5 items-center hidden">
          {list.map((item, index) => (
            <div
              key={item}
              ref={setItemRef(index)}
              className={`relative cursor-pointer transition-all ${
                activePage === item ? "text-blue-500 font-bold" : "text-background"
              }`}
              onClick={() => setActivePage(item as keyof typeof pages)}
            >
              {activePage === item && (
                <span className="absolute inset-0 rounded-full bg-blue-500 opacity-20 -z-10" />
              )}
              <h1 className="px-3 py-1 relative">{item}</h1>
            </div>
          ))}
        </div>
        <div className="text-background hidden 800px:block cursor-pointer" onClick={()=>{
          const newTheme = theme === "light" ? "dark" : "light";
          setTheme(newTheme);
          localStorage.setItem("theme", newTheme);
          document.documentElement.classList.replace(theme, newTheme);
        }}>
          {theme === "dark" ? <AiOutlineMoon size={35} /> : <AiOutlineSun size={35} />}
        </div>
      </div>

      {open && (
        <div
          ref={phoneScreenRef}
          className="h-max px-3 pt-4 pb-8 w-[12rem] absolute top-0 left-0 z-50 bg-foreground block gap-[60px]"
        >
          <div className="cursor-pointer justify-end text-background w-full flex mb-2" onClick={() => setOpen(false)}>
            <AiOutlineClose size={28} />
          </div>
          {list.map((item) => (
            <div
              key={item}
              className={`relative cursor-pointer transition-all ${
                activePage === item ? "text-blue-500 font-bold" : "text-background"
              }`}
              onClick={() => {
                setActivePage(item as keyof typeof pages);
                setOpen(false);
              }}
            >
              {activePage === item && (
                <span className="absolute inset-0 rounded-full bg-blue-500 opacity-20 -z-10" />
              )}
              <h1 className="px-3 py-1 relative">{item}</h1>
            </div>
          ))}
        </div>
      )}

      {/* Render Current Page */}
      <div className="mt-6">
        <CurrentPageComponent />
      </div>
    </div>
  );
};

export default AppBar;
