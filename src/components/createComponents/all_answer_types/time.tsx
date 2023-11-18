import React, { useState } from "react";
import { MdOutlineAccessTime } from "react-icons/md";

const Time = () => {
  const [time, setTime] = useState("");

  const handleTimeChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setTime(event.target.value);
  };

  return (
    <div className="flex space-x-3 items-center">
      <input
        type="time"
        id="time"
        name="time"
        value={time}
        onChange={handleTimeChange}
        className="p-3 border-b"
        disabled
      />
      <label>
        <MdOutlineAccessTime />
      </label>
    </div>
  );
};

export default Time;
