import React, {useRef, useState} from "react";

import {useSettings} from "../components/settings/context/SettingsContext";
import {DIFFICULTIES_LEVELS} from "../components/settings/const/SettingsConsts";
import './css/settings.css';

const SettingsPage = () => {
    const {settings, setSettings} = useSettings();
    const fieldSizeRef = useRef();
    const [fieldSize, setFieldSize] = useState(settings.fieldSize);

    const changeDifficultyLevel = (newDifficultyLevelTitle) => {
        const newDifficultyLevel = DIFFICULTIES_LEVELS.find(setting => setting.title === newDifficultyLevelTitle);
        if (newDifficultyLevel) {
            setSettings(newDifficultyLevel);
        }
    }

    const setFieldInput = (value) => {
        const inputValue = value.target.value;
        setFieldSize(inputValue);
    }

    const changeFieldSize = () => {
        let newFieldSize = fieldSizeRef.current.value;

        const isOutOfRange = newFieldSize > 50 || newFieldSize < 5;

        if (isOutOfRange) {
            newFieldSize = fieldSize > 50 ? 50 : 5;
        } else {
            newFieldSize = fieldSize;
        }

        setFieldSize(newFieldSize);
        setSettings({fieldSize: newFieldSize});
    }

    return <div className='pageBody'>
        <div className='body-block'>
            <h2>Level:</h2>
            <select name="levelSettings" id="levelSettings" defaultValue={settings.title}
                    onChange={settings => changeDifficultyLevel(settings.target.value)}>
                {DIFFICULTIES_LEVELS.map(setting => {
                    return <option key={setting.title} value={setting.title}>
                        {setting.title}
                    </option>
                })}
            </select>
            <h2>Field size (min - 5, max - 50):</h2>
            <input ref={fieldSizeRef} type='number' value={fieldSize} min={5} max={50} onChange={setFieldInput}></input>
            <button onClick={changeFieldSize}>Apply</button>
        </div>
    </div>
}

export default SettingsPage;