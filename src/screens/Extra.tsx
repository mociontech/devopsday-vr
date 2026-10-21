import type { Persona } from "../lib/api";

interface Props {
  persona: Persona;
  onTerminar: (persona: Persona | null) => void;
}

/** Fútbol VR no tiene paso extra: tras el ID termina el registro (experience.siguiente = "fin"). */
export default function Extra(_: Props) {
  return null;
}
