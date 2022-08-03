let strt=document.querySelector(".start");
let myCar=document.querySelector(".car");
let road=document.querySelector(".road");
let score=document.querySelector(".score");
let end=document.querySelector(".end")
strt.addEventListener("click",function(){
    strt.style.backgroundColor = "#dede92";
    strt.style.color="#3f521f";
    strt.innerHTML="5";
    let num=4;
  let int1=setInterval(function(){

    strt.innerHTML=num;
    num--;
    if(num===0){
        strt.innerHTML="Go!!"
        clearInterval(int1)
    }
  },1000)

  let int2=setTimeout(function(){
    
    strt.style.display="none"
    },5200)

    setTimeout(()=>{
        clearTimeout(int2);
        startF();
       

    },5500)
})




///////////////////////////////////////////////////////////////

let player={speed:5, score:0};
let keys={
    ArrowUp:false,
    ArrowDown:false,
    ArrowRight:false,
    ArrowLeft:false
}
document.addEventListener('keydown',keyDown);
document.addEventListener('keyup',keyUp);
function keyDown(e){
   e.preventDefault();
   keys[e.key]=true;//sexmelis true e
  }
function keyUp(e){
    e.preventDefault();
    keys[e.key]=false;//bac toxneluc heto false
   
   
 }
 function gamePlay(){
    
   
    let myCar=document.querySelector(".car");
    let way=road.getBoundingClientRect();
    // console.log(way);
    if(player.start ){
        moveLines()
        moveEnemy()
        if(keys.ArrowUp && player.y>way.top+163){
            player.y-=player.speed;
           
           
           }
        if(keys.ArrowDown && player.y<way.bottom-163){//163y car-i erkarutyunna
            player.y+=player.speed;
            
           
        }
        if(keys.ArrowLeft && player.x>0){
            player.x-=player.speed
        }
        if(keys.ArrowRight && player.x<(way.width-150)){
            player.x+=player.speed
        }
        myCar.style.top=player.y+"px";
        
        myCar.style.left=player.x+"px"
       
        window.requestAnimationFrame(gamePlay);//petq e kanchvi naev callback functioni mej
        player.score++;
        score.innerText="Score is "+player.score;
    }
    
 }


function startF(){
    myCar.style.display="block"
    player.start=true;
    player.score=0;
    console.log(myCar.offsetTop);
    player.x=myCar.offsetLeft;
    player.y=myCar.offsetTop;
   
    window.requestAnimationFrame(gamePlay);
    for(let x=0;x<5;x++){
        let roadLine=document.createElement("div");
        roadLine.setAttribute("class","lines");
        roadLine.y=(x*200);
        roadLine.style.top=roadLine.y+"px"  //200=car.width+line.height
        road.appendChild(roadLine)
    }
    for(let x=0;x<3;x++){
        let enemyCar=document.createElement("div");
        enemyCar.setAttribute("class","enemy");
        enemyCar.y=((x+1)*800)*-1;
        enemyCar.style.top=enemyCar.y+"px" ; //200=car.width+line.height
        enemyCar.style.left=Math.floor(Math.random()*1000)+"px"
        road.appendChild(enemyCar)
    }
    
}


function moveLines(){
    let lines=document.querySelectorAll(".lines");
    lines.forEach(function(line){
        if(line.y>=1000){
            line.y-=1050
        }
    line.y+=player.speed;
    line.style.top=line.y+"px";
    })
}

function moveEnemy(){
    let enemies=document.querySelectorAll(".enemy");
// console.log(enemies);
    enemies.forEach(function(enemy){
       if(crash(myCar,enemy)){
        // console.log("boom");
        endGame()
       }
        if(enemy.y>=1000){
            enemy.y=-350;
            enemy.style.left=Math.floor(Math.random()*800)+"px"
        }
     
    enemy.y+=player.speed;
    enemy.style.top=enemy.y+"px";

    })
}

function crash(me,enem){
let meRect=me.getBoundingClientRect();//elemi chapsn u dirqn e ekrani vra
let enemyRect=enem.getBoundingClientRect();
return !((meRect.top>enemyRect.bottom)||
        (meRect.bottom<enemyRect.top)||
        (meRect.left>enemyRect.right)||
        (meRect.right<enemyRect.left))
}

function endGame(){
    player.start=false;
    end.style.display="block";
    end.innerText+="\n Your score is "+(+player.score+1)
    end.addEventListener("click",function(){
        end.style.display="none";
        location.reload()
      
            })
}