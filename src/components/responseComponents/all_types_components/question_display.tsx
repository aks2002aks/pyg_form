import React from "react";

interface Props {
  text_size: string;
  label: string;
  required?: boolean;
  index?: number;
}

const QuestionDisplay: React.FC<Props> = ({
  text_size,
  label,
  required,
  index,
}) => {

  return (
    <div>
      {(label && label !=="<p></p>") && <>
      
      {index && <span style={{ marginRight: "5px" }}>{index  }.</span>}
      <div
        style={{
          fontSize: text_size + "px",
        }}
        className="inline-flex mr-2 items-center"
        dangerouslySetInnerHTML={{ __html: label }}
      />
      {required && <span style={{ color: "red" }}>*</span>}</>}
      
    </div>
  );
};

export default QuestionDisplay;
