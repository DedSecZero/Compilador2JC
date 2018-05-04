/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package analizadores;

import archivos.cargarArchivo;
import java.io.IOException;
import java.util.ArrayList;

/**
 *
 * @author johangar
 */
public class Lexico {
    
    
    private ArrayList<String> archivoSeparado;
    private cargarArchivo cga;

    public Lexico() throws IOException {
        cga = new cargarArchivo();
    }
        
    public void sep(){
        ArrayList<String> cg = cga.getArchivo();
        String linea;
        
        for (String string : cg) {
            linea = string;
            separarCadena(linea);
        }
    }
    public void separarCadena(String cadena){
        String[] partes = cadena.split("[.\\-\\s\\n\\t\\,]");
        for (String parte : partes) {
           archivoSeparado.add(parte);
        }
    }

    public ArrayList<String> getArchivoSeparado() {
        return archivoSeparado;
    }

    public void setArchivoSeparado(ArrayList<String> archivoSeparado) {
        this.archivoSeparado = archivoSeparado;
    }
    
    
    
}
