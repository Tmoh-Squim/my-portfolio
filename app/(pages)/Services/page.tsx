"use client"
import React, { useEffect } from 'react';
import gsap from 'gsap';

const services = [
  {
    title: "Web Development",
    description: "Build fast, responsive, and modern websites tailored to your needs."
  },
  {
    title: "UI/UX Design",
    description: "Craft intuitive and user-friendly designs for digital experiences."
  },
  {
    title: "SEO Optimization",
    description: "Improve your website's visibility and ranking on search engines."
  },
  {
    title: "MERN Stack Development",
    description: "Develop full-stack web applications using MongoDB, Express, React, and Node.js."
  },
  {
    title: "TypeScript Expertise",
    description: "Build robust and type-safe applications with TypeScript for enhanced reliability."
  }
];

const ServiceCard = ({ title, description }: ServiceCardProps) => {
  const tl = gsap.timeline();
  useEffect(() => {
    tl.fromTo(
      ".service-card",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1.5,
        stagger: 0.3,
        ease: "power4.out"
      }
    )
  }, []);

  return (
    <div className="service-card bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl 800px:w-[31%] mt-3 800px:mt-0 transition-shadow">
      <h2 className="text-xl font-semibold mb-3">{title}</h2>
      <p className="text-gray-400">{description}</p>
    </div>
  );
};

const Page = () => {
  return (
    <div className="w-full px-4 800px:h-screen 800px:px-[12%] 1100:px-[20%] bg-gray-900 text-white">
      {/* Header Section */}
      <header className="text-center 800px:py-12 py-2">
        <h1 className="text-3xl font-bold mb-4 header">Our Services</h1>
        <p className="text-lg text-gray-400">
          Discover what we offer to help you achieve your goals.
        </p>
      </header>

      {/* Services Section */}
      <section className="gap-8 800px:flex flex-wrap 800px:py-6 py-2">
        {services.map((service, index) => (
          <ServiceCard
            key={index}
            title={service.title}
            description={service.description}
          />
        ))}
      </section>
    </div>
  );
};

export default Page;
