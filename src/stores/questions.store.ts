import { create } from "zustand";
import { type Question } from "../types";
import { persist, devtools } from "zustand/middleware";

import confetti from 'canvas-confetti';
import { calendarApi } from "../../api";

interface State{
    questions: Question[],  
    teams: [],
    onTorneo: Boolean,
    currentQuestion: number,

    fetchQuestions: ( limit:number ) => Promise<void>,

    // fetchTeams: (limit: number) => Promise<void>,

    selectAnswer: (questionId: number, answerIndex: number)=> void;

    // selectTeam: (playerName: String) => void;

    goNextQuestion: () => void;
    goPreviousQuestion: () => void;

    reset: () => void;
}

export const useQuestionStore = create<State>()(devtools(persist((set, get)=>{
    //TODO: intentando cargar preguntas desde el backend

    return {
        loading: false, //Se esta usando?
        questions: [],
        teams: [],
        onTorneo: false,
        currentQuestion: 0,

        // @ts-ignore
        fetchQuestions: async (limit:number)=> {
            // TODO: Montar estas preguntas desde el backend sino solo podemos hacerlo cuando iniciamos el localhost
            // //TODO: obteniendo preguntas del backend
            const {data} = await calendarApi.get('questions'); //Este es como temrina el endpoint
            const {questions} = data;
            const questionsBackend = questions;
            set({questions: questionsBackend}, false, 'fetchQuestions')
        },

        // fetchTeams: async (limit:number)=> {
        //     //TODO: obteniendo preguntas del backend
        //     const {data} = await calendarApi.get('teams'); //Este es como temrina el endpoint
        //     const {teams} = data;
        //     const teamsBackend = teams;
        //     set({teams: teamsBackend, onTorneo: true}, false, 'fetchTeams')
        //     console.log({teams});
        // },

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
            };
            console.log({newQuestions});
            // questions[questionIndex] = {
            //     ...questionInfo,
            //     isCorrectUserAnswer,
            //     userSelectedAnswer: answerIndex
            // }
            //actualizamos el estado
            set({ questions: newQuestions }, false, 'selectAnswer')
        },

        // selectTeam:(playerName: String) => {
        //     //usar el structuredClone para clonar el objeto
        //     const { teams } = get();
        //     const newTeams = structuredClone( teams );
        //     //Encontramos el indice de la pregunta
           
        //     newQuestions[questionIndex] = {
        //         ...questionInfo,
        //         isCorrectUserAnswer,
        //         userSelectedAnswer: answerIndex
        //     };
        //     console.log({newQuestions});
        //     // questions[questionIndex] = {
        //     //     ...questionInfo,
        //     //     isCorrectUserAnswer,
        //     //     userSelectedAnswer: answerIndex
        //     // }
        //     //actualizamos el estado
        //     set({ teams: newQuestions }, false, 'selectAnswer')
        // },

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