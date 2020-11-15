// JavaScript Document
function FF_showHideLayer(div, status){
	document.getElementById(div).style.visibility=status;
}

function placeApDiv(tw, th, dox, doy){
	var table_w=tw; //780;
	var table_h=th; //660;	
	var div_offset_x=dox; //330;
	var div_offset_y=doy; //70;	
	
	var window_w=window.width;
	if(!window_w) window_w = document.body.clientWidth;
	var window_h=window.height;
	if(!window_h) window_h = document.body.clientHeight;

	var div_left=(window_w-table_w)/2 + div_offset_x;
	var div_top=(window_h-table_h)/2 + div_offset_y;
	document.getElementById('apDiv1').style.left=div_left+"px";
	document.getElementById('apDiv1').style.top=div_top+"px";
}

function center_me(){
	var h;
	if(document.innerHeight){ 
		h=document.innerHeight;
	} else if(document.documentElement.clientHeight){ 
		h=document.documentElement.clientHeight;
	} else if(document.body){ 
		h=document.body.clientHeight; 
	}
	 elem = document.getElementById("zzz");
	 elem.style.height=h+'px';
}