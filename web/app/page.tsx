import Deck, { type SlideDef } from "@/components/Deck";
import Cover from "@/components/slides/Cover";
import Journey from "@/components/slides/Journey";
import Verdict from "@/components/slides/Verdict";
import Wait from "@/components/slides/Wait";
import Bottlenecks from "@/components/slides/Bottlenecks";
import Tracking from "@/components/slides/Tracking";

const slides: SlideDef[] = [
  { id: "capa", title: "A porta demora a abrir", content: <Cover /> },
  { id: "jornada", title: "O caminho de quem clica", content: <Journey /> },
  { id: "veredito", title: "O veredito do Google", content: <Verdict /> },
  { id: "espera", title: "Sinta a espera", content: <Wait /> },
  { id: "gargalos", title: "Onde o tempo se perde", content: <Bottlenecks /> },
  { id: "rastreamento", title: "Rastreamento", content: <Tracking /> },
];

export default function Home() {
  return <Deck slides={slides} />;
}
