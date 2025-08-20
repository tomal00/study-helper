export interface Response {
	id: string;
	text: string;
}

export interface Question {
	id: string;
	text: string;
	responses: Response[];
	correctResponseId: Response['id'];
	note?: string;
	labels: Set<string>;
	timesSeen: number;
	timesAnswered: number;
	timesUnknown: number;
}

export interface QuestionSet {
	id: string;
	name: string;
	questions: Question[];
	subsets: Subset[];
}

export interface Subset {
	id: string;
	name: string;
	start?: number;
	end?: number;
	labels?: Set<string>;
}

export interface AppState {
	questionSets: QuestionSet[];
	labels: Set<string>;
}
