import React from 'react';

export const metadata = {
  title: 'Projects | Spark',
  description: 'View and manage your projects',
};

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
          <p className="mt-2 text-sm text-gray-600">
            Manage and track your project progress
          </p>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Project Card */}
          <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Project Alpha</h3>
              <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                Active
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              A revolutionary project that aims to transform the industry.
            </p>
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>Progress: 75%</span>
              <span>Due: Dec 31, 2024</span>
            </div>
          </div>

          {/* Project Card */}
          <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Project Beta</h3>
              <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
                In Progress
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Developing innovative solutions for modern challenges.
            </p>
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>Progress: 45%</span>
              <span>Due: Mar 15, 2025</span>
            </div>
          </div>

          {/* Project Card */}
          <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Project Gamma</h3>
              <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                Planning
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Strategic initiative for future growth and expansion.
            </p>
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>Progress: 10%</span>
              <span>Due: Jun 30, 2025</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 