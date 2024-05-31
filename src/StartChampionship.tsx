import { Button, TextField } from "@mui/material";
import { useChampionShipStore } from "./stores/teams.tore";
import { useState } from 'react';

const LIMIT_TEAMS = 2;



export const StartChampionship = () => {
    const fetchTeams = useChampionShipStore( state=> state.fetchTeams );
    const fetchPlayersBrasil = useChampionShipStore( state=> state.fetchPlayersBrasil );
    const fetchPlayersArgentina = useChampionShipStore( state=> state.fetchPlayersArgentina );
    const [inputValue, setInputValue] = useState('');

    //TODO: amuntando puntos en backend
    const fetchMirar = useChampionShipStore( state => state.fetchMirar);
    // const onPonints = useChampionShipStore( state => state.onPoints);
    // const onPonintsBrasil = useChampionShipStore( state => state.onPointsBrasil);
    // const onPonintsArgentina = useChampionShipStore( state => state.onPointsArgentina);

    
    // const teams = useChampionShipStore( state=> state.teams ); 
    // const nombreEquipo = useChampionShipStore( state=> state.nombreEquipo ); 

    const handleInputChange = (event: any) => {
        setInputValue(event.target.value);
      };

    const handleClickBrasil = ()=> {
        fetchPlayersBrasil(inputValue);
        fetchTeams( LIMIT_TEAMS );
        // onPonints();
        // onPonintsBrasil
        
    }

    const handleClickArgentina = ()=> {
        fetchPlayersArgentina(inputValue);
        fetchTeams( LIMIT_TEAMS );
        // onPonintsArgentina
    } 

    const handleCliclMirar = () =>{ 
        fetchTeams( LIMIT_TEAMS );
        fetchMirar();
    }

    return (
        <> 
      
            <h4> Ingresa tu nombre y despues selecciona tu equipo</h4>

            <TextField
                id="Nombre"
                type="text"
                label="Ingresa tu nombre"
                color="primary"
                placeholder="Ingresa tu nombre"
                value={inputValue}
                onChange={handleInputChange}
                // value={}
                style={{ width: '180px', margin: '10px', backgroundColor: 'white' }}
             />
            

            <hr />

            <Button onClick={ handleClickBrasil } variant="contained" style={{margin: "10px"}} >
                ¡Brasil!
            </Button>

            <Button onClick={ handleClickArgentina } variant="contained" >
                ¡Argentina!
            </Button>

            <Button onClick={ handleCliclMirar } variant="contained" style={{margin: "10px"}} >
                ¡Mirar!
            </Button>
            {/* {nombreEquipo === 0 || 1 && <h4>Puntuación de  {teams[0].points}</h4> } */}
            {/* <h4>Puntuación de {teams[0].name}: {teams[0].points}</h4> 
            <h4>Puntuación de {teams[1].name}: {teams[1].points}</h4>  */}
        </>
    )
}
