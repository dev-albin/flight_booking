import React from 'react';
import { Plane, Train, Car, Building2, Calendar, Clock, MapPin, MoreVertical } from 'lucide-react';

const UpcomingTrips = () => {
  const trips = [
    {
      id: 1,
      type: 'flight',
      title: 'David\'s Upcoming trip & stay',
      segments: [
        {
          from: 'BLR',
          to: 'DEL',
          date: '25 JUL, 09:30 AM',
          status: 'Upcoming',
          details: 'Get Ticket Terminal 5, Seat 20'
        },
        {
          from: 'Hilton, Lucknow',
          date: '26 JUL → 30JUL',
          status: 'Hotel',
          details: 'View full details'
        },
        {
          from: 'CDG',
          to: 'BLR',
          date: '30 JUL, 12:30 AM',
          status: 'Return',
          details: ''
        }
      ]
    }
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'flight':
        return <Plane className="w-4 h-4" />;
      case 'train':
        return <Train className="w-4 h-4" />;
      case 'car':
        return <Car className="w-4 h-4" />;
      case 'hotel':
        return <Building2 className="w-4 h-4" />;
      default:
        return <Plane className="w-4 h-4" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      {trips.map((trip) => (
        <div key={trip.id} className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">D</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{trip.title}</h3>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                View all →
              </button>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center space-x-1">
                <span>Play Itinerary</span>
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {trip.segments.map((segment, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    {getIcon(segment.status?.toLowerCase() || 'flight')}
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-gray-900">{segment.from}</span>
                        {segment.to && (
                          <>
                            <span className="text-gray-400">→</span>
                            <span className="font-medium text-gray-900">{segment.to}</span>
                          </>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">{segment.date}</p>
                      {segment.details && (
                        <p className="text-xs text-gray-500 mt-1">{segment.details}</p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {segment.status && (
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      segment.status === 'Upcoming' 
                        ? 'bg-yellow-100 text-yellow-800'
                        : segment.status === 'Hotel'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {segment.status}
                    </span>
                  )}
                  <button className="p-1 hover:bg-gray-200 rounded">
                    <MoreVertical className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default UpcomingTrips;