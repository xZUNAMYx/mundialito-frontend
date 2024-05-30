export interface Question {
    id: number,
    question: string,
    code: string,
    answers: string[],
    correctAnswer: number,
    userSelectedAnswer?: number,
    isCorrectUserAnswer?: boolean,
}

export interface Team {
    id: number,
    name: String,
    points: number,
    players: string[],
}