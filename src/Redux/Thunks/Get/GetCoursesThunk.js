import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from "../../../Utils/base";

// API call function using thunk and axios
export const GetCoursesThunk = createAsyncThunk(
	"type/GetCoursesThunk",
	async ({ token }) => {
		const response = await axios.post(
			`${baseUrl()}/df/coursesAndTopics`,
			{
				courseId: "0",
			},
			{
				headers: {
					"Acces-Control-Allow-Origin": "*",
					Client_ID: process.env.REACT_APP_API_CLIENT_ID,
					Authorization: token,
				},
			}
		);
		return response.data;
	}
);

// extra reducer to handle API response
export const extraReducersForCourses = (builder) => {
	builder
		.addCase(GetCoursesThunk.pending, (state) => {
			state.isLoading = { ...state.isLoading, coursesLoading: true };
		})
		.addCase(GetCoursesThunk.fulfilled, (state, action) => {
			state.isLoading = { ...state.isLoading, coursesLoading: false };
			state.courses = action.payload.Data;
		})
		.addCase(GetCoursesThunk.rejected, (state) => {
			state.isLoading = { ...state.isLoading, coursesLoading: false };
			state.isError = true;
		});
};
