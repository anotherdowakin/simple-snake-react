import React from "react";

import {useSettings} from "../components/settings/context/SettingsContext";
import {DIFFICULTIES_LEVELS} from "../components/settings/const/SettingsConsts";
import './css/settings.css';

const SettingsPage = () => {
    const {settings, setSettings} = useSettings();

    const changeDifficultyLevel = (newDifficultyLevelTitle) => {
        const newDifficultyLevel = DIFFICULTIES_LEVELS.find(setting => setting.title === newDifficultyLevelTitle);
        if (newDifficultyLevel) {
            setSettings(newDifficultyLevel);
        }
    }

    const changeFieldSize = (fieldSize) => {
        setSettings({fieldSize});
    }

    return <div className='pageBody'>
        <div className='body-block'>
            <h2>Level:</h2>
            <select name="levelSettings" id="levelSettings" defaultValue={settings.title} onChange={settings => changeDifficultyLevel(settings.target.value)}>
                {DIFFICULTIES_LEVELS.map(setting => {
                    return <option key={setting.title} value={setting.title}>
                        {setting.title}
                    </option>
                })}
            </select>
            <h2>Field size</h2>
            <input type='number' value={settings.fieldSize} min={5} max={50} onChange={fieldSize => changeFieldSize(fieldSize.target.value)}></input>
        </div>
    </div>
}

export default SettingsPage;