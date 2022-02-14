export default class Parametri {
    public key  = '';
    public value = '';
    public tipo: ParametroTipo = ParametroTipo.testo;
    public preselezioni: string[] = [];
  }

  export enum ParametroTipo {
    numero = 'numero',
    testo = 'testo',
    data = 'data',
  }

 
  