import { useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import bookCover from "@/assets/book-cover.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Da Roça ao Serviço no Altar — Pré-lançamento" },
      {
        name: "description",
        content:
          "Pré-lançamento do livro sobre a vida de Valdemar Joaquim, Ministro Extraordinário da Comunhão Eucarística, escrito por seu filho Marcos Nascimento.",
      },
      { property: "og:title", content: "Da Roça ao Serviço no Altar" },
      {
        property: "og:description",
        content:
          "Uma história simples. Uma vida de fé. Um legado que permanece. Participe do pré-lançamento.",
      },
      { property: "og:type", content: "book" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

// Substituir pelo número real de contato quando disponível.
const WHATSAPP =
  "https://wa.me/?text=" +
  encodeURIComponent(
    'Olá! Quero reservar meu exemplar do livro "Da Roça ao Serviço no Altar".',
  );

const SHEETS_URL =
  "https://script.google.com/macros/s/AKfycbxCeBePSnN1EUUNaGWziXZN6wZyV8UDfTCo2CmYysPG9ZrmHb7AWphsnEveiddRZw-86Q/exec";

function Ornament() {
  return (
    <div className="flex items-center justify-center gap-3 text-gold">
      <span className="h-px w-14 rule-gold" aria-hidden />
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M12 2v20M6 8h12"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </svg>
      <span className="h-px w-14 rule-gold" aria-hidden />
    </div>
  );
}

type TipoEntrega = "correio";

const ENTREGA_UNICA: {
  id: TipoEntrega;
  titulo: string;
  preco: string;
  descricao: string;
  linkPagamento: string;
} = {
  id: "correio",
  titulo: "Receber em casa pelos Correios",
  preco: "R$ 59,90",
  descricao:
    "Para a sua comodidade, o exemplar é enviado pelos Correios (frete grátis) direto para a sua residência, a partir da data do lançamento.",
  linkPagamento: "https://mpago.li/1sYScuJ",
};

function ReservaForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [bairro, setBairro] = useState("");
  const [endereco, setEndereco] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");
  const [estado, setEstado] = useState("");
  const [cidade, setCidade] = useState("");
  const [cep, setCep] = useState("");
  const [sent, setSent] = useState(false);

  const opcaoEscolhida = ENTREGA_UNICA;

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    fetch(SHEETS_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({
        nome: name,
        email,
        whatsapp,
        entrega: opcaoEscolhida.titulo,
        preco: opcaoEscolhida.preco,
        bairro,
        endereco,
        numero,
        complemento,
        estado,
        cidade,
        cep,
      }),
    }).catch(() => {
      // Envio silencioso: falha aqui não deve impedir a confirmação ao usuário.
    });

    setSent(true);

    // Segue direto para o Mercado Pago (várias formas de pagamento).
    setTimeout(() => {
      window.location.href = opcaoEscolhida.linkPagamento;
    }, 900);
  }

  if (sent) {
    return (
      <div>
        <p className="font-display text-xl text-gold-soft">
          Obrigado! Sua reserva foi registrada com sucesso.
        </p>
        <p className="mt-3 text-sm text-cream/60">
          Redirecionando para o pagamento...
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      autoComplete="off"
      className="mx-auto flex max-w-md flex-col gap-4 text-left"
    >
      <div className="rounded-lg border border-gold bg-cream/10 px-4 py-5">
        <p className="font-display text-xl text-cream">
          {opcaoEscolhida.titulo}
        </p>
        <p className="mt-1 font-display text-2xl text-gold-soft">
          {opcaoEscolhida.preco}
        </p>
        <p className="mt-2 text-base leading-relaxed text-cream/70">
          {opcaoEscolhida.descricao}
        </p>
      </div>

      <div>
        <label htmlFor="reserva-nome" className="text-sm text-cream/70">
          Nome
        </label>
        <input
          id="reserva-nome"
          autoComplete="off"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 w-full rounded-md border border-gold/30 bg-cream/5 px-4 py-3 text-cream placeholder:text-cream/40 focus:border-gold/70 focus:outline-none"
          placeholder="Seu nome completo"
        />
      </div>
      <div>
        <label htmlFor="reserva-email" className="text-sm text-cream/70">
          E-mail
        </label>
        <input
          id="reserva-email"
          autoComplete="off"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 w-full rounded-md border border-gold/30 bg-cream/5 px-4 py-3 text-cream placeholder:text-cream/40 focus:border-gold/70 focus:outline-none"
          placeholder="seu@email.com"
        />
      </div>
      <div>
        <label htmlFor="reserva-whatsapp" className="text-sm text-cream/70">
          WhatsApp
        </label>
        <input
          id="reserva-whatsapp"
          autoComplete="off"
          type="tel"
          required
          value={whatsapp}
          onChange={(e) => setWhatsapp(e.target.value)}
          className="mt-1 w-full rounded-md border border-gold/30 bg-cream/5 px-4 py-3 text-cream placeholder:text-cream/40 focus:border-gold/70 focus:outline-none"
          placeholder="(00) 00000-0000"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2 sm:col-span-1">
              <label
                htmlFor="reserva-endereco"
                className="text-sm text-cream/70"
              >
                Endereço
              </label>
              <input
                id="reserva-endereco"
          autoComplete="off"
                type="text"
                required
                value={endereco}
                onChange={(e) => setEndereco(e.target.value)}
                className="mt-1 w-full rounded-md border border-gold/30 bg-cream/5 px-4 py-3 text-cream placeholder:text-cream/40 focus:border-gold/70 focus:outline-none"
                placeholder="Rua, avenida..."
              />
            </div>
            <div>
              <label
                htmlFor="reserva-numero"
                className="text-sm text-cream/70"
              >
                Número
              </label>
              <input
                id="reserva-numero"
          autoComplete="off"
                type="text"
                required
                value={numero}
                onChange={(e) => setNumero(e.target.value)}
                className="mt-1 w-full rounded-md border border-gold/30 bg-cream/5 px-4 py-3 text-cream placeholder:text-cream/40 focus:border-gold/70 focus:outline-none"
                placeholder="Nº"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="reserva-bairro"
                className="text-sm text-cream/70"
              >
                Bairro
              </label>
              <input
                id="reserva-bairro"
          autoComplete="off"
                type="text"
                required
                value={bairro}
                onChange={(e) => setBairro(e.target.value)}
                className="mt-1 w-full rounded-md border border-gold/30 bg-cream/5 px-4 py-3 text-cream placeholder:text-cream/40 focus:border-gold/70 focus:outline-none"
                placeholder="Seu bairro"
              />
            </div>
            <div>
              <label
                htmlFor="reserva-complemento"
                className="text-sm text-cream/70"
              >
                Complemento (opcional)
              </label>
              <input
                id="reserva-complemento"
          autoComplete="off"
                type="text"
                value={complemento}
                onChange={(e) => setComplemento(e.target.value)}
                className="mt-1 w-full rounded-md border border-gold/30 bg-cream/5 px-4 py-3 text-cream placeholder:text-cream/40 focus:border-gold/70 focus:outline-none"
                placeholder="Apto, bloco..."
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="reserva-cidade"
                className="text-sm text-cream/70"
              >
                Cidade
              </label>
              <input
                id="reserva-cidade"
          autoComplete="off"
                type="text"
                required
                value={cidade}
                onChange={(e) => setCidade(e.target.value)}
                className="mt-1 w-full rounded-md border border-gold/30 bg-cream/5 px-4 py-3 text-cream placeholder:text-cream/40 focus:border-gold/70 focus:outline-none"
                placeholder="Sua cidade"
              />
            </div>
            <div>
              <label
                htmlFor="reserva-estado"
                className="text-sm text-cream/70"
              >
                Estado
              </label>
              <input
                id="reserva-estado"
          autoComplete="off"
                type="text"
                required
                value={estado}
                onChange={(e) => setEstado(e.target.value)}
                className="mt-1 w-full rounded-md border border-gold/30 bg-cream/5 px-4 py-3 text-cream placeholder:text-cream/40 focus:border-gold/70 focus:outline-none"
                placeholder="UF"
              />
            </div>
          </div>

          <div>
            <label htmlFor="reserva-cep" className="text-sm text-cream/70">
              CEP
            </label>
            <input
              id="reserva-cep"
          autoComplete="off"
              type="text"
              required
              value={cep}
              onChange={(e) => setCep(e.target.value)}
              className="mt-1 w-full rounded-md border border-gold/30 bg-cream/5 px-4 py-3 text-cream placeholder:text-cream/40 focus:border-gold/70 focus:outline-none"
              placeholder="00000-000"
            />
          </div>

      <button type="submit" className="btn-gold btn-gold-hover mt-2">
        Quero reservar meu exemplar
      </button>
    </form>
  );
}

