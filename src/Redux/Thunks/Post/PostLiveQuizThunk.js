import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from "../../../Utils/base";

// API call function using thunk and axios
export const PostLiveQuizThunk = createAsyncThunk(
	"type/PostLiveQuizThunk",
	async ({ courseId, token }) => {
		const response = await axios.post(
			`${baseUrl()}/df/getAllActiveLiveQuizByCourse`,
			{ courseId: courseId },
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
export const extraReducersForPostLiveQuizThunk = (builder) => {
	builder
		.addCase(PostLiveQuizThunk.pending, (state) => {
			state.isLoading = {
				...state.isLoading,
				liveQuizDataLoading: true,
			};
		})
		.addCase(PostLiveQuizThunk.fulfilled, (state, action) => {
			state.isLoading = {
				...state.isLoading,
				liveQuizDataLoading: false,
			};
			state.liveQuizData = action.payload.Data;
		})
		.addCase(PostLiveQuizThunk.rejected, (state) => {
			state.isLoading = {
				...state.isLoading,
				liveQuizDataLoading: false,
			};
			state.isError = true;
		});
};
