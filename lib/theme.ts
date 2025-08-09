export const colors = {
  /** Primary brand colour */
  primary: '#7321cf',
  /** Secondary highlight colour */
  secondary: '#d9dc4a',
  /** Accent colour used for backgrounds */
  accent: 'white'
};

// Primary action button.  Reduced padding and font size for a compact mobile‑friendly footprint.
export const btn: React.CSSProperties = {
  padding: '8px 12px',
  borderRadius: 8,
  border: `1px solid ${colors.primary}`,
  background: colors.primary,
  color: colors.accent,
  textAlign: 'center',
  fontSize: 14
};

// Ghost (outline) button.  Uses the primary colour for border and text, with a light background.  Sized to match `btn`.
export const btnGhost: React.CSSProperties = {
  padding: '8px 12px',
  borderRadius: 8,
  border: `1px solid ${colors.primary}`,
  background: colors.accent,
  color: colors.primary,
  textAlign: 'center',
  fontSize: 14
};

export const input: React.CSSProperties = {
  padding: '12px 14px',
  borderRadius: 10,
  border: '1px solid #ddd'
};

export const ta: React.CSSProperties = {
  width: '100%',
  padding: '10px 12px',
  border: '1px solid #ddd',
  borderRadius: 10
};