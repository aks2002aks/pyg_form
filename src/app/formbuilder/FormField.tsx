// FormField.tsx
import React, { DragEvent, ChangeEvent, useState } from 'react';

interface FormFieldProps {
  type: string;
  id: string;
  label: string;
  options?: string[]; // Include options for multiple-choice fields
  onRemove: (id: string) => void;
  onDragStart: (e: DragEvent<HTMLDivElement>, id: string) => void;
  onDragOver: (e: DragEvent<HTMLDivElement>) => void;
  onDrop: (e: DragEvent<HTMLDivElement>, id: string) => void;
  onInputChange: (id: string, value: string) => void;
}

const FormField: React.FC<FormFieldProps> = ({
  type,
  id,
  label,
  options: initialOptions,
  onRemove, 
  onDragStart,
  onDragOver,
  onDrop,
  onInputChange,
}) => {
  const [options, setOptions] = useState<string[]>(initialOptions || []);

  const handleAddOption = () => {
    setOptions([...options, '']);
  };

  const handleOptionChange = (index: number, value: string) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  const renderField = () => {
    switch (type) {
      case 'text':
        return <input type="text" placeholder={label} onChange={(e) => onInputChange(id, e.target.value)} />;
      case 'checkbox':
        return <input type="checkbox" onChange={(e) => onInputChange(id, e.target.value)} />;
      case 'multipleChoice':
        return (
          <div>
            <div>{label}</div>
            {options.map((option, index) => (
              <div key={index}>
                <input
                  type="text"
                  placeholder={`Option ${index + 1}`}
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                />
              </div>
            ))}
            <button onClick={handleAddOption}>Add Option</button>
          </div>
        );
      // Add more cases for different form field types as needed
      default:
        return null;
    }
  };

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, id)}
      onDragOver={(e) => onDragOver(e)}
      onDrop={(e) => onDrop(e, id)}
    >
      {renderField()}
      <button onClick={() => onRemove(id)}>Remove</button>
    </div>
  );
};

export default FormField;
