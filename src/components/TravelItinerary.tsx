import React, { useState, useEffect } from 'react';
import { Plane, Train, Car, Building2, Calendar, Clock, MapPin, Thermometer, QrCode, FileText, ChevronLeft, ChevronRight, Star, Wifi, Coffee, Car as CarIcon } from 'lucide-react';
import SingleBookingView from './SingleBookingView';
import MultipleBookingsView from './MultipleBookingsView';

export interface Booking {
  id: string;
  type: 'flight' | 'hotel' | 'train' | 'car';
  title: string;
  from?: string;
  to?: string;
  fromCode?: string;
  toCode?: string;
  date: string;
  time?: string;
  endDate?: string;
  endTime?: string;
  status: 'upcoming' | 'in-progress' | 'completed';
  confirmationNumber: string;
  details: {
    seat?: string;
    terminal?: string;
    gate?: string;
    roomNumber?: string;
    roomType?: string;
    amenities?: string[];
    carModel?: string;
    pickupLocation?: string;
    platform?: string;
    class?: string;
  };
  location?: {
    lat: number;
    lng: number;
    address: string;
    weather?: {
      temp: number;
      condition: string;
      icon: string;
    };
  };
  documents?: {
    ticket?: string;
    voucher?: string;
    qrCode?: string;
  };
  price?: {
    amount: number;
    currency: string;
  };
  rating?: number;
  images?: string[];
}

const TravelItinerary = () => {
  const [selectedBooking, setSelectedBooking] = useState<string | null>(null);
  const [bookings] = useState<Booking[]>([
    {
      id: '1',
      type: 'flight',
      title: 'Flight to Delhi',
      from: 'Bengaluru',
      to: 'Delhi',
      fromCode: 'BLR',
      toCode: 'DEL',
      date: '2024-07-25',
      time: '09:30',
      status: 'upcoming',
      confirmationNumber: 'AI2045',
      details: {
        seat: '20A',
        terminal: 'Terminal 5',
        gate: 'A12'
      },
      location: {
        lat: 28.7041,
        lng: 77.1025,
        address: 'Indira Gandhi International Airport, Delhi',
        weather: {
          temp: 32,
          condition: 'Sunny',
          icon: '☀️'
        }
      },
      documents: {
        ticket: 'e-ticket-ai2045.pdf',
        qrCode: 'QR_AI2045_BOARDING'
      },
      price: {
        amount: 8500,
        currency: 'INR'
      },
      images: ['https://images.pexels.com/photos/912050/pexels-photo-912050.jpeg']
    },
    {
      id: '2',
      type: 'hotel',
      title: 'Hilton Hotel Stay',
      from: 'Lucknow',
      date: '2024-07-26',
      endDate: '2024-07-30',
      status: 'upcoming',
      confirmationNumber: 'HTL789456',
      details: {
        roomNumber: '1205',
        roomType: 'Deluxe Suite',
        amenities: ['Free WiFi', 'Pool', 'Gym', 'Spa', 'Restaurant']
      },
      location: {
        lat: 26.8467,
        lng: 80.9462,
        address: 'Hilton Garden Inn, Lucknow',
        weather: {
          temp: 28,
          condition: 'Partly Cloudy',
          icon: '⛅'
        }
      },
      documents: {
        voucher: 'hotel-voucher-htl789456.pdf',
        qrCode: 'QR_HTL789456_CHECKIN'
      },
      price: {
        amount: 12000,
        currency: 'INR'
      },
      rating: 4.5,
      images: ['https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg']
    },
    {
      id: '3',
      type: 'car',
      title: 'Car Rental',
      from: 'Delhi Airport',
      date: '2024-07-25',
      time: '14:00',
      endDate: '2024-07-30',
      endTime: '12:00',
      status: 'upcoming',
      confirmationNumber: 'CAR123789',
      details: {
        carModel: 'Toyota Innova Crysta',
        pickupLocation: 'Terminal 3 Arrival'
      },
      location: {
        lat: 28.5562,
        lng: 77.1000,
        address: 'IGI Airport Terminal 3, Delhi'
      },
      documents: {
        voucher: 'car-rental-car123789.pdf',
        qrCode: 'QR_CAR123789_PICKUP'
      },
      price: {
        amount: 15000,
        currency: 'INR'
      },
      images: ['https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg']
    }
  ]);

  const handleBookingSelect = (bookingId: string | null) => {
    setSelectedBooking(bookingId);
  };

  const handleBackToTimeline = () => {
    setSelectedBooking(null);
  };

  // If only one booking, show single booking view
  if (bookings.length === 1) {
    return <SingleBookingView booking={bookings[0]} />;
  }

  // If multiple bookings, show timeline or detailed view
  if (selectedBooking) {
    const booking = bookings.find(b => b.id === selectedBooking);
    if (booking) {
      return (
        <SingleBookingView 
          booking={booking} 
          onBack={handleBackToTimeline}
          showBackButton={true}
        />
      );
    }
  }

  return (
    <MultipleBookingsView 
      bookings={bookings}
      onBookingSelect={handleBookingSelect}
    />
  );
};

export default TravelItinerary;