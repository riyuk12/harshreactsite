import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from "../../../Utils/base";

// API call function using thunk and axios
export const GetCourseDetailsThunk = createAsyncThunk(
	"type/GetCourseDetailsThunk",
	async () => {
		const response = await axios(
			`${baseUrl()}/df/coursesExplore`,
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
export const extraReducersForCourseDetails = (builder) => {
	builder
		.addCase(GetCourseDetailsThunk.pending, (state) => {
			state.isLoading = {
				...state.isLoading,
				courseDetailsLoading: true,
			};
		})
		.addCase(GetCourseDetailsThunk.fulfilled, (state, action) => {
			state.isLoading = {
				...state.isLoading,
				courseDetailsLoading: false,
			};
			state.courseDetailsData = action.payload.Data;
		})
		.addCase(GetCourseDetailsThunk.rejected, (state) => {
			state.isLoading = {
				...state.isLoading,
				courseDetailsLoading: false,
			};
			state.isError = true;
		});
};
