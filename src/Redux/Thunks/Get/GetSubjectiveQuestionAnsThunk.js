import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import baseUrl from "../../../../src/Components/baseUrl";

// API call function using thunk and axios
export const GetSubjectiveQuestionAnsThunk = createAsyncThunk(
	"type/GetSubjectiveQuestionAnsThunk",
	async ({ token, id, topicId }) => {
		try {
			const response = await axios(
				`${baseUrl()}/getSubjectData?courseId=6&topicId=${topicId}&chapterId=${id}`,
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
export const extraReducersForSubjectiveQuestionAns = (builder) => {
	builder
		.addCase(GetSubjectiveQuestionAnsThunk.pending, (state) => {
			state.isLoading = {
				...state.isLoading,
				subjectiveQuestionAnswersLoading: true,
			};
		})
		.addCase(GetSubjectiveQuestionAnsThunk.fulfilled, (state, action) => {
			state.isLoading = {
				...state.isLoading,
				subjectiveQuestionAnswersLoading: false,
			};
			state.subjectiveQuestionAns = action.payload.result;
		})
		.addCase(GetSubjectiveQuestionAnsThunk.rejected, (state) => {
			state.isLoading = {
				...state.isLoading,
				subjectiveQuestionAnswersLoading: false,
			};
			state.isError = true;
		});
};
