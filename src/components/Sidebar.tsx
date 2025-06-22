import React from 'react';
import { Users, FileText, MapPin, UserPlus, ChevronRight } from 'lucide-react';

const Sidebar = () => {
  return (
    <div className="space-y-6">
      {/* User Profile */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="flex items-center space-x-3 mb-4">
          <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors">
            <Users className="w-4 h-4" />
            <span className="font-medium">Manage</span>
          </button>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-semibold">DA</span>
            </div>
            <span className="text-gray-700 font-medium">David AAEgencia</span>
          </div>
        </div>
      </div>

      {/* Awaiting Tasks */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Awaiting tasks</h3>
        <div className="space-y-3">
          <button className="flex items-center justify-between w-full p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <div className="flex items-center space-x-3">
              <Users className="w-5 h-5 text-gray-600" />
              <span className="text-gray-700">Approve new users</span>
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">6</span>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Shortcuts */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Shortcuts</h3>
        <div className="grid grid-cols-2 gap-4">
          <button className="flex flex-col items-center space-y-2 p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
            <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-sm font-medium text-blue-800">Manage Users</span>
          </button>
          <button className="flex flex-col items-center space-y-2 p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
            <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-sm font-medium text-blue-800">Reporting</span>
          </button>
          <button className="flex flex-col items-center space-y-2 p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
            <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center">
              <MapPin className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-sm font-medium text-blue-800">Traveller Tracker</span>
          </button>
          <button className="flex flex-col items-center space-y-2 p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
            <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center">
              <UserPlus className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-sm font-medium text-blue-800">Create User</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;