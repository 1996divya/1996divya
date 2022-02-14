import * as React from 'react';
import '../Less/app.less';
import { apiRoute } from '../utils';
import { AppProps, AppStates } from "../../server/domain/IApp";
import { ITest } from "../../server/domain/ITest";
import { Put, Post, Get, Delete } from "../Services";
import { IconButton, IStackTokens, Label, PrimaryButton, Stack, TextField, TooltipHost, Text, Dropdown, IDropdownOption, IDropdownStyles, DropdownMenuItemType, DetailsList, IColumn, SelectionMode, DetailsListLayoutMode, Dialog, DialogFooter, DefaultButton, mergeStyles, DatePicker, defaultDatePickerStrings } from '@fluentui/react';
import Parametri, { ParametroTipo } from "../../server/Parametri"
import Activity from "../../server/Activity"
import Toastify from 'toastify-js';
import { Selection } from '@uifabric/utilities/lib/selection/Selection';
import { initializeIcons } from '@uifabric/icons';
import axios from 'axios';
import { User } from '../../server/module'
import { db } from '../../server/db'

initializeIcons()
const wrapStackTokens: IStackTokens = { childrenGap: 10, padding: -10 };
const dropdownStyles: Partial<IDropdownStyles> = {
    dropdown: { width: 150 },
};


const suffix1 = '';
const rootClass = mergeStyles({ maxWidth: 300, selectors: { '> *': { marginBottom: 15 } } });
const options1: IDropdownOption[] = [
    { key: 'Days', text: 'For how manys days', itemType: DropdownMenuItemType.Header },
    { key: 'Day', text: 'Days' },
    { key: 'Week', text: 'Week' },
    { key: 'Months', text: 'Months' },
    { key: 'Years', text: 'Years' }


]

export default class App extends React.Component<AppProps, AppStates> {


    displayNameHandler = (e: any) => {
        const updatedName = e.target.value;

    }
    sendthru = () => {
        document.getElementsByTagName("input")
        this.setState({
            activity: '',
            count: 0,
            dropdown: ''
        })
    }
    handleSubmit = (e: any) => {
        e.preventDefault();
        // e.target.reset()
        this.setState({
            showName: true,


        });

        document.getElementsByTagName("input")

        this.setState({
            activity: this.state.activity,
            count: 0,
            dropdown: ''
        })
    }

    private defaultState = (): AppStates => {
        return {

            building_name: '',
            level_name: '',
            area_name: '',
            component_name: '',
            component_brand: '',
            key: '',
            value: '',
            new_par: [],
            par_specifici: [],
            columns: this._columns,
            columns1: this._columns1,
            par_selected: new Parametri(),
            deleteDialogHidden: true,
            announcedMessage: '',
            activity: '',
            count: 0,
            showName: false,
            dropdown: options1.toString(),
            par_activity: [],
            new_activity: [],
            par_activated: new Activity(),

        }
    }
    public state: AppStates = this.defaultState();

    private _onColumnClick = (
        _ev: React.MouseEvent<HTMLElement>,
        column: IColumn
    ): void => {
        const newColumns: IColumn[] = this.state.columns.slice();
        const currColumn: IColumn = newColumns.filter(
            (currCol) => column.key === currCol.key
        )[0];
        newColumns.forEach((newCol: IColumn) => {
            if (newCol === currColumn) {
                currColumn.isSortedDescending = !currColumn.isSortedDescending;
                currColumn.isSorted = true;
                this.setState({
                    announcedMessage: `${currColumn.name} $
            'ordinamento '
          )} ${currColumn.isSortedDescending
                            ? 'decrescente'
                            : 'crescente'
                        }`,
                });
            } else {
                newCol.isSorted = false;
                newCol.isSortedDescending = true;
            }
        });
        const newItems = copyAndSort(
            this.state.par_specifici,
            currColumn.fieldName,
            currColumn.isSortedDescending
        );
        this.setState({
            columns: newColumns,
            par_specifici: newItems,
        });
    };

    private _selection: Selection = new Selection({
        selectionMode: SelectionMode.single,
        onSelectionChanged: () => {
            const parametro = this._selection.getSelection()[0] as Parametri;
            if (parametro !== undefined) {
                this.setState({
                    par_selected: parametro,
                });
            } else {
                this.setState({
                    par_selected: new Parametri(),
                });
            }
        },
    });
    private _selection1: Selection = new Selection({
        selectionMode: SelectionMode.single,
        onSelectionChanged: () => {
            const activity = this._selection.getSelection()[0] as Activity;
            if (activity !== undefined) {
                this.setState({
                    par_activated: activity,
                });
            } else {
                this.setState({
                    par_activated: new Activity(),
                });
            }
        },
    });


