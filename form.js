var modalArtigo = document.getElementById("modalArtigo");
var btnArtigo = document.getElementById("btnArtigo");
var span = document.getElementsByClassName("close")[0];

sistemasDeComunicacao = [
  "Análise e Processamento de Sinais em Sistemas de Comunicação Sem Fio Cooperativos (Alexandre)",
  "Aplicação de Aprendizagem de Máquinas em Alocação de Recursos para Redes Móveis (Rafael)",
  "Controle de Rádio-Enlace e Alocação de Recursos para New Radio (Rafael)",
  "Modelagem, Análise de Desempenho e Alocação/Otimização de Recursos de Rádio para Sistemas de Comunicações Sem Fio (Rafael, Daniel e Alexandre)",
  "Técnicas Emergentes para Sistemas de Comunicações"
];
algoritmosEComputacaoDistribuida = [
  "Desenvolvimento e aplicação de métodos de análise de texturas e formas (Jarbas Joaci de Mesquita Sá Júnior)",
  "Análise e desenvolvimento de métodos de agrupamento em processamento digital de imagens (Rui Facundo Vigelis)",
  "Aplicação de processamento digital de imagens na prevenção e detecção de fraudes em conteúdos digitais (Marcelo Marques Simões de Souza)",
  "Diagnóstico inteligente de softwares (Márcio André Baima Amora)",
  "Tecnologias assistivas para pessoas com deficiências (Alexandre)",
  "Processamento de sinais sísmicos (Alexandre)",
  "Análise e reconhecimento de imagens clínicas e biométricas (Iális)",
  "Detecção de COVID-19 em imagens de tomografia computadorizada de pulmão (Iális, Alexandre, Márcio)",
  "Aplicações e desenvolvimento de algoritmos de aprendizagem de máquina (Iális, Jarbas, Alexandre, Márcio, Marcelo, Rui)"
];
eletronicaDePotencia = [
  "Controle Robusto aplicado ao DFIF (Isaac, Vandilberto)",
  "Prognóstico e Monitoramento da Saúde de Baterias para Múltiplos Veículos Aéreos Não Tripulados (VANTS) em uma Missão Colaborativa (Vandilberto)",
  "Aplicações de Eletrônica de Potência em Sistemas de Energia (Isaac, Vandilberto, Adson, Vanessa, Edilson, Kleber, Marcus)",
  "Sistema de geração de energia elétrica a partir de geração eólica com gerador de imãs permanentes com mitigação de harmônicas de corrente da rede elétrica (Adson, Vanessa)",
  "Projeto de Máquinas Elétricas e Acionamentos (Adson, Vanessa)",
  "Conversores Ressonantes Baseados em Capacitores Comutados para o Acionamento De LEDs e Mitigação Do Flicker (Edilson, Kleber)",
  "Aplicações de Sistemas Fotovoltáicos (Edilson, Kleber)"
];

function alterarSelectArray(select, array) {
  array.forEach(function (item) {
    $(`#${select}`).append('<option>' + item + '</option>');
  });
}

function alterarSelect(select, text, value) {
  $(`#${select}`).append($('<option>', {
    value,
    text
  }));
}

$('#AskA2').change(function () {
  $('#AskA3').empty();
  $('#AskA4').empty();
  var value = $(this).val();
  alterarSelect('AskA3', 'Selecione a linha de pesquisa da publicação', 0);
  if (value === "1") {
    alterarSelect('AskA3', 'Sistemas de comunicação', 1);
    alterarSelect('AskA3', 'Algoritmos e Computação Distribuída', 2);
  } else if (value === "2") alterarSelect('AskA3', 'Eletrônica de potência', 3);
  else $('#AskA3').empty();
});

$('#AskA3').change(function () {
  $('#AskA4').empty();
  var value = $(this).val();
  alterarSelect('AskA4', 'Selecione o nome do projeto associado', 0);
  if (value === "1") alterarSelectArray("AskA4", sistemasDeComunicacao);
  else if (value === "2") alterarSelectArray("AskA4", algoritmosEComputacaoDistribuida);
  else if (value === "3") alterarSelectArray("AskA4", eletronicaDePotencia);
  else $('#AskA4').empty();
});


//Definindo listas vazias para posteriormente guardar os artigos
var artigosDePeriodicos = [];
var artigosEmAnais = [];

//Evento onclick de qualquer lugar da tela sem ser no modal para fechar o modal
window.onclick = function (event) {
  if (event.target == modalArtigo) {
    modalArtigo.style.display = "none";
  }
}

//Evento onclick do botão close dos modais
span.onclick = function () {
  modalArtigo.style.display = "none";
}

//Evento no botão para abrir modal
btnArtigo.onclick = function () {
  modalArtigo.style.display = "block";

}

