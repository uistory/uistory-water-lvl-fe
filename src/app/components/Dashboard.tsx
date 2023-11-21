"use client";

import LitersUsageComponent from "@/app/components/LitersUsageComponent";
import WavesComponent from "@/app/components/WavesComponent";
import { SensorData } from "@/app/models/SensorData";
import Error from "next/error";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

export interface TankData {
  percentage: number;
  tankCapacityLiters: number;
  tankSize: number;
  fullnessPercentage: number;
}

export default function Dashboard() {
  const tankSize: number = 2000; // mm
  const tankCapacity: number = 12000; // liters
  const [sensorData, setSensorData] = useState<SensorData | undefined>();
  const [tankData, setTankData] = useState<TankData | undefined>();
  const [baseColor, setBaseColor] = useState<string | undefined>();
  const API_URL: string = "https://uistory-water-lvl.azurewebsites.net/api/";
  let fillColor: string = "";
  useEffect(() => {
    setInterval(() => {
      fetchData();
    }, 1000);
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(API_URL + "SensorStatus");
      const data: SensorData = await response.json();
      data.createdAtDate = new Date(data.createdAt);
      setSensorData(data);
      const percentage: number = data.distance / tankSize;
      const fullnessPercentage: number = 1 - percentage;
      setTankData({
        percentage: percentage,
        tankCapacityLiters: tankCapacity,
        tankSize: tankSize,
        fullnessPercentage: fullnessPercentage,
      });

      calculateFillColor(fullnessPercentage);
    } catch (error: any) {
      console.error("Error fetching data:", error);
      toast.error(`Error fetching data: ${error.message}`);
    }
  };

  // Function to calculate the fill color based on the percentage
  function calculateFillColor(percentage: number) {
    if (percentage <= 0.6) {
      setBaseColor("rgb(103, 176, 50)");
    } else if (percentage > 0.6 && percentage <= 0.8) {
      setBaseColor("rgb(251, 189, 0");
    } else {
      setBaseColor("rgb(253, 40, 19)");
    }
  }

  function render() {
    if (sensorData && tankData) {
      return (
        <div className="dashboard w-full grid grid-rows-1 sm:flex sm:flex-row grid-cols-[75%,25%]">
          <div className="w-full sm:w-[75%] h-full">
            <WavesComponent
              item={sensorData}
              tankData={tankData}
            ></WavesComponent>
          </div>
          <div className="w-full sm:w-[25%] h-full border-x">
            <LitersUsageComponent
              item={sensorData}
              baseColor={baseColor}
            ></LitersUsageComponent>
          </div>
        </div>
      );
    }

    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-3xl">Nemám Data. Utekaj Napľuť!</div>
        
      </div>
    );
  }

  return render();
}
