import React, { useState, useEffect } from 'react';
import { Plane, Train, Car, Building2, Calendar, Clock, MapPin, Thermometer, QrCode, FileText, ChevronLeft, Star, Wifi, Coffee, Car as CarIcon, Users, Bed, ArrowLeft } from 'lucide-react';
import { Booking } from './TravelItinerary';
import CountdownTimer from './CountdownTimer';
import WeatherWidget from './WeatherWidget';
import DocumentsPanel from './DocumentsPanel';

interface SingleBookingViewProps {
  booking: Booking;
  onBack?: () => void;
  showBackButton?: boolean;
}

const SingleBookingView: React.FC<SingleBookingViewProps> = ({ booking, onBack, showBackButton = false }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'documents' | 'location'>('overview');

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const getBookingIcon = (type: string, size: string = 'w-8 h-8') => {
    const iconClass = `${size} text-white`;
    switch (type) {
      case 'flight':
        return <Plane className={iconClass} />;
      case 'hotel':
        return <Building2 className={iconClass} />;
      case 'train':
        return <Train className={iconClass} />;
      case 'car':
        return <Car className={iconClass} />;
      default:
        return <Plane className={iconClass} />;
    }
  };

  const getBookingColor = (type: string) => {
    switch (type) {
      case 'flight':
        return 'from-blue-500 to-blue-700';
      case 'hotel':
        return 'from-green-500 to-green-700';
      case 'train':
        return 'from-purple-500 to-purple-700';
      case 'car':
        return 'from-orange-500 to-orange-700';
      default:
        return 'from-blue-500 to-blue-700';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString?: string) => {
    if (!timeString) return '';
    return new Date(`2024-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className={`max-w-4xl mx-auto transition-all duration-1000 transform ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}>
        
        {/* Header with Back Button */}
        {showBackButton && (
          <div className="mb-6">
            <button
              onClick={onBack}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors duration-200 group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200" />
              <span>Back to Timeline</span>
            </button>
          </div>
        )}

        {/* Main Booking Card */}
        <div className={`bg-gradient-to-r ${getBookingColor(booking.type)} rounded-2xl shadow-2xl overflow-hidden mb-6`}>
          <div className="p-8 text-white">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  {getBookingIcon(booking.type, 'w-8 h-8')}
                </div>
                <div>
                  <h1 className="text-3xl font-bold mb-2">{booking.title}</h1>
                  <p className="text-white/80 text-lg">Confirmation: {booking.confirmationNumber}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">
                  {booking.price && `₹${booking.price.amount.toLocaleString()}`}
                </div>
                {booking.rating && (
                  <div className="flex items-center space-x-1 mt-2">
                    <Star className="w-5 h-5 fill-current" />
                    <span className="text-lg">{booking.rating}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Journey Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                <div className="flex items-center space-x-2 mb-2">
                  <Calendar className="w-5 h-5" />
                  <span className="font-medium">Date</span>
                </div>
                <p className="text-lg">{formatDate(booking.date)}</p>
                {booking.time && <p className="text-white/80">{formatTime(booking.time)}</p>}
              </div>

              {booking.from && booking.to && (
                <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                  <div className="flex items-center space-x-2 mb-2">
                    <MapPin className="w-5 h-5" />
                    <span className="font-medium">Route</span>
                  </div>
                  <p className="text-lg">{booking.from} → {booking.to}</p>
                  {booking.fromCode && booking.toCode && (
                    <p className="text-white/80">{booking.fromCode} - {booking.toCode}</p>
                  )}
                </div>
              )}

              <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                <div className="flex items-center space-x-2 mb-2">
                  <Clock className="w-5 h-5" />
                  <span className="font-medium">Status</span>
                </div>
                <p className="text-lg capitalize">{booking.status}</p>
                <CountdownTimer targetDate={booking.date} targetTime={booking.time} />
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-lg mb-6">
          <div className="flex border-b border-gray-200">
            {['overview', 'documents', 'location'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`flex-1 py-4 px-6 text-center font-medium transition-colors duration-200 ${
                  activeTab === tab
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Booking Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-gray-900">Booking Details</h3>
                    
                    {booking.details.seat && (
                      <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <Users className="w-5 h-5 text-gray-600" />
                        <div>
                          <p className="font-medium">Seat</p>
                          <p className="text-gray-600">{booking.details.seat}</p>
                        </div>
                      </div>
                    )}

                    {booking.details.terminal && (
                      <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <Building2 className="w-5 h-5 text-gray-600" />
                        <div>
                          <p className="font-medium">Terminal</p>
                          <p className="text-gray-600">{booking.details.terminal}</p>
                        </div>
                      </div>
                    )}

                    {booking.details.roomType && (
                      <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <Bed className="w-5 h-5 text-gray-600" />
                        <div>
                          <p className="font-medium">Room Type</p>
                          <p className="text-gray-600">{booking.details.roomType}</p>
                        </div>
                      </div>
                    )}

                    {booking.details.carModel && (
                      <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <CarIcon className="w-5 h-5 text-gray-600" />
                        <div>
                          <p className="font-medium">Vehicle</p>
                          <p className="text-gray-600">{booking.details.carModel}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Amenities */}
                  {booking.details.amenities && (
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold text-gray-900">Amenities</h3>
                      <div className="grid grid-cols-2 gap-3">
                        {booking.details.amenities.map((amenity, index) => (
                          <div key={index} className="flex items-center space-x-2 p-2 bg-green-50 rounded-lg">
                            {amenity.includes('WiFi') && <Wifi className="w-4 h-4 text-green-600" />}
                            {amenity.includes('Restaurant') && <Coffee className="w-4 h-4 text-green-600" />}
                            {!amenity.includes('WiFi') && !amenity.includes('Restaurant') && (
                              <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                            )}
                            <span className="text-sm text-green-800">{amenity}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Images */}
                {booking.images && booking.images.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-gray-900">Gallery</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {booking.images.map((image, index) => (
                        <div key={index} className="relative overflow-hidden rounded-lg group">
                          <img
                            src={image}
                            alt={`${booking.title} ${index + 1}`}
                            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'documents' && (
              <DocumentsPanel booking={booking} />
            )}

            {activeTab === 'location' && booking.location && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Location</h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-start space-x-3">
                        <MapPin className="w-5 h-5 text-gray-600 mt-1" />
                        <div>
                          <p className="font-medium text-gray-900">{booking.location.address}</p>
                          <p className="text-gray-600 text-sm mt-1">
                            {booking.location.lat.toFixed(4)}, {booking.location.lng.toFixed(4)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {booking.location.weather && (
                    <WeatherWidget weather={booking.location.weather} />
                  )}
                </div>

                {/* Interactive Map Placeholder */}
                <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <MapPin className="w-12 h-12 mx-auto mb-2" />
                    <p>Interactive map would be displayed here</p>
                    <p className="text-sm">Showing: {booking.location.address}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleBookingView;