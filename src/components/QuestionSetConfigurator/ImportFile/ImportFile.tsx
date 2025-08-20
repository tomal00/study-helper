import { Button, Center, Stack, Text } from '@mantine/core';
import { Dropzone } from '@mantine/dropzone';
import sampleSetUrl from '/sample-question-set.json?url';
import { v4 as uuidv4 } from 'uuid';
import type { QuestionSet } from '../../../interfaces';

type Props = {
	setQuestionSet: (questionSet: QuestionSet) => void;
};

export const ImportFile = ({ setQuestionSet }: Props) => {
	return (
		<Center h='100%'>
			<Stack gap='l' justify='center' maw='80%'>
				<Dropzone
					onDrop={(files) => {
						const file = files[0];

						file.text()
							.then((text) => JSON.parse(text))
							.then((data) => {
								if (
									Array.isArray(data) &&
									data.every(
										(item) =>
											'text' in item &&
											'answers' in item &&
											'correct' in item &&
											Array.isArray(item.answers) &&
											item.answers.every(
												(answer: unknown) => typeof answer === 'string'
											)
									)
								) {
									const d = data as Array<{
										text: string;
										answers: string[];
										correct: string;
									}>;

									setQuestionSet({
										id: uuidv4(),
										name: '',
										subsets: [],
										questions: d.map((question) => {
											const responses = question.answers.map((answer) => ({
												id: uuidv4(),
												text: answer,
											}));

											return {
												id: uuidv4(),
												text: question.text,
												responses,
												correctResponseId: responses.find(
													({ text }) => text === question.correct
												)?.id as string,
												labels: new Set(),
												timesSeen: 0,
												timesAnswered: 0,
												timesUnknown: 0,
											};
										}),
									});
								} else {
									window.alert(
										'Incorrect JSON structure. See the sample file for reference'
									);
								}
							});
					}}
					maxSize={10 * 1024 ** 2}
					accept={['application/json']}
				>
					<Text size='l' inline style={{ pointerEvents: 'none' }} p={12}>
						Drag a new question set in JSON format here
					</Text>
				</Dropzone>
				<Button
					onClick={() => {
						const link = document.createElement('a');
						link.href = sampleSetUrl;
						link.download = 'sample-question-set.json';
						link.click();
					}}
				>
					Download example question set
				</Button>
			</Stack>
		</Center>
	);
};
