/**
 * All Lottie animations are served from `public/lottie-animals/`.
 * Use these URLs so filenames with spaces encode correctly.
 */
const BASE = "/lottie-animals";

function asset(filename: string): string {
  return `${BASE}/${encodeURIComponent(filename)}`;
}

export const LOTTIE_ANIMALS = {
  welcome: asset("Welcome.json"),
  loading: asset("Loading.json"),
  toucan: asset("Toucan.json"),
  monkey: asset("Monkey.json"),
  cat: asset("Cat.json"),
  turtle: asset("Turtle.json"),
  camaleon: asset("Camaleon.json"),
  monito: asset("monito.json"),
  crocodileOnScooter: asset("crocodile on a scooter.json"),
  dancingCrab: asset("Dancing Crab.json"),
} as const;
