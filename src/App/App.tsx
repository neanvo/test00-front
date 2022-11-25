import './App.scss';
import SymbolList from '../SymbolList/SymbolList';
import React, {SetStateAction, useState} from "react";
import axios from "axios";
import { config } from '../config';

function App() {
    const [value, setValue] = useState("");
    const [symbols, setSymbols] = useState([]);

    const handleChange = (e: { target: { value: SetStateAction<string>; }; }) => {
        setValue(e.target.value);
    };

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        axios.get(`https://${config.server.domain}/api/v1/symbol?q=${value}`)
            .then(function (response) {
                setSymbols(response.data.result.map((r: any) => r.displaySymbol))
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    return (
        <div className="app-main-block">
            <form className="form">
                <input value={value} onChange={handleChange}/>
                <button onClick={handleSubmit} type="submit">
                    Submit
                </button>
            </form>
            <SymbolList symbols={symbols}/>
        </div>
    );
}

export default App;
