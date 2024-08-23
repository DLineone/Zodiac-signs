import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { AppContext } from "../App";
import { Link } from "react-router-dom";

async function fetchSigns() {
    const res = axios.post('https://poker247tech.ru/get_horoscope/', {
        "language": "original",
        "period": "today"
    });
    return res;
}

function AllSigns() {

    const { data, status } = useQuery('allsigns', fetchSigns);
    const [signs, setSigns] = useState(undefined);
    const { allSigns, lang, langs } = useContext(AppContext);

    useEffect(() => {
        if (status == "success")
            setSigns(Object.keys(data.data.horoscope));
    }, [status]);




    return (
        <div className="h-fit w-full p-5 flex items-center justify-center gap-5 flex-wrap self-stretch">
            {signs?.map((sign) =>
                <Link key={sign} to={`/${sign}`} className="w-[100px] h-fit aspect-square flex-col flex items-center justify-center gap-2">
                    <img src={`./${sign}.svg`} alt={`${sign}`} />
                    <p className="p-1 text-center">{allSigns[sign][langs[lang]]}</p>
                </Link>
            )}
        </div>
    )
}

export default AllSigns;