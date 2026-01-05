tailwind.config = {
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Space Grotesk", "sans-serif"],
      },
      colors: {
        background: "var(--bg-primary)",
        surface: "var(--bg-secondary)",
        "surface-hover": "var(--bg-surface)",
        primary: "var(--primary-color)",
        "primary-dark": "var(--primary-dark)",
        text: "var(--text-primary)",
        "text-muted": "var(--text-secondary)",
        border: "var(--border-color)",
        "glass-bg": "var(--glass-bg)",
        "glass-border": "var(--glass-border)",
      },
      animation: {
        'ping-slow': 'ping 3s cubic-bezier(0, 0, 0.2, 1) infinite',
      }
    },
  },
};
