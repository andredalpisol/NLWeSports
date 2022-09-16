import "./styles/main.css";
import logoImg from "./assets/Logo.svg";
import { useState, useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { GameBanner } from "./components/GameBanner";
import { CreateAdBanner } from "./components/CreateAdBanner";
import { CreateAdModal } from "./components/CreateAdModal";
import axios from "axios";

function App() {
  const [games, setGames] = useState<Game[]>([]);

  interface Game {
    id: string;
    title: string;
    bannerUrl: string;
    _count: {
      ads: number;
    };
  }

  useEffect(() => {
    axios("http://localhost:3333/games").then((response) => {
      setGames(response.data);
    });
  }, []);
  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center  ">
      <img src={logoImg} />
      <h1 className="text-7xl text-white font-black mt-5">
        Seu
        <span className="text-transparent bg-nlw-gradient bg-clip-text">
          duo
        </span>
        está aqui.
      </h1>
      <div className="grid grid-cols-6 gap-6 mt-16">
        {games.map((game) => (
          <GameBanner
            key={game.id}
            bannerUrl={game.bannerUrl}
            title={game.title}
            adsCount={game._count.ads}
          ></GameBanner>
        ))}
      </div>
      <Dialog.Root>
        <CreateAdBanner />
        <CreateAdModal></CreateAdModal>
      </Dialog.Root>
    </div>
  );
}

export default App;
