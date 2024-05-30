import { Button } from "@mui/material"
import { useQuestionData } from "./hooks/useQuestionData"
import { useQuestionStore } from "./stores/questions.store"

export const Footer = () => {
    const { correct, incorrect, unanswered } = useQuestionData()
    const reset = useQuestionStore( state => state.reset);

    return (
        <footer style={{ marginTop: '7px' }}>
            <strong>{`Correctas: ${correct} - Incorrectas: ${incorrect} - Sin contestar: ${unanswered}`}</strong>
            <div style={{ marginTop: '5px'}}>
                <Button onClick={() => reset()}>
                    Reiniciar juego.
                </Button>
            </div>
        </footer>
    )
}