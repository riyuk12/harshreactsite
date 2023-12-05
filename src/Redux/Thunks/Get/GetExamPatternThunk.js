import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from "../../../Utils/base";

// API call function using thunk and axios
export const GetExamPatternThunk = createAsyncThunk(
	"type/GetExamPatternThunk",
	async ({ id }) => {
		const response = await axios(
			`${baseUrl()}/df/examPattern/${id}`,
			{
				headers: {
					"Acces-Control-Allow-Origin": "*",
					Client_ID: process.env.REACT_APP_API_CLIENT_ID,
				},
			}
		);
		return response.data;
	}
);

// extra reducer to handle API response
export const extraReducersForExamPattern = (builder) => {
	builder
		.addCase(GetExamPatternThunk.pending, (state) => {
			state.isLoading = { ...state.isLoading, examPatternLoading: true };
		})
		.addCase(GetExamPatternThunk.fulfilled, (state, action) => {
			state.isLoading = { ...state.isLoading, examPatternLoading: false };
			state.examPattern = action.payload.Data;
		})
		.addCase(GetExamPatternThunk.rejected, (state) => {
			state.isLoading = { ...state.isLoading, examPatternLoading: false };
			state.isError = true;
		});
};
