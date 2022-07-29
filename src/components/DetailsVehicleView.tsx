import React,{ useContext,useEffect,useState } from 'react';
import Lightbox from 'react-image-lightbox';
import { alertImg,deleteConfirmate,alert,alertMixin } from '../helpers/swal';
import { VehicleContext } from '../context/VehicleContext';
import { useGetVehicle,Images } from '../hooks/useGetVehicle';
import { LoadComponent } from './LoadComponent';
import { fetchCustome } from '../helpers/fetch';
import {LoadScreen} from './loadScreen/LoadScreen';
import { DeleteImage} from '../interfaces/DeleteImageInterface';
import { DeleteVehicle } from '../interfaces/DeleteVehicleInterface';
import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app


export const DetailsVehicleView = ()=>{

    const {idUpdate,setTogglePagerOrDetailsContainer,setToggleUpdateViewOrDetailView,setDataVehicle} = useContext(VehicleContext);
    const {vehicle,imgs,deleteImg} = useGetVehicle(idUpdate);
    const [loadScreen,setLoadScreen] = useState(false);

    const images :string[]= imgs;

    const [lightbox, setLightbox] = React.useState({
        photoIndex: 0,
        isOpen: false,
    });

    useEffect(()=>{
        setDataVehicle({
            id: vehicle.data.id,
            brand: vehicle.data.brand,      
            model: vehicle.data.model,       
            serie: vehicle.data.serie,       
            plates: vehicle.data.plates,      
            engine_number: vehicle.data.engine_number
        });
    },[vehicle,setDataVehicle]);

    const deleteImage = (img:string,id:string)=>{

        alertImg(img,((resp:boolean)=>{
            if(resp)
            deleteImgConfirmed(img,id);
        }));

        const deleteImgConfirmed = async(img:string,id:string)=>{
            setLoadScreen(true);

            const {result} : DeleteImage = await fetchCustome( { endpoint : `/vehicles?id_delete_image=${id}`, method:'DELETE', token : true } );
            
            if(result.msg['delete image: '] === id){
                deleteImg(img);
                alertMixin('success', 'Imagen eliminada');
            }
            else
                alert('error','La imagen no pudo ser eliminada, intentelo más tarde');

            setLoadScreen(false);
        }

    }
  
    const deleteVehicle = (key:string,id:number)=>{
        deleteConfirmate(key,'Escribe el modelo del vehiculo para confirmar la eliminación',((resp:boolean)=>{
            resp ? deleteVehicleConfirmed(id) : alert('error','El modelo no coincide');
        }));

        const deleteVehicleConfirmed = async(id:number)=>{
            setLoadScreen(true);
            const {result} : DeleteVehicle = await fetchCustome( { endpoint : `/vehicles?id_delete_vehicle=${id}`, method:'DELETE', token : true } );

            if(result.msg.id === id){
                setTogglePagerOrDetailsContainer(false);//Mostramos el paginador
                alertMixin('success', 'Vehículo eliminado');
            }
            else
                alert('error','El registro no pudo ser eliminado, intentelo más tarde');
            setLoadScreen(true);
        }
    }

      const imgsVehicles = (index:number, img: string,id:string)=>{
       
        return(
            <div className="col-sm-4 col-md-3" key={id}>
                <div className="tabImg" onClick={()=>deleteImage(img,id)}>Eliminar <i className="fas fa-trash-alt"></i></div>
                <img 
                    src={img} 
                    onClick={()=> setLightbox({
                        photoIndex:index,
                        isOpen: true 
                    })} 
                    alt="..." 
                    className="img-thumbnail rounded" />
            </div> 
        )    
      }

      if(vehicle.load)
        return <LoadComponent/>


    return (
        <>
            <LoadScreen visible={loadScreen}/>
            <button type="button" className="btn btn-outline-primary" onClick={()=>setTogglePagerOrDetailsContainer(false)}><i className="fas fa-arrow-left fa-2x"></i></button>
            <h2 className="text-center">Información del vehículo </h2>

            <hr/>
            <div className="row">

                <div className="col-md-3">
                    <h2 className="mb-4">Opciones: </h2>
                    <div><button type="button" className="btn btn-success mb-4" onClick={()=>setToggleUpdateViewOrDetailView(true)}><i className="fas fa-redo fa-2x"></i> Actualizar</button></div>
                    <div><button type="button" className="btn btn-danger" style={{minWidth:'130px'}} onClick={()=>deleteVehicle(vehicle.data.model,vehicle.data.id)}><i className="fas fa-trash-alt fa-2x"></i> Eliminar</button></div>
                </div>

                <div className="col-md-9">
                    <div className="row">
                        <div className="col-md-12 mb-3">
                        <div className="detailRow">
                            <span>Marca</span>
                            <p>{ vehicle.data.brand}</p>
                            <i className="fas fa-car icon-detail"></i>
                        </div>
                        </div>
                        <div className="col-md-6 mb-3">
                        <div className="detailRow">
                            <span>Modelo</span>
                            <p>{vehicle.data.model}</p>
                            <i className="fas fa-tag icon-detail"></i>
                        </div>
                        </div>
                        <div className="col-md-6 mb-3">
                        <div className="detailRow">
                            <span>Serie</span>
                            <p>{vehicle.data.serie}</p>
                            <i className="fas fa-passport icon-detail"></i>
                        </div>
                        </div>
                        <div className="col-md-6 mb-3">
                        <div className="detailRow">
                            <span>Placas</span>
                            <p>{vehicle.data.plates}</p>
                            <i className="fas fa-hashtag icon-detail"></i>
                        </div>
                        </div>
                        <div className="col-md-6 mb-3">
                        <div className="detailRow">
                            <span>Número de motor</span>
                            <p>{vehicle.data.engine_number}</p>
                            <i className="fas fa-passport icon-detail"></i>
                        </div>
                        </div>
                    </div>
                </div>

            </div>
            <hr/>

            {
                
                images.length > 0 && <h2 className="text-center mb-5">Imagenes</h2>

            }

            <div className="row">
                {
                    typeof(vehicle.data.images) === "string" ?
                    <div></div> : //si trae un string significa que trae una imagen por defecto y no muestro nada
                    vehicle.data.images?.map( (img : Images,index:number) => {
                        return imgsVehicles(index,img.url,img.id)
                    })
                }
            </div>

            {lightbox.isOpen && (
                <Lightbox
                    mainSrc={images[lightbox.photoIndex]}
                    nextSrc={images[(lightbox.photoIndex + 1) % images.length]}
                    prevSrc={images[(lightbox.photoIndex + images.length - 1) % images.length]}
                    onCloseRequest={() => 
                        setLightbox({ 
                            ...lightbox,
                            isOpen: false 
                        })
                    }
                    onMovePrevRequest={() =>
                        setLightbox({
                            ...lightbox,
                            photoIndex: (lightbox.photoIndex + images.length - 1) % images.length,
                        })
                    }
                    onMoveNextRequest={() =>
                        setLightbox({
                            ...lightbox,
                            photoIndex: (lightbox.photoIndex + 1) % images.length,
                        })
                    }
                />
            )}
        
        </>
    )
}