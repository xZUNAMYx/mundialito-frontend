import { Card, List, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material";
import { useChampionShipStore } from "./stores/teams.tore";
import {type Team as TeamType} from './types';
import { useEffect } from "react";
import banderaBrasil from '../src/assets/banderabrasil.png';
import banderaArgentina from '../src/assets/bandera argentina.png';

const Team = ({ info } : { info: TeamType }) => { //TODO: de tipo Team
    const selectTeam = useChampionShipStore(state => state.selectTeam);

    // @ts-ignore
    const createHandleClick = () => () =>{ 
        selectTeam(info.id);
    }

    return (
        <>
            {/* <h4>Puntuación de {info.name}: {info.points}</h4>  */}
            <Card variant="outlined" sx={{bgcolor:'white', p: 1, textAlign: 'left'}}>
            <Typography variant="h5" sx={{textAlign: 'center', fontWeight: 'bold'}}>
                <p>Miembros del equipo de {info.name}</p>
            </Typography>

            <List sx={{ bgcolor: 'white' }} disablePadding >
                { info.players.map(( player, index) =>(
                    <ListItem key={ index } disablePadding divider sx={{ backgroundColor: 'white'}}>
                        <ListItemButton 
                            // disabled={info.userSelectedAnswer != null} //al desactivar el boton
                            // onClick={ () => {} }
                            // sx={{ backgroundColor: 'red' }}
                        >
                            <ListItemText primary={ player } sx={{ textAlign: 'center' }} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List> 
            </Card>
        </>      
    )
}

export const Teams = () => {
    const teams = useChampionShipStore( state => state.teams);
    const fetchTeams = useChampionShipStore(state => state.fetchTeams);
    
    // fetchTeams();
    console.log('render');

    const teamInfo1 = teams[0];
    const teamInfo2 = teams[1];

    useEffect(() => {
        // @ts-ignore
        fetchTeams();
    }, []);

    // const teamInfo = teams[]

    return (
        <>
            <Card style={{textAlign: 'center', marginTop: '20px'}}>
                <h3>Goles de {teamInfo1.name}: {teamInfo1.points}</h3>
                <img src={ banderaBrasil } width={100} alt="" />
            </Card> 
                <h2>VS</h2>
            <Card style={{textAlign: 'center', marginBottom: '50px'}}>
                <h3>Goles de {teamInfo2.name}: {teamInfo2.points}</h3> 
                <img src={ banderaArgentina } width={100} alt="" />
            </Card>
            
            <hr /> 
            <Team info={ teamInfo1 } />
            
            <hr/>
            <Team info={ teamInfo2 } />
        </>
    )
}
