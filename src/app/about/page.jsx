import Image from 'next/image';
import React from 'react';

const teamMembers = [
  {
    name: 'Tanvir Rahman',
    role: 'Founder & CEO',
    image: 'https://plus.unsplash.com/premium_photo-1738592736106-a17b897c0ab1?q=80&w=1934&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    name: 'Ayesha Karim',
    role: 'Head of Product',
    image: 'https://images.unsplash.com/photo-1593085512500-5d55148d6f0d?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    name: 'Rafiul Hasan',
    role: 'Lead Developer',
    image: 'https://images.unsplash.com/photo-1637858868799-7f26a0640eb6?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    name: 'Nadia Islam',
    role: 'Marketing Manager',
    image: 'https://plus.unsplash.com/premium_photo-1681488159219-e0f0f2542424?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    name: 'Zayed Hossain',
    role: 'Customer Success Lead',
    image: 'https://images.unsplash.com/photo-1529335764857-3f1164d1cb24?q=80&w=1978&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
];

export default function AboutPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center text-blue-700 mb-6">About TechHub</h1>

      <p className="text-gray-700 text-lg text-center mb-10">
        Welcome to <span className="font-semibold">TechHub</span> — your destination for innovative, high-quality tech products. Whether it's smart devices,
        home automation, or everyday gadgets, we’re here to help you shop smart and live smarter.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-16">
        <div>
          <img src="https://images.unsplash.com/photo-1688561809321-e51e8a4d6651?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="About TechHub"
            width={600}
            height={400}
            className="rounded-xl shadow-md w-full h-auto object-cover" />
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Who We Are</h2>
          <p className="text-gray-600 mb-4">
            Founded in 2024, TechHub is a team of dedicated tech enthusiasts driven by one goal — to deliver modern, smart, and reliable technology to your doorstep.
          </p>
          <p className="text-gray-600">
            We focus on innovation, quality, and a seamless customer experience, helping you make smarter decisions with every purchase.
          </p>
        </div>
      </div>

      <div className="text-center mb-20">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Why Choose TechHub?</h2>
        <ul className="grid gap-4 md:grid-cols-3 text-gray-700 text-base">
          <li>🚀 Fast & Secure Delivery</li>
          <li>💳 Multiple Payment Options</li>
          <li>📞 24/7 Live Support</li>
          <li>🔁 Hassle-Free Returns</li>
          <li>⭐ Handpicked Quality Products</li>
          <li>🎯 Trusted by 10K+ Customers</li>
        </ul>
      </div>

      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-10">Meet the TechHub Team</h2>
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {teamMembers.map((member, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition duration-300"
            >
              <img
                src={member.image}
                alt={member.name}
                width={96}
                height={96}
                className="w-24 h-24 object-cover rounded-full mb-4"
              />
              <h3 className="text-lg font-semibold text-gray-800">{member.name}</h3>
              <p className="text-sm text-gray-500">{member.role}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center mt-16">
        <p className="text-gray-600">
          Thank you for being part of the <span className="font-semibold">TechHub</span> family. Let’s innovate together!
        </p>
      </div>
    </div>
  );
}
