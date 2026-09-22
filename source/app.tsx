import {useState} from 'react';
import {Box, Text, useInput} from 'ink';
import Typing from './typing.js';

type Screen = 'menu' | 'typing' | 'results';
type Duration = 1 | 5;

export default function App() {
	const [screen, setScreen] = useState<Screen>('menu');
	const [selectedDuration, setSelectedDuration] = useState<Duration>(1);

	useInput((input, key) => {

		if (screen !== 'menu') {
			return;
		}

		if (key.upArrow || key.downArrow) {
			setSelectedDuration(prev => (prev === 1 ? 5 : 1));
		}

		if (key.return) {
			setScreen('typing');
		}

		if (input === 'q') {
			process.exit(0);
		}
	});

	if (screen === 'typing') {
		return <Typing duration={selectedDuration} onBack={() => setScreen('menu')} />;
	}

	return (
		<Box
			flexDirection='column'
			alignItems='center'
			justifyContent='center'
			paddingX={2}
		>
			<Text bold color='green'>
				{' '}
				Typing TUI
			</Text>
			<Text dimColor>Teste sua velocidade de digitação no terminal</Text>

			<Box flexDirection='column' marginTop={2}>
				<Text
					bold={selectedDuration === 1}
					color={selectedDuration === 1 ? 'cyan' : 'white'}
				>
					{selectedDuration === 1 ? '> ' : ' '}1 minuto
				</Text>
				<Text
					bold={selectedDuration === 5}
					color={selectedDuration === 5 ? 'cyan' : 'white'}
				>
					{selectedDuration === 5 ? '> ' : ' '}5 minutos
				</Text>
			</Box>

			<Box marginTop={2}>
				<Text dimColor>[↑↓] Mudar modo [Enter] Iniciar [q] Sair</Text>
			</Box>
		</Box>
	);
}
