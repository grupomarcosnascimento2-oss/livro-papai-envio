import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";

type Entrega = "retirada" | "correio" | undefined;

const PIX_COPIA_COLA_RETIRADA =
  "00020126580014br.gov.bcb.pix0136a8883d46-c869-4ed6-8dd3-d106c1d573cd520400005303986540539.905802BR5924Marcos Nascimento de Sou6009Sao Paulo62230519daqr4316215470887786304CA4B";

export const Route = createFileRoute("/pagamento")({
  validateSearch: (search: Record<string, unknown>): { entrega?: Entrega } => ({
    entrega:
      search["entrega"] === "retirada" || search["entrega"] === "correio"
        ? (search["entrega"] as Entrega)
        : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Pagamento — Da Roça ao Serviço no Altar" },
      {
        name: "description",
        content:
          "Finalize o pagamento e garanta seu exemplar de 'Da Roça ao Serviço no Altar'.",
      },
    ],
  }),
  component: Pagamento,
});

function Pagamento() {
  const { entrega } = Route.useSearch();

  if (entrega === "retirada") {
    return <PagamentoPix />;
  }

  return <Agradecimento />;
}

function PagamentoPix() {
  const [copied, setCopied] = useState(false);

  async function handleCopyPix() {
    try {
      await navigator.clipboard.writeText(PIX_COPIA_COLA_RETIRADA);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Falha silenciosa: o usuário ainda pode selecionar e copiar manualmente.
    }
  }

  return (
    <main className="surface-dark flex min-h-screen items-center px-6 py-16 md:py-24">
      <div className="mx-auto max-w-lg">
        <Reveal>
          <p className="text-center text-xs tracking-[0.42em] text-gold-soft uppercase">
            Retirada no dia do lançamento
          </p>
          <h1 className="mt-4 text-center font-display text-3xl leading-snug text-cream md:text-4xl">
            Finalize seu pagamento
          </h1>
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-8 rounded-2xl border border-gold/35 bg-cream/5 px-6 py-8 text-center md:px-10">
            <p className="font-display text-5xl text-cream">R$ 39,90</p>

            <p className="mt-8 text-sm tracking-[0.28em] text-gold-soft uppercase">
              Pague com Pix
            </p>
            <div className="mt-4 flex flex-col items-stretch gap-3 sm:flex-row">
              <div className="flex-1 truncate rounded-md border border-gold/40 bg-background px-4 py-3 text-left text-sm text-ink/85">
                {PIX_COPIA_COLA_RETIRADA}
              </div>
              <button
                type="button"
                onClick={handleCopyPix}
                className="btn-gold btn-gold-hover shrink-0 whitespace-nowrap"
              >
                {copied ? "Copiado!" : "Copiar Pix"}
              </button>
            </div>

            <div className="mt-10 space-y-3 text-left text-base leading-relaxed text-cream/80">
              <p className="font-display text-lg text-cream">Como pagar:</p>
              <ol className="list-decimal space-y-2 pl-5">
                <li>Copie o código Pix acima.</li>
                <li>Abra o aplicativo do seu banco.</li>
                <li>Escolha Pix Copia e Cola e cole o código.</li>
                <li>
                  Confira o valor de{" "}
                  <strong className="text-cream">R$ 39,90</strong> e confirme
                  o pagamento.
                </li>
              </ol>
            </div>
          </div>
        </Reveal>

        <Reveal delay={200}>
          <div className="mt-8 text-center">
            <p className="text-sm tracking-[0.28em] text-gold-soft/80 uppercase">
              Lançamento oficial
            </p>
            <p className="mt-2 font-display text-lg text-cream">
              26 de setembro de 2026, às 20h30
            </p>
            <p className="mt-1 text-sm text-cream/60">
              Salão da Paróquia Perpétuo Socorro — Taguatinga Centro
            </p>
          </div>
          <p className="mt-6 text-center">
            <Link
              to="/"
              className="text-sm text-cream/60 underline underline-offset-4"
            >
              Voltar para a página do livro
            </Link>
          </p>
        </Reveal>
      </div>
    </main>
  );
}

function Agradecimento() {
  return (
    <main className="surface-light flex min-h-screen items-center px-6 py-20 md:py-28">
      <div className="mx-auto max-w-xl text-center">
        <Reveal>
          <p className="text-xs tracking-[0.42em] text-gold-deep uppercase">
            Pagamento confirmado
          </p>
          <h1 className="mt-6 font-display text-4xl leading-snug md:text-5xl">
            <span className="text-gold-gradient">Obrigado por fazer</span>
            <br />
            <span className="text-gold-gradient">parte desta história</span>
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            Sua reserva do livro{" "}
            <strong className="text-wood">
              "Da Roça ao Serviço no Altar"
            </strong>{" "}
            foi confirmada com sucesso.
          </p>
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-10 rounded-2xl border border-gold/35 bg-card px-6 py-8 md:px-10">
            <p className="text-xs tracking-[0.32em] text-gold-deep uppercase">
              Lançamento oficial
            </p>
            <p className="mt-3 font-display text-2xl text-wood">
              26 de setembro de 2026, às 20h30
            </p>
            <p className="mt-1 text-muted-foreground">
              Salão da Paróquia Perpétuo Socorro — Taguatinga Centro
            </p>
          </div>
        </Reveal>

        <Reveal delay={180}>
          <p className="mt-8 text-base leading-relaxed text-muted-foreground">
            Nos vemos no lançamento! Se você escolheu receber pelos Correios,
            seu exemplar será enviado a partir dessa data.
          </p>
          <p className="mt-6">
            <Link
              to="/"
              className="text-sm text-gold-deep underline underline-offset-4"
            >
              Voltar para a página do livro
            </Link>
          </p>
        </Reveal>
      </div>
    </main>
  );
}
