import {ITest} from "./ITest";

export interface AppStates {
    building_name: string;
    level_name: string,
    area_name: string,
    component_name: string,
    component_brand: string,
    key: string,
    value: string,
    response?: ITest,
   
}

export interface AppProps {}
