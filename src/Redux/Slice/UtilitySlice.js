import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isNavBarExpanded: false,
	isPasswordChanged: false,
	preferredCourseDetails: [],
	activeSubscriptionTab: 1,
	highlightIndex: 0,
	courseSelectedFromModal: "",
	message: "",
	isOtpSent: "",
	alreadyRegisteredMessage: "",
	isAuthenticated: "",
	isChapterVisible: true,
	isAutoScrollEnabled: false,
	clinetLocation: { lat: "", lon: "" },
	isLiveQuiz: false,
	isInsChecked: false,
	sortedQuiz: [],
	isRedirectedOnce: false,
};

const utilitySlice = createSlice({
	name: "utilitySlice",
	initialState,
	reducers: {
		toggleIsInsChecked: (state) => {
			state.isInsChecked = !state.isInsChecked;
		},
		setIsRedirectedOnceFalse: (state) => {
			state.isRedirectedOnce = false;
		},
		setIsRedirectedOncetrue: (state) => {
			state.isRedirectedOnce = true;
		},
		setSortedQuiz: (state, { payload }) => {
			state.sortedQuiz = payload;
		},
		setQuizIsLive: (state) => {
			state.isLiveQuiz = true;
		},
		setQuizIsNotLive: (state) => {
			state.isLiveQuiz = false;
		},
		setClientLocation: (state, { payload }) => {
			state.clinetLocation = payload;
		},
		setAutoScroll: (state, { payload }) => {
			state.isAutoScrollEnabled = payload;
		},
		toggleChaptersVisibility: (state) => {
			state.isChapterVisible = !state.isChapterVisible;
		},
		toggleNavExpansion: (state) => {
			state.isNavBarExpanded = !state.isNavBarExpanded;
		},
		passwordIsChanged: (state) => {
			state.isPasswordChanged = true;
		},
		setMessage: (state, { payload }) => {
			state.message = payload;
		},
		optIsSent: (state) => {
			state.isOtpSent = true;
		},
		optIsNotSent: (state) => {
			state.isOtpSent = false;
		},
		setPreferredCourseDetails: (state, { payload }) => {
			state.preferredCourseDetails = payload;
		},
		setActiveSubscriptionTab: (state, { payload }) => {
			state.activeSubscriptionTab = payload;
		},
		setCourseSelectedFromModal: (state, { payload }) => {
			state.courseSelectedFromModal = payload;
		},
		setHighlightIndex: (state, { payload }) => {
			state.highlightIndex = payload;
		},
		setAlreadyRegisteredMessage: (state, { payload }) => {
			state.alreadyRegisteredMessage = payload;
		},
		setIsAuthenticated: (state, { payload }) => {
			state.isAuthenticated = payload;
		},
	},
});

export const utilitySliceReducers = utilitySlice.reducer;
export const utilitySliceActions = utilitySlice.actions;
