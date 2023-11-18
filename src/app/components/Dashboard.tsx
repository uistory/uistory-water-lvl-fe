"use client";

import WavesComponent from "@/app/components/WavesComponent";
import { SensorData } from "@/app/models/SensorData";
import { useState, useEffect } from "react";

export default function Dashboard() {
  const [sensorData, setSensorData] = useState<SensorData | undefined>();
  const API_URL: string = "https://uistory-water-lvl.azurewebsites.net/api/";
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL + "SensorStatus");
        const data = await response.json();
        setSensorData(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <WavesComponent item={sensorData}></WavesComponent>
    </>
  );
}
