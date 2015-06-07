$(function(){ 
    var numSnippets = 0;
    var customNodes = '<div class="custom-node"></div>';
    /*
    $.getJSON('http://127.0.0.1:62553/js/data.json', {
                
    }).done(function(data){
        $.each(data.snippets, function(i, item){
            var randColor = '#'+'0123456789abcdef'.split('').map(function(v,i,a){
  return i>5 ? null : a[Math.floor(Math.random()*16)] }).join('');
            
            console.log("item:", item.snippet);    
            customNodes += '<span class="circle" style="background:'+randColor+'"></span>'; 
            
            numSnippets++;										
        });
        console.log(numSnippets);
        customNodes += '</div>';
    });
    
    
    console.log(customNodes);
	$(".vjs-progress-control").after('<div class="custom-node"></div>');
    
    */
    
    var myPlayer = videojs('video_1');
    console.log(myPlayer);
    
    myPlayer.on("load", function(){
        $(this).append(customNodes);
    });
    
    

    

    
    
    
    
})
