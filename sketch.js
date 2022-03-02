var bola
var bancoDeDados,posicao

function setup(){
    createCanvas(500,500);

    bancoDeDados = firebase.database()

    bola = createSprite(250,250,10,10);
    bola.shapeColor = "red";

    var posicaoBolaRef = bancoDeDados.ref("bola/posicao")
    posicaoBolaRef.on("value",lerPosicao,mostrarErro)
}

function draw(){
    background("black");

    if(posicao !== undefined){
        if(keyDown(LEFT_ARROW)){
            alterarPosicao(-1,0);
        } else if(keyDown(RIGHT_ARROW)){
            alterarPosicao(1,0);
        } else if(keyDown(UP_ARROW)){
            alterarPosicao(0,-1);
        } else if(keyDown(DOWN_ARROW)){
            alterarPosicao(0,+1);
        }
    
        drawSprites();
    }
}

function lerPosicao(dado){
    posicao = dado.val()
    bola.x = posicao.x;
    bola.y = posicao.y;
}

function mostrarErro(){
    console.log("dados não recebidos algo assim")
}

function alterarPosicao(x,y){
    bancoDeDados.ref("bola/posicao").set({
        "x": posicao.x + x,
        "y": posicao.y + y,
    })
}