import {createContext,useState} from 'react';

interface ValuesProvider{
    //#region control del ID del vehiculo
    idUpdate:number,
    setIdUpdate:React.Dispatch<React.SetStateAction<number>>,
    //#endregion

    //#region control de mostrar/ocultar DetailsVehiclesContainer o PagerVehiclesView
    togglePagerOrDetailsContainer:boolean,
    setTogglePagerOrDetailsContainer:React.Dispatch<React.SetStateAction<boolean>>,
    //#endregion

    //#region control de mostrar/ocultar UpdateVehiclesView o DetailsVehiclesView
    toggleUpdateViewOrDetailView:boolean,
    setToggleUpdateViewOrDetailView:React.Dispatch<React.SetStateAction<boolean>>,
    //#endregion

    //#region guardamos los datos de un vehículo ******Eliminar el idUpdate
    dataVehicle : DataVehicle,
    setDataVehicle  : React.Dispatch<React.SetStateAction<DataVehicle>>,
    //#endregion

    //#region guardamos la posicion del scroll para en el paginador poder volver a la misma posición
    dataPager:DataPager,
    setDataPager:React.Dispatch<React.SetStateAction<DataPager>>,
     //#endregion

    //#region forzamos la recarga del paginador(cuando se añade un nuevo registro)
    reloadPager:boolean,
    setReloadPager:React.Dispatch<React.SetStateAction<boolean>>
    //#endregion
}

interface DataPager{
    positionScroll:number,
    searchInput:string,
    page:number
}

interface DataVehicle{
    id : number
    brand : string 
    model : string,
    plates? : string | null | undefined
    serie? : string,
    engine_number? : string 
}

export const VehicleContext = createContext({} as ValuesProvider);

export const VehicleProvider = ({children} : any)=>{
    const [idUpdate,setIdUpdate] = useState(0);
    const [togglePagerOrDetailsContainer, setTogglePagerOrDetailsContainer] = useState(false);
    const [toggleUpdateViewOrDetailView, setToggleUpdateViewOrDetailView] = useState(false);
    const [dataVehicle, setDataVehicle] = useState({} as DataVehicle);
    const [dataPager, setDataPager] = useState({
        positionScroll:0,
        searchInput:"",
        page:1
    });
    const [reloadPager, setReloadPager] = useState(false);

    return (
        <VehicleContext.Provider value={{
            idUpdate,
            setIdUpdate,
            togglePagerOrDetailsContainer,
            setTogglePagerOrDetailsContainer,
            toggleUpdateViewOrDetailView,
            setToggleUpdateViewOrDetailView,
            dataVehicle,
            setDataVehicle,
            dataPager,
            setDataPager,
            reloadPager,
            setReloadPager
        }}>
            {children}
        </VehicleContext.Provider>
    )
}