function addArtigo() {
  //Pegar os valores do form
  ask00 = document.getElementById('AskA0').value;
  ask01 = document.getElementById('AskA1').value;
  ask02 = document.getElementById('AskA2').value === "0" ? "0" : $("#AskA2 option:selected").html();
  ask03 = document.getElementById('AskA3').value === "0" ? "0" : $("#AskA3 option:selected").html();
  ask04 = document.getElementById('AskA4').value === "0" ? "0" : $("#AskA4 option:selected").html();
  ask05 = document.getElementById('AskA5').checked ? "Sim" : "Nao";
  ask06 = document.getElementById('AskA6').checked ? "Sim" : "Nao";
  ask07 = document.getElementById('AskA7').value;

  //Validacao de dados
  if (ask00 === "" || ask01 === "" || ask02 === "0" || ask03 === "0" || ask04 === "0" || ask07 === "") {
    alert('Preencha os campos corretamente!');
    return;
  }

  //Condicional de periódico e em anais
  if (ask00 === "1") {
    //Adicionar artigo na lista
    artigosDePeriodicos.push({
      ask01,
      ask02,
      ask03,
      ask04,
      ask05,
      ask06,
      ask07
    });
    addToList("listP", ask01); //Adicionar artigo na ul
  } else if (ask00 === "2") {
    //Adicionar artigo na lista
    artigosEmAnais.push({
      ask01,
      ask02,
      ask03,
      ask04,
      ask05,
      ask06,
      ask07
    });
    addToList("listA", ask01); //Adicionar artigo na ul
  } else {
    return;
  }
  //Limpar os campos
  document.getElementById('AskA0').value = ""
  document.getElementById('AskA1').value = ""
  document.getElementById('AskA2').value = "0"
  $('#AskA3').empty();
  $('#AskA4').empty();
  document.getElementById('AskA5').checked = false
  document.getElementById('AskA6').checked = false
  document.getElementById('AskA7').value = ""

  console.log("ARTIGOS 1")
  artigosDePeriodicos.map((artigo) => console.log(artigo)); //Debug

  console.log("ARTIGOS 2")
  artigosEmAnais.map((artigo) => console.log(artigo)); //Debug

  modalArtigo.style.display = "none"; //Fechar modal
}

//Função para adicionar li ao ul correspondente
function addToList(list, artigo) {
  var ul = document.getElementById(list);
  var li = document.createElement("li");
  li.appendChild(document.createTextNode(artigo));
  ul.appendChild(li);
}

function sendForm() {
  name = document.getElementById('name').value;
  check01 = document.getElementById('Ask1').checked ? "Sim" : "Nao";
  check02 = document.getElementById('Ask2').checked ? "Sim" : "Nao";
  check03 = document.getElementById('Ask3').checked ? "Sim" : "Nao";
  check04 = document.getElementById('Ask4').checked ? "Sim" : "Nao";
  check05 = document.getElementById('Ask5').checked ? "Sim" : "Nao";
  check06 = document.getElementById('Ask6').checked ? "Sim" : "Nao";
  check07 = document.getElementById('Ask7').checked ? "Sim" : "Nao";
  check08 = document.getElementById('Ask8').checked ? "Sim" : "Nao";
  check09 = document.getElementById('Ask9').checked ? "Sim" : "Nao";
  check10 = document.getElementById('Ask10').checked ? "Sim" : "Nao";
  check11 = document.getElementById('Ask11').checked ? "Sim" : "Nao";
  check12 = document.getElementById('Ask12').checked ? "Sim" : "Nao";
  check13 = document.getElementById('Ask13').checked ? "Sim" : "Nao";
  check14 = document.getElementById('Ask14').checked ? "Sim" : "Nao";
  text15 = document.getElementById('Ask15').value;
  text16 = document.getElementById('Ask16').value;

  if (name === "" || text16 === "") {
    alert('Preencha os campos corretamente!');
    return;
  }

  jsonToSend = {
    name,
    artigosDePeriodicos,
    artigosEmAnais,
    check01,
    check02,
    check03,
    check04,
    check05,
    check06,
    check07,
    check08,
    check09,
    check10,
    check11,
    check12,
    check13,
    check14,
    text15,
    text16
  }

  console.log(jsonToSend); // Debug

  $.post("http://www.ppgeec.ufc.br/wp-content/themes/temacapes2019/capes2019/process.php", {
    json: JSON.stringify(jsonToSend)
  }, function (data) {
    console.log(data);
    try {
      jsonData = JSON.parse(data);
      alert(jsonData["mensagem"]);
    } catch (error) {
      alert("Erro interno, tente novamente mais tarde");
    }
  }).fail(function () {
    alert("Erro interno, tente novamente mais tarde");
  });

}
