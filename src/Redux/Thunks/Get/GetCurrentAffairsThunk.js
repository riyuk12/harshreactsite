import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from "../../../Utils/base";

// API call function using thunk and axios
export const GetCurrentAffairsThunk = createAsyncThunk(
	"type/GetCurrentAffairsThunk",
	async () => {
		const response = await axios(
			`${baseUrl()}/df/findCurrentAffairs`
		);
		return response.data;
	}
);

// extra reducer to handle API response
export const extraReducersForCurrentAffairs = (builder) => {
	builder
		.addCase(GetCurrentAffairsThunk.pending, (state) => {
			state.isLoading = {
				...state.isLoading,
				currentAffairsLoading: true,
			};
		})
		.addCase(GetCurrentAffairsThunk.fulfilled, (state, action) => {
			state.isLoading = {
				...state.isLoading,
				currentAffairsLoading: false,
			};
			state.currentAffairsData = action.payload.result;
			state.isCurrentAffairBlinking = action.payload.newsToBlink;
		})
		.addCase(GetCurrentAffairsThunk.rejected, (state) => {
			state.isLoading = {
				...state.isLoading,
				currentAffairsLoading: false,
			};
			state.isError = true;
		});
};
