import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from "../../../Utils/base";

// API call function using thunk and axios
export const GetPerformanceRankingThunk = createAsyncThunk(
	"type/GetPerformanceRankingThunk",
	async ({ token, courseId }) => {
		const response = await axios.post(
			`${baseUrl()}/getPerFormanceRankingByCourseId`,
			{ courseId },
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
export const extraReducersForPerformanceRanking = (builder) => {
	builder
		.addCase(GetPerformanceRankingThunk.pending, (state) => {
			state.isLoading = {
				...state.isLoading,
				performanceRankingLoading: true,
			};
		})
		.addCase(GetPerformanceRankingThunk.fulfilled, (state, action) => {
			state.isLoading = {
				...state.isLoading,
				performanceRankingLoading: false,
			};
			state.performanceRanking = action.payload.Data;
		})
		.addCase(GetPerformanceRankingThunk.rejected, (state) => {
			state.isLoading = {
				...state.isLoading,
				performanceRankingLoading: false,
			};
			state.isError = true;
		});
};
