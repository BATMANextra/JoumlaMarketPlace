import React from 'react';
import { Link } from 'react-router-dom';

const teamMembers = [
  {
    name: 'Rahal rabah',
    role: 'CEO',
    image: 'https://via.placeholder.com/100',
  },
  {
    name: 'Mohamed laid',
    role: 'CTO',
    image: 'https://via.placeholder.com/100',
  },
];
function About() {
  return (
    <div>
      <section className="my-8 p-6 bg-white shadow-md rounded-md">
        <h2 className=" flex justify-center text-2xl font-bold mb-4">
          About Our Platform
        </h2>
        <p className="flex justify-center text-gray-700">
          Welcome to joumla marketplace, where we bring together a diverse
          community of sellers and buyers. Our goal is to provide a seamless and
          dynamic marketplace experience.
        </p>
      </section>
      <section className="my-8 p-6 bg-white shadow-md rounded-md">
        <h2 className="flex justify-center text-2xl font-bold mb-4">
          Our Mission & Vision
        </h2>
        <p className="text-gray-700 flex justify-center">
          Our mission is to connect wholesale sellers with regular sellers or
          buyers.
        </p>
        <p className="text-gray-700 mt-2 flex justify-center">
          We envision a company where commerce is inclusive, accessible, and
          sustainable for everyone.
        </p>
      </section>
      <section className="my-8 p-6 bg-white shadow-md rounded-md">
        <h2 className="flex justify-center text-2xl font-bold mb-4">
          Meet Our Team
        </h2>
        <div className="flex flex-wrap justify-center">
          {teamMembers.map((member) => (
            <div key={member.name} className="m-4 text-center">
              <img
                src={member.image}
                alt={member.name}
                className="rounded-full w-24 h-24 mx-auto mb-2"
              />
              <h3 className="text-xl font-semibold">{member.name}</h3>
              <p className="text-gray-600">{member.role}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="my-8 p-6 bg-white shadow-md rounded-md">
        <h2 className="flex justify-center text-2xl font-bold mb-4">
          Contact Us
        </h2>
        <p className="text-gray-700 flex justify-center">
          If you have any questions or need assistance, feel free to reach out
          to us at: <p className='text-gray-700 ml-2 '><Link className='no-underline text-orange-600' to={"/contact-us"}>Contact us</Link></p>
        </p>
        <p className="text-gray-700 mt-4 flex justify-center">
          Email: bmohamedlaidyacine@gmail.com
        </p>
        <p className="text-gray-700 mt-4 flex justify-center">Phone: (213) 664253771</p>
      </section>
    </div>
  );
}

export default About;
