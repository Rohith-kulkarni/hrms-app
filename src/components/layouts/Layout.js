import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const Layout = ({ children }) => (
  <div className="flex w-screen h-screen">
    <Sidebar />
    <div className="flex flex-col flex-1">
      <Topbar />
      <div className="p-6">{children}</div>
    </div>
  </div>
);

export default Layout;
