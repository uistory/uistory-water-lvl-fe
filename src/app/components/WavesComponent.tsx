"use client";

import { SensorData } from "@/app/models/SensorData";

export interface WavesComponentProps {
  item: SensorData;
}

export default function WavesComponent(props: WavesComponentProps) {
  const { item } = props;
  const tankSize: number = 200;
  const emptyTankRem: number = 55;
  const fullTankRem: number = 0;
  const percentage: number = item.distance / tankSize;
  const currentLevelRem: number = emptyTankRem * percentage;
  const last = getDateTimeString(item.createdAtDate);

  function getDateTimeString(date: Date): string {
    const daysOfWeek = [
      "Nedela",
      "Pondelok",
      "Utorok",
      "Streda",
      "Štvrtok",
      "Piatok",
      "Sobota",
    ];

    const currentDate = new Date();
    const isToday =
      date.getDate() === currentDate.getDate() &&
      date.getMonth() === currentDate.getMonth() &&
      date.getFullYear() === currentDate.getFullYear();

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const dayOfWeek = daysOfWeek[date.getDay()];
    const timeString = `${hours}:${minutes}`;
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;
    if (isToday) {
      return "Dnes " + timeString;
    } else {
      return `${
        dayOfWeek === daysOfWeek[currentDate.getDay()] ? "Dnes" : dayOfWeek
      }, ${formattedDay}.${formattedMonth}.${year}, ${timeString}`;
    }
  }

  return (
    <>
      <div className="tank">
        <div className="status">
          <div className="percentage"> {Math.round(percentage * 100)}%</div>
          <div className="timestamp">Posledné meranie: {last}</div>
        </div>

        <div className="header">
          <div
            className="inner-header flex"
            style={{ height: currentLevelRem + "rem" }}
          >
            <svg
              version="1.1"
              className="logo"
              baseProfile="tiny"
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 500 500"
              xmlSpace="preserve"
            >
              <path
                fill="#FFFFFF"
                stroke="#000000"
                strokeWidth="10"
                strokeLinejoin="round"
                d="M57,283"
              />
            </svg>
          </div>

          <div>
            <svg
              className="waves"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              viewBox="0 24 150 28"
              preserveAspectRatio="none"
              shapeRendering="auto"
            >
              <defs>
                <path
                  id="gentle-wave"
                  d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
                />
              </defs>
              <g className="parallax">
                <use
                  xlinkHref="#gentle-wave"
                  x="48"
                  y="3"
                  fill="rgba(139, 69, 19, 0.5)"
                />
                <use
                  xlinkHref="#gentle-wave"
                  x="48"
                  y="7"
                  fill="rgb(139, 69, 19)"
                />
              </g>
            </svg>
          </div>
        </div>
      </div>
    </>
  );
}
