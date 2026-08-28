import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "@/design-system/klr-build-design-system-40bc4c/styles/tokens.css";

createRoot(document.getElementById("root")!).render(<App />);