    private _getKey(item: any): string {
        return item.key;
    }

    private _par_specifici: Parametri[] = [];
    private _par_activity: Activity[] = [];
    private _columns1: IColumn[] = [{

        key: 'column1',
        name: 'Activity',
        minWidth: 80,
        maxWidth: 100,
        isRowHeader: true,
        isResizable: true,
        isSorted: true,
        isSortedDescending: false,
        onRender: (item) => {

            const s = item.activity as string;
            return (
                <Text variant="medium" color={'black'}>
                    {s}
                </Text>
            );
        },
    },
    {

        key: 'column2',
        name: 'Count',
        minWidth: 80,
        maxWidth: 100,
        isRowHeader: true,
        isResizable: true,
        isSorted: false,
        isSortedDescending: false,
        onRender: (item) => {

            const s = item.count as string;
            return (
                <Text variant="medium" color={'black'}>
                    {s}
                </Text>
            );
        },
    },
    {

        key: 'column3',
        name: 'Days',
        minWidth: 80,
        maxWidth: 100,
        isRowHeader: true,
        isResizable: true,
        isSorted: false,
        isSortedDescending: false,
        onRender: (item) => {

            const s = item.dropdown as string;
            return (
                <Text variant="medium" color={'black'}>
                    {s}
                </Text>
            );
        },
    }]
    private _columns: IColumn[] = [
        {

            key: 'column1',
            name: 'Nome',
            minWidth: 80,
            maxWidth: 100,
            isRowHeader: true,
            isResizable: true,
            isSorted: true,
            isSortedDescending: false,
            onRender: (item) => {

                const s = item.key as string;
                return (
                    <Text variant="medium" color={'black'}>
                        {s}
                    </Text>
                );
            },
            sortAscendingAriaLabel: 'Ordinato da A a Z',
            sortDescendingAriaLabel: 'Ordinato da Z ad A',
            onColumnClick: this._onColumnClick,
            data: 'string',
            isPadded: true,
        },
        {
            key: 'column2',
            name: 'Valore',
            minWidth: 80,
            maxWidth: 100,
            isRowHeader: true,
            isResizable: true,
            isSorted: false,
            isSortedDescending: false,
            onRender: (item: any, i: number | undefined) => {
                const p = item as Parametri;
                return (
                    <TextField
                        defaultValue={
                            this._par_specifici.where((x) => x.key === p.key).firstOnly()
                                ?.value
                        }

                        onChange={(e: any, text: string | undefined) => {
                            const temp = this._par_specifici;
                            const result: Parametri[] = [];
                            for (const curr of temp) {
                                if (curr.key === this.state.par_selected.key) {
                                    if (text) curr.value = text;
                                }
                                result.push(curr);
                            }
                            this._par_specifici = result;
                        }}
                    ></TextField>
                );
            },
            data: 'string',
            isPadded: true,
        },
        {
            key: 'column3',
            name: 'Predefiniti',
            minWidth: 80,
            maxWidth: 120,
            isRowHeader: true,
            isResizable: true,
            isSorted: false,
            isSortedDescending: false,
            onRender: (item) => {
                const s = item.preselezioni as string[];
                return (
                    <Dropdown
                        options={s
                            .select<IDropdownOption>((x) => {
                                return { key: '', text: x.capitalize() };
                            })
                            .map((x, i) => {
                                x.key = x.text + i;
                                return x;
                            })}
                        onChange={(e: any, option: IDropdownOption | undefined) => {
                            if (option) {
                                const temp = this.state.par_specifici;
                                const result: Parametri[] = [];
                                for (const curr of temp) {
                                    if (curr.key === this.state.par_selected.key) {
                                        if (curr.value === '') curr.value = option.text.toString();
                                    }
                                    result.push(curr);
                                }
                                this.setState({
                                    par_specifici: result,
                                });
                            }
                        }}
                        styles={dropdownStyles}
                    />
                );
            },
            data: 'string',
            isPadded: true,
        },
        {
            key: 'column4',
            name: 'Cancella',
            minWidth: 80,
            maxWidth: 100,
            isRowHeader: true,
            isResizable: true,
            isSorted: false,
            isSortedDescending: false,
            onRender: () => {
                return (
                    <IconButton

                        iconProps={{ iconName: 'ChromeClose' }}
                        title='Cancella'
                        ariaLabel="Delete"
                        onClick={() => {
                            this.setState({ deleteDialogHidden: false });
                        }}
                    />
                );
            },
            data: 'string',
            isPadded: true,
        },
    ];


