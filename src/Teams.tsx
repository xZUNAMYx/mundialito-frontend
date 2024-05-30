import { Button, Card, List, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material";
import { useChampionShipStore } from "./stores/teams.tore";
import {type Team as TeamType} from './types';
import { useEffect } from "react";

const Team = ({ info } : { info: TeamType }) => { //TODO: de tipo Team
    const selectTeam = useChampionShipStore(state => state.selectTeam);

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
        fetchTeams();
    }, []);

    // const teamInfo = teams[]

    return (
        <>
            <h3>Puntuación de {teamInfo1.name}: {teamInfo1.points}</h3> 
            <h3>Puntuación de {teamInfo2.name}: {teamInfo2.points}</h3> 
            <hr /> 
            <Team info={ teamInfo1 } />
            
            <hr/>
            <Team info={ teamInfo2 } />
        </>
    )
}
