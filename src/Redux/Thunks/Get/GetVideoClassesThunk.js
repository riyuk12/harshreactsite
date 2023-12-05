import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from "../../../Utils/base";

// API call function using thunk and axios
export const GetVideoClassesThunk = createAsyncThunk(
	"type/GetVideoClassesThunk",
	async ({ token, courseId }) => {
		const response = await axios.post(
			`${baseUrl()}/df/fetchVideoClassesDtls`,
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
export const extraReducersForVideoClasses = (builder) => {
	builder
		.addCase(GetVideoClassesThunk.pending, (state) => {
			state.isLoading = { ...state.isLoading, videoClassesLoading: true };
		})
		.addCase(GetVideoClassesThunk.fulfilled, (state, action) => {
			state.isLoading = {
				...state.isLoading,
				videoClassesLoading: false,
			};
			state.videoData = action.payload.Data;
		})
		.addCase(GetVideoClassesThunk.rejected, (state) => {
			state.isLoading = {
				...state.isLoading,
				videoClassesLoading: false,
			};
			state.isError = true;
		});
};
