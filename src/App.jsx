import { useState } from 'react';
import './App.css';
import Timer from './timer';

function App() {
  const [start, setStart] = useState(false);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [enable, setEnable] = useState(false);
  const [reseter, setReseter] = useState(false);

  function play(event) {
    event.preventDefault();
    setHours(parseInt(event.target.hours.value));
    setMinutes(parseInt(event.target.minutes.value));
    setSeconds(parseInt(event.target.seconds.value));
    setEnable(true);
    setStart(!start);
    setReseter(false)
  }
  function reset(event) {
    event.preventDefault();
    document.getElementById('form').reset();
    setEnable(false);
    setStart(false);
    setReseter(true)
  }

  return (
    <div className="App">
      <Timer
        initHours={hours}
        initMinutes={minutes}
        initSeconds={seconds}
        start={start}
        reset={reseter}
      ></Timer>
      <div className="config">
        <form action="" onSubmit={play} id="form" className="form">
          <label htmlFor="">
            Hours:
            <input type="number" name="hours" disabled={enable} />
          </label>
          <label htmlFor="">
            Minutes:
            <input type="number" max="60" name="minutes" disabled={enable} />
          </label>
          <label htmlFor="">
            Seconds:
            <input type="number" max="60" name="seconds" disabled={enable} />
          </label>
          <button
            type="submit"
            className={start ? 'btn__pause' : 'btn__play'}
          ></button>
          <button type="button" onClick={reset}>
            Reset
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
