import { PayloadAction, createSlice, nanoid } from "@reduxjs/toolkit";

interface AllFormField {
  formFields: {
    type: string;
    id: string;
    label: string;
    options?: string[];
    isOther?: boolean;
    otherText?: string;
    description?: string;
    required: boolean;
    validation?: any;
    fileValidation?: any;
    isTime?: boolean;
  }[];
  userId?: string;
  user?: string;
}

const initialState: AllFormField = {
  formFields: [
    {
      type: "Title and description",
      id: nanoid(),
      label: "Untitled form",
      required: false,
    },
    {
      type: "Multiple choice",
      id: nanoid(),
      label: "",
      options: ["Option 1", "Option 2"],
      required: false,
    },
  ],
  userId: "yourUserId",
  user: "yourUsername",
};

export const FormFieldSlice = createSlice({
  name: "AllFormField",
  initialState,
  reducers: {
    handleLabelChange: (
      state,
      action: PayloadAction<{ index: number; newLabel: string }>
    ) => {
      const { index, newLabel } = action.payload;
      const newFormFields = [...state.formFields];
      newFormFields[index].label = newLabel;
    },

    deleteFormField: (state, action: PayloadAction<{ index: number }>) => {
      const { index } = action.payload;
      const newFormFields = [...state.formFields];
      newFormFields.splice(index, 1);
      state.formFields = newFormFields;
    },

    copyFormField: (state, action: PayloadAction<{ index: number }>) => {
      const { index } = action.payload;
      console.log("index", index)
      const newFormFields = [...state.formFields];
      const copiedFormField = { ...newFormFields[index], id: nanoid() };
      console.log("copiedFormField", copiedFormField);
      newFormFields.splice(index + 1, 0, copiedFormField);
      state.formFields = newFormFields;
    },

    handleDescriptionChange: (
      state,
      action: PayloadAction<{ index: number; newDescription: string }>
    ) => {
      const { index, newDescription } = action.payload;
      const newFormFields = [...state.formFields];
      newFormFields[index].description = newDescription;
    },

    handleTypeChange: (
      state,
      action: PayloadAction<{ index: number; newType: string }>
    ) => {
      const { index, newType } = action.payload;
      const newFormFields = [...state.formFields];
      newFormFields[index].type = newType;
      if (
        newType === "Multiple choice" ||
        newType === "Checkboxes" ||
        newType === "Drop-down"
      ) {
        newFormFields[index].options = ["Option 1", "Option 2"];
      } else {
        delete newFormFields[index].options;
      }

      if (newType === "Time") {
        newFormFields[index].isTime = true;
      } else {
        delete newFormFields[index].isTime;
      }
      if (
        newType === "Short answer" ||
        newType === "Paragraph" ||
        newType === "Checkboxes"
      ) {
        newFormFields[index].validation = {};
      } else {
        delete newFormFields[index].validation;
      }
    },

    handleOptionChange: (
      state,
      action: PayloadAction<{ index: number; newOption: string[] }>
    ) => {
      const { index, newOption } = action.payload;
      const newFormFields = [...state.formFields];
      newFormFields[index] = { ...newFormFields[index] };
      newFormFields[index].options = [...newOption];
    },

    handleOtherChange: (
      state,
      action: PayloadAction<{ index: number; newIsOther: boolean }>
    ) => {
      const { index, newIsOther } = action.payload;
      const newFormFields = [...state.formFields];
      newFormFields[index].isOther = newIsOther;
      state.formFields = newFormFields;
    },
    handleOtherTextChange: (
      state,
      action: PayloadAction<{ index: number; newOtherText: string }>
    ) => {
      const { index, newOtherText } = action.payload;
      const newFormFields = [...state.formFields];
      newFormFields[index].otherText = newOtherText;
      state.formFields = newFormFields;
    },
    handleRequiredChange: (
      state,
      action: PayloadAction<{ index: number; newRequired: boolean }>
    ) => {
      const { index, newRequired } = action.payload;
      const newFormFields = [...state.formFields];
      newFormFields[index].required = newRequired;
      state.formFields = newFormFields;
    },
    handleValidationChange: (
      state,
      action: PayloadAction<{ index: number; newValidation: any }>
    ) => {
      const { index, newValidation } = action.payload;
      const newFormFields = [...state.formFields];
      newFormFields[index].validation = newValidation;
    },

    handleFileValidationChange: (
      state,
      action: PayloadAction<{ index: number; newValidation: any }>
    ) => {
      const { index, newValidation } = action.payload;
      const newFormFields = [...state.formFields];
      newFormFields[index].fileValidation = newValidation;
    },

    handleTimeChange: (
      state,
      action: PayloadAction<{ index: number; setTime: boolean }>
    ) => {
      const { index, setTime } = action.payload;
      const newFormFields = [...state.formFields];
      newFormFields[index].isTime = setTime;
    },

    addNewQuestionField: (
      state,
      action: PayloadAction<{
        type: string;
        label: string;
        options: string[];
        otherText?: string;
        required: boolean;
        validation?: any;
        focusedIndex: number;
      }>
    ) => {
      const {
        type,
        label,
        options,
        otherText,
        required,
        validation,
        focusedIndex,
      } = action.payload;

      // Ensure a focus field is found
      if (focusedIndex !== -1) {
        // Create a new form field
        const newFormField = {
          type,
          id: nanoid(),
          label,
          options,
          otherText,
          required,
          validation,
        };

        // Insert the new form field at the focused index + 1
        const newFormFields = [
          ...state.formFields.slice(0, focusedIndex + 1),
          newFormField,
          ...state.formFields.slice(focusedIndex + 1),
        ];

        // Update state with the new form fields
        state.formFields = newFormFields;
      }
    },
  },
});

export const {
  handleLabelChange,
  addNewQuestionField,
  handleDescriptionChange,
  handleTypeChange,
  handleOptionChange,
  handleOtherChange,
  handleOtherTextChange,
  handleRequiredChange,
  handleValidationChange,
  handleFileValidationChange,
  handleTimeChange,
  deleteFormField,
  copyFormField,
} = FormFieldSlice.actions;

export default FormFieldSlice.reducer;
