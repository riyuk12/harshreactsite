import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from "../../../Utils/base";

// API call function using thunk and axios
export const GetNewsThunk = createAsyncThunk("type/GetNewsThunk", async () => {
	const response = await axios(
		`${baseUrl()}/df/findNewsEventDtls/1`
	);
	return response.data;
});

// extra reducer to handle API response
export const extraReducersForNews = (builder) => {
	builder
		.addCase(GetNewsThunk.pending, (state) => {
			state.isLoading = { ...state.isLoading, newsLoading: true };
		})
		.addCase(GetNewsThunk.fulfilled, (state, action) => {
			state.isLoading = { ...state.isLoading, newsLoading: false };
			state.newsData = action.payload.result;
			state.isNewsBlinking = action.payload.newsToBlink;
		})
		.addCase(GetNewsThunk.rejected, (state) => {
			state.isLoading = { ...state.isLoading, newsLoading: false };
			state.isError = true;
		});
};
