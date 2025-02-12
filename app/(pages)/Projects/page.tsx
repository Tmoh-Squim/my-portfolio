"use client";
import React, { useEffect } from 'react';
import gsap from 'gsap';
import { FaGithub } from 'react-icons/fa';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "Real estate Project",
    description: "A modern web app built with React and Tailwind CSS.",
    link: "https://squim-real-estate.vercel.app", // Live project link
    github: "https://github.com/Tmoh-Squim/Real-estate-prooject", // GitHub link
    image: "/estate1.png",
  },
  {
    title: "Multi-vendor Ecommerce Project",
    description: "A full-stack application built with Node.js and MongoDB.",
    link: "https://squimstech.vercel.app/", // Live project link
    github: "https://github.com/Tmoh-Squim/mern-stack-ecommerce-web-app", // GitHub link
    image: "/ecom1.png",
  },
  {
    title: "Food ordering Project",
    description: "A UI/UX design project with Figma and React.",
    link: "https://kenchick.vercel.app", // Live project link
    github: "https://github.com/Tmoh-Squim/Kenchick-project", // GitHub link
    image: "/kenchick1.png",
  }
];

const ProjectCard = ({ title, description, link, github, image }: any) => {
  useEffect(() => {
    // Individual animation for each card
    gsap.fromTo(
      ".project-card",
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        duration: 2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".project-card",
          start: "top 80%",
          end: "top 30%",
          scrub: 0.5,
          once: true
        }
      }
    );
  }, []);

  return (
    <div className="project-card bg-foreground rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow cursor-pointer">
      <img src={image} alt={title} className="w-full object-fill h-100" />
      <div className="p-6">
        <h3 className="text-xl font-semibold text-background mb-2">{title}</h3>
        <p className="text-gray-400 mb-4">{description}</p>
        <div className="flex justify-between items-center gap-4 mt-4">
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-600 transition-all"
          >
            Live Project
          </a>
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-gray-500 transition-all"
          >
            <FaGithub size={24} />
          </a>
        </div>
      </div>
    </div>
  );
};

const ProjectsPage = () => {
  useEffect(() => {
    gsap.fromTo(
      ".header h1",
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 1.5, ease: "power4.out" }
    );
  }, []);

  return (
    <div className="bg-foreground 800px:h-screen text-background">
      {/* Header Section */}
      <header className="text-center 800px:py-12 py-2 px-4">
        <h1 className="text-3xl font-bold leading-tight header">My Projects</h1>
        <p className="text-lg text-gray-400 mt-4">
          Here&apos;s a collection of some of the projects I&apos;ve worked on.
        </p>
      </header>

      {/* Projects Section */}
      <section className="projects-section 800px:py-8 py-2 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              title={project.title}
              description={project.description}
              link={project.link}
              github={project.github}
              image={project.image}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProjectsPage;
