// onAddNewEvent: ( state, { payload })=>{
//     state.events.push( payload );
//     state.activeEvent = null;
// },

// import { type Question } from "../types";
import { create } from "zustand";
import { type Team } from "../types";
import { persist, devtools } from "zustand/middleware";

import { calendarApi } from "../../api";

interface State{
    teams: Team[],
    playersBrasil: any[],
    playersArgentina: any[],
    nombreEquipo: number,
    onTorneo: Boolean,

    fetchTeams: (limit: number) => Promise<void>,
    fetchPlayersBrasil: (player: String) => Promise<void>,
    fetchPlayersArgentina: (player: String) => Promise<void>,
    fetchMirar: () => Promise<void>,

    selectTeam: (teamId: number) => void;

    resetChampionship: () => void;
    resetTeams: () => void;

    // onPoints: () => void;
    onPointsBrasil:(puntosBrasil: number) => void;
    onPointsArgentina:(puntosArgentina: number) => void;
}

// @ts-ignore
export const useChampionShipStore = create<State>()(devtools(persist((set, get)=>{
    //TODO: intentando cargar torneo desde el backend

    return {
        loading: false, //Se esta usando?
        teams: [],
        onTorneo: false,
        playersBrasil: [],

        // @ts-ignore
        fetchTeams: async (limit:number, player: String)=> {
            //TODO: obteniendo preguntas del backend
            const {data} = await calendarApi.get('teams'); //Este es como temrina el endpoint
            const {teams} = data;
            const teamsBackend = teams;
            set({teams: teamsBackend, onTorneo: true}, false, 'fetchTeams')
        },

        fetchPlayersBrasil: async (player: String)=> {
            //TODO: obteniendo players del backend
            const {data} = await calendarApi.get('teams'); //Este es como temrina el endpoint
            const {teams} = data;
            const teamsBackend = teams;
            const teamBrasil = ([...teamsBackend[0].players, player]);
            const players = teamBrasil;

            //TODO: Asi añadimos el jugador al equipo
            const respuesta = await calendarApi.put(`teams/${ teamsBackend[0]._id }`, { players });
            console.log(respuesta);
            console.log('Se añadio jugador en brasil')
            console.log(teamBrasil);
            set({playersBrasil: teamBrasil, nombreEquipo: 0}, false, 'fetchPlayersBrasil')
        },

        fetchPlayersArgentina: async (player: String)=> {
            //TODO: obteniendo players del backend
            const {data} = await calendarApi.get('teams'); //Este es como temrina el endpoint
            const {teams} = data;
            const teamsBackend = teams;
            const teamArgentina = ([...teamsBackend[1].players, player]);
            const players = teamArgentina;

            //TODO: Asi añadimos el jugador al equipo
            const respuesta = await calendarApi.put(`teams/${ teamsBackend[1]._id }`, { players });
            console.log(respuesta);
            console.log('Cambio en base de datos argentina')
            console.log(teamArgentina);
            set({playersArgentina: teamArgentina, nombreEquipo: 1}, false, 'fetchPlayersArgentina')
        },

        fetchMirar: () => {
            set({nombreEquipo: 3}, false, 'fetchMirar')
        },

        selectTeam:(teamId: number) => {
            // usar el structuredClone para clonar el objeto
            const { teams } = get();
            const newTeams = structuredClone( teams );
            const teamIndex = newTeams.findIndex(t => t.id === teamId);
            const teamInfo = newTeams[ teamIndex ];
            newTeams[teamIndex] = {
                ...teamInfo,
            };
            console.log({newTeams});
            // Encontramos el indice de la pregunta
            set({ teams: newTeams }, false, 'selectTeam')
        },

        resetTeams: () => {
            set({ nombreEquipo: 3, onTorneo: false, playersBrasil: [], playersArgentina: [],  }, false, 'resetTeams')
        },

        onPointsBrasil: async(puntosBrasil: number) =>{
            //TODO: sumando points del backend
            const {data} = await calendarApi.get('teams'); //Este es como temrina el endpoint
            const {teams} = data;
            const teamsBackend = teams;

            let pointsBrasil = teams[0].points;
            pointsBrasil = pointsBrasil + puntosBrasil;
            console.log(pointsBrasil);
            const points = pointsBrasil;
            const respuesta = await calendarApi.put(`teams/${ teamsBackend[0]._id }`, { points });
            console.log(respuesta);
            console.log('Cambio en base de datos points brasil')

            set({}, false, 'onPointsBrasil')
        },

        onPointsArgentina: async(puntosArgentina: number) =>{
            //TODO: sumando points del backend
            const {data} = await calendarApi.get('teams'); //Este es como temrina el endpoint
            const {teams} = data;
            const teamsBackend = teams;

            let pointsArgentina = teams[1].points;
            pointsArgentina = pointsArgentina + puntosArgentina;
            console.log(pointsArgentina);
            const points = pointsArgentina;
            const respuesta = await calendarApi.put(`teams/${ teamsBackend[1]._id }`, { points });
            console.log(respuesta);
            console.log('Cambio en base de datos points Argentina')

            set({}, false, 'onPointsArgentina')
        },

        // onPoints: async() =>{
        //     //TODO: sumando points del backend
        //     const {data} = await calendarApi.get('teams'); //Este es como temrina el endpoint
        //     const {teams} = data;
        //     const teamsBackend = teams;

        //     let pointsBrasil = teams[0].points;
        //     let pointsArgentina = teams[1].points;
            
        //     // if(get().nombreEquipo === 0){
        //         pointsBrasil++;
        //         console.log(pointsBrasil);
        //         const points = pointsBrasil;
        //         const respuesta = await calendarApi.put(`teams/${ teamsBackend[0].points }`, { points });
        //         console.log(respuesta);
        //         console.log('Cambio en base de datos points brasil')
        //     // }
        //     if(get().nombreEquipo === 1){
        //         pointsArgentina++;
        //         console.log(pointsArgentina);
        //         const points = pointsArgentina;
        //         const respuesta = await calendarApi.put(`teams/${ teamsBackend[1]._id }`, { points });
        //         console.log(respuesta);
        //         console.log('Cambio en base de datos points Argentina')
        //     }

        //     set({}, false, 'onPointsArgentina')
        // }

    }
}, {
    name: 'teams'
})))