// import DashboardComponent from "@/app/components/Dashboard";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// export default function Home() {
//   return (
//     <>
//       <DashboardComponent />
//       <ToastContainer></ToastContainer>
//     </>
//   );
// }

import Dashboard from "@/app/components/Dashboard";
import dynamic from "next/dynamic";

const SpaRoot = dynamic(() => import("../app/components/Dashboard"), {
  ssr: false,
});

const IndexPage = () => {
  return <SpaRoot />;
};

export default IndexPage;
