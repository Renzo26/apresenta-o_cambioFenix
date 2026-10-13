import Image from "next/image";
import shot from "@/public/images/site-mobile.png";

type Props = {
  /** 0 → tela em branco carregando, 1 → site visível */
  loaded?: boolean;
  /** progresso da barra do navegador, 0–1 */
  progress?: number;
  priority?: boolean;
  className?: string;
};

export default function Phone({ loaded = true, progress = 1, priority, className }: Props) {
  return (
    <div className={`phone${loaded ? " is-loaded" : ""}${className ? ` ${className}` : ""}`}>
      <div className="phone__bezel">
        <div className="phone__island" aria-hidden />
        <div className="phone__bar" aria-hidden>
          <span className="phone__lock" />
          <span className="phone__url">cambiofenix.com</span>
          <span className="phone__load" style={{ transform: `scaleX(${loaded ? 0 : progress})` }} />
        </div>
        <div className="phone__screen">
          <Image
            src={shot}
            alt="Página inicial do site cambiofenix.com aberta em um celular"
            placeholder="blur"
            sizes="(max-width: 720px) 44vw, 300px"
            priority={priority}
            className="phone__shot"
          />
          <div className="phone__blank" aria-hidden>
            <span className="phone__spinner" />
          </div>
        </div>
      </div>
    </div>
  );
}
