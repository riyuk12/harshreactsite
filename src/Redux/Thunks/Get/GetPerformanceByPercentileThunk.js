import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from "../../../Utils/base";

// API call function using thunk and axios
export const GetPerformanceByPercentileThunk = createAsyncThunk(
	"type/GetPerformanceByPercentileThunk",
	async ({ token, userId, dailyMonthlyFlag }) => {
		const response = await axios.post(
			`${baseUrl()}/getPerFormanceHistoryByPercentile`,
			{ userId, dailyMonthlyFlag },
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
export const extraReducersForPerformanceByPercentile = (builder) => {
	builder
		.addCase(GetPerformanceByPercentileThunk.pending, (state) => {
			state.isLoading = {
				...state.isLoading,
				performanceByPercentileLoading: true,
			};
		})
		.addCase(GetPerformanceByPercentileThunk.fulfilled, (state, action) => {
			state.isLoading = {
				...state.isLoading,
				performanceByPercentileLoading: false,
			};
			state.performanceByPercentile = action.payload.Data;
		})
		.addCase(GetPerformanceByPercentileThunk.rejected, (state) => {
			state.isLoading = {
				...state.isLoading,
				performanceByPercentileLoading: false,
			};
			state.isError = true;
		});
};
