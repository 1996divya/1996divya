import Parametri from '../server/Parametri';
import Activity from '../server/Activity';
import { Collection } from '../server/collection';



export class User extends Collection{

    public building_name = "";
    public level_name = "";
    public area_name = "";
    public component_name = "";
    public component_brand="";
     public parametri : Parametri[] = [];
     public activity : Activity[] = [];
    
    static find: any;
   
    
  }