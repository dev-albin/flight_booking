import React, { useState } from 'react';
import { FileText, QrCode, Download, Eye, Smartphone } from 'lucide-react';
import { Booking } from './TravelItinerary';

interface DocumentsPanelProps {
  booking: Booking;
}

const DocumentsPanel: React.FC<DocumentsPanelProps> = ({ booking }) => {
  const [selectedDocument, setSelectedDocument] = useState<string | null>(null);

  const documents = [
    ...(booking.documents?.ticket ? [{
      id: 'ticket',
      name: 'E-Ticket',
      type: 'PDF',
      icon: <FileText className="w-6 h-6 text-blue-600" />,
      file: booking.documents.ticket,
      description: 'Your electronic ticket with all travel details'
    }] : []),
    ...(booking.documents?.voucher ? [{
      id: 'voucher',
      name: 'Booking Voucher',
      type: 'PDF',
      icon: <FileText className="w-6 h-6 text-green-600" />,
      file: booking.documents.voucher,
      description: 'Confirmation voucher for your reservation'
    }] : []),
    ...(booking.documents?.qrCode ? [{
      id: 'qrcode',
      name: 'QR Code',
      type: 'QR',
      icon: <QrCode className="w-6 h-6 text-purple-600" />,
      file: booking.documents.qrCode,
      description: 'Quick check-in QR code for mobile use'
    }] : [])
  ];

  const generateQRCode = (data: string) => {
    // In a real app, you'd use a QR code library
    return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(data)}`;
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Travel Documents</h3>
        <p className="text-gray-600 mb-6">Access your tickets, vouchers, and QR codes</p>
      </div>

      {documents.length === 0 ? (
        <div className="text-center py-12">
          <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No documents available for this booking</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-blue-300 hover:shadow-lg transition-all duration-200 cursor-pointer group"
              onClick={() => setSelectedDocument(doc.id)}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  {doc.icon}
                  <div>
                    <h4 className="font-semibold text-gray-900">{doc.name}</h4>
                    <p className="text-sm text-gray-500">{doc.type}</p>
                  </div>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <Eye className="w-5 h-5 text-gray-400" />
                </div>
              </div>

              <p className="text-sm text-gray-600 mb-4">{doc.description}</p>

              <div className="flex space-x-2">
                <button className="flex-1 bg-blue-50 text-blue-600 py-2 px-3 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors duration-200 flex items-center justify-center space-x-1">
                  <Eye className="w-4 h-4" />
                  <span>View</span>
                </button>
                <button className="flex-1 bg-gray-50 text-gray-600 py-2 px-3 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center space-x-1">
                  <Download className="w-4 h-4" />
                  <span>Download</span>
                </button>
              </div>

              {doc.type === 'QR' && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-center">
                    <img
                      src={generateQRCode(`${booking.confirmationNumber}-${doc.file}`)}
                      alt="QR Code"
                      className="w-24 h-24 border border-gray-200 rounded"
                    />
                  </div>
                  <div className="flex items-center justify-center mt-2 text-xs text-gray-500">
                    <Smartphone className="w-3 h-3 mr-1" />
                    <span>Scan with mobile device</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Important Information */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h4 className="font-semibold text-yellow-800 mb-2">Important Reminders</h4>
        <ul className="text-sm text-yellow-700 space-y-1">
          <li>• Keep your documents accessible on your mobile device</li>
          <li>• Arrive at the venue with sufficient time for check-in</li>
          <li>• Ensure your ID matches the name on your booking</li>
          {booking.type === 'flight' && <li>• Check-in online 24 hours before departure</li>}
          {booking.type === 'hotel' && <li>• Check-in time is usually after 3:00 PM</li>}
        </ul>
      </div>
    </div>
  );
};

export default DocumentsPanel;