import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from "../../../Utils/base";

// API call function using thunk and axios
export const GetNewsMessageThunk = createAsyncThunk(
	"type/GetNewsMessageThunk",
	async () => {
		const response = await axios(
			`${baseUrl()}/df/findNewsEventDtls/3`
		);
		return response.data;
	}
);

// extra reducer to handle API response
export const extraReducersForNewsMessage = (builder) => {
	builder
		.addCase(GetNewsMessageThunk.pending, (state) => {
			state.isLoading = { ...state.isLoading, newsMessageLoading: true };
		})
		.addCase(GetNewsMessageThunk.fulfilled, (state, action) => {
			state.isLoading = { ...state.isLoading, newsMessageLoading: false };
			state.message = action.payload.result;
		})
		.addCase(GetNewsMessageThunk.rejected, (state) => {
			state.isLoading = { ...state.isLoading, newsMessageLoading: false };
			state.isError = true;
		});
};
