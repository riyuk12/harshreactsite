import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from "../../../Utils/base";

// API call function using thunk and axios
export const GetLiveRecClassesThunk = createAsyncThunk(
	"type/GetLiveRecClassesThunk",
	async ({ id, token }) => {
		const response = await axios.post(
			`${baseUrl()}/getLiveRecClasses`,
			{
				courseId: id,
			},
			{
				headers: {
					"Acces-Control-Allow-Origin": "*",
					Client_ID: "MVOZ7rblFHsvdzk25vsQpQ==",
					Authorization: token,
				},
			}
		);
		return response.data;
	}
);

// extra reducer to handle API response
export const extraReducersForLiveRecClasses = (builder) => {
	builder
		.addCase(GetLiveRecClassesThunk.pending, (state) => {
			state.isLoading = {
				...state.isLoading,
				liveRecClassesLoading: true,
			};
		})
		.addCase(GetLiveRecClassesThunk.fulfilled, (state, action) => {
			state.isLoading = {
				...state.isLoading,
				liveRecClassesLoading: false,
			};
			state.recClasses = action.payload.Data;
		})
		.addCase(GetLiveRecClassesThunk.rejected, (state) => {
			state.isLoading = {
				...state.isLoading,
				liveRecClassesLoading: false,
			};
			state.isError = true;
		});
};
