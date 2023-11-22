"use client";

import { TankData } from "@/app/components/Dashboard";
import { SensorStatusData } from "@/app/models/SensorStatusData";

export interface WavesComponentProps {
  item: SensorStatusData;
  tankData: TankData;
}

export default function WavesComponent(props: WavesComponentProps) {
  const { item, tankData } = props;
  const emptyTankRem: number = 55;
  const currentLevelRem: number = emptyTankRem * tankData.percentage;
  const last = getDateTimeString(item.createdAtDate);
  let baseColor: string = "";
  let fillColor: string = "";

  calculateFillColor(tankData.fullnessPercentage);

  function getDateTimeString(date: Date): string {
    console.log(date);

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
    const minutes =
      date.getMinutes() >= 10 ? date.getMinutes() : "0" + date.getMinutes();
    const seconds =
      date.getSeconds() >= 10 ? date.getSeconds() : "0" + date.getSeconds();

    const dayOfWeek = daysOfWeek[date.getDay()];
    const timeString = `${hours}:${minutes}:${seconds}`;
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

  // Function to calculate the fill color based on the percentage
  function calculateFillColor(percentage: number) {
    if (percentage <= 0.6) {
      baseColor = "rgb(103, 176, 50)";
      fillColor = `rgba(103, 176, 50, 0.7)`;
    } else if (percentage > 0.6 && percentage <= 0.8) {
      baseColor = "rgb(251, 189, 0)";
      fillColor = `rgba(251, 189, 0, 0.7)`;
    } else {
      baseColor = "rgb(253, 40, 19)";
      fillColor = `rgba(253, 40, 19, 0.7)`;
    }
  }

  function calculateTextColor(baseColor: string): string {
    // Calculate the luminance of the background color
    const rgb = baseColor.match(/\d+/g);
    if (!rgb) return "black";
    const luminance =
      (0.299 * +rgb[0] + 0.587 * +rgb[1] + 0.114 * +rgb[2]) / 255;

    // Choose white or black text based on luminance
    return luminance > 0.5 ? "#000000" : "#FFFFFF";
  }

  return (
    <div
      className="tank"
      style={{
        backgroundColor: baseColor,
        color: calculateTextColor(baseColor),
      }}
    >
      <div className="flex items-center justify-center">
        <div
          className="status"
          style={{
            border: "5px solid " + baseColor,
          }}
        >
          <div
            className="percentage"
            style={{
              color: baseColor,
            }}
          >
            {" "}
            {Math.round(tankData.fullnessPercentage * 100)}%
          </div>
          <div className="timestamp">
            <strong>{last}</strong>
            <br />
            <small className="level">Hladina: {item.distance / 10} cm</small>
          </div>
        </div>
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
              <use xlinkHref="#gentle-wave" x="48" y="3" fill={fillColor} />
              <use xlinkHref="#gentle-wave" x="48" y="7" fill={baseColor} />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}
