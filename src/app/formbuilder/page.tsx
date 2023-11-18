"use client";
// FormBuilder.tsx
import React, { DragEvent, useState } from "react";
import FormField from "./FormField";

interface FormField {
  type: string;
  id: string;
  label: string;
  options?: string[]; // Include options for multiple-choice fields
}

const FormBuilder: React.FC = () => {
  const [formFields, setFormFields] = useState<FormField[]>([]);
  const [formData, setFormData] = useState<any>({});

  const addFormField = (type: string, label: string, options?: string[]) => {
    setFormFields([
      ...formFields,
      { type, id: Date.now().toString(), label, options },
    ]);
  };

  const removeFormField = (id: string) => {
    setFormFields(formFields.filter((field) => field.id !== id));
  };

  const handleDragStart = (e: DragEvent<HTMLDivElement>, id: string) => {
    e.dataTransfer.setData("text/plain", id);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>, targetId: string) => {
    e.preventDefault();

    const draggedId = e.dataTransfer.getData("text/plain");
    const updatedFields = formFields.slice();
    const targetIndex = updatedFields.findIndex(
      (field) => field.id === targetId
    );
    const draggedIndex = updatedFields.findIndex(
      (field) => field.id === draggedId
    );

    // Swap the positions of the dragged field and the target field
    [updatedFields[targetIndex], updatedFields[draggedIndex]] = [
      updatedFields[draggedIndex],
      updatedFields[targetIndex],
    ];

    setFormFields(updatedFields);
  };

  const handleInputChange = (fieldId: string, value: string) => {
    setFormData({ ...formData, [fieldId]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form data submitted:", formData);
    // Perform additional actions like sending data to the server
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <button onClick={() => addFormField("text", "Text Field")}>
          Add Text Field
        </button>
        <button
          onClick={() =>
            addFormField("multipleChoice", "Multiple Choice", [
              "Option 1",
              "Option 2",
            ])
          }
        >
          Add Multiple Choice
        </button>

        {formFields.map((field) => (
          <FormField
            key={field.id}
            type={field.type}
            id={field.id}
            label={field.label}
            options={field.options}
            onRemove={removeFormField}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onInputChange={handleInputChange}
          />
        ))}

        <button type="submit">Submit Form</button>
      </form>
    </div>
  );
};

export default FormBuilder;
