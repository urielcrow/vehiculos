
import {FormComponent} from '../components/FormComponent';    


export const TabAddVehicle = () => {
    return (
        <>
            <div className="section-header">
                <h3>Agregar Vehículo</h3>
                <h4 className="text-center"><i className="fas fa-plus-circle text-success"></i></h4>
            </div>
            
            <FormComponent type="new"/>
        </>
    )
}
