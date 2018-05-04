/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package compilador2jc;

import analizadores.Lexico;
import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;

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
        //String cad = "Compiladores 2018-01 L.e.x.i.c.o";
        //separarCadena(cad);
        Lexico lexico = new Lexico();
        
        ArrayList<String> sep;
        sep = lexico.getArchivoSeparado();
        
        for (String string : sep) {
            System.out.println(string);
            
        }
    }
    
    
}
