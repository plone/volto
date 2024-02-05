export const slate = [
  {
    scale: 50,
    hex: '#f8fafc',
    rgb: 'rgb(248,250,252)',
    hsl: 'hsl(210,40%,98%)',
  },
  {
    scale: 100,
    hex: '#f1f5f9',
    rgb: 'rgb(241,245,249)',
    hsl: 'hsl(210,40%,96.1%)',
  },
  {
    scale: 200,
    hex: '#e2e8f0',
    rgb: 'rgb(226,232,240)',
    hsl: 'hsl(214.3,31.8%,91.4%)',
  },
  {
    scale: 300,
    hex: '#cbd5e1',
    rgb: 'rgb(203,213,225)',
    hsl: 'hsl(212.7,26.8%,83.9%)',
  },
  {
    scale: 400,
    hex: '#94a3b8',
    rgb: 'rgb(148,163,184)',
    hsl: 'hsl(215,20.2%,65.1%)',
  },
  {
    scale: 500,
    hex: '#64748b',
    rgb: 'rgb(100,116,139)',
    hsl: 'hsl(215.4,16.3%,46.9%)',
  },
  {
    scale: 600,
    hex: '#475569',
    rgb: 'rgb(71,85,105)',
    hsl: 'hsl(215.3,19.3%,34.5%)',
  },
  {
    scale: 700,
    hex: '#334155',
    rgb: 'rgb(51,65,85)',
    hsl: 'hsl(215.3,25%,26.7%)',
  },
  {
    scale: 800,
    hex: '#1e293b',
    rgb: 'rgb(30,41,59)',
    hsl: 'hsl(217.2,32.6%,17.5%)',
  },
  {
    scale: 900,
    hex: '#0f172a',
    rgb: 'rgb(15,23,42)',
    hsl: 'hsl(222.2,47.4%,11.2%)',
  },
  {
    scale: 950,
    hex: '#020617',
    rgb: 'rgb(2,6,23)',
    hsl: 'hsl(222.2,84%,4.9%)',
  },
];

export const colors = slate.reduce(
  (acc, value, index) => ({
    ...acc,
    [value.scale]: value.hex,
  }),
  {},
);
