"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SensorData } from "@/app/models/SensorData";
import {
  faBath,
  faDroplet,
  faShower,
  faToilet,
} from "@fortawesome/free-solid-svg-icons";

export interface LitersUsageComponentProps {
  item: SensorData;
  baseColor: string | undefined;
}

export default function LitersUsageComponent(props: LitersUsageComponentProps) {
  const { item, baseColor } = props;
  const tankCapacity: number = 12000; // l
  const tankSize: number = 2000; // mm
  const fullnessPercentage: number = 1 - item.distance / tankSize;
  const tankCapacityLeft: number =
    tankCapacity - tankCapacity * fullnessPercentage; // l

  // Liters used for each household activity
  const washingMachineUsage: number = 49; // liters
  const smallToiletFlushUsage: number = 3; // liters
  const bigToiletFlushUsage: number = 6; // liters
  const showerUsage: number = 20; // liters
  const bathUsage: number = 100; // liters

  return (
    <div className="px-5 py-2">
      <h1 className="p-4">Odhadovaný zostatok</h1>
      <div className="">
        <div className="min-w-0 rounded-lg shadow-xs overflow-hidden bg-white dark:bg-gray-800">
          <div className="p-4">
            <div>
              Od včera ste minuli
              <strong style={{ color: "#3c82f6" }}>
                {" "}
                {item.recentlyUsedLiters} l
              </strong>
            </div>
            <div>
              V nádrži ešte ostáva kapacita na
              <strong style={{ color: baseColor }}>
                {" "}
                {tankCapacityLeft} l
              </strong>
            </div>
            <div>Čo znamená:</div>
          </div>
          <div className="p-4 flex items-left">
            <div className="p-3 rounded-full icon-circle text-green-500 dark:text-green-100 bg-green-100 dark:bg-green-500 mr-4">
              <FontAwesomeIcon
                icon={faShower}
                className="fa-solid faShower"
              ></FontAwesomeIcon>
            </div>
            <div className="min-list-width">
              <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                Sprchy
              </p>
              <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                {Math.floor(tankCapacityLeft / showerUsage)}
              </p>
            </div>
          </div>
        </div>
        <div className="min-w-0 rounded-lg shadow-xs overflow-hidden bg-white dark:bg-gray-800">
          <div className="p-4 flex items-left">
            <div className="p-3 rounded-full icon-circle text-orange-500 dark:text-orange-100 bg-orange-100 dark:bg-orange-500 mr-4">
              <FontAwesomeIcon
                icon={faDroplet}
                className="fa-solid faDroplet"
              ></FontAwesomeIcon>
            </div>
            <div className="min-list-width">
              <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                Pracie EKO cykly:{" "}
              </p>
              <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                {Math.floor(tankCapacityLeft / washingMachineUsage)}
              </p>
            </div>
          </div>
        </div>
        <div className="min-w-0 rounded-lg shadow-xs overflow-hidden bg-white dark:bg-gray-800">
          <div className="p-4 flex items-left">
            <div className="p-3 rounded-full icon-circle text-blue-500 dark:text-blue-100 bg-blue-100 dark:bg-blue-500 mr-4">
              <FontAwesomeIcon
                icon={faToilet}
                className="fa-solid faToilet"
              ></FontAwesomeIcon>
            </div>
            <div className="min-list-width">
              <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                Spláhnutia: Malé/Veľké
              </p>
              <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                {Math.floor(tankCapacityLeft / smallToiletFlushUsage)}/
                {Math.floor(tankCapacityLeft / bigToiletFlushUsage)}
              </p>
            </div>
          </div>
        </div>
        <div className="min-w-0 rounded-lg shadow-xs overflow-hidden bg-white dark:bg-gray-800">
          <div className="p-4 flex items-left">
            <div className="p-3 rounded-full icon-circle text-teal-500 dark:text-teal-100 bg-teal-100 dark:bg-teal-500 mr-4">
              <svg fill="currentColor" viewBox="0 0 20 20" className="w-5 h-5">
                <FontAwesomeIcon
                  icon={faBath}
                  className="fa-solid faBath"
                ></FontAwesomeIcon>
              </svg>
            </div>
            <div className="min-list-width">
              <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                Vaní
              </p>
              <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                {Math.floor(tankCapacityLeft / bathUsage)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
