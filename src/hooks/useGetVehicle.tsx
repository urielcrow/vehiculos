import React from 'react';
import { fetchCustome } from '../helpers/fetch'; 

// Generated by https://quicktype.io

export interface TopLevel {
    status: string;
    result: Result;
}

export interface Result {
    code: string;
    msg:  Vehicle;
}

export interface Vehicle {
    id:            number;
    brand:         string;
    model:         string;
    serie?:         string;
    plates?:        string | undefined;
    engine_number?: string;
    images?:        Images[] | string;
}

export interface Images {
    id:  string;
    url: string;
}

let temp : string[] = [];

export const useGetVehicle = (id:number)=>{

    const [vehicle, setVehicle] = React.useState<{load:boolean,data : Vehicle}>({
        load:true,
        data : {} as Vehicle
    });

    const [imgs,setImgs] = React.useState<string[]>([]);

    const deleteImg = (imgDelete:string)=>{

        temp = [];
        temp = imgs.filter(img => img !== imgDelete);//Eliminamos la imagen del Lightbox
        setImgs(temp);

        setVehicle({//Eliminamos la imagen de la DATA
            ...vehicle,
            data:{
                ...vehicle.data,
                images: typeof(vehicle.data.images) === "object" ? vehicle.data.images?.filter((img : Images) => img.url !== imgDelete) : []
            }
        })
    }

    const responseServer = React.useCallback(async()=>{
       
        const {result} : TopLevel = await fetchCustome( { endpoint : `/vehicles?id=${id}`, token : true } );

        setVehicle({
            load:false,
            data:result.msg
        });

        temp = [];

        typeof(result.msg.images) === "object" &&
        result.msg.images?.map( (img : Images)=>temp.push(img.url))

        setImgs(temp);
       
        
    },[id]);

    React.useEffect(()=>{
        responseServer();
    },[responseServer]);

    return {
        vehicle,
        imgs,
        deleteImg
    }

}