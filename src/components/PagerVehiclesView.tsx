import React,{useContext}  from 'react';
import { VehicleContext } from '../context/VehicleContext';
import { useGetVehicles,Vehiculo} from '../hooks/useGetVehicles'; 
import { CardVehicleComponent } from './CardVehicleComponent';
import {LoadComponent} from './LoadComponent';
import { ButtonFloat } from './buttonFloat/ButtonFloatComponent';
import './pager/pager.css';

export const PagerVehiclesView = ()=>{

    const {dataPager,setDataPager,reloadPager} = useContext(VehicleContext);
    const   {   vehicles,
                Paginador,
                filterChange,
                filters,
                page,
                setReloadPager
            } = useGetVehicles({
                totalPerPage:30,
                pageInit:dataPager.page,
                filterSearch: dataPager.searchInput
            });

    const isMounted = React.useRef(false);

    React.useEffect(()=>{
        if(isMounted.current)
            setReloadPager(val=>!val);
    },[reloadPager])

    React.useEffect(() => {//Guardamos la posición del scroll cuando veamos el detalle de un vehículo para que al retornar a vehiculos nos deje en la misma posición

        if(!isMounted.current){
            isMounted.current = true;
            return
        }

        if(dataPager.positionScroll > 0 )
            window.scrollTo(0, dataPager.positionScroll);
       
        function updatePosition() {
            setDataPager({
                ...dataPager,
                positionScroll : window.pageYOffset
            });
        }

        window.addEventListener('scroll', updatePosition);
        updatePosition();

        return () => window.removeEventListener('scroll', updatePosition);

    }, [vehicles]);

    React.useEffect(()=>{
        setDataPager(data =>({
            ...data,
            searchInput: filters.search,
            page: page.current
        }));
    },[filters,page,setDataPager]);

    return(
            <div>
                <div className="row">
                    <div className="col-md-4">
                        <div className="row card-counter primary">
                            <div className="col-5">
                                <i className="fa fa-truck"></i>
                            </div>
                            <div className="col-7">
                                <span className="count-name">Total Vehículos: </span>
                                <span className="count-numbers">{vehicles.data.vehiculos_existentes}</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-8 mt-5">
                        <input type="text" placeholder="marca, modelo, placas, motor o serie" name="search" className="form-control" value={filters.search} onChange={filterChange}/>
                    </div>

                </div>

                {Paginador()}
                <hr/>
                {
                    vehicles.load ? 

                    <LoadComponent/> : 

                    <>
                        <div className="row" style={{padding:'5px',boxSizing: 'border-box'}}>
                            {
                                vehicles.data.vehiculos_por_pagina.map( ({id,image,brand,model,plates} : Vehiculo) =>
                                    <CardVehicleComponent key={id} id={parseInt(id)} image={image} brand={brand} model={model} plates={plates}/>
                                )
                            }
                        </div> 
                        <ButtonFloat hight={500}/>
                    </>

                }
                <hr/>
                {Paginador()}
                
                
    
            </div>
        
    )
}