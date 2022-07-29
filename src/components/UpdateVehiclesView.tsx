import {useContext} from 'react';
import { VehicleContext } from '../context/VehicleContext';
import {FormComponent} from './FormComponent';  

export const UpdateVehiclesView = ()=>{

    const {setToggleUpdateViewOrDetailView} = useContext(VehicleContext);

    return (
        <>
            <button type="button" className="btn btn-outline-primary" onClick={()=>setToggleUpdateViewOrDetailView(false)}><i className="fas fa-arrow-left fa-2x"></i></button>
            <h2 className="text-center">Actualizar información del vehículo</h2>
            <hr/>
            <FormComponent type="update"/>
        </>
    )
}