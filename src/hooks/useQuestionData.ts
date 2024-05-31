import { useQuestionStore } from "../stores/questions.store";
import { useChampionShipStore } from "../stores/teams.tore";
import Swal from "sweetalert2";

export const useQuestionData = () => {
    const questions = useQuestionStore( state => state.questions);
    const equipo = useChampionShipStore( state => state.nombreEquipo);
    const resetQuestion = useQuestionStore( state => state.reset);
    const resetTeam = useChampionShipStore( state => state.resetTeams);
    // const onPonints = useChampionShipStore( state => state.onPoints);
    const onPonintsBrasil = useChampionShipStore( state => state.onPointsBrasil);
    const onPonintsArgentina = useChampionShipStore( state => state.onPointsArgentina);
    // const [pointsBrasil, setpuntosBrasil] = useState();

    let correct = 0;
    let incorrect = 0;
    let unanswered = 0;
    let puntosBrasil = 0;
    let puntosArgentina = 0;
    let itemsProcessed = 0;

    questions.forEach(question => {
        const {userSelectedAnswer, correctAnswer } = question;
        itemsProcessed++;
        if( userSelectedAnswer === correctAnswer) {
            correct++;
            if (equipo === 0){
                puntosBrasil++
                if(itemsProcessed === questions.length){
                    onPonintsBrasil(puntosBrasil); 
                    resetQuestion();
                    resetTeam();
                    Swal.fire({
                        title: 'Gracias por participar en el mundialito.',
                        text: `Por favor espera un momento que todos terminen. 
                        Tus puntos correctos: ${ puntosBrasil }`,
                        showConfirmButton: true,
                        // timer: 10000
                    })
                }
            }else if (equipo === 1){
                puntosArgentina++
                if(itemsProcessed === questions.length){
                    onPonintsArgentina(puntosArgentina); 
                    resetQuestion();
                    resetTeam();
                    Swal.fire({
                        title: 'Gracias por participar en el mundialito.',
                        text: `Por favor espera un momento mientras tus compañeros terminan. 
                        Tus puntos correctos: ${ puntosArgentina }`,
                        showConfirmButton: true,
                        // timer: 10000
                    })
                }
            }
        }
        else if( userSelectedAnswer !== correctAnswer && userSelectedAnswer != null) {
            incorrect++
        }
        else {
            unanswered++
        };
    });

    return { correct, incorrect, unanswered }
}