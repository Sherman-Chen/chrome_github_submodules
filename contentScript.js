function show(){
    var request = new XMLHttpRequest();
request.onreadystatechange=getSubmodulesConfig

var url=parseSubmodulesPath(window.location.href);

if(url==false){
    return;
}

request.open("GET", url,true);
request.send()

function getSubmodulesConfig(){
    if(request.readyState!=4 || request.status!=200){
        return;
    }
    var text=request.responseText.replace(/<[^>]+>/g,"");;

    Config={};
    ConfigArr=[];
    parseSubmodulesString(text)

    var len = document.images.length;
    var imgs =  document.getElementsByTagName('img');
    var sources = "";

    for (var i = 0; i < imgs.length; i++){
        path = imgs[i].src;

        for(var j=0;j<ConfigArr.length;j++){
            var key=ConfigArr[j];
            pos = path.indexOf(key);

            if(pos == -1){
                continue;
            }
            var newPath=Config[key]+ "raw/master/" + path.substring(pos+key.length);
            imgs[i].src=newPath
        }

}
}


function parseSubmodulesString(str){
    var reg=/\[submodule.*\s*path\s*=\s*(.*)\s*url\s*=\s*(.*)\s?\n/g;
    var arr=reg.exec(str);
    while(arr){
        var path='/'+arr[1]+'/';
        var url=arr[2];
        Config[path]=url.substring(0,url.length-4)+'/';
        ConfigArr.push(path)
        arr=reg.exec(str);
    }
}

function parseSubmodulesPath(url){
    url=url.substring(8);
    arr=url.split("/")

    if(arr[4]==undefined){
        return false;
    }

    Config = {
        name:arr[1],
        repo:arr[2],
        branch:arr[4]
    };

    

    return "https://github.com/"+Config["name"]+"/"+Config["repo"]+"/blob/"+Config['branch']+"/.gitmodules";
}

}

show();