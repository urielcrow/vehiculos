import {useContext} from 'react';
import { VehicleContext } from '../context/VehicleContext';
import { PagerVehiclesView } from '../components/PagerVehiclesView';
import { DetailsVehiclesContainer } from '../components/DetailsVehiclesContainer';


export const TabAdminVehicle = () => {

    const {togglePagerOrDetailsContainer} = useContext(VehicleContext);

    return (
        <>
            <div className="section-header">
                <h3>Administrar Vehículos</h3>
                <h4 className="text-center"><i className="fas fa-edit text-warning"></i></h4>
            </div>
        

            {
                togglePagerOrDetailsContainer ? 
                <DetailsVehiclesContainer/> :
                <PagerVehiclesView/>
            }
            
            
        </>
    )
}
