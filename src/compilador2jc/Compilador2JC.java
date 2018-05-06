/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package compilador2jc;

import archivos.cargarArchivo;
import java.io.IOException;

/**
 *
 * @author johangar
 */
public class Compilador2JC {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) throws IOException {
        // TODO code application logic here
        cargarArchivo cA = new cargarArchivo();
        cA.cargarSimbolos();
        cA.cargarPrograma();
        cA.mostrarPrograma();
        cA.eliminarSimbolosPrograma();  
    }
}