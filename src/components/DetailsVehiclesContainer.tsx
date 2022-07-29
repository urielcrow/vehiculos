import {useContext} from 'react';
import { VehicleContext } from '../context/VehicleContext';
import { DetailsVehicleView } from './DetailsVehicleView';
import { UpdateVehiclesView } from './UpdateVehiclesView';


export const DetailsVehiclesContainer = ()=>{

    const {toggleUpdateViewOrDetailView} = useContext(VehicleContext);

    return (
        <>
           
              {
                toggleUpdateViewOrDetailView ? 

                <UpdateVehiclesView /> :

                <DetailsVehicleView />
              }
           
        </>
    )
}