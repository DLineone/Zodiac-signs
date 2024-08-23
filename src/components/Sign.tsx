import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../App";
import { useQuery } from "react-query";
import axios from "axios";
import { useSwipeable } from "react-swipeable";

async function fetchSign(name, lang) {
    const res = axios.post(`https://poker247tech.ru/get_horoscope/`, {
        "sign": `${name}`,
        "language": lang,
        "period": "today"
    });
    return res;
}

function Sign() {
    const { name } = useParams();
    const { allSigns, lang, langs } = useContext(AppContext);
    const { data } = useQuery([name, langs, lang], () => fetchSign(name, langs[lang] == "Ru" ? "original" : "translated"));

    const navigate = useNavigate();
    const handlers = useSwipeable({
        onSwipedRight: () => navigate(-1),
    });

    return (
        <>
            <div {...handlers} className="h-fit w-full p-5 flex items-center justify-center gap-5 flex-col self-stretch text-5xl">
                <div className="w-full flex items-center justify-around">
                    <p>{allSigns[name][langs[lang]]}</p>
                    <img className="h-24" src={`./${name}.svg`} alt={`${allSigns[name][langs[lang]]}`} />
                </div>
                <p className="text-justify text-lg">{data?.data?.horoscope}</p>
            </div>
        </>
    )
}

export default Sign;