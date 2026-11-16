class Parquimetro {
  #valorPago = 0;

  constructor() {
    this.planoSelecionado = null;

    this.planos = {
      basico: {
        preco: 1.0,
        tempo: 30,
      },

      padrao: {
        preco: 1.75,
        tempo: 60,
      },

      completo: {
        preco: 3.0,
        tempo: 120,
      },
    };
  }

  selecionarPlano(plano) {
    this.planoSelecionado = plano;
  }

  obterPlano() {
    return this.planos[this.planoSelecionado];
  }

  receberPagamento(valor) {
    this.#valorPago = valor;
  }

  validarPagamento() {
    return this.#valorPago >= this.obterPlano().preco;
  }

  calcularTroco() {
    return this.#valorPago - this.obterPlano().preco;
  }

  obterTempo() {
    return this.obterPlano().tempo;
  }

  validarPlano() {
    return this.planoSelecionado !== null;
  }

  calcularPermanencia() {
    if (!this.validarPlano()) {
      return "Selecione um plano";
    }

    if (!this.validarPagamento()) {
      return "Valor insuficiente";
    }
    return {
      tempo: this.obterTempo(),
      troco: this.calcularTroco(),
    };
  }
}

const parquimetro = new Parquimetro();

const cardsPlanos = document.querySelectorAll(
  ".plan-card-basic, .plan-card-standard, .plan-card-complete",
);

const campoPagamento = document.querySelector("#payment-value");

cardsPlanos.forEach((card) => {
  card.addEventListener("click", () => {
    const plano = card.dataset.plano;

    parquimetro.selecionarPlano(plano);

    cardsPlanos.forEach((item) => {
      item.classList.remove("selected");
    });

    card.classList.add("selected");
  });
});

campoPagamento.addEventListener("input", () => {
  campoPagamento.value = formatarMoeda(campoPagamento.value);
});

function formatarMoeda(valor) {
  const numero = valor.replace(/\D/g, "");
  const centavos = Number(numero) / 100;

  return centavos.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

const botaoCalcular = document.querySelector(".calculate-button");

botaoCalcular.addEventListener("click", () => {
  const valorNumerico = Number(
    campoPagamento.value.replace(/\./g, "").replace(",", "."),
  );

  parquimetro.receberPagamento(valorNumerico);

  console.log(parquimetro.calcularPermanencia());

  const resultado = parquimetro.calcularPermanencia();

  if (typeof resultado === "string") {
    alert(resultado);
    return;
  }
  resultadoTempo.textContent = `${resultado.tempo} minutos`;

  resultadoTroco.textContent = resultado.troco.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
});

const resultadoTempo = document.querySelector(".time-value");
const resultadoTroco = document.querySelector(".change-value");
