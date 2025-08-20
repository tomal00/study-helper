import { useMemo } from 'react';
import { AppStateContext, useAppState } from '../../services';

type Props = React.PropsWithChildren;

export const AppStateProvider = ({ children }: Props) => {
	const [appState, dispatch] = useAppState();
	const value = useMemo(() => [appState, dispatch] as const, [appState, dispatch]);

	return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
};