    private _addNewDefault = () => {

        if (!(this.state.value === "" || this.state.value === null || this.state.value === undefined)) {
            const temp = [...this.state.new_par];
            temp.push(this.state.value);
            this.setState({
                new_par: temp,
                value: '',
            });
        }
    };
    private _addNewParametro = () => {

        if (!(this.state.key === '' || this.state.key === null || this.state.key === undefined)) {
            const temp: Parametri[] = this.state.par_specifici.select((x) => x);
            for (const elem of temp) {
                if (elem.key === this.state.key) {
                    toastError(
                        'Già esiste un parametro con lo stesso nome'
                    );
                    return;
                }
            }
            temp.push({
                key: this.state.key,
                preselezioni: [...this.state.new_par],
                tipo: ParametroTipo.testo,
                value: '',
            });
            this._par_specifici = temp;
            this.setState({
                par_specifici: temp,
                key: '',
                new_par: [],
            });
        }
    };
    private _addNewParametro1 = () => {

        if (!(this.state.activity === '' || this.state.activity === null || this.state.activity === undefined)) {
            const temp: Activity[] = this.state.par_activity.select((x) => x);
            for (const elem of temp) {
                if (elem.activity === this.state.activity) {
                    toastError(
                        'Già esiste un parametro con lo stesso nome'
                    );
                    return;
                }
            }
            temp.push({
                activity: this.state.activity,
                // preselezioni: [...this.state.new_par],
                //tipo: ParametroTipo.testo,
                count: this.state.count,
                dropdown: this.state.dropdown
            });
            this._par_activity = temp;
            this.setState({
                par_activity: temp,
                activity: '',
                count: 0,
                dropdown: '',
                new_activity: [],
            });
        }
    };

    private _removeParametro = () => {
        const temp = this.state.par_specifici.where(
            (x) => x.key !== this.state.par_selected.key
        );
        this._par_specifici = temp;
        this.setState({
            par_specifici: temp,
            deleteDialogHidden: true,
            par_selected: new Parametri(),
        });
    };




