var isOn=false;
var count=0;
var isStrict=false;
var userSequence=[];
var randomSequence=[];
var isUser=false;
// var isPlaying=false;
var colors=['#ffff1c','#EF5350','#74ebd5','#a8e063'];

$('.item').on('click',function(){
  isOn=!isOn;
  if(!isOn){
    $('.item').css({background:'red',transform:'translateX(-25px)'})
    resetGame();
  }else{
    $('.item').css({background:'green',transform:'translateX(25px)'})
  }
})

  $('.strict').on('click',function(){
    isStrict=!isStrict;
    if(isStrict){
    $('.strict').css('background','green'); 
    console.log(isStrict+' isstrict')
    }else{
    $('.strict').css('background','red');
    }
  })

  $('.start').on('click',function(){
  // $('.start').css('background-color','green');
  // $('.start').attr("disabled","disabled");
  if(isOn){
  $('.start').css('background-color','green');
  startGame();  
  }else{
  $('.start').css('background-color','red');
  }
  });


function getBox(box){
if(box==1){
  // $('#1').addClass('yellow');
  $('#1').animate({backgroundColor:colors[0]}).delay(100).animate({backgroundColor:'white'});
  document.getElementById('play-yellow').play();  
  }else if(box==2){
  // $('#2').addClass("red");
  $('#2').animate({backgroundColor:colors[1]},500).delay(100).animate({backgroundColor:'white'})
  document.getElementById('play-red').play(); 
  }else if(box==3){
  // $("#3").addClass('blue');
  $('#3').animate({backgroundColor:colors[2]},500).delay(100).animate({backgroundColor:'white'})
  document.getElementById('play-blue').play();   
  }else if(box==4){
  // $("#4").addClass('green');
  $('#4').animate({backgroundColor:colors[3]},500).delay(100).animate({backgroundColor:'white'})
  document.getElementById('play-green').play();    
  }  
}

function startGame(){
  randomSequence=[];
  userSequence=[];
  count=0;
  selectRandomNumber();
}
//start with a random box
function selectRandomNumber(){
    $('.win-lose').text('good luck!');
    var num;
    num=Math.floor(Math.random()*4+1);//get random number from 1 to 4
    randomSequence.push(num);//push it to aisequence
    console.log(randomSequence+' randomsequence by computer');//  
    count+=1;//increment counter when played
    $('.count').text(count);
    if(count>20){
    $('.win-lose').text('Congrats, you win!');
    resetGame();
    }else{
    isUser=false;
    console.log(isUser+' from random number select')
    playSequence(randomSequence);  
    }
}

var t;

function playSequence(aiSequence){  
  aiSequence.forEach(function(key,index){
  t=setTimeout(getBox,index*1000,key);
})
  isUser=true;
  console.log(isUser+ ' from play sequence');
  if(isUser && isOn){
  userResponse();
  }
}
var t2;
function userResponse(){
    $('.box').on('click',function(){
    getBox(parseInt(this.id)); 
    userSequence.push(parseInt(this.id)) ;
    console.log(userSequence+' user sequence from userResponse');
    })
    // console.log(userSequence+' user sequence from userResponse');
    t2= setTimeout(checkCorrectSequence,count*3000);
    isUser=false;
}


function checkCorrectSequence(){
   $('.box').off('click');
  if(userSequence.join('')==randomSequence.join('')){
    console.log('correct');
    userSequence=[];
    console.log('user sequence from check'+userSequence);   
    selectRandomNumber();    
  }else{
    if(!isStrict){
    console.log('wrong');
    $('.win-lose').text('see and try again');
    userSequence=[];
    playSequence(randomSequence);
    }else{
    $('.win-lose').text('you lose, play again!');
    resetGame();
    }
  }
  }
  
 
      
function resetGame(){
  randomSequence=[];
  userSequence=[];
  isStrict=false;
  isUser=false;
  isOn=false;
  count=0;
  $('.item').css({background:'red',transform:'translateX(-1px)'})
  $('.box').off('click');
  $('.start').css('background-color','red');
  $('.strict').css('background-color','red');
  clearTimeout(t);
  clearTimeout(t2);
  $('.count').text(count);
  $('.box').css('background','white');
  // $('.win-lose').text('good luck!');
  }

