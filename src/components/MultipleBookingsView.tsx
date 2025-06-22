import React, { useState, useRef, useEffect } from 'react';
import { Plane, Train, Car, Building2, Calendar, Clock, MapPin, ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { Booking } from './TravelItinerary';
import CountdownTimer from './CountdownTimer';

interface MultipleBookingsViewProps {
  bookings: Booking[];
  onBookingSelect: (bookingId: string) => void;
}

const MultipleBookingsView: React.FC<MultipleBookingsViewProps> = ({ bookings, onBookingSelect }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<NodeJS.Timeout>();

  const getBookingIcon = (type: string, size: string = 'w-6 h-6') => {
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'bg-yellow-100 text-yellow-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
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

  const getDaysUntil = (dateString: string) => {
    const today = new Date();
    const bookingDate = new Date(dateString);
    const diffTime = bookingDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    if (diffDays > 0) return `In ${diffDays} days`;
    return 'Past';
  };

  const scrollToIndex = (index: number) => {
    if (scrollRef.current) {
      const cardWidth = 320; // Width of each card + margin
      scrollRef.current.scrollTo({
        left: index * cardWidth,
        behavior: 'smooth'
      });
    }
    setCurrentIndex(index);
  };

  const handleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        setCurrentIndex((prev) => {
          const nextIndex = (prev + 1) % bookings.length;
          scrollToIndex(nextIndex);
          return nextIndex;
        });
      }, 3000);
    } else {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, bookings.length]);

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Your Travel Timeline</h2>
          <p className="text-gray-600">Upcoming bookings and reservations</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <button
            onClick={handleAutoPlay}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
              isAutoPlaying 
                ? 'bg-blue-600 text-white shadow-lg' 
                : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md'
            }`}
          >
            <Play className={`w-4 h-4 ${isAutoPlaying ? 'animate-pulse' : ''}`} />
            <span>{isAutoPlaying ? 'Playing' : 'Auto Play'}</span>
          </button>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => scrollToIndex(Math.max(0, currentIndex - 1))}
              disabled={currentIndex === 0}
              className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <button
              onClick={() => scrollToIndex(Math.min(bookings.length - 1, currentIndex + 1))}
              disabled={currentIndex === bookings.length - 1}
              className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Timeline Scroll Container */}
      <div className="relative">
        <div
          ref={scrollRef}
          className="flex space-x-6 overflow-x-auto scrollbar-hide pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {bookings.map((booking, index) => (
            <div
              key={booking.id}
              className={`flex-shrink-0 w-80 transition-all duration-500 transform ${
                index === currentIndex ? 'scale-105' : 'scale-100'
              }`}
            >
              <div
                className={`bg-gradient-to-br ${getBookingColor(booking.type)} rounded-xl shadow-xl overflow-hidden cursor-pointer group hover:shadow-2xl transition-all duration-300`}
                onClick={() => onBookingSelect(booking.id)}
              >
                {/* Card Header */}
                <div className="p-6 text-white">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                        {getBookingIcon(booking.type)}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold">{booking.title}</h3>
                        <p className="text-white/80 text-sm">{booking.confirmationNumber}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)} bg-white/20 text-white`}>
                      {getDaysUntil(booking.date)}
                    </span>
                  </div>

                  {/* Journey Info */}
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">{formatDate(booking.date)}</span>
                      {booking.time && (
                        <>
                          <Clock className="w-4 h-4 ml-2" />
                          <span className="text-sm">{formatTime(booking.time)}</span>
                        </>
                      )}
                    </div>

                    {booking.from && booking.to && (
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">{booking.from} → {booking.to}</span>
                      </div>
                    )}

                    {booking.location && (
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">{booking.location.address}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Footer */}
                <div className="bg-white/10 backdrop-blur-sm p-4">
                  <div className="flex items-center justify-between">
                    <div className="text-white">
                      <CountdownTimer 
                        targetDate={booking.date} 
                        targetTime={booking.time}
                        compact={true}
                      />
                    </div>
                    {booking.price && (
                      <div className="text-white font-bold">
                        ₹{booking.price.amount.toLocaleString()}
                      </div>
                    )}
                  </div>
                </div>

                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                    <span className="text-white font-medium">View Details</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Timeline Indicators */}
        <div className="flex justify-center space-x-2 mt-6">
          {bookings.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentIndex 
                  ? 'bg-blue-600 scale-125' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        <div className="bg-white rounded-lg p-4 shadow-md">
          <div className="text-2xl font-bold text-blue-600">{bookings.length}</div>
          <div className="text-sm text-gray-600">Total Bookings</div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-md">
          <div className="text-2xl font-bold text-green-600">
            {bookings.filter(b => b.status === 'upcoming').length}
          </div>
          <div className="text-sm text-gray-600">Upcoming</div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-md">
          <div className="text-2xl font-bold text-purple-600">
            ₹{bookings.reduce((sum, b) => sum + (b.price?.amount || 0), 0).toLocaleString()}
          </div>
          <div className="text-sm text-gray-600">Total Value</div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-md">
          <div className="text-2xl font-bold text-orange-600">
            {new Set(bookings.map(b => b.type)).size}
          </div>
          <div className="text-sm text-gray-600">Service Types</div>
        </div>
      </div>
    </div>
  );
};

export default MultipleBookingsView;