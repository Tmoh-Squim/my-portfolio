"use client";
import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Page = () => {
  useEffect(() => {
    gsap.fromTo(
      ".header h1",
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 1.5, ease: "power4.out" }
    );
    
    gsap.fromTo(
      ".header p",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1.5, delay: 0.5, ease: "power4.out" }
    );
    
    gsap.fromTo(
      ".skill-bar",
      { width: "0%" },
      {
        width: "100%",
        duration: 2,
        ease: "power4.out",
        stagger: 0.3,
        scrollTrigger: {
          trigger: ".skills-section",
          start: "top 80%",
          end: "top 30%",
          scrub: 0.5,
          once: true
        }
      }
    );

    gsap.fromTo(
      ".contact-btn",
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 1, delay: 1, ease: "back.out(1.7)" }
    );
  }, []);

  return (
    <div className="bg-gray-900 text-white">
      {/* Header Section */}
      <header className="text-center py-16 px-4">
        <h1 className="text-5xl font-bold leading-tight header">Timothy Kaingati</h1>
        <p className="text-lg text-gray-400 mt-4">Crafting elegant, responsive web experiences</p>
      </header>

      {/* About Me Section */}
      <section className="py-16 px-4">
        <h2 className="text-4xl font-semibold text-center mb-6">About Me</h2>
        <p className="text-gray-400 text-lg max-w-3xl mx-auto">
          I'm a passionate software developer who specializes in creating innovative web applications. With proficiency in multiple technologies and a knack for problem-solving, my goal is to build websites that are not only functional but also delightful to use.
        </p>
      </section>

      {/* Skills Section with Progress Bars */}
      <section className="py-16 px-4 bg-gray-800 skills-section">
        <h2 className="text-4xl font-semibold text-center mb-6">Skills</h2>
        <div className="space-y-8">
          {[
            { name: "JavaScript", level: 90 },
            { name: "React", level: 85 },
            { name: "Node.js", level: 80 },
            { name: "Tailwind CSS", level: 95 },
            { name: "UI/UX Design", level: 70 },
            { name: "TypeScript", level: 80 },
            { name: "MongoDB", level: 75 },
            { name: "Express.js", level: 80 }
          ].map((skill, index) => (
            <div key={index}>
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-lg">{skill.name}</span>
                <span className="text-gray-400">{skill.level}%</span>
              </div>
              <div className="w-full h-2 bg-gray-600 rounded-full overflow-hidden">
                <div
                  className="skill-bar h-full bg-blue-500"
                  style={{ width: `${skill.level}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4 bg-gray-800">
        <h2 className="text-4xl font-semibold text-center mb-6">Get In Touch</h2>
        <p className="text-center text-gray-400 mb-6">
          I'm always open to exciting opportunities! If you're interested in collaborating or just want to chat, feel free to reach out.
        </p>
        <div className="flex justify-center">
          <a
            href="mailto:timothykaingati@gmail.com"
            className="contact-btn px-8 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
          >
            Email Me
          </a>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="py-4 text-center bg-gray-800">
        <p className="text-gray-400">© 2025 Timothy Kaingati. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Page;
