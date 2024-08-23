import WebApp from "@twa-dev/sdk";
import { createContext, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Outlet, useLocation } from "react-router-dom";
import { BackButton } from '@twa-dev/sdk/react';



const queryClient = new QueryClient();

const langs = ['En', 'Ru'];

const allSigns = {
  aries: {
    Ru: 'Овен',
    En: 'Aries'
  },
  taurus: {
    Ru: 'Телец',
    En: 'Taurus'
  },
  gemini: {
    Ru: 'Близнецы',
    En: 'Gemini'
  },
  cancer: {
    Ru: 'Рак',
    En: 'Cancer'
  },
  leo: {
    Ru: 'Лев',
    En: 'Leo'
  },
  virgo: {
    Ru: 'Дева',
    En: 'Virgo'
  },
  libra: {
    Ru: 'Весы',
    En: 'Libra'
  },
  scorpio: {
    Ru: 'Скорпион',
    En: 'Scorpio'
  },
  sagittarius: {
    Ru: 'Стрелец',
    En: 'Sagittarius'
  },
  capricorn: {
    Ru: 'Козерог',
    En: 'Capricorn'
  },
  aquarius: {
    Ru: 'Водолей',
    En: 'Aquarius'
  },
  pisces: {
    Ru: 'Рыбы',
    En: 'Pisces'
  }
};



interface AppContextData {
  lang: number;
  langs: [string];
  setLang: (value: number) => void;
  allSigns: object
}
export const AppContext = createContext<AppContextData | null>({
  lang: 0,
  setLang: () => { },
  langs: ['En', 'Ru'],
  allSigns: allSigns
});

function getToday(lang) {
  const date = new Date();

  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  let currentDate;

  if (lang == 'Ru')
    currentDate = `${day}.${month}.${year}`;
  else
    currentDate = `${month}.${day}.${year}`;

  return currentDate
};

function App() {

  const location = useLocation()
  const [lang, setLang] = useState(WebApp.initDataUnsafe.user?.language_code == 'ru' ? 1 : 0);

  const changeLang = () => {
    setLang((prev) => (prev + 1) % 2);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <AppContext.Provider value={{ lang, setLang, allSigns, langs }}>
        <main className="w-full h-full bg-slate-200">
          <header className="w-full h-fit p-3 flex items-center justify-end gap-3 border-b-slate-700 border-2">
            <p className="mr-auto">{getToday(langs[lang])}</p>
            {location.pathname == "/" ?
              <button className="" disabled></button> :
              <BackButton onClick={() => window.history.back()} />

            }
            <button className="border-slate-700 rounded-lg border-2 p-1 w-[40px] flex items-center justify-center aspect-square" onMouseDown={changeLang}>{langs[lang]}</button>
          </header>
          <Outlet />
        </main>
      </AppContext.Provider>
    </QueryClientProvider>
  )
}

export default App;
