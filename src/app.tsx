import { useState, useEffect } from "preact/hooks";
import { SegmentedControl } from "@odla-ai/ui";
import { Home } from "./components/Home";
import { Tetris } from "./components/Tetris";

export function App() {
  const [activeTab, setActiveTab] = useState<"home" | "tetris">("home");

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === "#tetris") {
        setActiveTab("tetris");
      } else if (window.location.hash === "#home") {
        setActiveTab("home");
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    // Check initial hash
    handleHashChange();

    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh',
      maxWidth: '800px',
      margin: '0 auto',
      padding: '1rem'
    }}>
      <div style={{ marginBottom: '2rem' }}>
        <SegmentedControl
          options={[
            { label: "Home", value: "home" },
            { label: "Tetris", value: "tetris" },
          ]}
          value={activeTab}
          onChange={(val) => setActiveTab(val as "home" | "tetris")}
        />
      </div>

      <main>
        {activeTab === "home" ? <Home /> : <Tetris />}
      </main>
    </div>
  );
}
