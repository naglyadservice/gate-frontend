import React from "react";
import { CircleX, Clock, Loader, LogOut, MapPin, MessageSquarePlus, Send, UserRoundPen, Users } from "lucide-react";

import apiClient from "../utils/client";
import { useAuth } from "../state/auth";
import { useDrawer } from "../state/drawer";
import { tabsType, useAccountTab } from "../state/account.tabs";

import logo from "../assets/logo-gate-blue.svg";
import personalArea from "../assets/personal-area.svg";



function Header() {
  const { isDrawer, toggleDrawer } = useDrawer();
  const { name, email, image_url, logout, role } = useAuth();
  const setAccountTab = useAccountTab(selector => selector.setTab);
  const [isTelegramStatus, setIsTelegramStatus] = React.useState<"" | "loading" | "error">("");

  const onButtonTabClick = (tab: tabsType) => {
    setAccountTab(tab);
    toggleDrawer();
  }

  const onTelegramClick = () => {
    setIsTelegramStatus("loading");
    apiClient.get("/users/telegram/register")
      .then((res) => window.location.assign(res.data))
      .then(() => setIsTelegramStatus(""))
      .catch(() => setIsTelegramStatus("error"))
      .finally(() => window.setTimeout(() => setIsTelegramStatus(""), 5000));
  }

  const isAdmin = (role === "ADMIN");

  return (
    <div className='pt-6 pb-3 relative'>
      <div className="flex justify-between items-center">
        <a
          href="https://www.npc.com.ua/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-70"
        >
          <img src={logo} alt="logo" className="w-32 sm:w-36 " />
        </a>

        <div>
          <img
            className="w-10 h-10 rounded-full object-cover object-center cursor-pointer"
            src={image_url}
            alt=""
            onClick={toggleDrawer}
            onError={(e) => e.currentTarget.src = personalArea}
          />
        </div>

        {isDrawer && (
          <div className="absolute z-20 top-full right-0 shadow-lg">
            <div className="p-3 bg-white rounded-md border">
              <div className="flex flex-col gap-3">
                <div className="flex flex-col">
                  <span>{name}</span>
                  <span className="text-black/50">{email}</span>
                </div>
                <hr />
                <button className="flex items-center w-full gap-2 hover:opacity-70" onClick={() => onButtonTabClick("personal")}>
                  <UserRoundPen size={20} />
                  <span>Налаштування</span>
                </button>
                <button className="flex items-center w-full gap-2 hover:opacity-70" onClick={() => onButtonTabClick("history")}>
                  <Clock size={20} />
                  <span>Історія</span>
                </button>
                {isAdmin && (
                  <button className="flex items-center w-full gap-2 hover:opacity-70" onClick={() => onButtonTabClick("requests")}>
                    <MessageSquarePlus size={20} />
                    <span>Запити</span>
                  </button>
                )}
                {isAdmin && (
                  <button className="flex items-center w-full gap-2 hover:opacity-70" onClick={() => onButtonTabClick("users")}>
                    <Users size={20} />
                    <span>Список користувачів</span>
                  </button>
                )}
                {isAdmin && (
                  <button className="flex items-center w-full gap-2 hover:opacity-70" onClick={() => onButtonTabClick("settings")}>
                    <MapPin size={20} />
                    <span>Локації</span>
                  </button>
                )}
                <button
                  onClick={onTelegramClick}
                  disabled={isTelegramStatus === "loading"}
                  className="flex items-center w-full gap-2 hover:opacity-70"
                >
                  {(isTelegramStatus === "") && (<Send size={20} />)}
                  {(isTelegramStatus === "error") && (<CircleX size={20} />)}
                  {(isTelegramStatus === "loading") && (<Loader size={20} className="animate-spin" />)}
                  <span>Телеграм-бот</span>
                </button>

                <hr />

                <button onClick={logout} className="flex items-center w-full gap-2 hover:opacity-70">
                  <LogOut size={20} />
                  <span>Вихід</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Header