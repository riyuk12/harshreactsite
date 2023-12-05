import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from "../../../Utils/base";

// API call function using thunk and axios
export const GetTipOfTheDayThunk = createAsyncThunk(
	"type/GetTipOfTheDayThunk",
	async ({ token }) => {
		const response = await axios(
			`${baseUrl()}/df/findTipOfTheDay`,
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
export const extraReducersForTip = (builder) => {
	builder
		.addCase(GetTipOfTheDayThunk.pending, (state) => {
			state.isLoading = { ...state.isLoading, tipOfTheDayLoading: true };
		})
		.addCase(GetTipOfTheDayThunk.fulfilled, (state, action) => {
			state.isLoading = { ...state.isLoading, tipOfTheDayLoading: false };
			state.tip = action.payload.result.title;
			state.tipDate = action.payload.result.tipDate;
		})
		.addCase(GetTipOfTheDayThunk.rejected, (state) => {
			state.isLoading = { ...state.isLoading, tipOfTheDayLoading: false };
			state.isError = true;
		});
};
