import { useEffect, useRef, useState } from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import { useSelector } from "react-redux";

export default function TestTimer({ setter }) {
  const [seconds, setSeconds] = useState(5);
  const { testDuration } = useSelector(store => store.liveTest)
  const [minutes, setMinutes] = useState(testDuration);
  const timerId = useRef();

  useEffect(function () {
    timerId.current = setInterval(function () {
      if (seconds === 0) setMinutes(prev => prev - 1);
      setSeconds(prev => prev <= 0 ? 60 : prev - 1);

    }, 1000);
    return () => clearInterval(timerId.current);
  }, [seconds]);

  useEffect(function () {
    if (minutes <= -1) {
      setter(true);
      clearInterval(timerId.current);
    }
  }, [minutes]);

  return (
    <div>
      <div className="my-2">
        <ProgressBar
          completed={(((testDuration - minutes) / testDuration) * 100).toFixed(2) + " %"}
           // Change the color here
        />
      </div>
      <p className="text-1xl text-white bg-blue-500 p-2 inline-block rounded">Section Time: {minutes}:{seconds} </p>
    </div>
  );
}
