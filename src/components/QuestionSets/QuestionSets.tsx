import { Button, Center, Pagination, Stack } from '@mantine/core';
import { useNavigate } from 'react-router';
import { useAppStateContext } from '../../services';
import { IconPlus } from '@tabler/icons-react';

export const QuestionSets = () => {
	const [appState] = useAppStateContext();
	const navigate = useNavigate();

	return (
		<Center h={'100%'}>
			<Stack gap={'lg'} align='center'>
				<Stack w='256px'>
					<Button variant='default' onClick={() => navigate('/new')}>
						<IconPlus width={16} height={16} />
						Create new
					</Button>
					<Button variant='default'>
						TODO - add option to import APP state via dropzone
					</Button>
					{appState.questionSets.map((set) => (
						<Button>{set.name}</Button>
					))}
				</Stack>
				<Pagination total={10} m={'auto'}></Pagination>
			</Stack>
		</Center>
	);
};
