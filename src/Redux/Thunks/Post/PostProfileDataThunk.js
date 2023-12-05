import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { baseUrl } from "../../../Utils/base";

// API call function using thunk and axios
export const PostProfileDataThunk = createAsyncThunk(
	"type/PostProfileDataThunk",
	async ({ email, token }) => {
		const response = await axios.post(
			`${baseUrl()}/profileData`,
			{ email },
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
export const extraReducersForProfileDataThunk = (builder) => {
	builder
		.addCase(PostProfileDataThunk.pending, (state) => {
			state.isLoading = { ...state.isLoading, profileDataLoading: true };
		})
		.addCase(PostProfileDataThunk.fulfilled, (state, action) => {
			state.isLoading = { ...state.isLoading, profileDataLoading: false };
			state.userProfileData = action.payload.Data;
			state.userProfileDataStatus = action.payload.ResultCode;
		})
		.addCase(PostProfileDataThunk.rejected, (state, action) => {
			state.isLoading = { ...state.isLoading, profileDataLoading: false };
			state.isError = true;
			// Check if the status code is 401 or 403
			if (
				action.error.message ===
					"Request failed with status code 401" ||
				action.error.message === "Request failed with status code 403"
			) {
				Cookies.remove("token");
				Cookies.remove("email");
				Cookies.remove("userId");
				localStorage.clear();
			}
		});
};
