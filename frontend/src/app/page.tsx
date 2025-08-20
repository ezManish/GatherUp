"use client";

import { useState } from 'react';

export default function EventsPage() {
  const [events, setEvents] = useState([
    {
      id: 1,
      name: 'Demo Hackathon',
      type: 'offline',
      status: 'open',
      date: '8/20/2025'
    }
  ]);

  const [formData, setFormData] = useState({
    eventName: '',
    eventType: 'online',
    eventStatus: 'open',
    startDate: '',
    endDate: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newEvent = {
        id: events.length + 1,
        name: formData.eventName,
        type: formData.eventType,
        status: formData.eventStatus,
        date: new Date(formData.startDate).toLocaleDateString() || 'TBD'
      };
      
      setEvents(prev => [...prev, newEvent]);
      
      setFormData({
        eventName: '',
        eventType: 'online',
        eventStatus: 'open',
        startDate: '',
        endDate: ''
      });
      
      setSubmitStatus('success');
      setTimeout(() => setSubmitStatus(''), 3000);
      
    } catch (error) {
      console.error('Error creating event:', error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(''), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
      fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
      position: 'relative'
    }}>
      {/* Floating Background Shapes */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0
      }}>
        <div style={{
          position: 'absolute',
          top: '25%',
          left: '25%',
          width: '80px',
          height: '80px',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '50%',
          animation: 'bounce 2s infinite'
        }}></div>
        <div style={{
          position: 'absolute',
          top: '60%',
          right: '20%',
          width: '120px',
          height: '120px',
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '50%',
          animation: 'pulse 3s infinite'
        }}></div>
      </div>

      {/* Header */}
      <header style={{
        background: 'rgba(0, 0, 0, 0.9)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        position: 'relative',
        zIndex: 10
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '1rem 2rem'
        }}>
          <h1 style={{
            fontSize: '1.8rem',
            fontWeight: '700',
            background: 'linear-gradient(45deg, #667eea, #764ba2)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            margin: 0
          }}>
            SynapHack Platform
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <div style={{
        maxWidth: '1000px',
        margin: '0 auto',
        padding: '2rem',
        position: 'relative',
        zIndex: 10
      }}>
        
        {/* Events Section */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(15px)',
          borderRadius: '24px',
          padding: '2rem',
          marginBottom: '2rem',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          transition: 'transform 0.3s ease'
        }}>
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: '700',
            marginBottom: '1.5rem',
            color: '#2d3748',
            position: 'relative',
            paddingBottom: '1rem'
          }}>
            Events
            <div style={{
              position: 'absolute',
              bottom: '0',
              left: '0',
              width: '60px',
              height: '4px',
              background: 'linear-gradient(45deg, #667eea, #764ba2)',
              borderRadius: '2px'
            }}></div>
          </h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {events.map((event) => (
              <div 
                key={event.id}
                style={{
                  background: 'linear-gradient(135deg, #667eea, #764ba2)',
                  color: 'white',
                  padding: '1.5rem',
                  borderRadius: '16px',
                  boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 12px 40px rgba(102, 126, 234, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(102, 126, 234, 0.3)';
                }}
              >
                <div>
                  <h3 style={{
                    fontSize: '1.3rem',
                    fontWeight: '600',
                    marginBottom: '0.5rem',
                    margin: '0 0 0.5rem 0'
                  }}>{event.name}</h3>
                  <div style={{
                    display: 'flex',
                    gap: '1rem',
                    fontSize: '0.9rem',
                    opacity: 0.9
                  }}>
                    <span style={{
                      padding: '0.25rem 0.75rem',
                      background: 'rgba(255, 255, 255, 0.2)',
                      borderRadius: '20px',
                      fontSize: '0.8rem'
                    }}>
                      {event.type}
                    </span>
                    <span style={{
                      padding: '0.25rem 0.75rem',
                      background: 'rgba(255, 255, 255, 0.2)',
                      borderRadius: '20px',
                      fontSize: '0.8rem'
                    }}>
                      {event.status}
                    </span>
                    <span>{event.date}</span>
                  </div>
                </div>
                <div style={{ fontSize: '2rem' }}></div>
              </div>
            ))}
          </div>
        </div>

        {/* Create Event Section */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(15px)',
          borderRadius: '24px',
          padding: '2rem',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          <h2 style={{
            fontSize: '2rem',
            fontWeight: '600',
            marginBottom: '1.5rem',
            color: '#2d3748',
            position: 'relative',
            paddingBottom: '1rem'
          }}>
            Create Event
            <div style={{
              position: 'absolute',
              bottom: '0',
              left: '0',
              width: '50px',
              height: '3px',
              background: 'linear-gradient(45deg, #667eea, #764ba2)',
              borderRadius: '2px'
            }}></div>
          </h2>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Event Name */}
            <div>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                color: '#4a5568',
                fontWeight: '600',
                fontSize: '0.9rem',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                Event Name
              </label>
              <input
                type="text"
                name="eventName"
                value={formData.eventName}
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  padding: '1rem 1.25rem',
                  border: '2px solid #e2e8f0',
                  borderRadius: '12px',
                  fontSize: '1rem',
                  transition: 'all 0.3s ease',
                  background: 'white',
                  color: '#2d3748',
                  boxSizing: 'border-box'
                }}
                placeholder="Enter event name..."
                required
                onFocus={(e) => {
                  e.target.style.borderColor = '#667eea';
                  e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e2e8f0';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>

            {/* Event Type */}
            <div>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                color: '#4a5568',
                fontWeight: '600',
                fontSize: '0.9rem',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                Event Type
              </label>
              <select
                name="eventType"
                value={formData.eventType}
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  padding: '1rem 1.25rem',
                  border: '2px solid #e2e8f0',
                  borderRadius: '12px',
                  fontSize: '1rem',
                  transition: 'all 0.3s ease',
                  background: 'white',
                  color: '#2d3748',
                  cursor: 'pointer',
                  boxSizing: 'border-box'
                }}
                required
                onFocus={(e) => {
                  e.target.style.borderColor = '#667eea';
                  e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e2e8f0';
                  e.target.style.boxShadow = 'none';
                }}
              >
                <option value="online">Online</option>
                <option value="offline">Offline</option>
                <option value="hybrid">Hybrid</option>
              </select>
            </div>

            {/* Event Status */}
            <div>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                color: '#4a5568',
                fontWeight: '600',
                fontSize: '0.9rem',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                Status
              </label>
              <select
                name="eventStatus"
                value={formData.eventStatus}
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  padding: '1rem 1.25rem',
                  border: '2px solid #e2e8f0',
                  borderRadius: '12px',
                  fontSize: '1rem',
                  transition: 'all 0.3s ease',
                  background: 'white',
                  color: '#2d3748',
                  cursor: 'pointer',
                  boxSizing: 'border-box'
                }}
                required
                onFocus={(e) => {
                  e.target.style.borderColor = '#667eea';
                  e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e2e8f0';
                  e.target.style.boxShadow = 'none';
                }}
              >
                <option value="open">Open</option>
                <option value="closed">Closed</option>
                <option value="upcoming">Upcoming</option>
              </select>
            </div>

            {/* Start Date */}
            <div>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                color: '#4a5568',
                fontWeight: '600',
                fontSize: '0.9rem',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                Start Date
              </label>
              <input
                type="datetime-local"
                name="startDate"
                value={formData.startDate}
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  padding: '1rem 1.25rem',
                  border: '2px solid #e2e8f0',
                  borderRadius: '12px',
                  fontSize: '1rem',
                  transition: 'all 0.3s ease',
                  background: 'white',
                  color: '#2d3748',
                  boxSizing: 'border-box'
                }}
                required
                onFocus={(e) => {
                  e.target.style.borderColor = '#667eea';
                  e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e2e8f0';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>

            {/* End Date */}
            <div>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                color: '#4a5568',
                fontWeight: '600',
                fontSize: '0.9rem',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                End Date
              </label>
              <input
                type="datetime-local"
                name="endDate"
                value={formData.endDate}
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  padding: '1rem 1.25rem',
                  border: '2px solid #e2e8f0',
                  borderRadius: '12px',
                  fontSize: '1rem',
                  transition: 'all 0.3s ease',
                  background: 'white',
                  color: '#2d3748',
                  boxSizing: 'border-box'
                }}
                required
                onFocus={(e) => {
                  e.target.style.borderColor = '#667eea';
                  e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e2e8f0';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                width: '100%',
                padding: '1rem 2rem',
                borderRadius: '12px',
                fontSize: '1rem',
                fontWeight: '600',
                color: 'white',
                border: 'none',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                background: isSubmitting 
                  ? '#9ca3af' 
                  : submitStatus === 'success'
                  ? 'linear-gradient(135deg, #10b981, #059669)'
                  : submitStatus === 'error'
                  ? 'linear-gradient(135deg, #ef4444, #dc2626)'
                  : 'linear-gradient(135deg, #667eea, #764ba2)',
                boxShadow: '0 8px 30px rgba(102, 126, 234, 0.3)'
              }}
              onMouseEnter={(e) => {
                if (!isSubmitting) {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 12px 40px rgba(102, 126, 234, 0.4)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isSubmitting) {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 30px rgba(102, 126, 234, 0.3)';
                }
              }}
            >
              {isSubmitting 
                ? 'Creating Event...' 
                : submitStatus === 'success'
                ? '✓ Event Created Successfully!'
                : submitStatus === 'error'
                ? '✗ Error Creating Event'
                : 'Create Event'
              }
            </button>

            {/* Status Messages */}
            {submitStatus === 'success' && (
              <div style={{
                padding: '1rem',
                backgroundColor: '#d1fae5',
                border: '1px solid #10b981',
                color: '#065f46',
                borderRadius: '8px'
              }}>
                🎉 Event has been created successfully!
              </div>
            )}
            
            {submitStatus === 'error' && (
              <div style={{
                padding: '1rem',
                backgroundColor: '#fee2e2',
                border: '1px solid #ef4444',
                color: '#991b1b',
                borderRadius: '8px'
              }}>
                ❌ There was an error creating the event. Please try again.
              </div>
            )}
          </form>
        </div>
      </div>

      <style jsx>{`
        @keyframes bounce {
          0%, 20%, 53%, 80%, 100% {
            transform: translate3d(0,0,0);
          }
          40%, 43% {
            transform: translate3d(0,-30px,0);
          }
          70% {
            transform: translate3d(0,-15px,0);
          }
          90% {
            transform: translate3d(0,-4px,0);
          }
        }
        
        @keyframes pulse {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.7;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}