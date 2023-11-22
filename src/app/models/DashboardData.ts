import { SensorStatusData } from "@/app/models/SensorStatusData";

export interface DashboardData {
  sensorStatus: SensorStatusData;
  recentlyUsedLiters: number;
}
