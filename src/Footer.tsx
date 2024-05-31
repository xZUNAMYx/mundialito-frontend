import { Button } from "@mui/material"
import { useQuestionData } from "./hooks/useQuestionData"
import { useQuestionStore } from "./stores/questions.store"
import { useChampionShipStore } from "./stores/teams.tore"

export const Footer = () => {
    const { correct, incorrect, unanswered } = useQuestionData()
    const reset = useQuestionStore( state => state.reset);
    const resetTeam = useChampionShipStore( state => state.resetTeams)
    const resetTotal = () => {
        reset();
        resetTeam();
    }

    return (
        <footer style={{ marginTop: '7px' }}>
            <strong>{`Correctas: ${correct} - Incorrectas: ${incorrect} - Sin contestar: ${unanswered}`}</strong>
            <div style={{ marginTop: '5px'}}>
                <Button onClick={() => resetTotal() }>
                    Reiniciar juego.
                </Button>
            </div>
        </footer>
    )
}