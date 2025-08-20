import {
	ActionIcon,
	Button,
	Center,
	Group,
	ScrollArea,
	Stack,
	Text,
	TextInput,
} from '@mantine/core';
import { useState } from 'react';
import { ImportFile } from './ImportFile';
import type { QuestionSet } from '../../interfaces';
import { IconAdjustments, IconPlus, IconTrash } from '@tabler/icons-react';
import { modals } from '@mantine/modals';
import { QuestionConfig } from './QuestionConfig';

export const QuestionSetConfigurator = () => {
	const [questionSet, _setQuestionSet] = useState<QuestionSet>();
	const setQuestionSet = _setQuestionSet as React.Dispatch<React.SetStateAction<QuestionSet>>;

	if (!questionSet) {
		return <ImportFile setQuestionSet={setQuestionSet} />;
	}

	return (
		<Center h='100%'>
			<Stack gap={'l'}>
				<TextInput
					value={questionSet.name}
					onChange={(e) => setQuestionSet((set) => ({ ...set, name: e.target.value }))}
					placeholder='Enter question set name here'
					w='auto'
				/>
				<Group gap={'md'}>
					<Stack gap={'sm'}>
						<Button
							onClick={() => {
								modals.open({
									title: 'Configure Question',
									closeOnClickOutside: false,
									centered: true,
									children: <QuestionConfig />,
								});
							}}
						>
							<IconPlus width={16} height={16} />
							Create question
						</Button>
						<ScrollArea h={512} w={256} type='auto'>
							<Stack gap={'xs'}>
								{questionSet.questions.map((question, i) => (
									<Group
										key={question.id}
										align='center'
										gap={'xs'}
										wrap='nowrap'
									>
										<Text>{i + 1}.</Text>
										<Text truncate='end' mr={'auto'}>
											{question.text}
										</Text>
										<ActionIcon>
											<IconAdjustments width={16} height={16} />
										</ActionIcon>
										<ActionIcon
											color='red'
											onClick={() => {
												modals.openConfirmModal({
													title: `Delete question no. ${i + 1}?`,
													labels: {
														confirm: 'Yes',
														cancel: 'No',
													},
													onConfirm: () =>
														setQuestionSet((set) => ({
															...set,
															questions: set.questions.filter(
																(q) => q !== question
															),
														})),
												});
											}}
										>
											<IconTrash width={16} height={16} />
										</ActionIcon>
									</Group>
								))}
							</Stack>
						</ScrollArea>
					</Stack>
					<Stack gap={'sm'}>
						<Button>
							<IconPlus width={16} height={16} /> Create Subset
						</Button>
						<ScrollArea h={512} w={256} type='auto'>
							:D
						</ScrollArea>
					</Stack>
				</Group>
			</Stack>
		</Center>
	);
};
