// onAddNewEvent: ( state, { payload })=>{
//     state.events.push( payload );
//     state.activeEvent = null;
// },

// import { type Question } from "../types";
import { persist, devtools } from "zustand/middleware";
import { calendarApi } from "../../api";
import { create } from "zustand";

interface State{
    teams: [],
    championShip: Boolean,
    currentTeam: number,

    // fetchTeams: (limit: number) => Promise<void>,

    // selectTeam: (teamId: number) => void;

    resetChampionship: () => void;
}

// @ts-ignore
export const useChampionShipStore = create<State>()(devtools(persist((set, get)=>{
    //TODO: intentando cargar torneo desde el backend

    return {
        loading: false, //Se esta usando?
        teams: [],
        championShip: false,
        currentTeam: 0,

        // @ts-ignore
        fetchTeams: async (limit:number)=> {
            //TODO: obteniendo preguntas del backend
            const {data} = await calendarApi.get('teams'); //Este es como temrina el endpoint
            const {teams} = data;
            const teamsBackend = teams;
            set({teams: teamsBackend, championShip: true}, false, 'fetchTeams')
            console.log({teams});
        },

        // @ts-ignore
        selectTeam:(teamId: number, playerIndex: number) => {
            // usar el structuredClone para clonar el objeto
            const { teams } = get();
            const newTeams = structuredClone( teams );

            // @ts-ignore
            const teamIndex = newTeams.findIndex(t => t.id === teamId);

            // @ts-ignore
            const teamInfo = newTeams[ teamIndex ];
            console.log({newTeams});
           
            set({ teams: newTeams }, false, 'selectTeam')
        },
    }
}, {
    name: 'teams'
})))