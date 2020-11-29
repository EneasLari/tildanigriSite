// JavaScript Document
function FF_showHideLayer(div, status){
	document.getElementById(div).style.visibility=status;
}

/************************ on Clicl case **************************************
div_open=0;
function FF_showLayer(div){
	if(div_open==0){
		document.getElementById(div).style.visibility='visible';
		div_open=1;
	}	
}

function FF_HideLayers(n){
	if(div_open==2){
		for(i=1;i<=n;i++){
			div='apDiv'+i;
			document.getElementById(div).style.visibility='hidden';
		}
		div_open=0;
	}
	else if(div_open==1){
		div_open=2;
	}
}
*****************************************************************************/

function placeApDiv(tw, th, dox, doy, apDiv){
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
	if(th==0){ 
		div_top=div_offset_y; 
	}	
	
	document.getElementById(apDiv).style.top=div_top+"px";		
	document.getElementById(apDiv).style.left=div_left+"px";		
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