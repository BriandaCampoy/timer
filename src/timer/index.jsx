import { useEffect, useState } from 'react';
import './style.css';
function Timer({ initHours, initMinutes, initSeconds, start, reset }) {
  const [hours, setHours] = useState(null);
  const [minutes, setMinutes] = useState(null);
  const [seconds, setSeconds] = useState(null);
  const [over, setOver] = useState(false);
  const [time, setTime] = useState('00:00:00');
  const [intervalId, setIntervalId] = useState();

  useEffect(() => {
    if (!over && start) {
      setHours(hours != null ? hours : (initHours ? initHours : 0));
      setMinutes(minutes!=null ? minutes : initMinutes ? initMinutes : 0);
      setSeconds(seconds!=null ? seconds : initSeconds ? initSeconds : 0);
      const regresiveInterval = setInterval(() => {
        setSeconds((seconds) => seconds - 1);
      }, 1000);
      setIntervalId(regresiveInterval);
      return () => clearInterval(regresiveInterval);
    } else if(over && start){
      OverTimeInterval()
    }else if (!start) {
      clearInterval(intervalId);
      if(reset){
        setOver(false)
        setHours(null)
        setMinutes(null)
        setSeconds(null)
      }
    }
  }, [start, reset]);

  useEffect(() => {
    if (hours <= 0 && minutes <= 0 && seconds < 0) {
      setOver(true);
      clearInterval(intervalId);
      OverTimeInterval();
    }
    if (!over) {
      regresiveFormat();
    } else {
      overTimeFormat();
    }
    rewriteTime();
  }, [seconds]);

  useEffect(()=>{
    if(over){
      setSeconds(0)
    }
  },[over])

  function rewriteTime() {
    let StringHours = hours < 10 ? '0' + (hours ? hours : 0) : hours;
    let StringMinutes = minutes < 10 ? '0' + (minutes ? minutes : 0) : minutes;
    let StringSeconds = seconds < 10 ? '0' + (seconds ? seconds : 0) : seconds;
    setTime(`${StringHours}:${StringMinutes}:${StringSeconds}`);
  }

  function OverTimeInterval() {

    const newIntervalId = setInterval(() => {
      setSeconds((seconds) => seconds + 1);
    }, 1000);
    setIntervalId(newIntervalId);
  }

  function regresiveFormat() {
    if (seconds < 0 && (hours > 0 || minutes > 0)) {
      setSeconds(59);
      if (minutes > 0) {
        setMinutes((minutes) => minutes - 1);
      } else if (hours > 0) {
        setMinutes(59);
        setHours((hours) => hours - 1);
      }
    }
    if (minutes < 0 && hours > 0) {
      setMinutes(59);
      setHours((hours) => hours - 1);
    }
  }
  function overTimeFormat() {
    if (seconds == 60) {
      setSeconds(0);
      setMinutes((minutes) => minutes + 1);
    }
    if (minutes == 60) {
      setMinutes(0);
      setHours((hours) => hours + 1);
    }
  }

  return (
    <div className={over ? 'overtime' : ''}>
      <p className='timer'>{time}</p>
      {over && <p>Time is over!</p>}
    </div>
  );
}

export default Timer;
