





// Carrossel de depoimentos

const track = document.querySelector(".carrossel-track");
const cards = document.querySelectorAll(".depoimento-card");

const btnAnterior = document.querySelector(".carrossel-btn.anterior");
const btnProximo = document.querySelector(".carrossel-btn.proximo");
const indicadoresContainer = document.querySelector(".carrossel-indicadores");

if (track && cards.length > 0 && btnAnterior && btnProximo && indicadoresContainer) {

    let indiceAtual = 0;

    // restante do código do carrossel

function getCardsVisiveis() {
    return window.innerWidth <= 768 ? 1 : 3;
}
function criarIndicadores() {
    indicadoresContainer.innerHTML = "";

    const quantidadePosicoes =
        cards.length - getCardsVisiveis() + 1;

    for (let i = 0; i < quantidadePosicoes; i++) {
        const indicador = document.createElement("button");

        indicador.classList.add("carrossel-indicador");
        indicador.setAttribute("aria-label", `Ir para posição ${i + 1}`);

        if (i === indiceAtual) {
            indicador.classList.add("ativo");
        }

        indicador.addEventListener("click", function () {
            indiceAtual = i;
            atualizarCarrossel();
        });

        indicadoresContainer.appendChild(indicador);
    }
}

criarIndicadores();


function atualizarCarrossel() {
    const larguraCard = cards[0].offsetWidth;
    const gap = 24;

    const distancia = indiceAtual * (larguraCard + gap);

    track.style.transform = `translateX(-${distancia}px)`;

    const indicadores = document.querySelectorAll(".carrossel-indicador");

indicadores.forEach(function (indicador, index) {
    indicador.classList.toggle("ativo", index === indiceAtual);
});
}

btnProximo.addEventListener("click", function () {
    const maxIndice = cards.length - getCardsVisiveis();

    if (indiceAtual < maxIndice) {
        indiceAtual++;
    } else {
        indiceAtual = 0;
    }

    atualizarCarrossel();
});

btnAnterior.addEventListener("click", function () {
    const maxIndice = cards.length - 3;

    if (indiceAtual > 0) {
        indiceAtual--;
    } else {
        indiceAtual = maxIndice;
    }

    atualizarCarrossel();
});

// Autoplay do carrossel

let autoplay;

function iniciarAutoplay() {
    clearInterval(autoplay);

    autoplay = setInterval(function () {
        const maxIndice = cards.length - 3;

        if (indiceAtual < maxIndice) {
            indiceAtual++;
        } else {
            indiceAtual = 0;
        }

        atualizarCarrossel();
    }, 5000);
}

function pararAutoplay() {
    clearInterval(autoplay);
}

iniciarAutoplay();

const carrossel = document.querySelector(".carrossel");

carrossel.addEventListener("mouseenter", pararAutoplay);
carrossel.addEventListener("mouseleave", iniciarAutoplay);

window.addEventListener("resize", function () {
    const maxIndice = cards.length - getCardsVisiveis();

    if (indiceAtual > maxIndice) {
        indiceAtual = maxIndice;
    }

    criarIndicadores();
    atualizarCarrossel();
});

}

// Agendamento /
const inputData = document.querySelector("#data");

if (inputData) {

    const hoje = new Date();

    const ano = hoje.getFullYear();
    const mes = String(hoje.getMonth() + 1).padStart(2, "0");
    const dia = String(hoje.getDate()).padStart(2, "0");

    inputData.setAttribute(
        "min",
        `${ano}-${mes}-${dia}`
    );

}

const botoesServico = document.querySelectorAll(".btn-servico");
const selectServico = document.querySelector("#servico");

botoesServico.forEach(function (botao) {

    botao.addEventListener("click", function () {

        const servicoEscolhido = botao.dataset.servico;

        selectServico.value = servicoEscolhido;

    });

});
// Serviço recebido pela URL
if (selectServico) {

    const parametros = new URLSearchParams(window.location.search);

    const servicoURL = parametros.get("servico");

    const servicos = {
        banho: "Banho e Tosa",
        passeio: "Passeio",
        dogcare: "Dog Care",
        hotel: "Hotel"
    };

    if (servicoURL && servicos[servicoURL]) {
        selectServico.value = servicos[servicoURL];
    }

}


// Máscara do WhatsApp
const inputTelefone = document.querySelector("#telefone");

