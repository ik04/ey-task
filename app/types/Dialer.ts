export interface KeyProps {
  keyLabel: string;
  notation?: string;
  extraAction?: () => void;
  onShortPress: (keyLabel: string) => void;
}
