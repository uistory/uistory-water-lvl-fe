import DashboardComponent from "@/app/components/Dashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  return (
    <>
      <DashboardComponent />
      <ToastContainer></ToastContainer>
    </>
  );
}
