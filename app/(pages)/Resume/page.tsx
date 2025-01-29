"use client";
import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

// Register GSAP plugin
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
      ".profile-pic",
      { opacity: 0, scale: 0.5 },
      { opacity: 1, scale: 1, duration: 1.5, delay: 0.8, ease: "power4.out" }
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
      <header className=" flex items-center py-5 px-4  header">
        <div>
        <h1 className="text-3xl font-bold leading-tight mt-4">Timothy Kaingati</h1>
        <p className="text-lg text-gray-400 mt-2">Crafting elegant, responsive web experiences</p>
        </div>
        <img 
          src="/Profile1.png" 
          alt="Profile Picture" 
          className="rounded-full w-[250px] h-[250px] my-auto  mx-auto profile-pic shadow-sm" 
        />
      </header>

      {/* Experience and Education Timeline Section */}
      <section className="py-6 px-4 bg-gray-800">
        <h2 className="text-2xl font-semibold text-center mb-6">My Resume</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Experience Section */}
          <div>
            <h3 className="text-2xl font-semibold text-center mb-4 border-b-2 border-yellow-500">Experience</h3>
            <div className="border-l-4 border-yellow-500 pl-6 space-y-6">
              {[{ role: "Consultant", company: "Raesa, Rs", desc: "User Experience, Visual Design", duration: "2020 - Present" },
                { role: "Full Stack Developer", company: "Fiver", desc: "Web development, Databases, Backend development", duration: "2020 - Present" },
                { role: "Project Manager", company: "Kirinyaga, KENYA", desc: "Creative Direction, Team Management", duration: "2018 - 2020" }
              ].map((exp, index) => (
                <div key={index} className="bg-gray-900 p-4 border-2 border-yellow-500 rounded-lg shadow-lg">
                  <h4 className="font-bold">{exp.role} <span className="text-yellow-400">{exp.company}</span></h4>
                  <p className="text-gray-400">{exp.desc}</p>
                  <span className="text-sm text-gray-500">{exp.duration}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Education Section */}
          <div>
            <h3 className="text-2xl font-semibold text-center mb-4 border-b-2 border-yellow-500">Education</h3>
            <div className="border-l-4 border-yellow-500 pl-6 space-y-6">
              {[{ school: "Secondary Munyuini School", degree: "10th Grade", duration: "2020 - Present" },
                { school: "Higher Secondary Munyuini School of Higher Education", degree: "12th Grade in Science", duration: "2020 - Present" },
                { school: "B.SWE Kirinyaga University", degree: "Bachelor of Software Engineering", duration: "Present" }
              ].map((edu, index) => (
                <div key={index} className="bg-gray-900 p-4 border-2 border-yellow-500 rounded-lg shadow-lg">
                  <h4 className="font-bold">{edu.school}</h4>
                  <p className="text-gray-400">{edu.degree}</p>
                  <span className="text-sm text-gray-500">{edu.duration}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Page;
