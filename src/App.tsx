import React from 'react';
import Header from './components/Header';
import TravelItinerary from './components/TravelItinerary';
import BookingWidget from './components/BookingWidget';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="xl:col-span-3 space-y-6">
            {/* Travel Itinerary */}
            <TravelItinerary />
            
            {/* Booking Widget */}
            <BookingWidget />
          </div>
          
          {/* Sidebar */}
          <div className="xl:col-span-1">
            <Sidebar />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;