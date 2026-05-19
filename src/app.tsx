import { Section, Pill, Markdown } from "@odla-ai/ui";
import { Globe } from "lucide-preact";

export function App() {
  return (
    <div style={{ padding: '2rem' }}>
      <Section heading="Hello World!">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          <Globe size={24} />
          <p style={{ margin: 0 }}>Welcome to my web app!</p>
        </div>
        <Markdown 
          text={`
**Hello World!** 

I am a web app built with **Preact**, **Vite**, and **TypeScript**.

I am using:
- [@odla-ai/ui](https://github.com/odla-ai/ui) for components
- [lucide-preact](https://lucide.dev/) for icons
- [Vite](https://vitejs.dev/) for the build tool

This site was built following the Firesafe VM Web Toolkit guidelines.
          `} 
        />
        <div style={{ marginTop: '1rem' }}>
          <Pill variant="success">Built with Preact</Pill>
          <Pill variant="info" style={{ marginLeft: '0.5rem' }}>Vite Ready</Pill>
        </div>
      </Section>
    </div>
  );
}
