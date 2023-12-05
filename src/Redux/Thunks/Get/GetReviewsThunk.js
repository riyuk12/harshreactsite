import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from "../../../Utils/base";

export const GetReviewsThunk = createAsyncThunk(
	"type/GetReviewsThunk",
	async () => {
		const response = await axios.post(
			`${baseUrl()}/df/studentSpeak`,
			{},
			{ headers: { Client_ID: "MVOZ7rblFHsvdzk25vsQpQ==" } }
		);
		return response.data;
	}
);

export const extraReducersForReviews = (builder) => {
	builder
		.addCase(GetReviewsThunk.pending, (state) => {
			state.isLoading = { ...state.isLoading, reviewsLoading: true };
		})
		.addCase(GetReviewsThunk.fulfilled, (state, action) => {
			state.isLoading = { ...state.isLoading, reviewsLoading: false };
			state.reviewsData = action.payload.Data;
		})
		.addCase(GetReviewsThunk.rejected, (state) => {
			state.isLoading = { ...state.isLoading, reviewsLoading: false };
			state.isError = true;
		});
};
