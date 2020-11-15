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