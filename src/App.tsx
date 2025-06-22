import React from 'react';
import Header from './components/Header';
import TripTimeline from './components/TripTimeline';
import BookingWidget from './components/BookingWidget';
import UpcomingTrips from './components/UpcomingTrips';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="xl:col-span-3 space-y-6">
            {/* Trip Timeline */}
            <TripTimeline />
            
            {/* Booking Widget */}
            <BookingWidget />
            
            {/* Upcoming Trips */}
            <UpcomingTrips />
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