const journey = [
  {
    tag: "Da Roça",
    place: "São João do Piauí",
    text: "Onde nasceram os primeiros valores: trabalho, simplicidade, coragem e perseverança.",
  },
  {
    tag: "Para Brasília",
    place: "Uma viagem de 40 dias",
    text: "Um jovem deixando sua terra em busca de uma nova vida.",
  },
  {
    tag: "Exército",
    place: "Disciplina e reconhecimento",
    text: "O menino da roça tornou-se soldado e descobriu que dedicação e zelo poderiam abrir caminhos inesperados.",
  },
  {
    tag: "Família",
    place: "Maria José, Marcos, Mauriceia e Tiago",
    text: "Uma família construída com amor, trabalho, presença e fé.",
  },
  {
    tag: "O Chamado",
    place: "Ministro Extraordinário da Comunhão Eucarística",
    text: "Um novo capítulo de serviço à Igreja.",
  },
  {
    tag: "Caldas Novas",
    place: "Uma missão que continuou",
    text: "Na Igreja Matriz Nossa Senhora das Dores e no Santuário Nossa Senhora de Salette, Valdemar continuou servindo com o mesmo zelo.",
  },
];

function Index() {
  return (
    <main className="overflow-x-hidden">
      {/* HERO */}
      <section className="surface-light relative px-6 pt-20 pb-24 md:pt-28 md:pb-32">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <p className="text-xs tracking-[0.42em] text-gold-deep uppercase">
              Pré-lançamento
            </p>
            <h1 className="mt-6 font-display text-5xl leading-[1.05] md:text-7xl">
              <span className="text-gold-gradient">Da Roça ao</span>
              <br />
              <span className="text-gold-gradient">Serviço no Altar</span>
            </h1>
            <div className="mx-auto mt-8 max-w-md">
              <p className="font-display text-2xl leading-relaxed text-wood md:text-3xl">
                Uma história simples.
                <br />
                Uma vida de fé.
                <br />
                Um legado que permanece.
              </p>
              <p className="mt-7 text-base leading-relaxed text-muted-foreground">
                A história de{" "}
                <strong className="font-semibold text-wood">
                  Valdemar Joaquim
                </strong>
                , contada por seu filho Marcos Nascimento, para guardar em
                palavras uma vida marcada pela simplicidade, pelo trabalho, pela
                família, pela fé e pelo serviço à Igreja.
              </p>
            </div>
          </Reveal>

          <Reveal delay={200} className="mt-12 flex justify-center">
            <div className="relative">
              <div
                className="absolute -inset-10 rounded-full opacity-70 blur-3xl"
                style={{
                  background:
                    "radial-gradient(circle, oklch(0.85 0.13 84 / 0.55), transparent 65%)",
                }}
                aria-hidden
              />
              <img
                src={bookCover}
                width={1024}
                height={1536}
                alt="Capa do livro Da Roça ao Serviço no Altar, de Marcos Nascimento"
                className="relative w-[320px] rounded-r-md md:w-[420px]"
                style={{
                  transform: "perspective(1400px) rotateY(-13deg)",
                }}
              />
            </div>
          </Reveal>

          <Reveal delay={280} className="mt-12 flex justify-center">
            <a href="#reserva" className="btn-gold btn-gold-hover">
              Quero participar do pré-lançamento
            </a>
          </Reveal>
        </div>
      </section>

      {/* JORNADA */}
      <section className="bg-secondary px-6 py-24 md:py-32">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <h2 className="text-center font-display text-4xl md:text-5xl">
              Este livro nasceu de uma história real
            </h2>
            <p className="mt-5 text-center font-display text-2xl text-wood">
              Uma vida simples. Uma grande caminhada.
            </p>
          </Reveal>
          <Reveal delay={80}>
            <div className="mx-auto mt-10 max-w-2xl space-y-5 text-center text-lg leading-[1.9] text-muted-foreground">
              <p>
                Algumas histórias merecem ser contadas.
                <br />
                Outras precisam ser preservadas.
              </p>
              <p>
                A vida de{" "}
                <strong className="font-semibold text-gold-deep">
                  Valdemar Joaquim
                </strong>{" "}
                foi construída longe dos holofotes.
              </p>
              <p>Começou na simplicidade da roça, no interior do Piauí.</p>
            </div>
          </Reveal>
          <ol className="mt-16 space-y-10 border-l border-gold/40 pl-8 md:pl-12">
            {journey.map((step, i) => (
              <li key={step.tag}>
                <Reveal delay={i * 80}>
                  <span
                    className="absolute -ml-[2.55rem] mt-2 block h-3 w-3 rounded-full bg-gold md:-ml-[3.55rem]"
                    aria-hidden
                  />
                  <h3 className="text-xs tracking-[0.32em] text-gold-deep uppercase">
                    {step.tag}
                  </h3>
                  <p className="mt-2 font-display text-2xl text-wood">
                    {step.place}
                  </p>
                  <p className="mt-2 leading-relaxed text-muted-foreground">
                    {step.text}
                  </p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FRASE CENTRAL */}
      <section className="surface-dark px-6 py-24 md:py-28">
        <Reveal>
          <p className="mx-auto max-w-3xl text-center font-display text-3xl leading-snug md:text-5xl">
            <span className="text-gold-gradient">
              “Uma vida simples pode deixar um legado extraordinário.”
            </span>
          </p>
        </Reveal>
      </section>

      {/* DENTRO DO LIVRO */}
      <section className="bg-background px-6 py-24 md:py-32">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <h2 className="text-center font-display text-4xl md:text-5xl">
              Mais do que uma biografia
            </h2>
            <p className="mt-8 text-center text-lg leading-[1.9] text-muted-foreground">
              Este livro reúne lembranças, acontecimentos e testemunhos de uma
              vida que foi muito maior do que as palavras conseguem explicar.
            </p>
            <div className="mx-auto mt-8 max-w-2xl space-y-5 text-center text-lg leading-[1.9] text-muted-foreground">
              <p>
                E é justamente por isso que este livro foi escrito. Para que a
                história de Valdemar não fique apenas na memória daqueles que
                conviveram com ele.
              </p>
              <p>
                Para que ela possa atravessar o tempo. Para que seus filhos,
                seus netos e as próximas gerações possam conhecer o homem que
                ele foi.
              </p>
              <p>
                E para que todos aqueles que um dia cruzaram seu caminho
                possam guardar essa lembrança em um lugar especial.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* PRÉ-LANÇAMENTO */}
      <section id="reserva" className="surface-dark px-6 py-28 md:py-36">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <p className="text-xs tracking-[0.42em] text-gold-soft uppercase">
              Pré-lançamento
            </p>
            <h2 className="mt-6 font-display text-4xl leading-snug md:text-5xl">
              <span className="text-gold-gradient">
                Faça parte deste momento
              </span>
            </h2>
            <div className="mx-auto mt-10 max-w-xl space-y-5 text-lg leading-[1.9] text-cream/80">
              <p>
                Este é o pré-lançamento de uma história muito especial para
                nossa família.
              </p>
              <p>
                Antes que o livro chegue oficialmente às mãos dos leitores,
                quero convidar especialmente você que conheceu meu pai,
                conviveu com ele ou fez parte de algum momento de sua
                caminhada.
              </p>
              <p>
                Participar deste pré-lançamento é mais do que reservar um
                livro. É dizer:
              </p>
              <p className="font-display text-2xl text-gold-soft">
                “Eu quero fazer parte da preservação dessa história.”
              </p>
              <p className="font-display text-xl text-gold-soft">
                Lançamento oficial dia 26 de setembro de 2026 às 20h30, no
                salão da Paróquia Perpétuo Socorro, em Taguatinga Centro.
              </p>
            </div>
            <div className="mt-14">
              <ReservaForm />
            </div>
          </Reveal>
        </div>
      </section>

      {/* RODAPÉ */}
      <footer className="bg-background px-6 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-2xl tracking-wide text-gold-deep">
            Da Roça ao Serviço no Altar
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
            A vida simples de Valdemar Joaquim, um Ministro Extraordinário da
            Comunhão Eucarística que Tocou Nossos Corações
          </p>
          <p className="mt-4 text-sm tracking-[0.22em] text-wood uppercase">
            Marcos Nascimento
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-quiet inline-flex items-center gap-2"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden
              >
                <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.39 1.26 4.82L2 22l5.44-1.36a9.87 9.87 0 0 0 4.6 1.13h.01c5.46 0 9.9-4.45 9.9-9.91C21.95 6.45 17.5 2 12.04 2Zm0 18.02h-.01a8.1 8.1 0 0 1-4.13-1.13l-.3-.18-3.23.81.86-3.15-.19-.32a8.09 8.09 0 0 1-1.24-4.32c0-4.48 3.65-8.13 8.14-8.13 2.17 0 4.21.85 5.75 2.39a8.07 8.07 0 0 1 2.38 5.75c0 4.48-3.65 8.28-8.03 8.28Zm4.45-6.08c-.24-.12-1.43-.71-1.65-.79-.22-.08-.38-.12-.55.12-.16.24-.63.79-.77.95-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.94-1.2-.72-.64-1.2-1.44-1.35-1.68-.14-.24-.02-.37.11-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.55-1.32-.75-1.81-.2-.48-.4-.42-.55-.42h-.47c-.16 0-.42.06-.64.3-.22.24-.85.83-.85 2.02s.87 2.35 .99 2.51c.12.16 1.71 2.61 4.15 3.66.58.25 1.03.4 1.38.51.58.18 1.11.16 1.53.1.47-.07 1.43-.58 1.63-1.15.2-.56.2-1.05.14-1.15-.06-.1-.22-.16-.46-.28Z" />
              </svg>
              Falar pelo WhatsApp
            </a>
          </div>
          <div className="mx-auto mt-10 h-px w-40 rule-gold" />
          <p className="mt-6 text-xs text-muted-foreground">
            © {new Date().getFullYear()} Marcos Nascimento. Todos os direitos
            reservados.
          </p>
        </div>
      </footer>
    </main>
  );
}
