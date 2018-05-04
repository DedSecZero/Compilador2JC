/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package compilador2jc;

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
        //String cad = "Compiladores 2018-01 L.e.x.i.c.o";
        //separarCadena(cad);
        cargarArchivo();
    }
    
    public static void cargarArchivo() throws FileNotFoundException, IOException{
        FileInputStream fstream = new FileInputStream("Programa.2JC");
        BufferedReader br = new BufferedReader(new InputStreamReader(fstream));
        
        String linea;
        
        while((linea = br.readLine()) != null){
            //System.out.println(linea);
            separarCadena(linea);
        }
        br.close();
    }
    
    public static void separarCadena(String cadena){
        String[] partes = cadena.split("[.\\-\\s\\n\\t\\,]");
        for (String parte : partes) {
            System.out.println(parte);
        }
    }
}
