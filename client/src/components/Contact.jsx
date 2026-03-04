import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';
import { motion } from "framer-motion";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus("Sending...");

    try {
      const form = e.target;
      await emailjs.sendForm(
        "service_95ulhwq", 
        "template_1s2w0yi", 
        form,
        "nhKT0pj_XHjn32KlL"
      );
      setStatus("✅ Message sent successfully!");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      setStatus("❌ Failed to send. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-slate-800 py-20 px-6 font-sans">
      <motion.div 
        className="max-w-5xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.h2 
            className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            Let's Start a <span className="text-indigo-600">Conversation</span>
          </motion.h2>
          <p className="text-slate-500 max-w-xl mx-auto text-lg font-medium">
            Have questions about SynerySphere? Reach out and we'll get back to you within 24 hours.
          </p>
        </div>

        <div className="grid md:grid-cols-12 gap-8 items-start">
          
          {/* Contact Info Sidebar (4 Cols) */}
          <div className="md:col-span-4 space-y-6">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
              <h3 className="text-xl font-bold text-slate-900 mb-6">Connect with Us</h3>
              
              <div className="space-y-4">
                <a href="https://www.linkedin.com/in/surabhi-sahu-2181a028a/" target="_blank" rel="noreferrer" 
                   className="flex items-center gap-4 p-4 rounded-2xl hover:bg-indigo-50 transition-colors group">
                  <div className="p-3 bg-indigo-100 text-indigo-600 rounded-xl group-hover:bg-indigo-600 group-hover:text-white transition-all">
                    <FaLinkedin size={20} />
                  </div>
                  <span className="font-semibold text-slate-700">LinkedIn</span>
                </a>

                <a href="https://github.com/SurabhiSahu20" target="_blank" rel="noreferrer" 
                   className="flex items-center gap-4 p-4 rounded-2xl hover:bg-slate-100 transition-colors group">
                  <div className="p-3 bg-slate-100 text-slate-900 rounded-xl group-hover:bg-slate-900 group-hover:text-white transition-all">
                    <FaGithub size={20} />
                  </div>
                  <span className="font-semibold text-slate-700">GitHub</span>
                </a>

                <a href="mailto:sahusurabhi02@gmail.com" 
                   className="flex items-center gap-4 p-4 rounded-2xl hover:bg-rose-50 transition-colors group">
                  <div className="p-3 bg-rose-100 text-rose-600 rounded-xl group-hover:bg-rose-600 group-hover:text-white transition-all">
                    <FaEnvelope size={20} />
                  </div>
                  <span className="font-semibold text-slate-700">Email</span>
                </a>
              </div>
            </div>
            
            <div className="bg-indigo-600 p-8 rounded-3xl text-white shadow-xl shadow-indigo-200">
              <h4 className="font-bold text-xl mb-2">WorkHive HQ</h4>
              <p className="text-indigo-100 text-sm leading-relaxed">
                Our mission is to bridge the gap between tasks and results. Join the revolution!
              </p>
            </div>
          </div>

          {/* Contact Form (8 Cols) */}
          <motion.div 
            className="md:col-span-8 bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-100"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">Name</label>
                  <input 
                    type="text" name="name" placeholder="John Doe" 
                    value={formData.name} onChange={handleChange} required 
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">Email</label>
                  <input 
                    type="email" name="email" placeholder="john@example.com" 
                    value={formData.email} onChange={handleChange} required 
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Subject</label>
                <input 
                  type="text" name="subject" placeholder="Project Inquiry" 
                  value={formData.subject} onChange={handleChange} required 
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Message</label>
                <textarea 
                  name="message" placeholder="Tell us more about your project..." rows="5" 
                  value={formData.message} onChange={handleChange} required 
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all resize-none"
                />
              </div>
              
              <button 
                type="submit" disabled={isLoading}
                className="w-full py-5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-2xl transition-all shadow-lg hover:shadow-indigo-100 disabled:opacity-50"
              >
                {isLoading ? "Sending your message..." : "Send Message"}
              </button>

              {status && (
                <motion.p 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }}
                  className={`text-center font-bold p-4 rounded-2xl ${status.includes('✅') ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}
                >
                  {status}
                </motion.p>
              )}
            </form>
          </motion.div>

        </div>
      </motion.div>
    </div>
  );
};

export default Contact;