import React, { useState } from 'react';
import { motion,AnimatePresence } from 'framer-motion';
import { Calendar, Clock, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';

const eventData = {
  'May 21': [
    { id: 101, title: "Participant Seated", time: "0845 - 0955", location: "Auditorium", description: "MC" },
    { id: 102, title: "Staff and MoF Seated", time: "0955 - 1015", location: "Auditorium", description: "MC" },
  ],
  'May 22': [
    { id: 201, title: "Opening Ceremony", time: "0900 - 1000", location: "Grand Hall", description: "SGOH" },
    { id: 202, title: "Technical Session", time: "1030 - 1200", location: "Room A", description: "Discussant" },
  ],
  'May 23': [
    { id: 301, title: "Closing Gala", time: "1900 - 2200", location: "Banquet Hall", description: "MC" },
  ],
  'May 24': [
    { id: 401, title: "Ceremonial SUnset", time: "1800 - 1830", location: "Parade Ground", description: "Parade" },
  ]
};

// Helper to get day name
const getDayName = (date) => {
  const days = { 'May 21': 'Thu', 'May 22': 'Fri', 'May 23': 'Sat', 'May 24': 'Sun' };
  return days[date] || '';
};

export default function App() {
  const dates = Object.keys(eventData);
  const [selectedDate, setSelectedDate] = useState('May 21');
  const [direction, setDirection] = useState(0);

  const handleDateChange = (newDate) => {
    const currentIndex = dates.indexOf(selectedDate);
    const nextIndex = dates.indexOf(newDate);
    setDirection(nextIndex > currentIndex ? 1 : -1);
    setSelectedDate(newDate);
  };

  const navigate = (step) => {
    const currentIndex = dates.indexOf(selectedDate);
    const nextIndex = currentIndex + step;
    if (nextIndex >= 0 && nextIndex < dates.length) {
      handleDateChange(dates[nextIndex]);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 font-sans text-slate-900">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <header className="text-center mb-12">
          <center>
              <img 
                src="/nnlogo.png" 
              />
              </center>
          <h1 className="text-4xl font-black mb-2 text-slate-800">NN@70 - Programme of Event</h1>
          <p className="text-slate-500">Your complete schedule at a glance</p>
        </header>

        {/* Date Selector */}
        <div className="flex items-center justify-center space-x-4 mb-10">
          <button 
            onClick={() => navigate(-1)}
            disabled={dates.indexOf(selectedDate) === 0}
            className="p-2 hover:bg-white rounded-full transition-colors disabled:opacity-30"
          >
            <ChevronLeft />
          </button>
          
          <div className="flex space-x-3">
            {dates.map((date) => (
              <button
                key={date}
                onClick={() => handleDateChange(date)}
                className={`flex flex-col items-center justify-center w-20 h-24 rounded-2xl border transition-all ${
                  selectedDate === date 
                  ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-200 scale-105' 
                  : 'bg-white border-slate-200 text-slate-600 hover:border-blue-300'
                }`}
              >
                <span className="text-xs font-bold uppercase opacity-70">{getDayName(date)}</span>
                <span className="text-base font-black">{date.split(' ')[1]}</span>
              </button>
            ))}
          </div>

          <button 
            onClick={() => navigate(1)}
            disabled={dates.indexOf(selectedDate) === dates.length - 1}
            className="p-2 hover:bg-white rounded-full transition-colors disabled:opacity-30"
          >
            <ChevronRight />
          </button>
        </div>

        {/* Animated Content Area */}
        <div className="relative overflow-hidden min-h-[400px]">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={selectedDate}
              custom={direction}
              initial={{ opacity: 0, x: direction * 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -50 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="space-y-6"
            >
              <div className="flex items-center space-x-2 mb-4">
                <Calendar className="w-5 h-5 text-blue-600" />
                <h2 className="text-2xl font-bold">{getDayName(selectedDate)}, {selectedDate} 2026</h2>
              </div>

              {eventData[selectedDate].map((event) => (
                <div key={event.id} className="group relative bg-white rounded-2xl border border-slate-200 p-6 pl-8 shadow-sm hover:shadow-md transition-all">
                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-blue-600 rounded-l-2xl" />
                  <h3 className="text-xl font-bold mb-3 group-hover:text-blue-600 transition-colors">{event.title}</h3>
                  <div className="flex flex-wrap gap-4 text-sm text-slate-500 mb-3">
                    <span className="flex items-center"><Clock className="w-4 h-4 mr-1 text-blue-500" /> {event.time}</span>
                    <span className="flex items-center"><MapPin className="w-4 h-4 mr-1 text-blue-500" /> {event.location}</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed">{event.description}</p>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        <footer className="mt-12 pt-8 border-t border-slate-200 text-center">
          <p className="text-slate-400 text-sm">Designed by Lt OC Aluu</p>
        </footer>
      </div>
    </div>
  );
}