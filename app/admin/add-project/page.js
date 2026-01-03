'use client';

import { useState } from 'react';

export default function AddProjectPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    const formData = new FormData(e.target);

    try {
      const res = await fetch('/api/create-project', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setMessage('✅ Published Successfully!');
        e.target.reset();
        window.scrollTo(0, 0);
      } else {
        setMessage(`❌ Error: ${data.error}`);
      }
    } catch (error) {
      setMessage('❌ Network Error');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="bg-[#0f0f0f] min-h-screen text-white pt-32 pb-20">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-4xl font-bold mb-8 text-center">Add Enhanced Project</h1>

        <form onSubmit={handleSubmit} className="space-y-8 bg-[#161616] p-8 md:p-10 rounded-3xl border border-white/5 shadow-2xl">
          
          {/* PASSWORD */}
          <div className="bg-red-500/5 p-6 rounded-xl border border-red-500/10">
            <label className="block text-sm font-bold text-red-400 mb-2">Admin Password</label>
            <input 
              type="password" 
              name="password" 
              required 
              className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-orange-500 outline-none" 
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Title */}
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-gray-400 mb-2">Project Title</label>
              <input 
                type="text" 
                name="title" 
                required 
                className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-orange-500 outline-none" 
                placeholder="e.g. Nike Campaign 2026" 
              />
            </div>

            {/* Project Category (NEW) */}
            <div>
              <label className="block text-sm font-bold text-gray-400 mb-2">Project Category</label>
              <select 
                name="projectType" 
                required 
                defaultValue=""
                className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-orange-500 outline-none appearance-none cursor-pointer"
              >
                <option value="" disabled>Select a Category...</option>
                <option value="Web Design">Web Design</option>
                <option value="Branding">Branding</option>
                <option value="Automation">Automation</option>
                <option value="App Development">App Development</option>
                <option value="Project Management">Project Management</option>
              </select>
            </div>

            {/* Client */}
            <div>
              <label className="block text-sm font-bold text-gray-400 mb-2">Client Name</label>
              <input 
                type="text" 
                name="client" 
                className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-orange-500 outline-none" 
                placeholder="e.g. Nike" 
              />
            </div>

            {/* Timeline */}
            <div>
              <label className="block text-sm font-bold text-gray-400 mb-2">Timeline</label>
              <input 
                type="text" 
                name="timeline" 
                className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-orange-500 outline-none" 
                placeholder="e.g. 6 Weeks" 
              />
            </div>

             {/* Role */}
             <div>
              <label className="block text-sm font-bold text-gray-400 mb-2">My Role</label>
              <input 
                type="text" 
                name="role" 
                className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-orange-500 outline-none" 
                placeholder="e.g. Lead Designer" 
              />
            </div>

             {/* Tech Stack - Made Full Width for ease */}
             <div className="md:col-span-2">
              <label className="block text-sm font-bold text-gray-400 mb-2">Tech Stack (comma separated)</label>
              <input 
                type="text" 
                name="techStack" 
                className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-orange-500 outline-none" 
                placeholder="e.g. React, Next.js, Sanity" 
              />
            </div>

            {/* Tagline */}
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-gray-400 mb-2">Tagline</label>
              <input 
                type="text" 
                name="tagline" 
                className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-orange-500 outline-none" 
              />
            </div>

             {/* URL */}
             <div className="md:col-span-2">
              <label className="block text-sm font-bold text-gray-400 mb-2">Live Project Link</label>
              <input 
                type="url" 
                name="projectLink" 
                className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-orange-500 outline-none" 
              />
            </div>
          </div>

          <hr className="border-white/10" />

          {/* IMAGES */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-400 mb-2">Main Hero Image</label>
              <input 
                type="file" 
                name="image" 
                accept="image/*" 
                className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:bg-orange-600 file:text-white hover:file:bg-orange-700 cursor-pointer" 
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-400 mb-2">Gallery Images (Select Multiple)</label>
              <input 
                type="file" 
                name="gallery" 
                accept="image/*" 
                multiple 
                className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:bg-gray-700 file:text-white hover:file:bg-gray-600 cursor-pointer" 
              />
            </div>
          </div>

          {/* Markdown Content */}
          <div>
            <label className="block text-sm font-bold text-gray-400 mb-2">Case Study (Markdown)</label>
            <textarea 
              name="body" 
              rows="12" 
              className="w-full bg-black/50 border border-white/10 rounded-lg p-4 text-white font-mono text-sm focus:border-orange-500 outline-none" 
              placeholder="# Challenge&#10;Describe the problem...&#10;&#10;## Solution&#10;Describe how we fixed it..."
            ></textarea>
          </div>

          <button 
            type="submit" 
            disabled={isLoading} 
            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 rounded-xl transition-all disabled:opacity-50 text-lg shadow-lg shadow-orange-900/20"
          >
            {isLoading ? 'Uploading...' : 'Publish Project'}
          </button>

          {message && (
            <div className={`text-center font-bold p-3 rounded-lg ${message.includes('Error') ? 'text-red-500' : 'text-green-500'}`}>
              {message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}