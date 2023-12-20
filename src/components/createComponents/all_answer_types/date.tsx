import React, { useState } from "react";
import { BsCalendar2Date } from "react-icons/bs";
import { MdOutlineAccessTime } from "react-icons/md";

interface props {
  showIncludeTime: boolean;
}
const Date: React.FC<props> = ({ showIncludeTime }) => {

  return (
    <div className="flex space-x-3 items-center">
      <input
        type="date"
        id="date"
        name="date"
        placeholder="Day,Month,Year"
        className="p-3 border-b"
        disabled
      />
      <label>
        <BsCalendar2Date />
      </label>
      {showIncludeTime && (
        <>
          <input
            type="time"
            id="time"
            name="time"
            className="p-3 border-b"
            disabled
          />
          <label>
            <MdOutlineAccessTime />
          </label>
        </>
      )}
    </div>
  );
};

export default Date;
