"use client";

import { SensorData } from "@/app/models/SensorData";

export interface WavesComponentProps {
  item: SensorData | undefined;
}

export default function WavesComponent(props: WavesComponentProps) {
  const { item } = props;
  if (!item) return;
  const distance: number = item.distance;
  const tankSize: number = 200;
  const emptyTankRem: number = 55;
  const fullTankRem: number = 0;
  const percentage: number = item ? distance / tankSize : 0;
  const currentLevelRem: number = emptyTankRem * percentage;

  return (
    <>
      <div className="percentage"> {percentage * 100}%</div>
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
                y="0"
                fill="rgba(255,255,255,0.7)"
              />
              <use
                xlinkHref="#gentle-wave"
                x="48"
                y="3"
                fill="rgba(255,255,255,0.5)"
              />
              <use
                xlinkHref="#gentle-wave"
                x="48"
                y="5"
                fill="rgba(255,255,255,0.3)"
              />
              <use xlinkHref="#gentle-wave" x="48" y="7" fill="#fff" />
            </g>
          </svg>
        </div>
      </div>
    </>
  );
}
