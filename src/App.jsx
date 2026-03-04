import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';

const eventData = {
  'Mar 10': [
    { id: 101, title: "Registration & Welcome", time: "8:00 AM - 9:00 AM", location: "Lobby", description: "Pick up your badges and event kit." }
  ],
  'Mar 11': [
    { id: 1, title: "Morning Keynote: Innovation", time: "9:00 AM - 10:00 AM", location: "Main Auditorium", description: "Inspiring keynote on driving innovation." },
    { id: 2, title: "Breakout Sessions", time: "10:30 AM - 12:00 PM", location: "Various Rooms", description: "Deep dive into industry topics." }
  ]
};

export default function App() {
  const [selectedDate, setSelectedDate] = useState('Mar 11');
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  const handleDateChange = (newDate) => {
    // Determine animation direction
    const dates = Object.keys(eventData);
    setDirection(dates.indexOf(newDate) > dates.indexOf(selectedDate) ? 1 : -1);
    setSelectedDate(newDate);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 font-sans text-slate-900">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl font-black mb-2">
            <center>
              <img 
                src="/nnlogo.png" 
              />
              </center>
          NN@70 - Programme of Event</h1>
          <p className="text-slate-500">Your complete schedule at a glance</p>
        </header>

        {/* Date Selector */}
        <div className="flex items-center justify-center space-x-4 mb-10">
          <button className="p-2 hover:bg-white rounded-full transition-colors"><ChevronLeft /></button>
          
          <div className="flex space-x-3">
            {Object.keys(eventData).map((date) => (
              <button
                key={date}
                onClick={() => handleDateChange(date)}
                className={`flex flex-col items-center justify-center w-20 h-24 rounded-2xl border transition-all ${
                  selectedDate === date 
                  ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-200' 
                  : 'bg-white border-slate-200 text-slate-600 hover:border-blue-300'
                }`}
              >
                <span className="text-xs font-bold uppercase opacity-70">Day</span>
                <span className="text-base font-black">{date}</span>
              </button>
            ))}
          </div>

          <button className="p-2 hover:bg-white rounded-full transition-colors"><ChevronRight /></button>
        </div>
        

        {/* Animated Content Area */}
        <div className="overflow-hidden relative">
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
                <h2 className="text-2xl font-bold">{selectedDate === 'Mar 11' ? 'Wednesday' : 'Tuesday'}, {selectedDate}, 2026</h2>
              </div>

              {eventData[selectedDate].map((event) => (
                <div key={event.id} className="group relative bg-white rounded-2xl border border-slate-200 p-6 pl-8 shadow-sm hover:shadow-md transition-all">
                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-blue-600 rounded-l-2xl" />
                  <h3 className="text-xl font-bold mb-3 group-hover:text-blue-600 transition-colors">{event.title}</h3>
                  <div className="flex space-x-6 text-sm text-slate-500 mb-3">
                    <span className="flex items-center"><Clock className="w-4 h-4 mr-1" /> {event.time}</span>
                    <span className="flex items-center"><MapPin className="w-4 h-4 mr-1" /> {event.location}</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed">{event.description}</p>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
          <br/>
        <hr className="border-gray-300"/>
      </div>
    </div>
    
  );
}