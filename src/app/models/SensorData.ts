export interface SensorData {
  id: number;
  distance: number;
  tankContentLiters: number;
  recentlyUsedLiters: number;
  unit: string;
  createdAt: string;
  createdAtDate: Date;
}
