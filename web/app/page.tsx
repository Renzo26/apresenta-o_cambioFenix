import Deck, { type SlideDef } from "@/components/Deck";
import Cover from "@/components/slides/Cover";
import Journey from "@/components/slides/Journey";
import Verdict from "@/components/slides/Verdict";
import Wait from "@/components/slides/Wait";
import Vitals from "@/components/slides/Vitals";
import Ads from "@/components/slides/Ads";
import Weight from "@/components/slides/Weight";
import Bottlenecks from "@/components/slides/Bottlenecks";
import Contact from "@/components/slides/Contact";
import Strengths from "@/components/slides/Strengths";
import Plan from "@/components/slides/Plan";
import Agency from "@/components/slides/Agency";
import Closing from "@/components/slides/Closing";

const slides: SlideDef[] = [
  { id: "capa", title: "A porta demora a abrir", content: <Cover /> },
  { id: "jornada", title: "O caminho de quem clica", content: <Journey /> },
  { id: "veredito", title: "O veredito do Google", content: <Verdict /> },
  { id: "espera", title: "Sinta a espera", content: <Wait /> },
  { id: "notas", title: "As três perguntas do Google", content: <Vitals /> },
  { id: "anuncios", title: "Impacto nos anúncios", content: <Ads /> },
  { id: "peso", title: "O peso da página", content: <Weight /> },
  { id: "gargalos", title: "Onde o tempo se perde", content: <Bottlenecks /> },
  { id: "botao", title: "O botão de contato", content: <Contact /> },
  { id: "base", title: "O que já funciona", content: <Strengths /> },
  { id: "plano", title: "O plano", content: <Plan /> },
  { id: "agencia", title: "Próximos passos", content: <Agency /> },
  { id: "meta", title: "A meta", content: <Closing /> },
];

export default function Home() {
  return <Deck slides={slides} />;
}
