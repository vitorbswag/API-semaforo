<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Exibição de Dados da API com Estilo</title>
<style>
    body {
        background-image: url(image/background.png);
        background-size: cover;
        margin: 0;
        display: flex;
        justify-content: center; 
        align-items: center; 
        min-height: 100vh; 
        flex-direction: column; 
        text-align: center; 
        font-family: Arial, sans-serif;
        animation: moveBackground 60s linear infinite;
    }

    @keyframes moveBackground {
        0% {
            background-position: 0% 0%;
        }
        100% {
            background-position: 100% 100%;
        }
    }

    .container {
        width: 600px;
        background-color: rgb(98, 98, 101);
        border-radius: 4px;
        border: 2px solid black;
        margin-top: 20px;
        padding: 20px;
        display: flex; 
        align-items: center; 
    }

    .dados-item {
        background-color: rgb(255, 255, 255);
        border-radius: 4px;
        border: 2px solid black;
        margin: 5px;
        padding: 5px;
        font-size: 18px; 
        flex: 1; 
    }

    .dados-item strong {
        font-weight: bold;
    }

    .status-img {
        background-color: white;
        border: 2px solid black;
        height: 280px;
        width: 280px;
        display: block;
        margin: 0 auto; 
    }

    #imagemContainer {
        margin-top: 20px;
        display: none; 
    }

    #mensagem {
        display: none; 
    }

    .destacado {
        background-color: rgb(0, 0, 0);
        border: 2px solid black;  
    }

</style>
</head>
<body>

<div class="container">
    <div class="dados-item" id="dadosAPI"> Atualizando Dados... </div> 
    <div id="imagemContainer">
        <img class="status-img" id="imagem" src="">
        <p id="mensagem"></p>
    </div>
</div>

<script>
let currentIndex = 0;
let apiData = null;

function exibirDadosAPI() {
    var xhr = new XMLHttpRequest();
    var url = "https://niloweb.com.br/transit-room/api/reg_endpoint_all.php";

    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            apiData = JSON.parse(this.responseText);
            exibirDados();
        }
    };

    xhr.open("GET", url, true);
    xhr.send();
}

function exibirDados() {
    const dadosDiv = document.getElementById("dadosAPI");
    const data = apiData[currentIndex];

    dadosDiv.innerHTML = "<strong>Res:</strong> " + data.res + "<br>" +
                        "<strong>Dia:</strong> " + data.dia + "<br>" +
                        "<strong>Data:</strong> " + data.data + "<br>" +
                        "<strong>Nome:</strong> " + data.nome + "<br>" +
                        "<strong>Sobrenome:</strong> " + data.sobrenome + "<br>" +
                        "<strong>Hora:</strong> " + data.hora + "<br>" +
                        "<strong>Motivo:</strong> " + data.motivo + "<br>";

    carregarImagem(data.res);
}

function carregarImagem(condition) {
    const imagemContainer = document.getElementById('imagemContainer');
    const mensagemElement = document.getElementById('mensagem');
    const imagemElement = document.getElementById('imagem');

    let mensagem;
    let corTexto;
    switch(condition) {
        case 'A':
            mensagem = 'No Aguardo';
            imagemElement.src = "image/mel.png";
            corTexto = '#d9c61a';
            break;
        case 'B':
            mensagem = 'Bloqueado';
            imagemElement.src = "image/pomni tristona.png";
            corTexto = '#d91a1a';
            break;
        case 'L':
            mensagem = 'Liberado';
            imagemElement.src = "image/v.png";
            corTexto = '#2ad91a';
            break;
        default:
            console.error('Condição desconhecida:', condition);
            return;
    }

    setTimeout(carregarImagem, 2000);

    mensagemElement.innerText = mensagem;
    mensagemElement.style.color = corTexto; // Definimos a cor do texto
    imagemContainer.style.display = 'block';
    mensagemElement.style.display = 'block';


if (mensagem === 'No Aguardo' || mensagem === 'Bloqueado' || mensagem === 'Liberado') {
        mensagemElement.classList.add('destacado');
    } else {
        mensagemElement.classList.remove('destacado');
    }
}


window.onload = function() {
    exibirDadosAPI();
};
</script>

</body>
</html>
