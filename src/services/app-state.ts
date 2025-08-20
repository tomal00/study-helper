import { useContext, createContext, type Dispatch, useReducer, useState } from 'react';
import type { AppState, QuestionSet } from '../interfaces';

type CreateQuestionSetAction = {
	type: 'CREATE_SUBSET';
	data: QuestionSet;
};

type Action = CreateQuestionSetAction;

export const AppStateContext = createContext<readonly [AppState, Dispatch<Action>]>([
	{ questionSets: [], labels: new Set() },
	() => null,
]);

export const useAppStateContext = () => useContext(AppStateContext);

const storeState = (state: AppState) => {
	try {
		localStorage.setItem('appState', JSON.stringify(state));
	} catch (e) {
		console.log(state);
		console.error(e);
	}

	return state;
};

export const useAppState = () => {
	const [initialState] = useState<AppState>(() => {
		const storedState = localStorage.getItem('appState');

		if (!storedState) {
			return {
				questionSets: [],
			};
		}

		try {
			return JSON.parse(storedState);
		} catch (e) {
			console.error(e);

			return {
				questionSets: [],
			};
		}
	});

	return useReducer((prevState: AppState, action: Action): AppState => {
		switch (action.type) {
			case 'CREATE_SUBSET':
				return storeState({
					...prevState,
					questionSets: [action.data, ...prevState.questionSets],
				});
		}
	}, initialState);
};
