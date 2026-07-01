// Iconos SVG minimalistas, estilo lineal suave (redondeado, tipo Apple SF)
import React from "react";

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

export const Ico = {
  spark: ({ s = 18, ...p }) => (
    <svg viewBox="0 0 24 24" width={s} height={s} {...base} {...p}>
      <path d="M12 3c.4 3.5 1.5 4.6 5 5-3.5.4-4.6 1.5-5 5-.4-3.5-1.5-4.6-5-5 3.5-.4 4.6-1.5 5-5z" />
    </svg>
  ),
  send: ({ s = 18, ...p }) => (
    <svg viewBox="0 0 24 24" width={s} height={s} {...base} {...p}>
      <path d="M4 12l15-7-6 15-2.5-6L4 12z" />
    </svg>
  ),
  cal: ({ s = 18, ...p }) => (
    <svg viewBox="0 0 24 24" width={s} height={s} {...base} {...p}>
      <rect x="3.5" y="5" width="17" height="15" rx="4" />
      <path d="M3.5 9.5h17M8 3v4M16 3v4" />
    </svg>
  ),
  bed: ({ s = 18, ...p }) => (
    <svg viewBox="0 0 24 24" width={s} height={s} {...base} {...p}>
      <path d="M3 18v-5.5A2.5 2.5 0 015.5 10h13A2.5 2.5 0 0121 12.5V18M3 15h18M3 18v2M21 18v2M7 10V8.5A1.5 1.5 0 018.5 7h7A1.5 1.5 0 0117 8.5V10" />
    </svg>
  ),
  grid: ({ s = 18, ...p }) => (
    <svg viewBox="0 0 24 24" width={s} height={s} {...base} {...p}>
      <rect x="4" y="4" width="7" height="7" rx="2.5" />
      <rect x="13" y="4" width="7" height="7" rx="2.5" />
      <rect x="4" y="13" width="7" height="7" rx="2.5" />
      <rect x="13" y="13" width="7" height="7" rx="2.5" />
    </svg>
  ),
  pin: ({ s = 18, ...p }) => (
    <svg viewBox="0 0 24 24" width={s} height={s} {...base} {...p}>
      <path d="M12 21s7-5.5 7-11a7 7 0 10-14 0c0 5.5 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  ),
  chat: ({ s = 18, ...p }) => (
    <svg viewBox="0 0 24 24" width={s} height={s} {...base} {...p}>
      <path d="M5 5h14a2 2 0 012 2v7a2 2 0 01-2 2H10l-4 4v-4H5a2 2 0 01-2-2V7a2 2 0 012-2z" />
    </svg>
  ),
  close: ({ s = 20, ...p }) => (
    <svg viewBox="0 0 24 24" width={s} height={s} {...base} {...p}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  ),
  arrow: ({ s = 16, ...p }) => (
    <svg viewBox="0 0 24 24" width={s} height={s} {...base} {...p}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  ),
  star: ({ s = 14, ...p }) => (
    <svg viewBox="0 0 24 24" width={s} height={s} fill="currentColor" {...p}>
      <path d="M12 2l2.9 6.3 6.9.7-5.1 4.6 1.4 6.8L12 17.8 5.9 20.4l1.4-6.8L2.2 9l6.9-.7L12 2z" />
    </svg>
  ),
  users: ({ s = 18, ...p }) => (
    <svg viewBox="0 0 24 24" width={s} height={s} {...base} {...p}>
      <circle cx="9" cy="8" r="3" />
      <path d="M3.5 20a5.5 5.5 0 0111 0M16 5.5a3 3 0 010 5.8M17 20a5.5 5.5 0 00-3-4.9" />
    </svg>
  ),
};
