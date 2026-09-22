import test from 'ava';
import {words, generateWords} from './words.js';

test('return exactly the requested count', t => {
    t.is(generateWords(80).length, 80);
    t.is(generateWords(0).length, 0);
    t.is(generateWords(-1).length, 0);
})

test('every generated word belongs to the word list', t => {
    const set = new Set(words);
    for(const word of generateWords(500)) {
        t.true(set.has(word));
    };
});

test('word list contains no duplicates', t => {
    t.is(new Set(words).size, words.length);
});
