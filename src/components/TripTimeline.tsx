import React, { useState } from 'react';
import { Plane, Train, Car, Clock, MapPin, Play } from 'lucide-react';
import FlightPathAnimation from './FlightPathAnimation';

const TripTimeline = () => {
  const [isAnimationPlaying, setIsAnimationPlaying] = useState(false);

  const trips = [
    {
      id: 1,
      type: 'flight',
      from: 'Bengaluru',
      to: 'Delhi',
      fromCode: 'BLR',
      toCode: 'DEL',
      date: '25 Jul, 09:30 AM',
      details: 'Get Ticket Terminal 5, Seat 20',
      status: 'upcoming'
    },
    {
      id: 2,
      type: 'flight',
      from: 'Indigo 6E 203',
      to: '',
      date: '3hr 15min(0 stops)',
      details: 'View full details',
      status: 'in-transit'
    },
    {
      id: 3,
      type: 'flight',
      from: 'Delhi',
      to: '',
      fromCode: 'DEL',
      date: '25 Jul, 01:45 PM',
      details: '',
      status: 'upcoming'
    }
  ];

  const handlePlayJourney = () => {
    setIsAnimationPlaying(true);
  };

  const handleAnimationComplete = () => {
    setIsAnimationPlaying(false);
  };

  // Auto-start animation when component mounts
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimationPlaying(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-6 relative overflow-hidden">
      <div className="flex items-center justify-between mb-6 relative z-10">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white font-semibold text-sm">D</span>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Hi David,</h2>
            <p className="text-gray-700">Your upcoming trip</p>
          </div>
        </div>
        <button 
          onClick={handlePlayJourney}
          disabled={isAnimationPlaying}
          className={`flex items-center space-x-2 transition-all duration-300 ${
            isAnimationPlaying 
              ? 'text-gray-400 cursor-not-allowed' 
              : 'text-blue-600 hover:text-blue-700 hover:scale-105'
          }`}
        >
          <Play className={`w-4 h-4 ${isAnimationPlaying ? 'animate-pulse' : ''}`} />
          <span className="font-medium">
            {isAnimationPlaying ? 'Playing Journey...' : 'Play your Journey'}
          </span>
        </button>
      </div>

      {/* Flight Path Animation Overlay */}
      <FlightPathAnimation
        isPlaying={isAnimationPlaying}
        onAnimationComplete={handleAnimationComplete}
        from="Bengaluru"
        to="Delhi"
        fromCode="BLR"
        toCode="DEL"
      />

      <div className={`flex items-center space-x-8 overflow-x-auto pb-4 transition-all duration-500 ${
        isAnimationPlaying ? 'opacity-20 blur-sm' : 'opacity-100 blur-0'
      }`}>
        {trips.map((trip, index) => (
          <div key={trip.id} className="flex items-center space-x-4 min-w-max">
            <div className="text-center">
              <div className="flex items-center space-x-2 mb-2">
                {trip.type === 'flight' && <Plane className="w-5 h-5 text-blue-600" />}
                <div>
                  <p className="text-sm font-medium text-gray-900">{trip.from}</p>
                  {trip.fromCode && <p className="text-xs text-gray-500">{trip.fromCode}</p>}
                </div>
              </div>
              <p className="text-xs text-gray-600">{trip.date}</p>
              <p className="text-xs text-gray-500 mt-1">{trip.details}</p>
            </div>
            {index < trips.length - 1 && (
              <div className="flex-1 h-px bg-gray-300 min-w-[60px]"></div>
            )}
          </div>
        ))}
      </div>

      {/* Animated background elements */}
      {isAnimationPlaying && (
        <>
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-50/20 to-sky-50/20 animate-pulse"></div>
          <div className="absolute top-4 right-4 w-2 h-2 bg-blue-400 rounded-full animate-ping"></div>
          <div className="absolute bottom-4 left-4 w-1 h-1 bg-yellow-400 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
        </>
      )}
    </div>
  );
};

export default TripTimeline;