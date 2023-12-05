import { createSlice } from "@reduxjs/toolkit";
import { extraReducersForPreferredCourseThunk } from "../Thunks/Post/PostPreferredCourse";
import { extraReducersForProfileDataThunk } from "../Thunks/Post/PostProfileDataThunk";
import { extraReducersForDownloadMaterialThunk } from "../Thunks/Post/PostDownloadMaterialThunk";
import { extraReducersForPostLiveQuizThunk } from "../Thunks/Post/PostLiveQuizThunk";
import { extraReducersForPostLiveQuizResultThunk } from "../Thunks/Post/PostLiveQuizResultThunk";

const initialState = {
	isLoading: {
		downloadMaterialLoading: true,
		preferredCourseLoading: true,
		liveQuizDataLoading: true,
		liveQuizResultLoading: true,
		profileDataLoading: true,
	},
	isError: false,
	userProfileDataStatus: "",
	liveQuizData: [],
	liveQuizResult: [],
	userProfileData: [],
	downloadMaterial: [],
};

const postResponseDataSlice = createSlice({
	name: "authResponseData",
	initialState,
	reducers: {
		clearUserProfileData: (state) => {
			state.userProfileData = [];
		},
		clearDownloadMaterial: (state) => {
			state.downloadMaterial = [];
		},
	},
	extraReducers(builder) {
		extraReducersForProfileDataThunk(builder);
		extraReducersForPreferredCourseThunk(builder);
		extraReducersForDownloadMaterialThunk(builder);
		extraReducersForPostLiveQuizThunk(builder);
		extraReducersForPostLiveQuizResultThunk(builder);
	},
});

export const postResponseDataReducers = postResponseDataSlice.reducer;
export const postResponseDataActions = postResponseDataSlice.actions;
