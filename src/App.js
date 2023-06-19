import './App.css';
import {Route, Routes} from 'react-router-dom';
import InfoPage from "./pages/InfoPage";
import Layout from "./components/layout/Layout";
import GamePage from "./pages/GamePage";
import {SettingsProvider} from "./components/settings/context/SettingsContext";
import SettingsPage from "./pages/SettingsPage";

function App() {
    return (
        <div className="App">
            <SettingsProvider>
                <Routes>
                    <Route path='/' element={<Layout/>}>
                        <Route index element={<InfoPage/>}/>
                        <Route path='/game' element={<GamePage/>}/>
                        <Route path='/settings' element={<SettingsPage/>}/>
                    </Route>
                </Routes>
            </SettingsProvider>
        </div>
    );
}

export default App;
