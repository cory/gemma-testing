import { Section, Pill } from "@odla-ai/ui";
import { Sparkles, Layout, Code, Gamepad2, Rocket, ChevronRight } from "lucide-preact";

export function Home() {
  const FeatureCard = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
    <div style={{ 
      padding: '2rem', 
      borderRadius: '12px', 
      backgroundColor: 'var(--odla-bg-subtle)', 
      border: '1px solid var(--odla-border)',
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      transition: 'transform 0.2s ease-in-out',
    }}>
      <div style={{ 
        width: '48px', 
        height: '48px', 
        borderRadius: '10px', 
        backgroundColor: 'var(--odla-bg)', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        color: 'var(--odla-accent-primary)'
      }}>
        <Icon size={24} />
      </div>
      <div>
        <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.25rem' }}>{title}</h3>
        <p style={{ margin: 0, opacity: 0.7, fontSize: '0.95rem', lineHeight: '1.6' }}>{description}</p>
      </div>
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
      <header style={{ textAlign: 'center', padding: '3rem 0 1rem 0' }}>
        <div style={{ 
          display: 'inline-flex', 
          padding: '1.25rem', 
          borderRadius: '24px', 
          backgroundColor: 'var(--odla-bg-subtle)',
          marginBottom: '1.5rem',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
        }}>
          <Sparkles size={56} style={{ color: 'var(--odla-accent-primary)' }} />
        </div>
        <h1 style={{ fontSize: '3.5rem', fontWeight: '800', margin: '0 0 1rem 0', letterSpacing: '-0.02em' }}>
          Gemma <span style={{ color: 'var(--odla-accent-primary)' }}>Testing</span>
        </h1>
        <p style={{ fontSize: '1.25rem', opacity: 0.7, maxWidth: '650px', margin: '0 auto', lineHeight: '1.6' }}>
          A high-performance playground to explore the capabilities of Gemma 4 in a modern, type-safe web environment.
        </p>
        <div style={{ marginTop: '2.5rem', display: 'flex', justifyContent: 'center', gap: '1rem' }}>
          <button 
            onClick={() => window.location.hash = '#tetris'}
            style={{ 
              padding: '0.75rem 1.5rem', 
              borderRadius: '8px', 
              border: 'none', 
              backgroundColor: 'var(--odla-accent-primary)', 
              color: 'white', 
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            Play Tetris <ChevronRight size={18} />
          </button>
        </div>
      </header>

      <Section heading="Core Capabilities">
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
          gap: '2rem',
          marginTop: '1.5rem'
        }}>
          <FeatureCard 
            icon={Layout} 
            title="Modern UI" 
            description="Crafted with @odla-ai/ui primitives for a polished, consistent, and accessible user experience." 
          />
          <FeatureCard 
            icon={Code} 
            title="Type-Safe" 
            description="Built with TypeScript and Vite, ensuring a robust and scalable development workflow." 
          />
          <FeatureCard 
            icon={Gamepad2} 
            title="Interactive" 
            description="Experience real-time state management with our fully integrated Tetris game." 
          />
        </div>
      </Section>

      <Section heading="The Stack">
        <div style={{ 
          padding: '2rem', 
          borderRadius: '12px', 
          backgroundColor: 'var(--odla-bg-subtle)', 
          border: '1px solid var(--odla-border)',
          marginTop: '1rem'
        }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center' }}>
            <Pill variant="success">Preact</Pill>
            <Pill variant="info">Vite</Pill>
            <Pill variant="warning">TypeScript</Pill>
            <Pill variant="secondary">Hono</Pill>
            <Pill variant="secondary">Lucide</Pill>
            <Pill variant="secondary">@odla-ai/ui</Pill>
          </div>
        </div>
      </Section>

      <footer style={{ textAlign: 'center', padding: '3rem 0', opacity: 0.4, fontSize: '0.875rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <Rocket size={16} />
          <span>Powered by Gemma 4 & OpenHands</span>
        </div>
        <p>© 2026 Gemma Testing Project</p>
      </footer>
    </div>
  );
}
