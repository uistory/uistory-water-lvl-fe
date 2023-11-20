"use client";

import WavesComponent from "@/app/components/WavesComponent";
import { SensorData } from "@/app/models/SensorData";
import Error from "next/error";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function Dashboard() {
  const [sensorData, setSensorData] = useState<SensorData | undefined>();
  const API_URL: string = "https://uistory-water-lvl.azurewebsites.net/api/";
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL + "SensorStatus");
        const data: SensorData = await response.json();
        data.createdAtDate = new Date(data.createdAt);
        setSensorData(data);
      } catch (error: any) {
        console.error("Error fetching data:", error);
        toast.error(`Error fetching data: ${error.message}`);
      }
    };

    fetchData();
  }, []);

  function render() {
    if (sensorData) {
      return (
        <>
          <div className="dashboard">
            <WavesComponent item={sensorData}></WavesComponent>
          </div>
        </>
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
