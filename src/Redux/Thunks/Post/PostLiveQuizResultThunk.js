import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from "../../../Utils/base";

// API call function using thunk and axios
export const PostLiveQuizResultThunk = createAsyncThunk(
	"type/PostLiveQuizResultThunk",
	async ({ courseId, quizId, token }) => {
		const response = await axios.post(
			`${baseUrl()}/getLiveQuizResultByQuizId`,
			{ courseId: courseId, quizId: quizId },
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
export const extraReducersForPostLiveQuizResultThunk = (builder) => {
	builder
		.addCase(PostLiveQuizResultThunk.pending, (state) => {
			state.isLoading = {
				...state.isLoading,
				liveQuizResultLoading: true,
			};
		})
		.addCase(PostLiveQuizResultThunk.fulfilled, (state, action) => {
			state.isLoading = {
				...state.isLoading,
				liveQuizResultLoading: false,
			};
			state.liveQuizResult = action.payload.Data;
		})
		.addCase(PostLiveQuizResultThunk.rejected, (state) => {
			state.isLoading = {
				...state.isLoading,
				liveQuizResultLoading: false,
			};
			state.isError = true;
		});
};
