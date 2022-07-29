import {useContext} from 'react';
import { VehicleContext } from '../context/VehicleContext';


interface Props{
    id :number,
    image:string,
    brand:string,
    model:string,
    plates?:string | null,
}

export const CardVehicleComponent = ({image,brand,model,plates,id} : Props)=>{

    const {setIdUpdate,setTogglePagerOrDetailsContainer,dataPager} = useContext(VehicleContext);

    const loadDataVehicle = (id : number)=>{
        setIdUpdate(id);
        setTogglePagerOrDetailsContainer(true);
    }

    return(
        <div className="col-lg-4 col-md-6">
            <div className="card mb-4">
                <img src={image} className="card-img-top" alt={brand}/>
                <div className="card-body">
                    <h5 className="card-title text-truncate">{brand}</h5>
                    <p className="card-text"><b>Modelo: </b>{model} <br/> <b>Placas: </b>{plates}</p>
                    <button type="button" className="btn btn-primary" onClick={()=>loadDataVehicle(id)}>Detalles</button>
                </div>
            </div>
        </div>
    )
}