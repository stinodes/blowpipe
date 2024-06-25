export const formatDuration = (seconds: number) => {
  return [
    Math.floor(seconds / 3600),
    Math.floor((seconds % 3600) / 60)
      .toFixed(0)
      .padStart(2, '0'),
    (seconds % 60).toFixed(0).padStart(2, '0'),
  ]
    .filter((v, i) => i !== 0 || v !== 0)
    .join(':');
};
