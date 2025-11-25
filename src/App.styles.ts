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
  justifyContent: "center",
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
