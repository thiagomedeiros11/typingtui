import { useState, useEffect } from "react";
import {Text, Box, useInput} from 'ink';
import {generateWords} from './words.js';

type TypingProps = {
    duration: number;
    onBack: () => void;
    onFinish: () => void;
};

export default function Typing({duration, onBack, onFinish}: TypingProps) {
    const [words] = useState(() => generateWords(duration === 1 ? 80 : 400));
    const [wordIndex, setWordIndex] = useState(0);
    const [input, setInput] = useState('');
    const [timeLeft, setTimeLeft] = useState(duration * 60);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev < 1) {
                    clearInterval(timer);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    useInput((ch, key) => {
        if(key.escape) {
            onBack();
            return;
        }
        if (timeLeft <= 0 ) {
            if (key.return) {
                onFinish();
            }
            return;
        }

        if (key.return) return;
        if (key.backspace) return setInput(prev => prev.slice(0, -1));
        if (ch === ' ') {
            if (input === '') return;
            setWordIndex(prev => prev + 1);
            return setInput('');
        }
        setInput(prev => prev + ch);
    });

    const currentWord = words[wordIndex] ?? '';
    const nextWords = words.slice(wordIndex + 1, wordIndex + 10).join(' ');

    return (
        <Box flexDirection="column" 
             padding={1}
        >
            <Box 
                justifyContent="space-between" 
                alignItems="center" 
                marginBottom={1}
            >
                <Text dimColor>[ESC] Voltar ao Menu</Text>

                <Box 
                    borderStyle="round" 
                    borderColor={timeLeft < 10 ? 'red' : 'yellow'} 
                    paddingX={1}
                    >
                <Text 
                    bold color={timeLeft < 10 ? 'red' : 'yellow'}
                >
                    Tempo: {formatTime(timeLeft)}
                </Text>

                </Box>
            </Box>

            <Box
                borderStyle="round"
                borderColor="cyan"
                paddingX={2}
                paddingY={1}
                flexDirection="row"
            >
                {renderCurrentWord(currentWord, input)}
                <Text dimColor>{' ' + nextWords}</Text>
            </Box>

            {timeLeft <= 0 && (
                <Box
                    marginTop={1}
                    flexDirection="column"
                >
                    <Text color="red" bold>
                        Tempo esgotado!
                    </Text>
                    <Text dimColor>
                        Pressione [Enter] para continuar ou [ESC] para o menu
                    </Text>
                </Box>
            )}
        </Box>
    )
}

function formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2,'0')}`;
}

function renderCurrentWord(targetWord: string, currentInput: string){
    const letters = [];
    const maxLength = Math.max(targetWord.length, currentInput.length);

    for (let i = 0; i < maxLength; i++){
        const targetChar = targetWord[i];
        const inputChar = currentInput[i];

        if(inputChar === undefined){
            letters.push(
                <Text key={i} dimColor>
                    {targetChar}
                </Text>
            );
        } else if (inputChar === targetChar) {
            letters.push(
                <Text key={i} color="green">
                    {targetChar}
                </Text>
            );
        } else {
            letters.push(
                <Text key={i} color="red" underline>
                    {inputChar || targetChar}
                </Text>
            );
        }
    }
    
    return <Text>{letters}</Text>;
}