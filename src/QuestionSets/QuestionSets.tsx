import { Button, Pagination, Stack } from '@mantine/core';

export const QuestionSets = () => {
	const sets = [...new Array(5)].map((_, i) => ({
		title: `Question set ${i}`,
		id: i,
		config: {},
	}));

	return (
		<Stack gap={'lg'} align='center'>
			<Stack w='256px'>
				<Button variant='default'>Create new</Button>
				{sets.map((set) => (
					<Button>{set.title}</Button>
				))}
			</Stack>
			<Pagination total={10} m={'auto'}></Pagination>
		</Stack>
	);
};
