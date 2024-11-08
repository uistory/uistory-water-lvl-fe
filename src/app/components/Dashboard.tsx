"use client";

import LitersUsageComponent from "@/app/components/LitersUsageComponent";
import WavesComponent from "@/app/components/WavesComponent";
import { DashboardData } from "@/app/models/DashboardData";
import { SensorStatusData } from "@/app/models/SensorStatusData";
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
  const [dashboardData, setDashboardData] = useState<
    DashboardData | undefined
  >();
  const [tankData, setTankData] = useState<TankData | undefined>();
  const [baseColor, setBaseColor] = useState<string | undefined>();
  const [loading, setLoading] = useState(true);

  const API_URL: string = "https://water-level-be-db.azurewebsites.net/api/";
  let fillColor: string = "";
  useEffect(() => {
    fetchData();
    setInterval(() => {
      fetchData();
    }, 10000);
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(API_URL + "SensorStatus/dashboard");
      const dashboardData: DashboardData = await response.json();
      setDate(dashboardData);
      setDashboardData(dashboardData);
      const percentage: number = dashboardData.sensorStatus.distance / tankSize;
      const fullnessPercentage: number = 1 - percentage;

      setTankData({
        percentage: percentage,
        tankCapacityLiters: tankCapacity,
        tankSize: tankSize,
        fullnessPercentage: fullnessPercentage,
      });

      calculateFillColor(fullnessPercentage);
      setLoading(false);
    } catch (error: any) {
      console.error("Error fetching data:", error);
      toast.error(`Error fetching data: ${error.message}`);
    }
  };

  // Set From UTC
  function setDate(dashboardData: DashboardData) {
    dashboardData.sensorStatus.createdAtDate = new Date(
      dashboardData.sensorStatus.createdAt
    );
    dashboardData.sensorStatus.createdAtDate.setHours(
      dashboardData.sensorStatus.createdAtDate.getHours() + 1
    );
  }

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
    if (loading) {
      return (
        <div className="loader">
          <div className="drop"></div>
          <div className="wave"></div>
        </div>
      );
    }

    if (dashboardData && tankData) {
      return (
        <div className="lg:flex h-100 h-full">
          <div className="lg:w-3/4">
            <WavesComponent
              item={dashboardData.sensorStatus}
              tankData={tankData}
            ></WavesComponent>
          </div>

          <div className="lg:w-1/4 mt-4 lg:mt-0 h-full border-x">
            <LitersUsageComponent
              dashboard={dashboardData}
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
