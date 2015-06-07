
$(function() {
    var videoWidth = 640;
    var videoHeight = 480;
    
    var lastX, lastY;
    
    var myPlayer = videojs('video_1');
    videojs("video_1").ready(function(){
        var myPlayer = this;

        // EXAMPLE: Start playing the video.
        myPlayer.play();
        
        var nodes = '<div class="custom-node">';
        var i = 0;
        $.getJSON("http://127.0.0.1:54777/Reeltime/video/js/data.json", function(data) {
            console.log("success");
            $.each(data, function(key, val){
                var posLeft = parseFloat(val.time) * videoWidth;
                var randColor = '#'+'0123456789abcdef'.split('').map(function(v,i,a){
  return i>5 ? null : a[Math.floor(Math.random()*16)] }).join('');
                
                nodes += '<div id="circle-'+i+'" class="circle" style="background: '+randColor+'; left: '+posLeft+'px;"></div><div class="circle-profile" style="left: '+posLeft+'px;"><img src="'+val.profilePicture+'" alt=""><h2>'+val.profileName+'</h2><p>'+val.profileComment+'</p></div>';
                
                
                
                console.log("item:", posLeft); 
                i++;
            });
            nodes += '</div>';
            $(".vjs-progress-control").after(nodes);
            $(".circle").bind("mouseenter mouseleave", function(e){
                    $(this).toggleClass("tooltip-transition");
                });
            console.log(nodes);
        })
        .fail(function() {
            console.log( "error" );
        });
            
        
        
        myPlayer.on("play", function(){
            var currentTime = myPlayer.currentTime();
            setTimeout(function(){ currentTime = myPlayer.currentTime(); }, 1000);
            
            console.log(currentTime);

        });
        
        var numClicks = 0;
        
        
        /* CLICK on video */
        
        $(".video-js").on("click", function(e){
            /*
            $("#send-new-comments").one(function(){
                $(this).click();
            });
            
            */
            
            
            var parentOffset;
            var relX;
            var relY;
            
            if($('.comment-menu').length){
                
                var offset = $('.comment-menu').offset();
                if(e.pageX > offset.left &&
                  e.pageX < offset.left + $('.comment-menu').width() &&
                   e.pageY > offset.top &&
                   e.pageY < offset.top + $('.comment-menu').height()
                  ){
                    console.log("inside comment menu!!");
                    
                    relX = lastX;
                    relY = lastY;
                    
                    
                    
                    
                }
                else{
                    parentOffset = $(this).parent().offset(); 
                   //or $(this).offset(); if you really just want the current element's offset
                   relX = e.pageX - parentOffset.left;
                   relY = e.pageY - parentOffset.top;


                    if(relX <= 20){
                        relX += 20;
                    }
                    if(relX >= videoWidth - 220){
                        relX -= 220;
                    }
                    if(relY >= videoHeight - 82){
                        relY -= 82;
                    }
                    if(relY <= 20){
                        relY += 82;
                    }
                    
                    lastX = relX;
                    lastY = relY;
                }
            }
            else{
                    parentOffset = $(this).parent().offset(); 
                   //or $(this).offset(); if you really just want the current element's offset
                   relX = e.pageX - parentOffset.left;
                   relY = e.pageY - parentOffset.top;


                    if(relX <= 20){
                        relX += 20;
                    }
                    if(relX >= videoWidth - 220){
                        relX -= 220;
                    }
                    if(relY >= videoHeight - 82){
                        relY -= 82;
                    }
                    if(relY <= 20){
                        relY += 82;
                    }
                
                    lastX = relX;
                    lastY = relY;
                
                    
                }
            
            if($('#send-new-comment').length){
                var offset = $('#send-new-comment').offset();
                if(e.pageX > offset.left &&
                  e.pageX < offset.left + $('#send-new-comment').width() &&
                   e.pageY > offset.top &&
                   e.pageY < offset.top + $('#send-new-comment').height()
                  )
                {
                    
                    
                    
                    relX = lastX;
                    relY = lastY;
                }
                else{
                    
                    
                    
                }
            }
            else{
                
            }
            
            
            
            if(!$(this).hasClass("clicked")){
               
                 e.stopPropagation();
                
                $(this).addClass("clicked");
                $(this).append('<div class="children comment-menu new" style="left: '+relX+'px; top: '+relY+'px;"><form id="form-comments" class="form-comments" action="#,"><textarea id="input-comment" type="text" placeholder="Write something..."></textarea></form><button type="submit"  class="send-new-comment" id="send-new-comment">Send</button><div class="headline hid"><img src="../img/avatar.jpg" alt=""><div class="headline-title"><h2>Eleanor</h2><h3>Posted 5 hours ago</h3></div><div class="comment">BLABLABLA</div></div>');
                $("#input-comment").focus();
                $("#send-new-comments").on("click", submitComment);
            }
            else{
                
                $(this).removeClass("clicked");
                $(".comment-menu").remove();
                if(e.isPropagationStopped){
                    var position = 0;
                    $(this).addClass("clicked");
                    $(this).append('<div class="comment-menu new" style="left: '+relX+'px; top: '+relY+'px;"><form id="form-comments" class="form-comments" action="#,"><textarea id="input-comment" type="text" placeholder="Write something..."></textarea></form><button type="submit" onclick="submitComment('+position+')" class="send-new-comment" id="send-new-comment">Send</button><div class="headline hid"><img src="../img/avatar.jpg" alt=""><div class="headline-title"><h2>Eleanor</h2><h3>Posted 5 hours ago</h3></div><div class="comment">BLABLABLA</div></div>');
                    $("#input-comment").focus();
                    $("#send-new-comments").on("click", submitComment);
                }
                
                e.stopPropagation();
            }
            
            
            
            /*
            <div class="headline hid"><img src="../img/avatar.jpg" alt=""><div class="headline-title"><h2>Eleanor</h2><h3>Posted 5 hours ago</h3></div><div class="comment">BLABLABLA</div>
            */
            
            numClicks++;
            
            
            
                
                
            
        });
        
        

        
        
        /*
        $("#comment-menu").on("click", function(e){
            
            if(e && e.stopPropagation) {
                e.stopPropagation();
                
            } 
            
            
        });
        */
        
        
    });
    
    
})