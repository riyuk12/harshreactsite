import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import baseUrl from "../../../../src/Components/baseUrl";

// API call function using thunk and axios
export const GetChaptersThunk = createAsyncThunk(
	"type/GetChaptersThunk",
	async ({ token, id }) => {
		try {
			const response = await axios(
				`${baseUrl()}/getChapterList?courseId=6&topicId=${id}`,
				{
					headers: {
						"Acces-Control-Allow-Origin": "*",
						Client_ID: process.env.REACT_APP_API_CLIENT_ID,
						Authorization: token,
					},
				}
			);
			return response.data;
		} catch (error) {
			console.log(error, "error topice id latests");
		}
	}
);

// extra reducer to handle API response
export const extraReducersForChapters = (builder) => {
	builder
		.addCase(GetChaptersThunk.pending, (state) => {
			state.isLoading = { ...state.isLoading, chaptersLoading: true };
		})
		.addCase(GetChaptersThunk.fulfilled, (state, action) => {
			state.isLoading = { ...state.isLoading, chaptersLoading: false };
			state.chapters = action.payload.result;
		})
		.addCase(GetChaptersThunk.rejected, (state) => {
			state.isLoading = { ...state.isLoading, chaptersLoading: false };
			state.isError = true;
		});
};
