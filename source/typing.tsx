import { useState } from "react";
import {Text} from 'ink';
import {generateWords} from './words.js';

export default function Typing({duration}: {duration: number}) {
    const [target] = useState(() =>
        generateWords(duration === 1 ? 80 : 400).join(' ')
    );
    return <Text>{target}</Text>;
}