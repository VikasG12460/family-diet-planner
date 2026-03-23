/**
 * Safely calculates the progress percentage.
 * Returns 0 if target is 0 to avoid Infinity/NaN.
 */
export function calculateProgressPercentage(consumed: number, target: number): number {
  if (target <= 0) return 0;
  return Math.round((consumed / target) * 100);
}

/**
 * Determines the visual width of the progress bar.
 * Caps at 100% so the bar doesn't overflow the container.
 */
export function getProgressBarWidth(percentage: number): number {
  return Math.min(percentage, 100);
}

/**
 * Determines the color class for the progress bar based on status.
 */
export function getProgressColorClass(percentage: number): string {
  if (percentage >= 100) return 'bg-emerald-500'; // Goal met
  if (percentage >= 80) return 'bg-amber-400';    // Close to goal
  return 'bg-emerald-500';                        // Normal
}