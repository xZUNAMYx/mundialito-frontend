import { Button } from "@mui/material"
import { useQuestionStore } from "./stores/questions.store"
import Swal from "sweetalert2";

const LIMIT_QUESTIONS = 10;

export const Start = () => {
    const fetchQuestions = useQuestionStore( state=> state.fetchQuestions );

    const handleClick = ()=> {
        fetchQuestions( LIMIT_QUESTIONS );
        Swal.fire({
            title: 'Bienvenido al mundialito.',
            text: `Por favor espera unos segundos mientras ingresan tus compañeros`,
            showConfirmButton: true,
            timer: 10000
        })
    }

    return (
        <Button onClick={ handleClick } variant="contained" >
            {/* Para hacer el feth de las preguntas */}
            ¡Empezar!
        </Button>
    )
}
