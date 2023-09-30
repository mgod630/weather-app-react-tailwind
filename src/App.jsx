import { useState } from "react";

const APIKey = "f474b2372ea1759d4d1d78783a18b0b4";
function App() {
    const [cityName, setCityName] = useState("");
    const [showError, setShowError] = useState(false);
    const [internetConnectivityError, setInternetConnectivityError] =
        useState(false);
    const [response, setResponse] = useState([]);
    const getCityName = (e) => {
        setCityName(e.target.value);
    };
    const callApi = async (e) => {
        e.preventDefault();
        if (!navigator.onLine) return setInternetConnectivityError(true);
        setInternetConnectivityError(false);
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIKey}`
        );
        const data = await response.json();
        setCityName("");
        if (data.cod !== 200) {
            return setShowError(true);
        }
        setShowError(false);
        setResponse({
            name: data.name,
            deg: (data.main.temp - 271).toFixed(0),
            date: new Date().toLocaleDateString(),
        });
    };
    return (
        <div className="App bg-blue-400 w-screen h-screen pt-20">
            <div className="w-5/6 md:w-1/2 rounded-md bg-white text-slate-600 mx-auto px-10 py-5">
                <form>
                    <input
                        id="cityName"
                        value={cityName}
                        onChange={getCityName}
                        autoFocus
                        type="text"
                        className="border-2 border-slate-400 rounded px-2 py-1 focus:outline-none focus:border-blue-500 focus:border-2"
                        placeholder="Search for the city"
                    />
                    <button
                        onClick={callApi}
                        className="text-white px-2 py-1 ml-2 rounded bg-blue-400 hover:bg-blue-500"
                    >
                        Submit
                    </button>
                </form>
                {internetConnectivityError ? (
                    <p className="text-red-500 pt-5 font-semibold">
                        No internet Connection, Please Check Your Internet
                    </p>
                ) : showError ? (
                    <p className="text-red-500 pt-5 font-semibold">
                        Can't find the city, please try again
                    </p>
                ) : (
                    <div>
                        <p className="text-3xl mt-10">{response.name}</p>
                        <p className="text-xl my-2">
                            {response.deg}
                            {response.deg && "°"}
                        </p>
                        <p>{response.date}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
