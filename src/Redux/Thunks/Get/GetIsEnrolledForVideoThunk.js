import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from "../../../Utils/base";

// API call function using thunk and axios
export const GetIsEnrolledForVideoThunk = createAsyncThunk(
	"type/GetIsEnrolledForVideoThunk",
	async ({ userId }) => {
		const response = await axios.get(
			`${baseUrl()}/df/getVideoClassEnrollFlag/${userId}`
		);
		return response.data;
	}
);

// extra reducer to handle API response
export const extraReducersForIsEnrolledForVideo = (builder) => {
	builder
		.addCase(GetIsEnrolledForVideoThunk.pending, (state) => {
			state.isLoading = {
				...state.isLoading,
				isEnrolledForVideoLoading: true,
			};
		})
		.addCase(GetIsEnrolledForVideoThunk.fulfilled, (state, action) => {
			state.isLoading = {
				...state.isLoading,
				isEnrolledForVideoLoading: false,
			};
			state.isEnrolledForVideo = action.payload.Data;
		})
		.addCase(GetIsEnrolledForVideoThunk.rejected, (state) => {
			state.isLoading = {
				...state.isLoading,
				isEnrolledForVideoLoading: false,
			};
			state.isError = true;
		});
};
