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
            <h3 className="text-2xl font-semibold mb-4">App Privacy Policy</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              This privacy policy applies to the SiLaBa app (hereby referred to as "Application") for mobile devices that was created by AppKamDev (hereby referred to as "Service Provider") as a Free service. This service is intended for use "AS IS".
            </p>
            <h3 className="text-2xl font-semibold mb-4">Data Retention Policy</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              The Service Provider will retain User Provided data for as long as you use the Application and for a reasonable time thereafter. If you'd like them to delete User Provided Data that you have provided via the Application, please contact them at
              <a href="mailto:fikramulbizli@gmail.com" className="text-blue-500 ml-1 mr-1 hover:text-blue-700 transition duration-300">
                fikramulbizli@gmail.com
              </a>
               and they will respond in a reasonable time.
            </p>
            <h3 className="text-2xl font-semibold mb-4">Security</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              The Service Provider is concerned about safeguarding the confidentiality of your information. The Service Provider provides physical, electronic, and procedural safeguards to protect the information processed and maintained.
            </p>
            <h3 className="text-2xl font-semibold mb-4">Changes</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              This Privacy Policy may be updated from time to time for any reason. The Service Provider will notify you of any changes by updating this page with the new Privacy Policy. Please consult this Privacy Policy regularly for any changes.
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              This privacy policy is effective as of 2024-10-10.
            </p>
            <h3 className="text-2xl font-semibold mb-4">Your Consent</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              By using the Application, you are consenting to the processing of your information as set forth in this Privacy Policy now and as amended by us.
            </p>
            <h3 className="text-2xl font-semibold mb-4">Contact Us</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              If you have any questions about our privacy policy, you can contact us via email at 
              <a href="mailto:posyandukepulauanriau@gmail.com" className="text-blue-500 ml-1 mr-1 hover:text-blue-700 transition duration-300">
                posyandukepulauanriau@gmail.com
              </a>
              or
              <a href="mailto:fikramulbizli@gmail.com" className="text-blue-500 ml-1 hover:text-blue-700 transition duration-300">
                fikramulbizli@gmail.com
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PrivacyPolicy;
