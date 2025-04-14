
import React, { useState, useEffect } from 'react';

function AlarmApp() {
  const [alarmTime, setAlarmTime] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const [isAlarmSet, setIsAlarmSet] = useState(false);
  const [alarmSound] = useState(new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'));

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const timeString = now.toLocaleTimeString('en-GB', { hour12: false });
      setCurrentTime(timeString);

      if (isAlarmSet && timeString === alarmTime) {
        alarmSound.play();
        alert('Alarm ringing!');
        setIsAlarmSet(false);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [alarmTime, isAlarmSet, alarmSound]);

  const handleSetAlarm = () => {
    if (alarmTime) {
      setIsAlarmSet(true);
      alert(`Alarm set for ${alarmTime}`);
    }
  };

  const handleCancelAlarm = () => {
    setIsAlarmSet(false);
    alarmSound.pause();
    alarmSound.currentTime = 0;
    alert('Alarm canceled');
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    background: 'linear-gradient(135deg, #ece9e6, #ffffff)',
    fontFamily: 'Arial, sans-serif',
  };

  const cardStyle = {
    padding: '40px',
    borderRadius: '12px',
    backgroundColor: '#f8f9fa',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    textAlign: 'center',
  };

  const headingStyle = {
    fontSize: '32px',
    marginBottom: '10px',
    color: '#333',
  };

  const timeStyle = {
    fontSize: '24px',
    marginBottom: '30px',
    color: '#555',
  };

  const inputStyle = {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    marginBottom: '20px',
  };

  const buttonStyle = {
    padding: '10px 20px',
    fontSize: '16px',
    borderRadius: '6px',
    border: 'none',
    cursor: 'pointer',
    margin: '5px',
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h1 style={headingStyle}>Smart Snooze Alarm</h1>
        <h2 style={timeStyle}>Current Time: {currentTime}</h2>
        <input
          type="time"
          style={inputStyle}
          value={alarmTime}
          onChange={(e) => setAlarmTime(e.target.value + ':00')}
        />
        <div>
          <button
            style={{ ...buttonStyle, backgroundColor: '#28a745', color: '#fff' }}
            onClick={handleSetAlarm}
          >
            Set Alarm
          </button>
          <button
            style={{ ...buttonStyle, backgroundColor: '#dc3545', color: '#fff' }}
            onClick={handleCancelAlarm}
          >
            Cancel Alarm
          </button>
        </div>
      </div>
    </div>
  );
}

export default AlarmApp;
