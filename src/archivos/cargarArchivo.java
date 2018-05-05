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
import java.util.Arrays;

/**
 *
 * @author johangar
 */
public class cargarArchivo {

    String simbolos;
    ArrayList<String> programa;
    ArrayList<String> programaSinSimbolos;

    public cargarArchivo() {
        this.simbolos               = null;
        this.programa               = new ArrayList<>();
        this.programaSinSimbolos    = new ArrayList<>();
    }
    
    public ArrayList<String> getPrograma() {
        return programa;
    }

    public void setPrograma(ArrayList<String> programa) {
        this.programa = programa;
    }
    
    public void addLineaPrograma(String lineaPrograma){
        programa.add(lineaPrograma);
    }
    
    public void cargarSimbolos() throws FileNotFoundException, IOException{
        System.out.println("Cargando Simbolos ...");
        FileInputStream fstream = new FileInputStream("Simbolos.2JC");
        BufferedReader br       = new BufferedReader(new InputStreamReader(fstream));
        String linea;
        simbolos = "["; //split("[.\\-\\s\\n\\t\\,]");
        int i = 0;
        while((linea = br.readLine()) != null && linea.length() !=0) {
            if (i == 0){
                simbolos = simbolos + linea;
            }
            else{
                simbolos = simbolos +"\\\\"+linea;
            }
            i ++;
        }
        simbolos = simbolos + "]";
        System.out.println(simbolos);
        br.close();
    }
    
    public void cargarPrograma() throws FileNotFoundException, IOException{
        System.out.println("Cargando Programa ...");
        FileInputStream fstream = new FileInputStream("Pgm.2JC");
        BufferedReader br       = new BufferedReader(new InputStreamReader(fstream));
        String linea;
        while((linea = br.readLine()) != null){
            addLineaPrograma(linea);
        }
    }
    
    public void eliminarSimbolosPrograma(){
        System.out.println("Eliminando simbolos en programa");
            for (String lineaPrograma : programa) {
                String[] partesLinea = lineaPrograma.split(simbolos);
                //programaSinSimbolos.addAll(Arrays.asList(partesLinea));
                for (String string : partesLinea) {
                    System.out.println(string);
                }
            }
    }
    
    public void mostrarPgmSinSimbolos(){
        System.out.println("Programa sin simbolos");
        for (String pgmSinSimbolos : programaSinSimbolos) {
            System.out.println(pgmSinSimbolos);
        }
    }
    
    public void mostrarPrograma(){
        System.out.println("Programa Cargado: ....");
        for (String programaLn : programa) {
            System.out.println(programaLn);
        }
    }
}
