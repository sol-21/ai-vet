export const SUPPORTED_EXTENSIONS = ['.js', '.jsx', '.ts', '.tsx', '.vue'] as const;

export type SupportedExtension = typeof SUPPORTED_EXTENSIONS[number];
