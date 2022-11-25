import './SymbolList.scss';
import React, {useState, useEffect} from "react";
import axios from "axios";
import { config } from '../config';

function SymbolList({symbols}: any) {
    const [response, setResponse] = useState({data:{}} as any);
    useEffect(() => {
        console.log(response)
      }, [response]);

    const symbolHandler = (symbol: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined) => {
        axios.get(`https://${config.server.domain}:${config.server.port}/api/v1/quote?s=${symbol}`)
            .then(function (response) {
                setResponse(response)
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    return (
        <div className="mainContainer">
            <div className="symbolList">
                {React.Children.toArray(
                    symbols.map((s: string) => (
                        <ul className="symbol-list">
                    <span className="tag" style={{backgroundColor: 'red', color: '#fff'}}
                          onClick={() => symbolHandler(s)}>
                        {s}
                    </span>
                        </ul>
                    )),
                )}
            </div>
            <div className="responseList">
                <span className="info" style={{backgroundColor: 'blue', color: '#fff'}}>
                    {response.data.current}
                </span>
                {response.data.percent_change && <span className="info" style={{backgroundColor: 'green', color: '#fff'}}>
                    {response.data.percent_change}
                </span>}
                <span className="info" style={{backgroundColor: 'orange', color: '#fff'}}>
                    {response.data.time}
                </span>
            </div>
        </div>
    );
}

export default SymbolList;
