let bot=0;
let downv=0;
let spikes=[];
let walls=[];
let wallheight=[];
let cnt=0;
let numwallspast=0;
height={};

document.addEventListener('keydown', (event)=>{
    var code=event.code;
    if(code==='Space'){
        if(downv==0) downv-=7;
    }
}, false); 
let prev=Date.now();
let cntwall=0;
function peesik(){
    bot=Math.max(0,bot-downv);
    //console.log(downv);
    let height=0;
    //console.log(numwallspast);
    if(numwallspast<cntwall){
        
        if(walls[numwallspast]<=80){
            while(5-walls[numwallspast]>=0) numwallspast++;
            if(bot-wallheight[numwallspast]<1&&bot-wallheight[numwallspast]>-5){
                downv=0;
                bot=wallheight[numwallspast];
                //console.log("wtf");
                            
            }
            else downv+=0.2;
            height=wallheight[numwallspast];
            
        } 
        else{
            if(bot===0) downv=0;
            else downv+=0.2;
        }
    }
    
    else{
        if(bot===0) downv=0;
        else downv+=0.2;
    }
    console.log(height);
    document.getElementById("square").style.bottom=bot+"px";
    let dead=0;
    for(counter in walls){
        let i=walls[counter];
        if(((40>=i)&&(40<=i+50))&&(2*bot<=wallheight[counter])){
            dead=1;
        }
        walls[counter]=walls[counter]-4;
        document.getElementById("wall"+counter).style.left=walls[counter]+"px";
        
    }
    for(counter in spikes){
        let i=spikes[counter];
        if(((40>=i)&&(40<=i+50))&&(bot<=height+50)&&(bot>=height)){
            dead=1;
            
        }
        //console.log(counter);
    }
    for(counter in spikes){
        spikes[counter]=spikes[counter]-4;
        //console.log("wtf " + counter);
        //console.log(spikes[counter]);
        document.getElementById("spike"+counter).style.left=spikes[counter]+"px";

    }
    //console.log(Date.now()-prev);
    prev=Date.now();

    if(dead===1){
        clearInterval();
        load();
        location.reload();
    }
}

function load(){
    for(let i=0;i<1000;i++) height[i]=0;
    rangedwall(10,25,1);
    rangedspikes(15,17);
    rangedwall(26,40,2);
    rangedspikes(30,32);
    rangedspikes(38,40);
    setInterval(peesik,10);
}
let numofspikes=0;
let numofwalls=0;
function createspike(x){
    const spike=document.createElement("div");
    spike.style.left=50*x+"px";
    spike.className="spike";
    spike.style.bottom=height[x]*50+"px";
    spike.id="spike"+numofspikes;
    const screen=document.getElementById("container");
    screen.appendChild(spike);
    spikes.push(x*50);
    numofspikes++;
}
function createwall(x,h){
    const wall = document.createElement("div");
    wall.style.left=50*x+"px";
    wall.style.height=50*h+"px";
    wall.style.bottom="0px";
    wall.className="wall";
    wall.id="wall"+numofwalls;
    const screen=document.getElementById("container");
    height[x]=h;
    walls.push(50*x);
    wallheight.push(50*h);
    screen.appendChild(wall);
    numofwalls++;
    cntwall++;
}
function rangedwall(start,end,height){
    for(let i=start;i<=end;i++){
        createwall(i,height);
    }
}
function rangedspikes(start,end){
    for(let i=start;i<=end;i++){
        createspike(i);
    }
}