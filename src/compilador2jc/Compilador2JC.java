/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package compilador2jc;

import archivos.cargarArchivo;
import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStreamReader;

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
        //cA.mostrarPgmSinSimbolos();
    }
}