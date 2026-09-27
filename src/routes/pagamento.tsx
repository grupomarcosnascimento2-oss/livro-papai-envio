import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";

type StatusPagamento = "approved" | "pending" | "rejected" | undefined;

export const Route = createFileRoute("/pagamento")({
  validateSearch: (
    search: Record<string, unknown>,
  ): { status?: StatusPagamento } => ({
    status:
      search.status === "approved" ||
      search.collection_status === "approved"
        ? "approved"
        : search.status === "rejected" ||
            search.collection_status === "rejected"
          ? "rejected"
          : search.status === "pending" ||
              search.collection_status === "pending"
            ? "pending"
            : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Obrigado! — Da Roça ao Serviço no Altar" },
      {
        name: "description",
        content:
          "Pagamento confirmado. Obrigado por garantir seu exemplar de 'Da Roça ao Serviço no Altar'.",
      },
    ],
  }),
  component: Pagamento,
});

function Pagamento() {
  const { status } = Route.useSearch();
  return <Agradecimento status={status} />;
}

function Agradecimento({ status }: { status: StatusPagamento }) {
  if (status === "rejected") {
    return (
      <main className="surface-light flex min-h-screen items-center px-6 py-20 md:py-28">
        <div className="mx-auto max-w-xl text-center">
          <Reveal>
            <p className="text-xs tracking-[0.42em] text-gold-deep uppercase">
              Pagamento não aprovado
            </p>
            <h1 className="mt-6 font-display text-4xl leading-snug md:text-5xl">
              Algo não deu certo
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Seu pagamento não foi aprovado pelo Mercado Pago. Isso pode
              acontecer por instabilidade momentânea — tente novamente ou
              escolha outra forma de pagamento.
            </p>
          </Reveal>
          <Reveal delay={100}>
            <p className="mt-8">
              <Link to="/" className="btn-gold btn-gold-hover">
                Voltar e tentar novamente
              </Link>
            </p>
          </Reveal>
        </div>
      </main>
    );
  }

  if (status === "pending") {
    return (
      <main className="surface-light flex min-h-screen items-center px-6 py-20 md:py-28">
        <div className="mx-auto max-w-xl text-center">
          <Reveal>
            <p className="text-xs tracking-[0.42em] text-gold-deep uppercase">
              Pagamento em análise
            </p>
            <h1 className="mt-6 font-display text-4xl leading-snug md:text-5xl">
              <span className="text-gold-gradient">
                Estamos confirmando seu pagamento
              </span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Seu pagamento está sendo processado. Assim que for aprovado,
              sua reserva do livro{" "}
              <strong className="text-wood">
                "Da Roça ao Serviço no Altar"
              </strong>{" "}
              estará confirmada — normalmente isso leva poucos minutos.
            </p>
          </Reveal>
          <Reveal delay={100}>
            <p className="mt-8">
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

  return (
    <main className="surface-light flex min-h-screen items-center px-6 py-20 md:py-28">
      <div className="mx-auto max-w-xl text-center">
        <Reveal>
          <p className="text-xs tracking-[0.42em] text-gold-deep uppercase">
            {status === "approved" ? "Pagamento confirmado" : "Reserva"}
          </p>
          <h1 className="mt-6 font-display text-4xl leading-snug md:text-5xl">
            <span className="text-gold-gradient">Obrigado por fazer</span>
            <br />
            <span className="text-gold-gradient">parte desta história</span>
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            {status === "approved" ? (
              <>
                Sua reserva do livro{" "}
                <strong className="text-wood">
                  "Da Roça ao Serviço no Altar"
                </strong>{" "}
                foi confirmada com sucesso. Seu exemplar será enviado pelos
                Correios a partir da data do lançamento.
              </>
            ) : (
              <>
                Se você concluiu o pagamento, sua reserva do livro{" "}
                <strong className="text-wood">
                  "Da Roça ao Serviço no Altar"
                </strong>{" "}
                está garantida. Seu exemplar será enviado pelos Correios a
                partir da data do lançamento.
              </>
            )}
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
            Nos vemos no lançamento!
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
