import Sidebar from "../components/Sidebar";

const MainLayout = ({ children }) => {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        minHeight: "100vh",
        background: "#f1f5f9",
      }}
    >
      <Sidebar />

      <main
        style={{
          flex: 1,
          marginLeft: "250px",
          padding: "30px",
          width: "calc(100% - 250px)",
          minHeight: "100vh",
        }}
      >
        {children}
      </main>
    </div>
  );
};

export default MainLayout;