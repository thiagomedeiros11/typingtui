export type TestResult = {
    correctWords: number;
    wrongWords: number;
    wpm: number;
    accuracy: number;
};

export function calculateStats(correctWords: number, wrongWords: number, durationMinutes: number): TestResult {
    const total = correctWords + wrongWords;
    const wpm = Math.round(correctWords / durationMinutes);
    const accuracy = total > 0 ? Math.round((correctWords / total) * 100) : 0;

    return {
        correctWords,
        wrongWords,
        wpm,
        accuracy,
    };
}