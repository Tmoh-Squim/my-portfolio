"use client";
import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import emailjs from "@emailjs/browser"
const Page = () => {
  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
    message: "",
    subject:"Portfolio message"
  });

  // Use a ref to store an array of input elements (inputsRef.current)
  const formRef = useRef(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const submitBtnRef = useRef(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    emailjs
    .send(
      "service_qzxl6jp",
      "template_w9kvgrw",
      formData,
      "KWleLqdJwS4tz9FRZ"
    )
    .then(
      (response) => {
        alert("Message sent successfully!");
        setFormData({
          user_name:"",
          user_email:"",
          message:"",
          subject:"Portfolio message"
        })
      },
      (err) => {
        // Handle errors here
        alert("Failed to send message. Please try again.");
      }
    );
  };

  useEffect(() => {
    // Form and inputs animation using GSAP
    gsap.fromTo(
      formRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
      }
    );

    // Animate each input with a staggered effect
    gsap.fromTo(
      [nameRef.current, emailRef.current, messageRef.current],
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
      }
    );

    // Animate the submit button with a bounce effect
    gsap.fromTo(
      submitBtnRef.current,
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 1,
        delay: 0.6, // Delay to show after inputs appear
        ease: "bounce.out",
      }
    );
  }, []);

  return (
    <div className="w-full h-screen bg-gray-900 800px:px-[12%] py-2 text-white">
      <div className="flex justify-center items-center h-full">
        <form
          onSubmit={handleSubmit}
          ref={formRef}
          className="bg-gray-800 p-8 rounded-lg w-full max-w-3xl space-y-6"
        >
          <h2 className="text-3xl font-bold text-center text-blue-500 mb-6">Contact Me</h2>

          <div className="flex flex-col space-y-4">
            {/* Name Input */}
            <div className="flex flex-col">
              <label htmlFor="name" className="text-gray-400 mb-2">Name</label>
              <input
                type="text"
                name="user_name"
                id="name"
                value={formData.user_name}
                onChange={handleChange}
                ref={nameRef}  // Set the ref to the input
                className="p-3 bg-gray-700 rounded-md text-white border-2 border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your Name"
                required
              />
            </div>

            {/* Email Input */}
            <div className="flex flex-col">
              <label htmlFor="email" className="text-gray-400 mb-2">Email</label>
              <input
                type="email"
                name="user_email"
                id="email"
                value={formData.user_email}
                onChange={handleChange}
                ref={emailRef}  // Set the ref to the input
                className="p-3 bg-gray-700 rounded-md text-white border-2 border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your Email"
                required
              />
            </div>

            {/* Message Textarea */}
            <div className="flex flex-col">
              <label htmlFor="message" className="text-gray-400 mb-2">Message</label>
              <textarea
                name="message"
                id="message"
                value={formData.message}
                onChange={handleChange}
                ref={messageRef}  // Set the ref to the textarea
                className="p-3 bg-gray-700 rounded-md text-white border-2 border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your Message"
                rows={5}
                required
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                ref={submitBtnRef}  // Set the ref to the submit button
                className="px-6 py-3 bg-blue-500 text-white rounded-lg w-full hover:bg-blue-600 transition-all"
              >
                Send Message
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
