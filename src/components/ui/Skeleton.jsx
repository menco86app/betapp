// src/components/ui/Skeleton.jsx
export function Skeleton({ height = 16, width = "100%", radius = 6 }) {
  return (
    <div
      style={{
        height,
        width,
        borderRadius: radius,
        background: "linear-gradient(90deg,#eee,#f5f5f5,#eee)",
        backgroundSize: "200% 100%",
        animation: "skeleton 1.4s infinite",
      }}
    />
  );
}
