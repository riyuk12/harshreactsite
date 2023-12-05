import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from "../../../Utils/base";

// API call function using thunk and axios
export const PostPreferredCourseThunk = createAsyncThunk(
	"type/PostPreferredCourseThunk",
	async ({ data, token }) => {
		const response = await axios.post(
			`${baseUrl()}/userUpdateProfileDetails`,
			data,
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
export const extraReducersForPreferredCourseThunk = (builder) => {
	builder
		.addCase(PostPreferredCourseThunk.pending, (state) => {
			state.isLoading = {
				...state.isLoading,
				preferredCourseLoading: true,
			};
		})
		.addCase(PostPreferredCourseThunk.fulfilled, (state, action) => {
			state.isLoading = {
				...state.isLoading,
				preferredCourseLoading: false,
			};
			state.userProfileData = action.payload.Data;
		})
		.addCase(PostPreferredCourseThunk.rejected, (state) => {
			state.isLoading = {
				...state.isLoading,
				preferredCourseLoading: false,
			};
			state.isError = true;
		});
};
