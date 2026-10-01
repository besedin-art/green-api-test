export function formatLastSeen(lastSeen: number, now: number) {
  const elapsedSeconds = Math.max(0, Math.floor(now / 1000) - lastSeen);

  if (elapsedSeconds < 30) return 'в сети';
  if (elapsedSeconds < 60) return `${elapsedSeconds} сек. назад`;

  const elapsedMinutes = Math.floor(elapsedSeconds / 60);
  if (elapsedMinutes < 60) return `${elapsedMinutes} мин. назад`;

  const elapsedHours = Math.floor(elapsedMinutes / 60);
  if (elapsedHours < 24) return `${elapsedHours} ч. назад`;

  return `${Math.floor(elapsedHours / 24)} дн. назад`;
}
