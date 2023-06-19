import {
    DIFFICULTIES_LEVELS,
} from "../components/settings/const/SettingsConsts";

const InfoPage = () => {
    return <>
        <h1>Snake game</h1>
        <div className='pageBody'>
            <div className='body-block'>
                <h3>Movement</h3>
                <ul>
                    <li>Use arrows to set snake direction</li>
                </ul>

                <h3>Pause</h3>
                <ul>
                    <li>Use 'space' to pause the game</li>
                    <li>Use ↑↓←→ to continue the game</li>
                </ul>

                <h3>Restart</h3>
                <ul>
                    <li>Use 'esc' to restart the game</li>
                </ul>
            </div>
            <div className='body-block'>
                <h2>Rules:</h2>
                <ul>
                    <li>Usual snake rules, try to not eat yourself and do not cross the borders</li>
                    <li>Score calculates based on level of difficulty:<ul>
                        {DIFFICULTIES_LEVELS.map(level => {
                            return <li key={level.title}>{level.title} level: number of points per food = {level.scorePointsCoefficient}</li>
                        })}
                    </ul></li>
                </ul>
            </div>
        </div>
    </>
}

export default InfoPage;