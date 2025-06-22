import React, { useState } from 'react';
import { Plane, Building2, Train, Car, ArrowLeftRight, Calendar, Clock, ChevronDown, Search } from 'lucide-react';

interface BookingTab {
  id: string;
  label: string;
  icon: React.ReactNode;
}

const BookingWidget = () => {
  const [activeTab, setActiveTab] = useState('trains');
  const [tripType, setTripType] = useState('round-trip');

  const tabs: BookingTab[] = [
    { id: 'flights', label: 'Flights', icon: <Plane className="w-5 h-5" /> },
    { id: 'hotels', label: 'Hotels', icon: <Building2 className="w-5 h-5" /> },
    { id: 'trains', label: 'Trains', icon: <Train className="w-5 h-5" /> },
    { id: 'cars', label: 'Cars', icon: <Car className="w-5 h-5" /> }
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-6xl">
      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-2 px-6 py-3 border-b-2 font-medium transition-colors ${
              activeTab === tab.id
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Trip Type Selector */}
      <div className="flex items-center space-x-4 mb-6">
        <button
          onClick={() => setTripType('round-trip')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            tripType === 'round-trip'
              ? 'bg-blue-100 text-blue-700'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          Round trip
        </button>
        <button
          onClick={() => setTripType('one-way')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            tripType === 'one-way'
              ? 'bg-blue-100 text-blue-700'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          One way
        </button>
      </div>

      {/* Booking Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-end">
        {/* From */}
        <div className="lg:col-span-3">
          <div className="relative">
            <Train className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Leaving from"
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Swap Button */}
        <div className="lg:col-span-1 flex justify-center">
          <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
            <ArrowLeftRight className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* To */}
        <div className="lg:col-span-3">
          <div className="relative">
            <Train className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Going to"
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Dates */}
        <div className="lg:col-span-2">
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value="18 Jun - 19 Jun"
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              readOnly
            />
            <span className="absolute top-0 left-12 text-xs text-gray-500 bg-white px-1">Dates</span>
          </div>
        </div>

        {/* Departure Time */}
        <div className="lg:col-span-2">
          <div className="relative">
            <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select className="w-full pl-12 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white">
              <option>07:00</option>
              <option>08:00</option>
              <option>09:00</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            <span className="absolute top-0 left-12 text-xs text-gray-500 bg-white px-1">Depart</span>
          </div>
        </div>

        {/* Return Time */}
        <div className="lg:col-span-1">
          <div className="relative">
            <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select className="w-full pl-12 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white">
              <option>16:00</option>
              <option>17:00</option>
              <option>18:00</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            <span className="absolute top-0 left-12 text-xs text-gray-500 bg-white px-1">Return</span>
          </div>
        </div>

        {/* Search Button */}
        <div className="lg:col-span-12 flex justify-end mt-4">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2">
            <Search className="w-5 h-5 mr-1" />
            <span className="hidden sm:inline align-middle">Search trains</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingWidget;