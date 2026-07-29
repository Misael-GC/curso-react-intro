import React, { useState, useEffect } from 'react';
import { TodoContext } from '../TodoContext';
import { BsPlayFill, BsPauseFill, BsArrowCounterclockwise, BsCheckCircleFill, BsXCircleFill } from 'react-icons/bs';
import './TodoFocusPanel.css';

function TodoFocusPanel() {
  const { focusedTodo, setFocusedTodo, completeTodo } = React.useContext(TodoContext);
  
  // Timer state (25 minutes by default = 1500 seconds)
  const [timeLeft, setTimeLeft] = useState(1500);
  const [isActive, setIsActive] = useState(false);

  // Reset timer if focusedTodo changes
  useEffect(() => {
    if (focusedTodo) {
      setTimeLeft(1500);
      setIsActive(false);
    }
  }, [focusedTodo]);

  // Countdown logic
  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      // Play a subtle alarm sound (optional/standard browser notification or visual pulse)
      alert(`¡Tiempo de enfoque terminado para: "${focusedTodo?.text}"! Toma un descanso 🚀`);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, focusedTodo]);

  if (!focusedTodo) return null;

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(1500);
  };

  const handleComplete = () => {
    completeTodo(focusedTodo.text);
    setFocusedTodo(null);
  };

  // Format time (MM:SS)
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="focus-panel glass p-4 mb-4 rounded-4">
      <div className="focus-panel-header d-flex justify-content-between align-items-start gap-3">
        <div className="focus-task-info">
          <span className="focus-badge">🎯 Enfoque Activo</span>
          <h3 className="focus-task-text text-truncate-custom">{focusedTodo.text}</h3>
        </div>
        <button 
          className="focus-close-btn" 
          onClick={() => setFocusedTodo(null)}
          title="Quitar enfoque"
        >
          <BsXCircleFill />
        </button>
      </div>

      <div className="focus-timer-section d-flex flex-column align-items-center mt-3">
        <div className={`timer-display ${isActive ? 'pulsing' : ''}`}>
          {formatTime(timeLeft)}
        </div>

        <div className="timer-controls d-flex gap-3 mt-3">
          <button 
            className={`timer-btn play-pause ${isActive ? 'active' : ''}`} 
            onClick={toggleTimer}
            title={isActive ? 'Pausar' : 'Iniciar'}
          >
            {isActive ? <BsPauseFill /> : <BsPlayFill />}
          </button>
          
          <button 
            className="timer-btn reset" 
            onClick={resetTimer}
            title="Reiniciar temporizador"
          >
            <BsArrowCounterclockwise />
          </button>

          <button 
            className="timer-btn complete" 
            onClick={handleComplete}
            title="Marcar como completada"
          >
            <BsCheckCircleFill />
          </button>
        </div>
      </div>
    </div>
  );
}

export { TodoFocusPanel };
