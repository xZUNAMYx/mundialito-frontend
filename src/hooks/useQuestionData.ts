import { useQuestionStore } from "../store/questions.store";

export const useQuestionData = () => {
    const questions = useQuestionStore( state => state.questions);

    let correct = 0;
    let incorrect = 0;
    let unanswered = 0;

    questions.forEach(question => {
        const {userSelectedAnswer, correctAnswer } = question;
        if( userSelectedAnswer === correctAnswer) correct++;
        else if( userSelectedAnswer !== correctAnswer && userSelectedAnswer != null) incorrect++;
        else unanswered++;
    });

    return { correct, incorrect, unanswered }
}