if (inputTelefone) {

    inputTelefone.addEventListener("input", function () {

        let numero = inputTelefone.value.replace(/\D/g, "");

        numero = numero.slice(0, 11);

        if (numero.length > 10) {
            numero = numero.replace(
                /(\d{2})(\d{5})(\d{4})/,
                "($1) $2-$3"
            );
        } else if (numero.length > 6) {
            numero = numero.replace(
                /(\d{2})(\d{4})(\d{0,4})/,
                "($1) $2-$3"
            );
        } else if (numero.length > 2) {
            numero = numero.replace(
                /(\d{2})(\d+)/,
                "($1) $2"
            );
        } else if (numero.length > 0) {
            numero = numero.replace(
                /(\d{0,2})/,
                "($1"
            );
        }

        inputTelefone.value = numero;

    });

}

// Validação do formulário
const formularioAgendamento = document.querySelector("#agendamento-form");

if (formularioAgendamento) {

    formularioAgendamento.addEventListener("submit", function (event) {

        event.preventDefault();

        const telefoneNumeros = inputTelefone.value.replace(/\D/g, "");

        // Validação do telefone
        if (telefoneNumeros.length !== 11) {

            alert("Digite um número de WhatsApp válido com DDD.");

            inputTelefone.focus();

            return;
        }

        // Validação da data
        if (inputData.value < inputData.min) {

            alert("Escolha uma data válida para o agendamento.");

            inputData.focus();

            return;
        }


        // Voltar para editar o agendamento
const btnVoltar = document.querySelector("#btn-voltar");

if (btnVoltar) {

    btnVoltar.addEventListener("click", function () {

        const resumoAgendamento =
            document.querySelector("#agendamento-resumo");

        resumoAgendamento.style.display = "none";

        formularioAgendamento.style.display = "grid";

    });

}

// Enviar solicitação pelo WhatsApp
const btnWhatsApp = document.querySelector("#btn-whatsapp");

if (btnWhatsApp) {

    btnWhatsApp.addEventListener("click", function () {

        const servico = document.querySelector("#servico").value;
        const pet = document.querySelector("#pet").value;
        const tipoPet = document.querySelector("#tipo-pet").value;
        const porte = document.querySelector("#porte").value;
        const data = document.querySelector("#data").value;
        const horario = document.querySelector("#horario").value;
        const tutor = document.querySelector("#tutor").value;
        const telefone = document.querySelector("#telefone").value;
        const observacoes = document.querySelector("#observacoes").value;

        const partesData = data.split("-");

        const dataFormatada =
            `${partesData[2]}/${partesData[1]}/${partesData[0]}`;


        const mensagem =
`Olá! Gostaria de solicitar um agendamento na Nina's Pet Care. 🐾

*Serviço:* ${servico}
*Pet:* ${pet}
*Tipo:* ${tipoPet}
*Porte:* ${porte}
*Data:* ${dataFormatada}
*Horário:* ${horario}

*Tutor:* ${tutor}
*WhatsApp:* ${telefone}

*Observações:* ${observacoes || "Nenhuma observação"}

Gostaria de confirmar a disponibilidade para esse horário.`;

        const mensagemCodificada = encodeURIComponent(mensagem);

        const numeroWhatsApp = "5521978737612";

        const urlWhatsApp =
            `https://wa.me/${numeroWhatsApp}?text=${mensagemCodificada}`;

        window.open(urlWhatsApp, "_blank");

    });

}


        // Captura os dados preenchidos
const servico = document.querySelector("#servico").value;
const pet = document.querySelector("#pet").value;
const tipoPet = document.querySelector("#tipo-pet").value;
const porte = document.querySelector("#porte").value;
const data = document.querySelector("#data").value;
const horario = document.querySelector("#horario").value;
const tutor = document.querySelector("#tutor").value;
const telefone = document.querySelector("#telefone").value;
const observacoes = document.querySelector("#observacoes").value;


// Formata a data para o padrão brasileiro
const partesData = data.split("-");

const dataFormatada =
    `${partesData[2]}/${partesData[1]}/${partesData[0]}`;


// Preenche o resumo
document.querySelector("#resumo-servico").textContent = servico;
document.querySelector("#resumo-pet").textContent = pet;
document.querySelector("#resumo-tipo").textContent = tipoPet;
document.querySelector("#resumo-porte").textContent = porte;
document.querySelector("#resumo-data").textContent = dataFormatada;
document.querySelector("#resumo-horario").textContent = horario;
document.querySelector("#resumo-tutor").textContent = tutor;
document.querySelector("#resumo-telefone").textContent = telefone;

document.querySelector("#resumo-observacoes").textContent =
    observacoes || "Nenhuma observação";


// Esconde o formulário
formularioAgendamento.style.display = "none";


// Mostra o resumo
const resumoAgendamento =
    document.querySelector("#agendamento-resumo");

resumoAgendamento.style.display = "block";("Formulário válido!");

    });

}

const menuToggle = document.querySelector("#menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", function () {
    navLinks.classList.toggle("active");
    menuToggle.classList.toggle("active");
});