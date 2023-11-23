import { PayloadAction, createSlice, nanoid } from "@reduxjs/toolkit";

interface AllFormField {
  formFields: {
    type: string;
    id: string;
    label: string;
    focus: boolean;
    options?: string[];
    isOther?: boolean;
    otherText?: string;
    description?: string;
    required: boolean;
    validation?: any;
    fileValidation?: any;
    isTime?: boolean;
    answer?: string;
    selectedAnswer?: string[];
    fromRange?: string;
    toRange?: string;
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
      focus: false,
    },
    {
      type: "Multiple choice",
      id: nanoid(),
      label: "",
      options: ["Option 1", "Option 2"],
      required: false,
      focus: true,
    },
  ],
  userId: "12345678",
  user: "Ashwani",
};

export const FormFieldSlice = createSlice({
  name: "AllFormField",
  initialState,
  reducers: {
    setFocus: (state, action: PayloadAction<{ index: number }>) => {
      const { index } = action.payload;
      const newFormFields = state.formFields.map((field, i) => {
        if (i === index) {
          return { ...field, focus: true };
        } else {
          return { ...field, focus: false };
        }
      });
      state.formFields = newFormFields;
    },

    deleteFormField: (state, action: PayloadAction<{}>) => {
      const focusedIndex = state.formFields.findIndex(
        (field) => field.focus === true
      );

      if (focusedIndex !== -1) {
        const newFormFields = [...state.formFields];

        // Update focus for the previous field if it exists
        if (focusedIndex > 0) {
          newFormFields[focusedIndex - 1].focus = true;
        } else if (newFormFields.length > 0) {
          newFormFields[0].focus = true;
        }

        // Create a new array without the deleted field
        const updatedFormFields = newFormFields.filter(
          (_, index) => index !== focusedIndex
        );
        console.log(updatedFormFields);
        // Update the state with the new array
        state.formFields = updatedFormFields;
      }
    },

    copyFormField: (state, action: PayloadAction<{}>) => {
      const focusedIndex = state.formFields.findIndex(
        (field) => field.focus === true
      );
      const copiedFormField = {
        ...state.formFields[focusedIndex],
        id: nanoid(),
        focus: true,
      };

      state.formFields[focusedIndex].focus = false;
      state.formFields.splice(focusedIndex + 1, 0, copiedFormField);
    },

    handleLabelChange: (
      state,
      action: PayloadAction<{ index: number; newLabel: string }>
    ) => {
      const { index, newLabel } = action.payload;
      const newFormFields = [...state.formFields];
      newFormFields[index].label = newLabel;
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
        focus: boolean;
      }>
    ) => {
      const { type, label, options, otherText, required, validation, focus } =
        action.payload;

      const focusedIndex = state.formFields.findIndex(
        (field) => field.focus === true
      );
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
          focus,
        };

        // Set the previous focused field to false
        state.formFields[focusedIndex].focus = false;

        // Insert the new form field after the focused index
        state.formFields.splice(focusedIndex + 1, 0, newFormField);
      }
    },
    handleDropField: (
      state,
      action: PayloadAction<{ source: number; destination: number }>
    ) => {
      const { source, destination } = action.payload;

      if (source > 0 && destination > 0) {
        const updatedFields = state.formFields.slice();

        // Swap the positions of the dragged field and the target field
        [updatedFields[destination], updatedFields[source]] = [
          updatedFields[source],
          updatedFields[destination],
        ];

        state.formFields = updatedFields;
      }
    },

    setAllFormFields: (state, action: PayloadAction<AllFormField>) => {
      const { formFields, userId, user } = action.payload;
      state.formFields = formFields;
      state.userId = userId;
      state.user = user;
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
  setFocus,
  handleDropField,
  setAllFormFields,
} = FormFieldSlice.actions;

export default FormFieldSlice.reducer;
