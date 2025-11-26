import { CSSProperties } from "react";

export const appContainerStyle: CSSProperties = {
  minHeight: "100vh",
  background: `
    linear-gradient(90deg, rgba(101, 67, 33, 0.1) 1px, transparent 1px),
    linear-gradient(rgba(101, 67, 33, 0.1) 1px, transparent 1px),
    linear-gradient(180deg, #8b5a3c 0%, #6d4c41 50%, #5d4037 100%)
  `,
  backgroundSize: "50px 50px, 50px 50px, 100% 100%",
  padding: "40px 20px",
  position: "relative",
};

export const woodGrainOverlayStyle: CSSProperties = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundImage: `
    repeating-linear-gradient(
      90deg,
      transparent,
      transparent 2px,
      rgba(0, 0, 0, 0.03) 2px,
      rgba(0, 0, 0, 0.03) 4px
    ),
    repeating-linear-gradient(
      0deg,
      transparent,
      transparent 10px,
      rgba(0, 0, 0, 0.02) 10px,
      rgba(0, 0, 0, 0.02) 11px
    )
  `,
  pointerEvents: "none",
};

export const logoContainerStyle: CSSProperties = {
  display: "flex",
  justifyContent: "center",
  marginBottom: "40px",
  position: "relative",
  zIndex: 1,
};

export const logoStyle: CSSProperties = {
  maxWidth: "200px",
  width: "100%",
  height: "auto",
  filter: "drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.3))",
};

export const todoListContainerStyle: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  gap: "20px",
  maxWidth: "1400px",
  margin: "0 auto",
  position: "relative",
  zIndex: 1,
};

export const messageStyle: CSSProperties = {
  color: "#fff",
  textAlign: "center",
  padding: "20px",
};

export const errorMessageStyle: CSSProperties = {
  color: "#ff6b6b",
  textAlign: "center",
  padding: "20px",
};

export const addListContainerStyle: CSSProperties = {
  display: "flex",
  justifyContent: "center",
  marginBottom: "30px",
  position: "relative",
  zIndex: 1,
};

export const addListBoxStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  padding: "16px 24px",
  backgroundColor: "rgba(255, 249, 196, 0.9)",
  borderRadius: "4px",
  border: "2px dashed rgba(93, 64, 55, 0.4)",
  boxShadow: "3px 3px 10px rgba(0, 0, 0, 0.2)",
  maxWidth: "600px",
  width: "100%",
};

export const addListInputStyle: CSSProperties = {
  flex: 1,
  fontSize: "16px",
  fontFamily: "system-ui, -apple-system, sans-serif",
  color: "#5d4037",
  padding: "10px 14px",
  border: "2px solid rgba(93, 64, 55, 0.3)",
  borderRadius: "4px",
  backgroundColor: "#fff",
  outline: "none",
};

export const addListButtonStyle: CSSProperties = {
  fontSize: "14px",
  fontFamily: "system-ui, -apple-system, sans-serif",
  color: "#fff",
  backgroundColor: "#388e3c",
  padding: "10px 20px",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  textTransform: "uppercase",
  letterSpacing: "1px",
  boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.2)",
  transition: "all 0.2s ease",
};
