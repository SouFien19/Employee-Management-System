import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export const Home = () => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-7xl font-extrabold mb-6">Welcome to Your HR Management Platform</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Streamline your HR processes with innovative tools for managing teams, leaves, performance, and more.
          </p>
          <a
            href="/register"
            className="bg-white text-purple-600 font-bold py-4 px-8 rounded-full shadow-lg hover:bg-gray-200 transition duration-300"
          >
            Get Started
          </a>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-bold text-gray-800 text-center mb-12">Our Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Feature 1 */}
            <div className="bg-white shadow-lg rounded-lg p-8 text-center transition-transform transform hover:scale-105">
              <img src="/team-mang.png" alt="Team Management" className="w-32 h-32 rounded-full mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-purple-600 mb-4">Team Management</h3>
              <p className="text-gray-600">Effortlessly manage your team, track performance, and evaluate progress.</p>
            </div>
            {/* Feature 2 */}
            <div className="bg-white shadow-lg rounded-lg p-8 text-center transition-transform transform hover:scale-105">
              <img src="/leav.jpg" alt="Leave Tracking" className="w-32 h-32 rounded-full mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-purple-600 mb-4">Leave Tracking</h3>
              <p className="text-gray-600">Easily track employee leaves, requests, and approvals.</p>
            </div>
            {/* Feature 3 */}
            <div className="bg-white shadow-lg rounded-lg p-8 text-center transition-transform transform hover:scale-105">
              <img src="/perform.jpg" alt="Performance Evaluations" className="w-32 h-32 rounded-full mx-auto mb-6"/>
              <h3 className="text-2xl font-bold text-purple-600 mb-4">Performance Evaluations</h3>
              <p className="text-gray-600">Assess employee performance and generate insightful reports.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section with Slider */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-bold text-gray-800 text-center mb-12">Meet Our Team</h2>
          <Slider {...sliderSettings}>
            {/* Team Member 1 */}
            <div className="px-4">
              <div className="bg-gray-100 shadow-lg rounded-lg p-8 text-center transition-transform transform hover:scale-105">
                <img src="/soufien.png" alt="John Doe" className="w-32 h-32 rounded-full mx-auto mb-6" />
                <h3 className="text-xl font-bold text-gray-800">Soufiane Labiadh</h3>
                <p className="text-gray-600">Lead Developer</p>
              </div>
            </div>
            {/* Team Member 2 */}
            <div className="px-4">
              <div className="bg-gray-100 shadow-lg rounded-lg p-8 text-center transition-transform transform hover:scale-105">
                <img src="/firas.jpg" alt="Jane Smith" className="w-32 h-32 rounded-full mx-auto mb-6" />
                <h3 className="text-xl font-bold text-gray-800">Firas Houidi</h3>
                <p className="text-gray-600">UI/UX Designer</p>
              </div>
            </div>
            {/* Team Member 3 */}
            <div className="px-4">
              <div className="bg-gray-100 shadow-lg rounded-lg p-8 text-center transition-transform transform hover:scale-105">
                <img src="/walid.jpg" alt="Alice Johnson" className="w-32 h-32 rounded-full mx-auto mb-6" />
                <h3 className="text-xl font-bold text-gray-800">Walid Zarwi</h3>
                <p className="text-gray-600">HR Manager</p>
              </div>
            </div>
            {/* Team Member 4 */}
            <div className="px-4">
              <div className="bg-gray-100 shadow-lg rounded-lg p-8 text-center transition-transform transform hover:scale-105">
                <img src="/dhia.jpg" alt="Alice Johnson" className="w-32 h-32 rounded-full mx-auto mb-6" />
                <h3 className="text-xl font-bold text-gray-800">Dhia Tarchoun</h3>
                <p className="text-gray-600">Product Owner</p>
              </div>
            </div>
          </Slider>
        </div>
      </section>

      {/* Tools/Environment Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-gray-800 text-center mb-12">Our Environment</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Jira */}
            <div className="bg-white shadow-lg rounded-lg p-8 text-center transition-transform transform hover:scale-105">
              <img src="/jira.png" alt="Jira" className="h-20 mb-4 mx-auto" />
              <h3 className="text-2xl font-bold text-blue-600">Jira</h3>
              <p className="text-gray-600">Project management and issue tracking made easy.</p>
            </div>
            {/* Slack */}
            <div className="bg-white shadow-lg rounded-lg p-8 text-center transition-transform transform hover:scale-105">
              <img src="/slack.png" alt="Slack" className="h-20 mb-4 mx-auto" />
              <h3 className="text-2xl font-bold text-blue-600">Slack</h3>
              <p className="text-gray-600">Communicate and collaborate with your team seamlessly.</p>
            </div>
            {/* GitHub */}
            <div className="bg-white shadow-lg rounded-lg p-8 text-center transition-transform transform hover:scale-105">
              <img src="/github.png" alt="GitHub" className="h-20 mb-4 mx-auto" />
              <h3 className="text-2xl font-bold text-blue-600">GitHub</h3>
              <p className="text-gray-600">Version control and collaboration for our codebase.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg">© {new Date().getFullYear()} Your HR Management Platform. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};
