import React, {useContext, useReducer} from "react";
import {MEDIUM_LEVEL} from "../const/SettingsConsts";

const SettingsContext = React.createContext();

export const useSettings = () => {
    return useContext(SettingsContext);
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'set': return {...state, ...action.settings}
        default: return state;
    }
}

export const SettingsProvider = ({children}) => {
    const [settingsState, dispatch] = useReducer(reducer, {...MEDIUM_LEVEL, fieldSize: 20})

    const setSettings = (settings) => dispatch({type: 'set', settings});

    return (
        <SettingsContext.Provider value={{
            settings: settingsState,
            setSettings
        }}>
            {children}
        </SettingsContext.Provider>
    )
}