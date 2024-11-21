import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const PrivacyPolicy = () =>{
  const navigate = useNavigate();

  return (
    <section className="relative bg-gradient-to-b from-[#008EB3] to-blue-600 py-20 px-6 md:px-12 lg:px-24 overflow-hidden">
      <div className="container mx-auto flex flex-col items-center text-center md:text-left">
        <div className="md:w-2/3 lg:w-1/2">
          <button
            onClick={() => navigate(-1)}
            className="mb-8 flex items-center px-6 py-2 bg-white text-[#008EB3] font-semibold rounded-full shadow-md hover:bg-gray-100 transition duration-300"
          >
            <FaArrowLeft className="mr-2" />
            Kembali
          </button>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-6">
            Privacy Policy
          </h2>
          <p className="text-white text-lg leading-relaxed mb-10">
            This privacy policy explains what personal data we collect from you, how we use it, and your rights regarding your data.
          </p>
          <div className="bg-white text-[#008EB3] px-6 py-6 rounded-lg shadow-xl">
            <h3 className="text-2xl font-semibold mb-4">Introduction</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              Your privacy is important to us. This privacy policy explains what personal data we collect from you, how we use it, and your rights regarding your data.
            </p>
            <h3 className="text-2xl font-semibold mb-4">Data Collection</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              We collect personal data in several ways, including through our website, when you register for services, and when you interact with us.
            </p>
            <h3 className="text-2xl font-semibold mb-4">Data Usage</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              The data we collect is used to provide and improve our services, to communicate with you, and to comply with legal obligations.
            </p>
            <h3 className="text-2xl font-semibold mb-4">Your Rights</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              You have the right to access, correct, or delete your personal data, as well as to restrict or object to its processing.
            </p>
            <h3 className="text-2xl font-semibold mb-4">Contact Us</h3>
            <p className="text-gray-700 leading-relaxed">
              If you have any questions about our privacy policy, you can contact us via email at
              <a href="mailto:posyandukepulauanriau@gmail.com" className="text-blue-500 ml-1 hover:text-blue-700 transition duration-300">
                posyandukepulauanriau@gmail.com
              </a>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PrivacyPolicy;