    render() {

        const inputText = "Input text...";
        return (
            <div style={{}}>
                <Dialog
                    hidden={this.state.deleteDialogHidden}
                    onDismiss={() => {
                        this.setState({ deleteDialogHidden: true });
                    }}
                    dialogContentProps={{
                        title: 'Confermi la cancellazione?',
                        subText:
                            'Ricorda che per confermare definitavamente la cancellazione dovrai salvare la scheda'
                        ,
                        showCloseButton: false,
                    }}
                >
                    <DialogFooter>
                        <PrimaryButton onClick={this._removeParametro} text="Sì" />
                        <DefaultButton
                            onClick={() => {
                                this.setState({ deleteDialogHidden: true });
                            }}
                            text="No"
                        />
                    </DialogFooter>
                </Dialog>
                <Stack horizontal>
                    <h1>
                        DIGITALIZZO ASSET</h1>
                    <h1
                        style={{ paddingLeft: 590 }}>
                        PIANO MENUTENZIONE</h1>   </Stack>
                <div style={{ border: "solid thick #333", width: 700, height: 200, float: 'right', padding: 8, marginRight: 220 }}>

                    <Stack horizontal wrap tokens={wrapStackTokens} >
                        <Stack  >
                            <Label >Activity</Label>

                            <TextField
                                style={{ border: "solid thin #333", width: 200, float: "left", alignContent: 'right' }}
                                value={this.state.activity}
                                onChange={(_e, s) => {
                                    if (s !== undefined) {
                                        this.setState({
                                            activity: s,

                                        });
                                        //  this.displayNameHandler

                                    }

                                }
                                }
                            ></TextField>

                        </Stack>



                        <Stack >
                            <Label >Count</Label>

                            <TextField
                                type='number'
                                //inputMode='numeric'
                                style={{ border: "solid thin #333", width: 200, float: "left" }}
                                value={this.state.count + suffix1}
                                onChange={(e: any, val: string | undefined) => {
                                    if (val !== undefined) {
                                        this.setState({
                                            count: Number(val),
                                        });
                                        // this.displayNameHandler
                                    }
                                }}

                            ></TextField>
                        </Stack>
                        <Stack>
                            <Dropdown
                                placeholder="Select an option"
                                label=" Elenco valori predefiniti"
                                options={options1}
                                styles={dropdownStyles}
                                onChange={(_e, s) => {
                                    if (s !== undefined) {
                                        this.setState({
                                            dropdown: s.text.toString(),


                                        });
                                        // this.displayNameHandler
                                    }
                                }}

                            /></Stack>
                        <Stack>
                            <PrimaryButton

                                text='Aggiungi'
                                style={{ alignContent: 'center', width: 50, height: 60 }}
                                onClick={this._addNewParametro1}

                            ></PrimaryButton>



                        </Stack>
                        <Stack >

                            <DetailsList
                                styles={{
                                    root: {
                                        width: 600
                                    }
                                }}
                                items={this.state.par_activity}
                                columns={this._columns1}
                                selectionMode={SelectionMode.single}
                                getKey={this._getKey}
                                layoutMode={DetailsListLayoutMode.justified}
                                isHeaderVisible={true}
                                selection={this._selection1}
                                selectionPreservedOnEmptyClick={true}
                                ariaLabelForSelectionColumn="Toggle selection"
                                ariaLabelForSelectAllCheckbox="Toggle selection for all items"
                                checkButtonAriaLabel="Row checkbox"
                            />

                        </Stack></Stack>
                </div>


                <Stack horizontal>


                    <div style={{ float: 'left', paddingBottom: 50, }}>
                        <label>BUILDING</label>
                        <TextField
                            style={{ border: "solid thin #333", width: 200, float: "left" }}
                            value={this.state.building_name}
                            onChange={(e: any, val: string | undefined) => {
                                if (val !== undefined) {
                                    this.setState({
                                        building_name: val,
                                    });
                                }
                            }}
                        ></TextField>

                    </div>

                </Stack>
                <Stack horizontal >
                    <div style={{ float: 'left', paddingBottom: 50 }}>
                        <label>FLOOR</label>
                        <TextField
                            style={{ border: "solid thin #333", width: 200, float: 'left' }}
                            value={this.state.level_name}
                            onChange={(e: any, val: string | undefined) => {
                                if (val !== undefined) {
                                    this.setState({
                                        level_name: val,
                                    });
                                }
                            }}
                        ></TextField>
                    </div>
                </Stack>
                <Stack horizontal >
                    <div style={{ float: 'left', paddingBottom: 50 }}>
                        <label>AREA</label>
                        <TextField
                            style={{ border: "solid thin #333", width: 200, float: "left" }}
                            value={this.state.area_name}
                            onChange={(e: any, val: string | undefined) => {
                                if (val !== undefined) {
                                    this.setState({
                                        area_name: val,
                                    });
                                }
                            }}
                        ></TextField>
                    </div>
                </Stack>
                <Stack horizontal >
                    <div style={{ float: 'left', paddingBottom: 50 }}>
                        <label>COMPONENT NAME</label>
                        <TextField
                            style={{ border: "solid thin #333", width: 200, float: "left" }}
                            value={this.state.component_name}
                            onChange={(e: any, val: string | undefined) => {
                                if (val !== undefined) {
                                    this.setState({
                                        component_name: val,
                                    });
                                }
                            }}
                        ></TextField>
                    </div>
                </Stack>
                <Stack horizontal >
                    <div style={{ float: 'left', paddingBottom: 50 }}>
                        <label>COMPONENT BRAND</label>
                        <TextField
                            style={{ border: "solid thin #333", width: 200, float: "left" }}
                            value={this.state.component_brand}
                            onChange={(e: any, val: string | undefined) => {
                                if (val !== undefined) {
                                    this.setState({
                                        component_brand: val,
                                    });
                                }
                            }}
                        ></TextField>
                    </div>
                </Stack>
                <Stack>
                    <Stack horizontal tokens={{ childrenGap: 380 }}>

                        <h1
                            style={{ float: 'right', }}>
                            PROPERTIES</h1></Stack>



                    <div style={{ border: "solid thick #333", width: 800, height: 250, padding: 5 }}>

                        {/* <hr className='dashed'></hr> */}
                        <Stack horizontal wrap tokens={wrapStackTokens}>
                            <Stack>

                                <Label>Nome</Label>

                                <TextField
                                    style={{ border: "solid thin #333", width: 200, float: "left" }}
                                    value={this.state.key}
                                    onChange={(_e, s) => {
                                        if (s !== undefined) {
                                            this.setState({
                                                key: s,
                                            });
                                        }
                                    }}

                                ></TextField>

                            </Stack>
                            <Stack>
                                <Label>Nuovo valore predefinito</Label>


                                <TextField
                                    style={{ border: "solid thin #333", width: 200, float: "left" }}
                                    value={this.state.value}
                                    onChange={(_e, s) => {
                                        if (s !== undefined) {
                                            this.setState({ value: s });
                                        }
                                    }}
                                    styles={{
                                        root: {
                                            width: '200px',
                                        },
                                    }}
                                ></TextField>
                            </Stack>
                            <Stack horizontal tokens={{ childrenGap: 20 }}>
                                <TooltipHost

                                    content={
                                        'Aggiungi valore di default'
                                    }
                                    calloutProps={{ gapSpace: 0 }}
                                    style={{ paddingTop: 40 }}
                                >
                                    <IconButton
                                        style={{ paddingTop: 40 }}
                                        iconProps={{ iconName: 'Add' }}
                                        title="AddNewValue"
                                        onClick={this._addNewDefault}
                                    />

                                </TooltipHost>



                                <Dropdown
                                    label=" Elenco valori predefiniti"
                                    options={this.state.new_par
                                        .select<IDropdownOption>((x) => {
                                            return { key: '', text: x.capitalize() };
                                        })
                                        .map((x, i) => {


                                            x.key = x.text + i;
                                            return x;
                                        })}
                                    styles={dropdownStyles}
                                />



                                <PrimaryButton
                                    text='Aggiungi'
                                    style={{ alignContent: 'center', width: 50, height: 60 }}
                                    onClick={this._addNewParametro}
                                >

                                </PrimaryButton>
                            </Stack>

                        </Stack>
                        <Stack>
                            <Label>Elenco parametri specifici</Label>
                            <Text
                                style={{
                                    color: 'black',
                                    marginBottom: '10px',
                                }}
                                variant="xSmall"
                            >
                                {' '}

                                "Se selezioni un valore predefinito e poi ne metti uno nuovo in valore, quest'ultimo sarà quello registrato"

                            </Text>  </Stack>
                        <Stack >
                            <DetailsList
                                styles={{
                                    root: {
                                        width: 700
                                    }
                                }}
                                items={this.state.par_specifici}
                                columns={this._columns}
                                selectionMode={SelectionMode.single}
                                getKey={this._getKey}
                                layoutMode={DetailsListLayoutMode.justified}
                                isHeaderVisible={true}
                                selection={this._selection}
                                selectionPreservedOnEmptyClick={true}
                                ariaLabelForSelectionColumn="Toggle selection"
                                ariaLabelForSelectAllCheckbox="Toggle selection for all items"
                                checkButtonAriaLabel="Row checkbox"
                            />






                        </Stack>


                    </div>

                    <div className='down1' style={{ paddingLeft: 150, }}>









                    </div>


                </Stack>


                <div>

                </div>


                <Stack>
                    <PrimaryButton
                        style={{ width: 50, height: 50 }}
                        text='SAVE'
                        onClick={

                            async (event: any) => {
                                const json = {

                                    building_name: this.state.building_name,
                                    level_name: this.state.level_name,
                                    area_name: this.state.area_name,
                                    component_name: this.state.component_name,
                                    component_brand: this.state.component_brand,
                                    parametri: this.state.par_specifici,
                                    activity: this.state.par_activity

                                }
                                const result = await axios.post('http://localhost:3000/add_user', json);
                                const data = result.data
                                console.log(data)
                                reload()
                            }
                        } /></Stack>


            </div>



        );
    }
}


export function copyAndSort<T>(
    items: T[],
    columnKey: string | undefined,
    isSortedDescending?: boolean
): T[] {
    const key = columnKey as keyof T;
    return items
        .slice(0)
        .sort((a: T, b: T) =>
            (isSortedDescending ? a[key] < b[key] : a[key] > b[key]) ? 1 : -1
        );
}
function toastError(message: string) {
    Toastify({
        text: message,

    }).showToast();
}

function reload() {
    const reload = location.reload();
}

function myFunction() {
    const elements = document.getElementsByTagName("input");
    for (let ii = 0; ii < elements.length; ii++) {
        if (elements[ii].type == "text") {
            elements[ii].value = "";
        }
    }
}



