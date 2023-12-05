import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from "../../../Utils/base";

// API call function using thunk and axios
export const GetPerformanceHistoryByQuizCountThunk = createAsyncThunk(
	"type/GetPerformanceHistoryByQuizCountThunk",
	async ({ token, userId, dailyMonthlyFlag }) => {
		const response = await axios.post(
			`${baseUrl()}/getPerFormanceHistoryByQuizCount`,
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
export const extraReducersForPerformanceHistoryByQuizCount = (builder) => {
	builder
		.addCase(GetPerformanceHistoryByQuizCountThunk.pending, (state) => {
			state.isLoading = {
				...state.isLoading,
				performanceHistoryByQuizCountLoading: true,
			};
		})
		.addCase(
			GetPerformanceHistoryByQuizCountThunk.fulfilled,
			(state, action) => {
				state.isLoading = {
					...state.isLoading,
					performanceHistoryByQuizCountLoading: false,
				};
				state.performanceHistoryByQuizCount = action.payload.Data;
			}
		)
		.addCase(GetPerformanceHistoryByQuizCountThunk.rejected, (state) => {
			state.isLoading = {
				...state.isLoading,
				performanceHistoryByQuizCountLoading: false,
			};
			state.isError = true;
		});
};
