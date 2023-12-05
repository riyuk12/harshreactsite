import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from "../../../Utils/base";

// API call function using thunk and axios
export const GetPerformanceRankingByTopicThunk = createAsyncThunk(
	"type/GetPerformanceRankingByTopicThunk",
	async ({ token, courseId, topicId }) => {
		const response = await axios.post(
			`${baseUrl()}/getPerFormanceRankingByCourseAndTopic`,
			{ courseId, topicId },
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
export const extraReducersForPerformanceRankingByTopic = (builder) => {
	builder
		.addCase(GetPerformanceRankingByTopicThunk.pending, (state) => {
			state.isLoading = {
				...state.isLoading,
				performanceRankingByTopicLoading: true,
			};
		})
		.addCase(
			GetPerformanceRankingByTopicThunk.fulfilled,
			(state, action) => {
				state.isLoading = {
					...state.isLoading,
					performanceRankingByTopicLoading: false,
				};
				// state.performanceRankingByTopic = action.payload.Data;
				state.performanceRanking = action.payload.Data;
			}
		)
		.addCase(GetPerformanceRankingByTopicThunk.rejected, (state) => {
			state.isLoading = {
				...state.isLoading,
				performanceRankingByTopicLoading: false,
			};
			state.isError = true;
		});
};
