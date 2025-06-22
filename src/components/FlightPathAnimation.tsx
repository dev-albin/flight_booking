import React, { useState, useEffect, useRef } from 'react';
import { Plane, MapPin } from 'lucide-react';

interface FlightPathAnimationProps {
  isPlaying: boolean;
  onAnimationComplete: () => void;
  from: string;
  to: string;
  fromCode: string;
  toCode: string;
}

const FlightPathAnimation: React.FC<FlightPathAnimationProps> = ({
  isPlaying,
  onAnimationComplete,
  from,
  to,
  fromCode,
  toCode
}) => {
  const [animationProgress, setAnimationProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const animationRef = useRef<number>();
  const startTimeRef = useRef<number>();
  const pathRef = useRef<SVGPathElement>(null);

  // Animation duration in milliseconds
  const ANIMATION_DURATION = 8000;

  // Calculate airplane position and rotation along the path
  const getAirplaneTransform = (progress: number) => {
    if (!pathRef.current) return { x: 100, y: 150, rotation: 0 };

    const pathLength = pathRef.current.getTotalLength();
    const point = pathRef.current.getPointAtLength(progress * pathLength);
    
    // Calculate rotation based on path direction
    const nextProgress = Math.min(progress + 0.01, 1);
    const nextPoint = pathRef.current.getPointAtLength(nextProgress * pathLength);
    const rotation = Math.atan2(nextPoint.y - point.y, nextPoint.x - point.x) * (180 / Math.PI);

    return {
      x: point.x,
      y: point.y,
      rotation: rotation
    };
  };

  // Animation loop
  const animate = (timestamp: number) => {
    if (!startTimeRef.current) {
      startTimeRef.current = timestamp;
    }

    const elapsed = timestamp - startTimeRef.current;
    const progress = Math.min(elapsed / ANIMATION_DURATION, 1);

    // Smooth easing function for consistent speed
    const easedProgress = progress < 0.5 
      ? 2 * progress * progress 
      : 1 - Math.pow(-2 * progress + 2, 3) / 2;

    setAnimationProgress(easedProgress);

    if (progress < 1) {
      animationRef.current = requestAnimationFrame(animate);
    } else {
      setIsComplete(true);
      setTimeout(() => {
        onAnimationComplete();
        setAnimationProgress(0);
        setIsComplete(false);
        startTimeRef.current = undefined;
      }, 1000);
    }
  };

  useEffect(() => {
    if (isPlaying && !isComplete) {
      startTimeRef.current = undefined;
      animationRef.current = requestAnimationFrame(animate);
    } else {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying, isComplete]);

  if (!isPlaying && animationProgress === 0) return null;

  const airplaneTransform = getAirplaneTransform(animationProgress);

  return (
    <div className="flight-container absolute inset-0 pointer-events-none overflow-hidden">
      {/* Flight Path SVG */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 200" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#1d4ed8" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.4" />
          </linearGradient>
          
          <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.6" />
          </linearGradient>

          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Base flight path */}
        <path
          ref={pathRef}
          d="M 100 150 Q 200 80 400 60 Q 600 80 700 150"
          stroke="url(#pathGradient)"
          strokeWidth="3"
          fill="none"
          strokeDasharray="8,4"
          className="opacity-60"
          style={{
            strokeDashoffset: isPlaying ? '0' : '100',
            transition: 'stroke-dashoffset 1s ease-in-out'
          }}
        />
        
        {/* Progress path - shows completed portion */}
        <path
          d="M 100 150 Q 200 80 400 60 Q 600 80 700 150"
          stroke="url(#progressGradient)"
          strokeWidth="4"
          fill="none"
          strokeDasharray={`${animationProgress * 100}% ${100 - animationProgress * 100}%`}
          filter="url(#glow)"
          className="transition-all duration-100 ease-linear"
        />

        {/* Airplane SVG positioned along path */}
        <g
          transform={`translate(${airplaneTransform.x}, ${airplaneTransform.y}) rotate(${airplaneTransform.rotation}) scale(1.2)`}
          className="transition-opacity duration-300"
          style={{ opacity: animationProgress > 0 ? 1 : 0 }}
        >
          {/* Airplane shadow */}
          <g transform="translate(2, 2)" opacity="0.3">
            <path
              d="M-8,-2 L8,0 L-8,2 L-6,0 Z M-2,-4 L2,-4 L0,-1 Z M-2,4 L2,4 L0,1 Z"
              fill="#6b7280"
            />
          </g>
          
          {/* Main airplane */}
          <path
            d="M-8,-2 L8,0 L-8,2 L-6,0 Z M-2,-4 L2,-4 L0,-1 Z M-2,4 L2,4 L0,1 Z"
            fill="#3b82f6"
            className="drop-shadow-sm"
          />
          
          {/* Airplane highlight */}
          <path
            d="M-6,-1 L6,0 L-6,1 Z"
            fill="#60a5fa"
            opacity="0.8"
          />
        </g>

        {/* Contrail effect */}
        {animationProgress > 0.1 && (
          <g opacity={Math.min(animationProgress * 2, 0.6)}>
            {Array.from({ length: 20 }, (_, i) => {
              const trailProgress = Math.max(0, animationProgress - (i * 0.02));
              if (trailProgress <= 0) return null;
              
              const trailTransform = getAirplaneTransform(trailProgress);
              const opacity = Math.max(0, 0.4 - (i * 0.02));
              
              return (
                <circle
                  key={i}
                  cx={trailTransform.x}
                  cy={trailTransform.y}
                  r={Math.max(1, 3 - i * 0.1)}
                  fill="#e5e7eb"
                  opacity={opacity}
                />
              );
            })}
          </g>
        )}
      </svg>

      {/* Source Airport Marker */}
      <div className="absolute left-8 bottom-8 flex items-center space-x-3">
        <div className={`w-4 h-4 rounded-full transition-all duration-500 ${
          animationProgress === 0 ? 'bg-blue-500 animate-pulse scale-110' : 'bg-blue-400 scale-100'
        }`}></div>
        <div className="text-sm">
          <div className="font-semibold text-gray-900">{from}</div>
          <div className="text-xs text-gray-600">{fromCode}</div>
        </div>
      </div>

      {/* Destination Airport Marker */}
      <div className="absolute right-8 bottom-8 flex items-center space-x-3">
        <div className="text-sm text-right">
          <div className="font-semibold text-gray-900">{to}</div>
          <div className="text-xs text-gray-600">{toCode}</div>
        </div>
        <div className={`w-4 h-4 rounded-full transition-all duration-500 ${
          isComplete ? 'bg-green-500 animate-pulse scale-110' : 'bg-gray-400 scale-100'
        }`}></div>
      </div>

      {/* Progress Indicator */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
        <div className="bg-white/95 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg border">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <div className="text-sm font-medium text-gray-800">
              {isComplete ? 'Journey Complete' : `${Math.round(animationProgress * 100)}% Complete`}
            </div>
            <div className="w-16 h-1 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-green-500 transition-all duration-100 ease-linear"
                style={{ width: `${animationProgress * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Flight Information */}
      {animationProgress > 0 && animationProgress < 1 && (
        <div className="absolute top-16 right-4">
          <div className="bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-lg border">
            <div className="text-xs text-gray-500 mb-1">Flight Status</div>
            <div className="text-sm font-bold text-blue-600">In Transit</div>
            <div className="text-xs text-gray-600 mt-1">
              ETA: {Math.round((1 - animationProgress) * 8)} min
            </div>
          </div>
        </div>
      )}

      {/* Completion Effect */}
      {isComplete && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-green-50 border-2 border-green-200 rounded-full p-4 animate-bounce">
            <div className="text-green-600 font-semibold text-lg">✈️ Arrived!</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlightPathAnimation;