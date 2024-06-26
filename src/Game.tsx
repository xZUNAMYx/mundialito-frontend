import { Card, IconButton, List, ListItem, ListItemButton, ListItemText, Stack, Typography } from "@mui/material";
import { useQuestionStore } from "./stores/questions.store";
import { type Question as QuestionType} from './types';
import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";
import { Footer } from "./Footer";
// import { useEffect } from "react";

//si esta fuera del componente se crea una sola vez la funcion en vez de cada vez por componente
const getBackGroundColor = (info: QuestionType, index: number) => {
    const { userSelectedAnswer, correctAnswer } = info;
    //Usuario no ha seleccionado nada
    if(userSelectedAnswer == null) return 'transparent';
    //Si ya selecciono pero es incorrecta
    if(index !== correctAnswer && index !== userSelectedAnswer) return 'transparent';
    //Si esta es la solucion correcta
    if(index === correctAnswer ) return '#2D9BD8';
    //Si esta es la seleccion del usuario pero no es correcta
    if(index === userSelectedAnswer) return 'red';



    if(index === userSelectedAnswer && userSelectedAnswer !== correctAnswer) return 'red';
    //sino es ninguna de las anteriores

    return 'transparent';
}

// useEffect(() => {
//     // @ts-ignore
//     getBackGroundColor(info);
//     // console.log({ getBackGroundColor(info);})
// }, []);

const Question = ({ info } : { info: QuestionType }) => {
    const selectAnswer = useQuestionStore(state => state.selectAnswer);
    const imagenPregunta = info.code.toString();
    console.log(imagenPregunta.toString());

    const createHandleClick = (answerIndex: number) => () =>{
        selectAnswer(info.id, answerIndex);
        // @ts-ignore
        getBackGroundColor(info)
    }

    return (
        <Card variant="outlined" sx={{bgcolor:'white', p: 1, textAlign: 'center'}}>
            <Typography variant="h5" sx={{textAlign: 'center', fontWeight: 'bold'}}>
                { info.question}
            </Typography>
            <hr />
            
            <img src={ imagenPregunta } alt="" />
            {/* {imagenPregunta} */}
            
            <List sx={{ bgcolor: 'white' }} disablePadding >
            <hr />
                { info.answers.map(( answer, index) =>(
                    <ListItem key={ index } disablePadding divider sx={{ backgroundColor: 'white'}}>
                        <ListItemButton 
                            sx={{ backgroundColor: getBackGroundColor(info, index) }}
                            disabled={info.userSelectedAnswer != null} //al desactivar el boton
                            onClick={ createHandleClick(index) }
                        >
                            <ListItemText primary={ answer } sx={{ textAlign: 'center' }} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Card>
    )
}

export const Game = () => {
    const questions = useQuestionStore( state => state.questions);
    const currentQuestion = useQuestionStore( state => state.currentQuestion);

    const goNextQuestion = useQuestionStore( state => state.goNextQuestion);
    const goPreviousQuestion = useQuestionStore( state => state.goPreviousQuestion);

    const questionInfo = questions[currentQuestion];

    return (
        <>
            <Stack direction='row' gap={10} alignItems='center' justifyContent='center'>
                <IconButton onClick={goPreviousQuestion} disabled={currentQuestion === 0} sx={{color: 'white'}}>
                    <ArrowBackIosNew />
                </IconButton>
                <IconButton onClick={goNextQuestion} disabled={currentQuestion >= questions.length - 1} sx={{color: 'white'}}>
                    <ArrowForwardIos />
                </IconButton>
            </Stack>

            <Question info={ questionInfo } />

            <Footer />
        </>
    )
}
