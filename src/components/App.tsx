import { BrowserRouter, Routes, Route } from 'react-router';
import { QuestionSets } from './QuestionSets';
import { QuestionSetConfigurator } from './QuestionSetConfigurator';
import { AppStateProvider } from './AppStateProvider';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route
					index
					element={
						<AppStateProvider>
							<QuestionSets />
						</AppStateProvider>
					}
				/>
				<Route
					path='/new'
					element={
						<AppStateProvider>
							<QuestionSetConfigurator />
						</AppStateProvider>
					}
				/>
				<Route path='*' element={<div>TODO - no match</div>} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
