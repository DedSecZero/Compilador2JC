^@\@              // Comentario 1    
_#@ "Calculadora de áreas:\n\n"\@
_#@ "1. Área del círculo.\n"\@
_#@ "2. Área del triángulo.\n"\@
_#@ "3. Área del rectángulo.\n\n"\@
_#@ "Elija una opción.\n"\@
;!@ "a"\@			// Comentario 2
// Imprime el radio del circulo
// Lee r, radio y declara pi, luego imprime el area
&$@ (a==1) {_#@ "Radio del círculo:" \| ;!@ "r" \| ;!@ "pi=3.1415" \| _#@ "Área del círculo: " \| _#@ 'pi*r*r'}\@
// Imprime el radio del triangulo
// Lee b, base y h altura e imprime el area
&$@ (a==2) {_#@ "Base del triángulo:" \| ;!@ "b" \| _#@ "Altura del triángulo.\n" \| ;!@ "h" \| _#@ "Área del triángulo: " \| _#@ 'b*h/2'}\@
// Imprime el radio del rectangulo
// Lee b, base y h altura e imprime el area
&$@ (a==3) {_#@ "Base del rectángulo:" \| ;!@ "b" \| _#@ "Altura del rectángulo.\n" \| ;!@ "h" \| _#@ "Área del rectángulo: " \| _#@ 'b*h'}\@
$@\@