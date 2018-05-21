/*
 * JAVASCRIPT
 * 
 * JULIAN GOMEZ
 * CARLOS DONOSO
 * JOHAN GARCIA
 * 
 * COMPILADORES
 */

var lex_error;
var next;
var sin_error;
var program = {};
var schema = [];

function handleFileSelect(){               
    if (!window.File || !window.FileReader || !window.FileList || !window.Blob){
        alert('El api de archivos no esta soportado');
        return;
    }
    input = document.getElementById('fileinput');
    if (!input){
        alert("Archivo no encontrado");
    }
    else if (!input.files){
        alert("Su navegador es muy antiguo");
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
    analyze();
}

function analyze(){
    
    lex_error = false;
    next = true;
    cleanSchema();
    
    var txt = document.getElementById('editor').value;
    
    // Removes all comments if exists
    txt = txt.replace(/\s*\/\/(.*)+/g,'');
    
    // Removes all new line default symbols
    txt = txt.replace(/\n/g,'');
    var tokens = ['\\^@|;!@|_#@|\\&\\$@|:\\^:@|\\$@'];
    
    // Split text line by line
    txt = txt.split('\\@');
    
    /*-LEXICAL----------------------------------------------------------------*/
    
    var live = '';
    var errors = '';
    
    // Read each line in the txt
    for(i in txt){
        
        // If the line is not empty
        if(txt[i] !== "") {

            var parts = txt[i];
            var tmp = '';
            var words;
            var numbers;
            var conditions;
            var verdad;

            // Fix true
            var patternVerdad = new RegExp('{(.*)}', 'g');
            if (parts.match(patternVerdad)) {
                verdad = parts.match(patternVerdad);
                parts = parts.replace(patternVerdad, '??VERDAD??');
            }

            // Fix words
            var patternWords = new RegExp('"(.*)"', 'g');
            if (parts.match(patternWords)) {
                words = parts.match(patternWords);
                parts = parts.replace(patternWords, '??PALABRA??');
            }
            
            // Fix numbers
            var patternNumbers = new RegExp('\'(.*)\'', 'g');
            if (parts.match(patternNumbers)) {
                numbers = parts.match(patternNumbers);
                parts = parts.replace(patternNumbers, '??NUMERO??');
            }
            
            // Fix conditionals
            var patternConditions = new RegExp('\\((.*)\\)', 'g');
            if (parts.match(patternConditions)) {
                conditions = parts.match(patternConditions);
                parts = parts.replace(patternConditions, '??CONDICION??');
            }
            
            parts = parts.replace(/\s+/g,' ').trim();
            parts = parts.split(' ');
            
            // Store schema separatedly
            schema.push(parts);

            // If last iteration
            if(Number(i) == txt.length-2){
                for(var s in schema){
                    var elements = schema[s];
                    
                    // Here analize each row according to each token...
                    
                    /*for(var e in elements){
                        
                    }*/
                }
            }
            
            // Detect tokens
            var patternTokens = new RegExp(tokens, 'g');
            
            for(p in parts){
                
                // First element
                if(Number(p) == 0){
                    
                    if (parts[p].match(patternTokens)) {
                        token = parts[p].match(patternTokens);
                        tmp += parts[p].replace(patternTokens, '<span title="Token" style=\"color:greenyellow;\">' + token + '</span>') + ' ';
                        
                    } else {
                        lex_error = true;
                        next = false;
                        errors += "Error lexico en la linea: " + (Number(i) + 1) + "<br/>";
                        tmp += '<span style=\"color:red;\">' + parts[p] + '</span>' + ' ';
                    }
                    
                } else {

                    // Restore words and numbers
                    if (parts[p] === "??PALABRA??") {
                        tmp += '<span title="Cadena/Variable" style=\"color:indianred;\">' + words + '</span>' + ' ';
                    }else if (parts[p] === "??NUMERO??") {
                        tmp += '<span title="Numero/Operacion" style=\"color:cadetblue;\">' + numbers + '</span>' + ' ';
                    }else if (parts[p] === "??CONDICION??") {
                        tmp += '<span title="Condicion" style=\"color:bisque;\">' + conditions + '</span>' + ' ';
                    }else if (parts[p] === "??VERDAD??") {
                        tmp += '<span title="Bloque de codigo Si" style=\"color:coral;\">' + verdad + '</span>' + ' ';
                    }else{
                        lex_error = true;
                        next = false;
                        errors += "Error lexico en la linea: " + (Number(i) + 1) + "<br/>";
                        tmp += '<span style=\"color:red;\">' + parts[p] + '</span>' + ' ';
                    }
                }
                
            }
            
            var fix = Number(i) + 1;
            if (Number(i) + 1 < 10) {
                fix = '0' + fix;
            }
            var mark = '';
            if(lex_error){
                mark = '<span id="line-' + (Number(i) + 1) + '" class="error">' + fix + '</span>'
                lex_error = false;                
            }else{
                mark = fix;
                mark = '<span id="line-' + (Number(i) + 1) + '">' + fix + '</span>'
            }
            live += mark + ' |&nbsp;&nbsp;' + tmp + '<br/>';
            
        }
    }
    
    /*-SYNTACTIC--------------------------------------------------------------*/
    
    if (live === "") {
        errors = "Vacio: Escriba algo de codigo en el Editor";
    }else{
            
            var code = document.getElementById('editor').value;
            
            // Removes all comments if exists
            code = code.replace(/\s*\/\/(.*)+/g,'');
            
            code = code.split('\n');
            
            // Max 4 symbols for each token
            
            // Each program starts with ^@\@ and ends with $@\@
            for(c in code){
                
                var patternTokens = new RegExp(tokens, 'g');
                
                if(Number(c) === 0){
                    if (!code[c].match(patternTokens)) {
                        errors += "Error sintactico en la linea: " + 1 + " - Cada programa inicia con ^@\\@<br/>";
                    }
                }
                
                if(Number(c) === code.length -1){
                    if (!code[c].match(patternTokens)) {
                        errors += "Error sintactico en la linea: " + code.length + " - Cada programa termina con $@\\@<br/>";
                    }
                    
                }
                
            }
            
            // Each line ends with "\@"
            for(c in code){
                if (code[c] !== "") {
                    var last = code[c].slice(-2);
                    if (last !== "\\@") {
                        errors += "Error sintactico en la linea: " + (Number(c) + 1) + " - Cada linea debe terminar con \\@<br/>";
                    }
                }
            }
            
            // Every line begin with a token
            for(c in code){
                
                var parts = code[c];
                
                parts = parts.replace(/\s+/g,' ').trim();
                parts = parts.split(' ');
                
                var patternTokens = new RegExp(tokens, 'g');
                
                for(p in parts){
                    if(Number(p) == 0){
                        if (!parts[p].match(patternTokens)) {
                            errors += "Error sintactico en la linea: " + (Number(c) + 1) + " - Cada linea debe inicar con un token<br/>";
                        } 
                    }

                }

            }
             
            // Strings are writen between ""
            
            
            // Numbers and math operators (+,-,*,/) are writen between ''
             
            
            // Everything between "(" and ")" is a logical operation (>,<,==,!=,&&,||)

            //console.log(schema);

    }
    
    /*-SEMANTIC--------------------------------------------------------------*/
    
    if (live === "") {
        errors = "Vacio: Escriba algo de codigo en el Editor";
    } else {

        var code = document.getElementById('editor').value;

        // Removes all comments if exists
        code = code.replace(/\s*\/\/(.*)+/g, '');

        code = code.split('\n');
        
        // Find numbers
        var patternNumbers = new RegExp('\'(.*)\'', 'g');
        
        // Go through code line by line
        for(c in code){    
            
            // Fix true
            var patternVerdad = new RegExp('{(.*)}', 'g');
            var vdd;
            
            if (code[c].match(patternVerdad)) {
                vdd = code[c].match(patternVerdad);
                code[c] = code[c].replace(patternVerdad, '??VERDAD??');
            }
            
            var vars;
            
            // If find a match of numbers and opetators
            if (code[c].match(patternNumbers)) {
                vars = code[c].match(patternNumbers);
                
                var tmp;
                
                // Splits the values separated by signs of +,-,*,/
                for(v in vars){
                    tmp = vars[v];
                    tmp = tmp.split(/[+\-\*\/]/);
                                        
                    for(t in tmp){
                        // If the current value is not a number (a variable)
                        if(isNaN(tmp[t].replace('\'', ''))){
                            
                            var x = tmp[t].replace('\'', '');
                            var declared;
                            
                            // goes from the beginning to the current position looking for the declaration
                            for(var i = 0; i < c; i++){
                                
                                // find declaration
                                var patternSearch1 = new RegExp(';!@\\s*"' + x + '"', 'g');
                                
                                // find declaration
                                var patternSearch2 = new RegExp(';!@\\s*"' + x + '\\s*=\\s*(.*)"', 'g');
                                
                                if (code[i].match(patternSearch1) || code[i].match(patternSearch2)) {
                                    declared = true;
                                    break;
                                }else{
                                    declared = false;
                                }
                            }
                            
                            if(!declared){
                                errors += "Error semántico: variable: " + x + " no declarada.<br/>";
                            }
                            
                        }
                    }
                    
                }
                
            }
            
        }
        
    }
    
    /*------------------------------------------------------------------------*/
    
    
    // Set text to errors and compiler
    document.getElementById('results').innerHTML = errors;
    document.getElementById('analyzer').innerHTML = live; 
    var txt = '';
    
    for(s in schema){
        
        for(v in schema[s]){
            if(Number(s) === 0){
                txt += schema[s] + ' (raiz)';
            }else if(Number(s) === Number(schema.length-1)){
                txt += schema[s] + ' (fin)';
            }else{
                txt += schema[s][v] + ' ->';
            }
            
        }
        txt += '<br/>';
    }
    document.getElementById('schema').innerHTML = txt;
}

function cleanSchema(){
    // Clean the array if not ready for Syntactic analysis
    while (schema.length) {
        schema.pop();
    }
}