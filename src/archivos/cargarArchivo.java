/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package archivos;


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
public class cargarArchivo {
    private ArrayList<String> archivo;

    public cargarArchivo() throws IOException {
        cargarArchivo();
    }
    
    
    
    public void cargarArchivo() throws FileNotFoundException, IOException{
        FileInputStream fstream = new FileInputStream("Programa.2JC");
        BufferedReader br = new BufferedReader(new InputStreamReader(fstream));
        
        String linea;
        
        while((linea = br.readLine()) != null){
            //System.out.println(linea);
            //separarCadena(linea);
            archivo.add(linea);
        }
        br.close();
    }

    public ArrayList<String> getArchivo() {
        return archivo;
    }

    public void setArchivo(ArrayList<String> archivo) {
        this.archivo = archivo;
    }
    
    
}
