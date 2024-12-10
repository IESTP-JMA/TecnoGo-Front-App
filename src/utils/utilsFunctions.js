export function capitalizeFirstLetter (texto) {
  return texto.replace(/^\w/, (c) => c.toUpperCase())
}

export const formatDate = (timestamp) => {
  const date = new Date(timestamp)

  return date
    .toLocaleString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    })
    .replace(',', '')
}

const DATE_OPTIONS = {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric'
}

export const formatPrettyDate = (timestamp) => {
  const date = new Date(timestamp)
  return date.toLocaleDateString('es-ES', DATE_OPTIONS)
}
