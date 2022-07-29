// Generated by https://quicktype.io

export interface DeleteVehicle {
    status: string;
    result: Result;
}

export interface Result {
    code: string;
    msg:  Msg;
}

export interface Msg {
    id:            number;
    brand:         string;
    model:         string;
    serie:         string;
    plates:        string;
    engine_number: string;
}