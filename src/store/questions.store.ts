import { create } from "zustand";
import { type Question } from "../types";
import { persist, devtools } from "zustand/middleware";

import confetti from 'canvas-confetti';

interface State{
    questions: Question[],  

    currentQuestion: number,

    fetchQuestions: ( limit:number ) => Promise<void>,

    selectAnswer: (questionId: number, answerIndex: number)=> void;

    goNextQuestion: () => void;
    goPreviousQuestion: () => void;

    reset: () => void;
}

export const useQuestionStore = create<State>()(devtools(persist((set, get)=>{
    return {
        loading: false, //Se esta usando?
        questions: [],
        currentQuestion: 0,

        fetchQuestions: async (limit:number)=> {
                const res = await fetch('http://localhost:5173/data.json')
                const json = await res.json()

                const questions = json.sort(()=> Math.random() - 0.5).slice(0, limit)
                set({questions}, false, 'fetchQuestions')
        },

        selectAnswer: (questionId: number, answerIndex: number)=> {
            //usar el structuredClone para clonar el objeto
            const { questions } = get();
            const newQuestions = structuredClone( questions );
            //Encontramos el indice de la pregunta
            const questionIndex = newQuestions.findIndex(q => q.id === questionId);
            //obtenemos la informacion de la pregunta
            const questionInfo = newQuestions[ questionIndex ];
            //Averiguamos si el usuario a seleccionado la respuesta correcta
            const isCorrectUserAnswer = questionInfo.correctAnswer === answerIndex;
            if(isCorrectUserAnswer) confetti();
            //Cambiar esta informacion en la copia de la pregunta
            newQuestions[questionIndex] = {
                ...questionInfo,
                isCorrectUserAnswer,
                userSelectedAnswer: answerIndex
            }
            //actualizamos el estado
            set({ questions: newQuestions }, false, 'selectAnswer')
        },

        goNextQuestion: () => {
            const { currentQuestion, questions } = get();
            const nextQuestion = currentQuestion + 1;

            if(nextQuestion < questions.length){
                set({ currentQuestion: nextQuestion }, false, 'goNextQuestion')
            }
        },

        goPreviousQuestion: () => {
            const { currentQuestion, questions } = get();
            const previousQuestion = currentQuestion - 1;

            if(previousQuestion < questions.length){
                set({ currentQuestion: previousQuestion }, false, 'goPreviousQuestion')
            }
        },

        reset: () => {
            set({ currentQuestion: 0, questions: [] }, false, 'reset')
        }
    }
}, {
    name: 'questions'
})))