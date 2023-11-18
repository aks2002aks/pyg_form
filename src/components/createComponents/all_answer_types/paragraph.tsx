import React from "react";

const Paragraph = () => {
  return (
    <div className="">
      <textarea
        className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
        rows={4}
        placeholder="Enter paragraph Answer here..."
        disabled
      />
    </div>
  );
};

export default Paragraph;
