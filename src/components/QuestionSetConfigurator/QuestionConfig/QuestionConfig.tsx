import { ActionIcon, Group, ScrollArea, Stack, Textarea, TextInput } from '@mantine/core';
import type { Question } from '../../../interfaces';
import { useState } from 'react';
import { v4 } from 'uuid';
import { IconCheck, IconPlus, IconTrash } from '@tabler/icons-react';

type Props = {
	data?: Question;
};

export const QuestionConfig = ({ data }: Props) => {
	const [question, setQuestion] = useState<Question>(() => {
		if (data) {
			return data;
		}

		return {
			id: v4(),
			text: '',
			responses: [],
			labels: new Set(),
			timesSeen: 0,
			timesAnswered: 0,
			timesUnknown: 0,
			correctResponseId: '',
		};
	});

	const [newAnswer, setNewAnswer] = useState('');

	const validate = () => {
		// TODO - validate that there is some text, at least 2 answers (all must have some text) and a correct answer
	};

	// TODO - Labels, Note, Answer stats

	return (
		<Stack gap={'s'}>
			<Textarea
				onChange={(e) => setQuestion((question) => ({ ...question, text: e.target.value }))}
				placeholder='Question text...'
				value={question.text}
				rows={3}
			/>
			<ScrollArea h={134} type='auto' offsetScrollbars scrollbarSize={6}>
				<Stack gap={'xs'} mr={'xs'}>
					<Group gap={'xs'}>
						<TextInput
							value={newAnswer}
							onChange={(e) => setNewAnswer(e.target.value)}
							style={{ flexGrow: 1 }}
							placeholder='New answer...'
						/>
						<ActionIcon
							disabled={!newAnswer}
							onClick={() => {
								setQuestion((question) => ({
									...question,
									responses: [
										...question.responses,
										{
											id: v4(),
											text: newAnswer,
										},
									],
								}));

								setNewAnswer('');
							}}
						>
							<IconPlus height={16} width={16} />
						</ActionIcon>
					</Group>
					{question.responses.map((response) => (
						<Group gap={'xs'} key={response.id}>
							<TextInput
								error={!response.text}
								value={response.text}
								style={{ flexGrow: 1 }}
								onChange={(e) => {
									setQuestion((question) => ({
										...question,
										responses: question.responses.map((r) =>
											r === response
												? {
														...r,
														text: e.target.value,
												  }
												: response
										),
									}));
								}}
							/>
							<ActionIcon
								onClick={() =>
									setQuestion((question) => ({
										...question,
										correctResponseId: response.id,
									}))
								}
								color='green'
								variant={
									response.id === question.correctResponseId
										? 'filled'
										: 'default'
								}
							>
								<IconCheck />
							</ActionIcon>
							<ActionIcon
								onClick={() =>
									setQuestion((question) => ({
										...question,
										responses: question.responses.filter((r) => r !== response),
									}))
								}
								color='red'
							>
								<IconTrash />
							</ActionIcon>
						</Group>
					))}
				</Stack>
			</ScrollArea>
		</Stack>
	);
};
