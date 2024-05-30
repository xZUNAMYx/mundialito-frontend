import { Button } from "@mui/material"
import { useQuestionStore } from "./stores/questions.store"

const LIMIT_QUESTIONS = 10;

export const Start = () => {
    const fetchQuestions = useQuestionStore( state=> state.fetchQuestions );

    const handleClick = ()=> {
        fetchQuestions( LIMIT_QUESTIONS );
    }

    return (
        <Button onClick={ handleClick } variant="contained" >
            {/* Para hacer el feth de las preguntas */}
            ¡Empezar!
        </Button>
    )
}
