import inkless from './assets/logo.png';

export const mapPublisherToLogo = (publisher) => {
  return inkless;
}

export const mapTagToLang = (tag) => {
  switch (tag) {
    case "politics":
      return "Politik";
    case "economy":
      return "Wirtschaft";
    case "technology":
      return "Technologie";
    default:
      return "Inkless"
  }
}

export const shorten =
  (string, length) => string.slice(0, length) + (string.length > length ? '...' : '')
