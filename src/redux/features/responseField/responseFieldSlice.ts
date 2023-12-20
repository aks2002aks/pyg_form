import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface FormFieldResponse {
  formFieldId: string;
  type: string;
  answer: string | string[];
  time?: string;
  date?: string;
  fileUrlKey?: string;
  rangeTo?: number;
  rangeFrom?: number;
  required: boolean;
  isTime?: boolean;
  label: string;
  description?: string;
  imageUrlKey?: string;
  imageSettings?: any;
}

interface FormResponse {
  userId?: string;
  formId?: string;
  userName?: string;
  email?: string;
  formResponses: FormFieldResponse[];
  submittedAt?: Date;
  updatedAt?: Date;
}

const initialState: FormResponse = {
  formResponses: [],
};

export const responseFieldSlice = createSlice({
  name: "FormResponse",
  initialState,
  reducers: {
    saveEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    saveUserId: (state, action: PayloadAction<string>) => {
      state.userId = action.payload;
    },
    saveFormId: (state, action: PayloadAction<string>) => {
      state.formId = action.payload;
    },
    saveUserName: (state, action: PayloadAction<string>) => {
      state.userName = action.payload;
    },
    addFormFieldResponse: (
      state,
      action: PayloadAction<{
        formFieldId: string;
        type: string;
        required: boolean;
        showIncludeTime: boolean;
        label: string;
        description: string;
        imageUrlKey: string;
        imageSettings: any;
      }>
    ) => {
      const {
        formFieldId,
        type,
        required,
        showIncludeTime,
        label,
        description,
        imageUrlKey,
        imageSettings,
      } = action.payload;

      // Check if formFieldId already exists
      const existingResponse = state.formResponses.find(
        (response) => response.formFieldId === formFieldId
      );

      if (!existingResponse) {
        if (type === "Checkboxes") {
          const newResponse: FormFieldResponse = {
            label,
            description,
            imageUrlKey,
            imageSettings,
            formFieldId,
            type,
            answer: [],
            required,
          };
          state.formResponses.push(newResponse);
        } else if (type === "File upload") {
          const newResponse: FormFieldResponse = {
            label,
            description,
            imageUrlKey,
            imageSettings,
            formFieldId,
            type,
            answer: "",
            fileUrlKey: "",
            required,
          };
          state.formResponses.push(newResponse);
        } else if (type === "Time") {
          const newResponse: FormFieldResponse = {
            label,
            description,
            imageUrlKey,
            imageSettings,
            formFieldId,
            type,
            answer: "",
            time: "",
            required,
          };
          state.formResponses.push(newResponse);
        } else if (type === "Date") {
          const newResponse: FormFieldResponse = {
            label,
            description,
            imageUrlKey,
            imageSettings,
            formFieldId,
            type,
            answer: "",
            time: "",
            date: "",
            isTime: showIncludeTime,
            required,
          };
          state.formResponses.push(newResponse);
        } else {
          const newResponse: FormFieldResponse = {
            label,
            description,
            imageUrlKey,
            imageSettings,
            formFieldId,
            type,
            answer: "",
            required,
          };
          state.formResponses.push(newResponse);
        }
      }
    },
    answerFormField: (
      state,
      action: PayloadAction<{ formFieldId: string; answer: string | string[] }>
    ) => {
      const { formFieldId, answer } = action.payload;

      // Find the formFieldResponse based on formFieldId
      const formFieldResponse = state.formResponses.find(
        (response) => response.formFieldId === formFieldId
      );

      if (formFieldResponse) {
        formFieldResponse.answer = answer;
      }
    },
    timeFormField: (
      state,
      action: PayloadAction<{ formFieldId: string; time: string }>
    ) => {
      const { formFieldId, time } = action.payload;

      // Find the formFieldResponse based on formFieldId
      const formFieldResponse = state.formResponses.find(
        (response) => response.formFieldId === formFieldId
      );

      if (formFieldResponse) {
        formFieldResponse.time = time;
      }
    },
    dateFormField: (
      state,
      action: PayloadAction<{ formFieldId: string; date: string }>
    ) => {
      const { formFieldId, date } = action.payload;

      // Find the formFieldResponse based on formFieldId
      const formFieldResponse = state.formResponses.find(
        (response) => response.formFieldId === formFieldId
      );

      if (formFieldResponse) {
        formFieldResponse.date = date;
      }
    },
    rangeToFormField: (
      state,
      action: PayloadAction<{ formFieldId: string; rangeTo: number }>
    ) => {
      const { formFieldId, rangeTo } = action.payload;

      // Find the formFieldResponse based on formFieldId
      const formFieldResponse = state.formResponses.find(
        (response) => response.formFieldId === formFieldId
      );

      if (formFieldResponse) {
        formFieldResponse.rangeTo = rangeTo;
      }
    },
    rangeFromFormField: (
      state,
      action: PayloadAction<{ formFieldId: string; rangeFrom: number }>
    ) => {
      const { formFieldId, rangeFrom } = action.payload;

      // Find the formFieldResponse based on formFieldId
      const formFieldResponse = state.formResponses.find(
        (response) => response.formFieldId === formFieldId
      );

      if (formFieldResponse) {
        formFieldResponse.rangeFrom = rangeFrom;
      }
    },

    setFileUrlKey: (
      state,
      action: PayloadAction<{
        formFieldId: string;
        fileUrlKey: string;
      }>
    ) => {
      const { formFieldId, fileUrlKey } = action.payload;

      // Find the formFieldResponse based on formFieldId
      const formFieldResponse = state.formResponses.find(
        (response) => response.formFieldId === formFieldId
      );

      if (formFieldResponse) {
        formFieldResponse.fileUrlKey = fileUrlKey;
      }
      return state;
    },

    setFormResponses: (state, action: PayloadAction<FormResponse>) => {
      const { formId, userName, email, formResponses, submittedAt, updatedAt } =
        action.payload;
      return {
        ...state,
        formId,
        userName,
        email,
        formResponses,
        submittedAt,
        updatedAt,
      };
    },
  },
});

export const {
  saveEmail,
  addFormFieldResponse,
  answerFormField,
  saveUserId,
  saveFormId,
  saveUserName,
  timeFormField,
  dateFormField,
  setFileUrlKey,
  rangeFromFormField,
  rangeToFormField,
  setFormResponses,
} = responseFieldSlice.actions;

export default responseFieldSlice.reducer;
