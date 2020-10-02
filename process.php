<?php
  $dado = $_POST['json'];

  $data = json_decode($dado, true);
  $name = $data["name"];

  $artigosDePeriodicos = $data["artigosDePeriodicos"];
  $artigosEmAnais = $data["artigosEmAnais"];

  $dataUser = $data;
  unset($dataUser["artigosDePeriodicos"], $dataUser["artigosEmAnais"]);

  //echo var_dump($data);

  
  //Adicionar dados do usuário no arquivo
  $fpUser = fopen('./data/dataUser.csv', 'a');
  //Adicionar os Headers no arquivo csv
  if(!filesize('./data/data.csv')){
    addFieldsUsuario($fpUser);
  }
  fputcsv($fpUser, $dataUser);
  fclose($fpUser);

  $fp = fopen('./data/data.csv', 'a');
  //Adicionar os Headers no arquivo csv
  if(!filesize('./data/data.csv')){
    addFieldsArtigos($fp);
  }
  //Adicionar artigos de periodicos no arquivo
  foreach ($artigosDePeriodicos as $linha) {
    array_unshift($linha, $name, "Artigo de PERIÓDICOS"); //Colocar valores no inicio de array
    fputcsv($fp, $linha); // Adiciona a linha no arquivo
  }
  //Adicionar artigos em anais no arquivo
  foreach ($artigosEmAnais as $linha) {
    array_unshift($linha, $name, "Artigo em ANAIS de eventos ligados a sociedades científicas "); //Colocar valores no inicio de array
    fputcsv($fp, $linha); // Adiciona a linha no arquivo
  }
  fclose($fp);
  

  echo json_encode(array('mensagem' => "Dados inseridos com sucesso"));

  function addFieldsArtigos($fp){
      $perguntas = array(
        "Nome",
        "Tipo de artigo",
        "Descrição do artigo",
        "Área de concentração da publicação",
        "Linha de pesquisa da publicação",
        "Nome do projeto associado",
        "A produção é vinculada a trabalho de conclusão?",
        "O trabalho do estudante já passou por defesa?",
        "O trabalho de conclusão é associado ao PPGEEC ou a outro programa?",
      );
      fputcsv($fp, $perguntas);
  }
  function addFieldsUsuario($fp){
      $perguntas = array(
        "Nome",
        "Você obteve uma ou mais produções de LIVROS ou CAPÍTULOS DE LIVROS?",
        "Você obteve uma ou mais OUTROS tipos de produções BIBLIOGRÁFICAS?",
        "Você obteve uma ou produções técnicas de desenvolvimento de material DIDÁTICO e INSTRUCIONAL?",
        "Você obteve uma ou produções técnicas de desenvolvimento de APLICATIVOS?",
        "Você lecionou algum Curso de Curta Duração?",
        "Você atuou em alguma Organização de Evento científico?",
        "Você atuou no Desenvolvimento de um Produto?",
        "Você colaborou em algum Programa de Rádio ou TV?",
        "Você publicou algum Relatório de Pesquisa?",
        "Você colaborou na Apresentação de Trabalho em evento acadêmico/científico?",
        "Você atuou no Desenvolvimento de uma Técnica?",
        "Você atuou em Editoria?",
        "Você desenvolveu algum Serviço Técnico?",
        "Há algum outro tipo de produção a ser destacada em 2019?",
        "Se sim, descreva as principais informações sobre esta(s) publicação(ões):",
        "Cite outras informações que você julgar relevantes, como exemplo: bolsista de produtividade, membro de sociedade científica, revisor de periódico, organizador de evento, membro de comitês científicos, etc.");
      fputcsv($fp, $perguntas);
  }
