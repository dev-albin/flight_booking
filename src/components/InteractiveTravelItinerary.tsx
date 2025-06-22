import React, { useState, useRef, useEffect } from 'react';
import { Plane, Train, Building2, MapPin, Clock, Users, Utensils, Wifi, Car, Phone } from 'lucide-react';

interface TravelItem {
  id: string;
  type: 'flight' | 'train' | 'hotel';
  icon: string;
  from?: string;
  to?: string;
  hotelName?: string;
  date: string;
  time?: string;
  checkIn?: string;
  checkOut?: string;
  roomNumber?: string;
  details: {
    gate?: string;
    terminal?: string;
    baggageClaim?: string;
    seatAssignment?: string;
    mealPreference?: string;
    platform?: string;
    carNumber?: string;
    seatDetails?: string;
    stationAmenities?: string[];
    checkInTime?: string;
    checkOutTime?: string;
    roomAmenities?: string[];
    diningOptions?: string[];
    contactInfo?: string;
  };
}

const InteractiveTravelItinerary: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [animatingItem, setAnimatingItem] = useState<string | null>(null);
  const animationRef = useRef<HTMLDivElement>(null);

  const travelItems: TravelItem[] = [
    {
      id: '1',
      type: 'flight',
      icon: '✈️',
      from: 'New York',
      to: 'London',
      date: '2024-07-25',
      time: '14:30',
      details: {
        gate: 'A12',
        terminal: 'Terminal 4',
        baggageClaim: 'Carousel 3',
        seatAssignment: '12A',
        mealPreference: 'Vegetarian'
      }
    },
    {
      id: '2',
      type: 'train',
      icon: '🚂',
      from: 'London',
      to: 'Paris',
      date: '2024-07-26',
      time: '09:15',
      details: {
        platform: '2',
        carNumber: '5',
        seatDetails: 'Window Seat 15A',
        stationAmenities: ['WiFi', 'Restaurant', 'Shop', 'Lounge']
      }
    },
    {
      id: '3',
      type: 'hotel',
      icon: '🏨',
      hotelName: 'Grand Hotel Paris',
      date: '2024-07-26',
      checkIn: '2024-07-26',
      checkOut: '2024-07-30',
      roomNumber: '512',
      details: {
        checkInTime: '15:00',
        checkOutTime: '11:00',
        roomAmenities: ['King Bed', 'City View', 'Mini Bar', 'WiFi', 'Room Service'],
        diningOptions: ['Le Bistro', 'Rooftop Bar', 'Room Service'],
        contactInfo: '+33 1 42 60 34 12'
      }
    }
  ];

  const handleItemClick = (itemId: string, type: 'flight' | 'train' | 'hotel') => {
    if (animatingItem) return;
    
    setAnimatingItem(itemId);
    
    // Animation duration based on type
    const duration = type === 'flight' ? 1200 : type === 'train' ? 1500 : 300;
    
    setTimeout(() => {
      setSelectedItem(selectedItem === itemId ? null : itemId);
      setAnimatingItem(null);
    }, duration);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const FlightAnimation: React.FC<{ isAnimating: boolean }> = ({ isAnimating }) => {
    if (!isAnimating) return null;

    return (
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
        <div className="relative w-full h-full">
          {/* Clouds */}
          <div className="absolute top-1/4 left-1/4 animate-float-slow">
            <span className="text-4xl opacity-70">☁️</span>
          </div>
          <div className="absolute top-1/3 right-1/3 animate-float-medium">
            <span className="text-3xl opacity-60">☁️</span>
          </div>
          <div className="absolute top-1/2 left-1/2 animate-float-fast">
            <span className="text-2xl opacity-50">☁️</span>
          </div>
          
          {/* Flight Path */}
          <svg className="absolute inset-0 w-full h-full">
            <path
              d="M 100 400 Q 400 200 700 400"
              stroke="#3498DB"
              strokeWidth="2"
              fill="none"
              strokeDasharray="10,5"
              className="animate-dash"
            />
          </svg>
          
          {/* Airplane */}
          <div className="absolute animate-flight-path">
            <div className="text-3xl transform rotate-12 animate-plane-tilt">
              ✈️
            </div>
          </div>
        </div>
      </div>
    );
  };

  const TrainAnimation: React.FC<{ isAnimating: boolean }> = ({ isAnimating }) => {
    if (!isAnimating) return null;

    return (
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden bg-gradient-to-b from-sky-100 to-green-100">
        <div className="relative w-full h-full">
          {/* Landscape Elements */}
          <div className="absolute bottom-1/3 left-0 w-full h-32 bg-green-200 animate-slide-right"></div>
          <div className="absolute bottom-1/3 animate-slide-right-fast">
            <div className="flex space-x-8">
              <div className="w-4 h-16 bg-green-600"></div>
              <div className="w-4 h-20 bg-green-700"></div>
              <div className="w-4 h-12 bg-green-500"></div>
            </div>
          </div>
          
          {/* Train Track */}
          <div className="absolute bottom-1/4 left-0 w-full h-2 bg-gray-600 animate-slide-right"></div>
          <div className="absolute bottom-1/4 left-0 w-full h-1 bg-gray-800 animate-slide-right-fast"></div>
          
          {/* Train */}
          <div className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 animate-train-move">
            <div className="flex items-center">
              <div className="text-4xl">🚂</div>
              {/* Steam particles */}
              <div className="absolute -top-4 left-2 animate-steam">
                <span className="text-gray-400">💨</span>
              </div>
            </div>
          </div>
          
          {/* Wheel rotation effect */}
          <div className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 translate-y-4">
            <div className="w-6 h-6 border-4 border-gray-800 rounded-full animate-spin-fast"></div>
            <div className="w-6 h-6 border-4 border-gray-800 rounded-full animate-spin-fast ml-8"></div>
          </div>
        </div>
      </div>
    );
  };

  const HotelAnimation: React.FC<{ isAnimating: boolean }> = ({ isAnimating }) => {
    if (!isAnimating) return null;

    return (
      <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center bg-black bg-opacity-20">
        <div className="relative">
          <div className="text-8xl animate-hotel-entrance">🏨</div>
          <div className="absolute inset-0 bg-gradient-to-t from-yellow-200 to-transparent animate-lobby-reveal"></div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Interactive Travel Itinerary
        </h1>
        
        <div className="space-y-6">
          {travelItems.map((item) => (
            <div key={item.id} className="relative">
              {/* Main Item Card */}
              <div
                className={`bg-white rounded-lg shadow-md border border-gray-200 p-6 cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.02] ${
                  selectedItem === item.id ? 'ring-2 ring-blue-500' : ''
                } ${animatingItem === item.id ? 'animate-pulse' : ''}`}
                onClick={() => handleItemClick(item.id, item.type)}
                role="button"
                tabIndex={0}
                aria-label={`${item.type} details`}
                style={{ minHeight: '44px' }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <span className="text-2xl" role="img" aria-label={item.type}>
                      {item.icon}
                    </span>
                    
                    <div className="flex-1">
                      {item.type === 'hotel' ? (
                        <div className="text-lg font-semibold text-gray-800">
                          {item.hotelName} | {formatDate(item.checkIn!)} → {formatDate(item.checkOut!)} | Room {item.roomNumber}
                        </div>
                      ) : (
                        <div className="text-lg font-semibold text-gray-800">
                          {item.from} → {item.to} | {formatDate(item.date)} {item.time}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {item.type === 'flight' && <Plane className="w-5 h-5 text-blue-600" />}
                    {item.type === 'train' && <Train className="w-5 h-5 text-green-600" />}
                    {item.type === 'hotel' && <Building2 className="w-5 h-5 text-red-600" />}
                  </div>
                </div>
              </div>

              {/* Expanded Details */}
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  selectedItem === item.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="bg-gray-50 rounded-b-lg p-6 mt-2 border border-t-0 border-gray-200">
                  {item.type === 'flight' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      <div className="space-y-3">
                        <h3 className="font-semibold text-gray-800 flex items-center">
                          <MapPin className="w-4 h-4 mr-2" />
                          Gate Information
                        </h3>
                        <p className="text-gray-600">Gate: {item.details.gate}</p>
                        <p className="text-gray-600">Terminal: {item.details.terminal}</p>
                        <p className="text-gray-600">Baggage: {item.details.baggageClaim}</p>
                      </div>
                      <div className="space-y-3">
                        <h3 className="font-semibold text-gray-800 flex items-center">
                          <Users className="w-4 h-4 mr-2" />
                          Seat Details
                        </h3>
                        <p className="text-gray-600">Seat: {item.details.seatAssignment}</p>
                        <p className="text-gray-600">Meal: {item.details.mealPreference}</p>
                      </div>
                    </div>
                  )}

                  {item.type === 'train' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <h3 className="font-semibold text-gray-800 flex items-center">
                          <Train className="w-4 h-4 mr-2" />
                          Train Details
                        </h3>
                        <p className="text-gray-600">Platform: {item.details.platform}</p>
                        <p className="text-gray-600">Car: {item.details.carNumber}</p>
                        <p className="text-gray-600">Seat: {item.details.seatDetails}</p>
                      </div>
                      <div className="space-y-3">
                        <h3 className="font-semibold text-gray-800 flex items-center">
                          <Wifi className="w-4 h-4 mr-2" />
                          Station Amenities
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {item.details.stationAmenities?.map((amenity, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                            >
                              {amenity}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {item.type === 'hotel' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      <div className="space-y-3">
                        <h3 className="font-semibold text-gray-800 flex items-center">
                          <Clock className="w-4 h-4 mr-2" />
                          Check-in/out
                        </h3>
                        <p className="text-gray-600">Check-in: {item.details.checkInTime}</p>
                        <p className="text-gray-600">Check-out: {item.details.checkOutTime}</p>
                        <p className="text-gray-600 flex items-center">
                          <Phone className="w-4 h-4 mr-1" />
                          {item.details.contactInfo}
                        </p>
                      </div>
                      <div className="space-y-3">
                        <h3 className="font-semibold text-gray-800 flex items-center">
                          <Building2 className="w-4 h-4 mr-2" />
                          Room Amenities
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {item.details.roomAmenities?.map((amenity, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm"
                            >
                              {amenity}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-3">
                        <h3 className="font-semibold text-gray-800 flex items-center">
                          <Utensils className="w-4 h-4 mr-2" />
                          Dining Options
                        </h3>
                        <div className="space-y-1">
                          {item.details.diningOptions?.map((option, index) => (
                            <p key={index} className="text-gray-600">{option}</p>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Animations */}
      <FlightAnimation isAnimating={animatingItem === '1'} />
      <TrainAnimation isAnimating={animatingItem === '2'} />
      <HotelAnimation isAnimating={animatingItem === '3'} />
    </div>
  );
};

export default InteractiveTravelItinerary;