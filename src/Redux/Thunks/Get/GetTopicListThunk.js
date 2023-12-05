import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from "../../../Utils/base";

// API call function using thunk and axios
export const GetTopicListThunk = createAsyncThunk(
	"type/GetTopicListThunk",
	async ({ token, id }) => {
		const response = await axios(
			`${baseUrl()}/getTopicList?courseId=6`,
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
export const extraReducersForTopicList = (builder) => {
	builder
		.addCase(GetTopicListThunk.pending, (state) => {
			state.isLoading = { ...state.isLoading, topicListLoading: true };
		})
		.addCase(GetTopicListThunk.fulfilled, (state, action) => {
			state.isLoading = { ...state.isLoading, topicListLoading: false };
			state.topicList = action.payload.result;
		})
		.addCase(GetTopicListThunk.rejected, (state) => {
			state.isLoading = { ...state.isLoading, topicListLoading: false };
			state.isError = true;
		});
};
