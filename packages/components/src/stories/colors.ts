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

const _quantaSlate = [
  {
    name: 'denim',
    hex: '#021322',
  },
  {
    name: 'air',
    hex: '#fff',
  },
  {
    name: 'space',
    hex: '#000',
  },
];

export const quantaColors = _quantaSlate.reduce(
  (acc, value, index) => ({
    ...acc,
    [value.name]: value.hex,
  }),
  {},
);

const _quantaGreys = [
  {
    name: 'snow',
    hex: '#f3f5f7',
  },
  {
    name: 'smoke',
    hex: '#e4e8ec',
  },
  {
    name: 'silver',
    hex: '#c3cdd5',
  },
  {
    name: 'dolphin',
    hex: '#8296a6',
  },
  {
    name: 'pigeon',
    hex: '#617789',
  },
  {
    name: 'iron',
    hex: '#4a5b68',
  },
];

export const quantaGreys = _quantaGreys.reduce(
  (acc, value, index) => ({
    ...acc,
    [value.name]: value.hex,
  }),
  {},
);

const _quantaBlues = [
  {
    name: 'arctic',
    hex: '#e2f1fd',
  },
  {
    name: 'sky',
    hex: '#c5e3fc',
  },
  {
    name: 'azure',
    hex: '#7cc0f8',
  },
  {
    name: 'cobalt',
    hex: '#2597f4',
  },
  {
    name: 'sapphire',
    hex: '#0b78d0',
  },
  {
    name: 'royal',
    hex: '#085696',
  },
];

export const quantaBlues = _quantaBlues.reduce(
  (acc, value, index) => ({
    ...acc,
    [value.name]: value.hex,
  }),
  {},
);

const _quantaReds = [
  {
    name: 'ballet',
    hex: '#fee9e7',
  },
  {
    name: 'flamingo',
    hex: '#fcd0ca',
  },
  {
    name: 'poppy',
    hex: '#f9a094',
  },
  {
    name: 'rose',
    hex: '#f54e38',
  },
  {
    name: 'candy',
    hex: '#d0220b',
  },
  {
    name: 'wine',
    hex: '#a91c09',
  },
];

export const quantaReds = _quantaReds.reduce(
  (acc, value, index) => ({
    ...acc,
    [value.name]: value.hex,
  }),
  {},
);

const _quantaYellows = [
  {
    name: 'cream',
    hex: '#fcf3cf',
  },
  {
    name: 'banana',
    hex: '#faeaad',
  },
  {
    name: 'lemmon',
    hex: '#f6d355',
  },
  {
    name: 'gold',
    hex: '#b48f09',
  },
  {
    name: 'dijon',
    hex: '#917308',
  },
  {
    name: 'bronze',
    hex: '#6b5506',
  },
];

export const quantaYellows = _quantaYellows.reduce(
  (acc, value, index) => ({
    ...acc,
    [value.name]: value.hex,
  }),
  {},
);

const _quantaGreens = [
  {
    name: 'daiquiri',
    hex: '#e2f7de',
  },
  {
    name: 'mint',
    hex: '#c5efbe',
  },
  {
    name: 'celery',
    hex: '#8bde7c',
  },
  {
    name: 'neon',
    hex: '#3da72a',
  },
  {
    name: 'emerald',
    hex: '#318722',
  },
  {
    name: 'turtle',
    hex: '#256619',
  },
];

export const quantaGreens = _quantaGreens.reduce(
  (acc, value, index) => ({
    ...acc,
    [value.name]: value.hex,
  }),
  {},
);

const _quantaBlueGreens = [
  {
    name: 'aqua',
    hex: '#d6f5f2',
  },
  {
    name: 'spa',
    hex: '#baeee9',
  },
  {
    name: 'tiffany',
    hex: '#74dcd4',
  },
  {
    name: 'turquoise',
    hex: '#29a399',
  },
  {
    name: 'peacock',
    hex: '#207e77',
  },
  {
    name: 'puya',
    hex: '#175e58',
  },
];

export const quantaBlueGreens = _quantaBlueGreens.reduce(
  (acc, value, index) => ({
    ...acc,
    [value.name]: value.hex,
  }),
  {},
);
