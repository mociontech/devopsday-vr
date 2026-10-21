import type { ExperienciaApi } from "./lib/api";

export type ArtItem =
  | { img: string; x: number; y: number; w: number; h: number; iw?: number; ih?: number; rot?: number }
  | { word: string; cx: number; cy: number; w: number; h: number };

export interface Diamond {
  src: string;
  x: number;
  y: number;
  /** Lado de la caja envolvente del rombo rotado -45°. */
  size: number;
}

export interface Experience {
  api: ExperienciaApi;
  nombre: string;
  /** Qué sigue tras el ID: terminar o pasar al paso propio de la experiencia (`Extra`). */
  siguiente: "fin" | "extra";
  diamonds: Diamond[];
  /** Coordenadas del escenario 1920×1080. Las imágenes se centran en su caja y se rotan `rot` grados. */
  art: ArtItem[];
}

export const experience: Experience = {
  api: "vr",
  nombre: "Fútbol VR",
  siguiente: "fin",
  diamonds: [
    { src: "diamond-c", x: 1129.8, y: 80.5, size: 790.2 },
    { src: "diamond-d", x: 31, y: -16, size: 832.4 },
  ],
  art: [
    { img: "robot", x: 1321, y: 300, w: 348.3, h: 395.4, iw: 272.6, ih: 338.1, rot: 14.45 },
    { word: "Fútbol", cx: 884, cy: 456, w: 780, h: 264 },
    { word: "VR", cx: 1251.9, cy: 619.7, w: 809.7, h: 263.3 },
    { img: "ball", x: 356, y: 278, w: 241, h: 244 },
  ],
};
