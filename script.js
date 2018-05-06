/*
 * JAVASCRIPT
 * 
 * JULIAN CAMILO GOMEZ VERGARA
 * COMPILADORES
 * 
 */

var lex_error = false;
var sin_error = false;

// Plugin for numbered text area
$(function () {
    $(".lined").linedtextarea();
});

function handleFileSelect(){               
    if (!window.File || !window.FileReader || !window.FileList || !window.Blob){
        alert('File Api not supported');
        return;
    }
    input = document.getElementById('fileinput');
    if (!input){
        alert("File not found");
    }
    else if (!input.files){
        alert("Your browser is too old");
    }
    else{
        file = input.files[0];
        fr = new FileReader();
        fr.onload = receivedText;
        fr.readAsText(file);
    }
}
function receivedText(){
    document.getElementById('editor').appendChild(document.createTextNode(fr.result));
}

function analyze(){
    var txt = document.getElementById('editor').value;
    // Removes all new line default symbols
    txt = txt.replace(/\n/g,'');   
    var symbols = ['@|;|:|_|&|^|$|#|\\|!'];
    var tokens = ['^@',';!@','_#@','&$@',':^:@','$@'];
    // Split text line by line
    txt = txt.split('\\@');
    // Text to be placed in analyzer
    var live = '';
    var i = 0;
    for(var tx in txt){
        if(txt[tx] !== ""){
            var tmp = txt[tx];            
            // Trims to only one inner space
            tmp = tmp.replace(/\s+/g,' ').trim();
            tmp = tmp.split(' ');
            for(var t in tmp){
                // If not a word
                if(tmp[t].indexOf("\"") === -1){
                    // If it is a token
                    if (tokens.indexOf(tmp[t]) !== -1) {
                        window.lex_error = false;
                        tmp[t] = '<span style="color: green" class="token">' + tmp[t] + '</span>';
                    }else{
                        //if (tmp[t].match(symbols)) {
                            window.lex_error = true;
                            console.log("lex_error in line: " + (i+1));
                            tmp[t] = '<span style="color: red" class="token">' + tmp[t] + '</span>';
                        //}
                    }
                }
            }
            live += i+1 + ' |  ' + tmp + '<br/>';
            i++;
        }
    }
    document.getElementById('analyzer').innerHTML = live;   
}
