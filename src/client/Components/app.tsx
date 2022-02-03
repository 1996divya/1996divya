import * as React from 'react';
import '../Less/app.less';
import { apiRoute } from '../utils';
import { AppProps, AppStates } from "../../server/domain/IApp";
import { ITest } from "../../server/domain/ITest";
import { Put, Post, Get, Delete } from "../Services";
import { Label, PrimaryButton, Stack, TextField } from '@fluentui/react';

export default class App extends React.Component<AppProps, AppStates> {
    state: AppStates = {
        building_name: '',
        level_name: '',
        area_name: '',
        component_name: '',
        component_brand: '',
        key: '',
        value: '',

    };



    render() {
        //const { username, textForPost, textForPut, textForDelete } = this.state;
        const inputText = "Input text...";
        return (
            <div style={{}}>
                <Stack>

                </Stack>
                <Stack horizontal>
                    <div style={{ float: 'left', paddingLeft: 100, paddingBottom: 50, paddingTop: 10 }}>
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
                    <div style={{ float: 'left', paddingLeft: 100, paddingBottom: 50 }}>
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
                    <div style={{ float: 'left', paddingLeft: 100, paddingBottom: 50 }}>
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
                    <div style={{ float: 'left', paddingLeft: 100, paddingBottom: 50 }}>
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
                    <div style={{ float: 'left', paddingLeft: 100, paddingBottom: 50 }}>
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
                <Stack horizontal>
                    <div style={{ float: 'left', paddingLeft: 10, paddingBottom: 50 }} >
                        <h1 style={{ paddingLeft: 50 }}>KEY-VALUE</h1>

                        <Stack horizontal tokens={{ childrenGap: 20 }}>
                            <label style={{ paddingLeft: 10 }}>KEY</label>
                            <TextField
                                style={{ border: "solid thin #333", width: 100, }}
                                value={this.state.key}
                                onChange={(_e, s) => {
                                    if (s !== undefined) {
                                        this.setState({ key: s });
                                    }
                                }}


                            ></TextField>


                            <label>VALUE</label>
                            <TextField
                                style={{ border: "solid thin #333", width: 100 }}
                                value={this.state.value}
                                onChange={(_e, s) => {
                                    if (s !== undefined) {
                                        this.setState({ value: s });
                                    }
                                }}



                            ></TextField>

                        </Stack>
                    </div>

                </Stack>
                <Stack>
                    <PrimaryButton
                        style={{ width: 50, height: 50 }}
                        text='SAVE' /></Stack>
            </div>



        );
    }
}
