const StatCard = ({ title, value, icon }) => {
  return (
    <div
      style={{
        background: "white",
        borderRadius: "16px",
        padding: "24px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <p style={{ color: "#64748b", margin: 0 }}>{title}</p>
          <h2 style={{ margin: "10px 0 0" }}>{value}</h2>
        </div>

        <div
          style={{
            background: "#e0f2fe",
            padding: "12px",
            borderRadius: "12px",
            height: "fit-content",
          }}
        >
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatCard;