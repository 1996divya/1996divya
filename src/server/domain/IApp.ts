import {ITest} from "./ITest";
import Parametri, { ParametroTipo } from "../Parametri"
import { IColumn, IDropdown, IDropdownOption } from "@fluentui/react";
import Activity from "../../server/Activity"

export interface AppStates {
    building_name: string;
    level_name: string,
    area_name: string,
    component_name: string,
    component_brand: string,
    key: string,
    value: string,
    response?: ITest,
    new_par: string[],
    par_specifici: Parametri[],
    columns: IColumn[],
    columns1: IColumn[],
    par_selected: Parametri,
    deleteDialogHidden: boolean,
    announcedMessage: string,
    activity: string,
    count: number,
    showName: boolean,
    dropdown: string,
    par_activity: Activity[],
    new_activity: string[],
    par_activated: Activity,
 
    
 
   
}

export interface AppProps {}
