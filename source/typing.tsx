import { useState } from "react";
import {Text, Box, useInput} from 'ink';
import {generateWords} from './words.js';

type TypingProps = {
    duration: number;
    onBack: () => void;
};

export default function Typing({duration, onBack}: TypingProps) {
    const [words] = useState(() => generateWords(duration === 1 ? 80 : 400));
    const [wordIndex, setWordIndex] = useState(0);
    const [input, setInput] = useState('');

    useInput((ch, key) => {
        if(key.escape) {
            onBack();
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
        <Box flexDirection="column" padding={1}>
            <Box marginBottom={1}>
                <Text dimColor>[ESC] Voltar ao Menu</Text>
            </Box>

            <Box>
                {renderCurrentWord(currentWord, input)}

                <Text dimColor>{' ' + nextWords}</Text>
            </Box>
        </Box>
    )
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