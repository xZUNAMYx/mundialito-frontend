import { Container, Stack } from '@mui/material'

import './App.css'
import { Start } from './Start';
import { useQuestionStore } from './stores/questions.store';
import { Game } from './Game';
import { StartChampionship } from './StartChampionship';
import { Teams } from './Teams';
import { useChampionShipStore } from './stores/teams.tore';

function App() {
  const questions = useQuestionStore(state => state.questions);
  const torneo = useChampionShipStore(state => state.onTorneo);

  console.log(questions);

  // const { getQuestionStore} = useQuestionBackend();
  // const {questions} = getQuestionStore()

  return (
    <main>
      <Container maxWidth='sm'>

        <Stack direction='row' gap={1} alignItems='center' justifyContent='center'>

          {/* TODO: Colocar aqui el logo del mundiatito */}
          <img src="./src/assets/recortado logo mundialito.jpeg" alt="" width={'200px'} />
          {/* <Typography variant='h5' component='h4'>
            <h1 >Mundialito Quizz</h1>
          </Typography> */}

        </Stack>

        {torneo === false && <StartChampionship />}
        {torneo === true && <Teams />}

        {questions.length === 0 && <Start />}
        {questions.length > 0 && <Game />}

      
      </Container>

    </main>
  )
}

export default App
