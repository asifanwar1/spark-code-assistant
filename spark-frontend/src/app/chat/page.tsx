import React from 'react';

export const metadata = {
  title: 'Chat | Spark',
  description: 'Real-time messaging and collaboration',
};

export default function ChatPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Chat</h1>
          <p className="mt-2 text-sm text-gray-600">
            Connect and collaborate with your team
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm">
          <div className="grid grid-cols-12 h-[600px]">
            {/* Sidebar */}
            <div className="col-span-3 border-r border-gray-200">
              {/* Search */}
              <div className="p-4 border-b border-gray-200">
                <input
                  type="text"
                  placeholder="Search conversations..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Chat List */}
              <div className="overflow-y-auto h-[calc(600px-73px)]">
                {/* Chat Item */}
                <div className="p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="text-blue-600 font-medium">JD</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">John Doe</p>
                      <p className="text-sm text-gray-500 truncate">
                        Latest updates on Project Alpha...
                      </p>
                    </div>
                    <div className="text-xs text-gray-500">2m ago</div>
                  </div>
                </div>

                {/* Chat Item */}
                <div className="p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                      <span className="text-green-600 font-medium">AS</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">Alice Smith</p>
                      <p className="text-sm text-gray-500 truncate">
                        Can we schedule a meeting?
                      </p>
                    </div>
                    <div className="text-xs text-gray-500">5m ago</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Chat Area */}
            <div className="col-span-9 flex flex-col">
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">John Doe</h2>
                <p className="text-sm text-gray-500">Online</p>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {/* Message */}
                <div className="flex items-start space-x-3">
                  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-blue-600 text-sm font-medium">JD</span>
                  </div>
                  <div className="flex-1">
                    <div className="bg-gray-100 rounded-lg p-3">
                      <p className="text-sm text-gray-900">
                        Hi! How's the project coming along?
                      </p>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">2:30 PM</p>
                  </div>
                </div>

                {/* Message */}
                <div className="flex items-start space-x-3 justify-end">
                  <div className="flex-1">
                    <div className="bg-blue-600 rounded-lg p-3">
                      <p className="text-sm text-white">
                        Going well! We've completed 75% of the tasks.
                      </p>
                    </div>
                    <p className="text-xs text-gray-500 mt-1 text-right">2:32 PM</p>
                  </div>
                  <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                    <span className="text-green-600 text-sm font-medium">Me</span>
                  </div>
                </div>
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-gray-200">
                <div className="flex space-x-4">
                  <input
                    type="text"
                    placeholder="Type a message..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 