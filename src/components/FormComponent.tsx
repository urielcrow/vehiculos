import React,{useContext,useState}  from 'react';
import { VehicleContext} from '../context/VehicleContext';
import { useForm,configInput} from '../hooks/useForm';
import {alertMixin,alert} from '../helpers/swal';
import { SwiperComponent } from './SwiperComponent';
import { CropperComponent } from './CropperComponent';
import { fetchCustome } from '../helpers/fetch';
import {LoadScreen} from './loadScreen/LoadScreen';
import { NewVehicle } from '../interfaces/NewVehicle';


const defaultSrcSwiper = require('../assets/no-images.jpg');
const defaultSrcCropper = require('../assets/cropper.jpg');


export interface ImagesCarrousel {
    url:string,
    id: string,
    file?: File
}

export const imgDefault : ImagesCarrousel = {
    url:defaultSrcSwiper,
    id:'default'
}

interface Props{
    type: 'new' | 'update';
}

export const FormComponent = ({type}:Props)=>{

    const {dataVehicle,setToggleUpdateViewOrDetailView,setReloadPager} = useContext(VehicleContext);
    const [loadScreen,setLoadScreen] = useState(false);

    const dataForm = {
        brand : configInput( {val: type==="update" ? dataVehicle.brand : "", type: "text", required: true, focus: dataVehicle.brand && type==="update" ? true : false,checked : dataVehicle.brand && type==="update" ? true : false}),
        model : configInput( {val: type==="update" ? dataVehicle.model : "", type: "numeric", required: true, max:4, focus: dataVehicle.model && type==="update" ? true : false,checked : dataVehicle.model && type==="update" ? true : false}),
        plates : configInput( {val: type==="update" ? dataVehicle.plates : "", type: "alphanumeric", focus: dataVehicle.plates && type==="update" ? true : false,checked : dataVehicle.plates && type==="update" ? true : false}),
        serie : configInput( {val: type==="update" ? dataVehicle.serie : "", type: "alphanumeric", focus: dataVehicle.serie && type==="update" ? true : false,checked : dataVehicle.serie && type==="update" ? true : false}),
        engine_number : configInput( {val:  type==="update" ? dataVehicle.engine_number : "", type: "alphanumeric", focus: dataVehicle.engine_number && type==="update" ? true : false,checked : dataVehicle.engine_number && type==="update" ? true : false})
    }

    const {form,changeInput,focus,blur,validateForm,reset} = useForm(dataForm);
    const [images, setImages] = React.useState<ImagesCarrousel[]>([imgDefault]);
    const resetCropper = React.useRef<boolean>(false);

    const saveForm = async(e : React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        if(validateForm()){
            alert('error','Llena el formulario correctamente');
        }
        else{
            setLoadScreen(true);
           
            const data = new FormData();

            Object.keys(form).forEach(input=>{
                const value = form[input].val.trim();
                value && data.append(input,value);
            });
            images.forEach(image=>{
                image.file && data.append('images[]',image.file);
            });

            if(type==="new"){
                const {result} : NewVehicle = await fetchCustome( { endpoint : `/vehicles`, method:'POST', body : data, token : true } );
                if(result.msg.brand !== data.get('brand'))
                    alert('error','Ocurrio un error, intentelo más tarde');
                else{
                    alertMixin('success', 'Vehículo registrado');
                    resetForm();
                    setReloadPager(val=>!val);
                }    
            }
            else{
                data.append('id',(dataVehicle.id).toString());
                const {result} : NewVehicle = await fetchCustome( { endpoint : `/vehicles`, method:'PUT', body : data, token : true } );
                
                if(result.msg.brand !== data.get('brand'))
                    alert('error','Ocurrio un error, intentelo más tarde');
                else{
                     alertMixin('success', 'Vehículo actualizado');
                    setToggleUpdateViewOrDetailView(false);//Regresamos al registro que queriamos actualizar
                }          
            }

            setLoadScreen(false);
        }
    }

    const resetForm = ()=>{

        if(type === "update"){
            setToggleUpdateViewOrDetailView(false);//Regresamos al registro que queriamos actualizar
            return;
        }

        reset();
        setImages([imgDefault]);
        resetCropper.current = !resetCropper.current;
    }

    return(
        <>
            <LoadScreen visible={loadScreen}/>
            <form onSubmit={saveForm}>
                <div className="row">
                    <div className="col-md-6 group-input">
                        <input type="text" className={`form-control-custome ${form.brand.checked && "form-checked"}`} name="brand" onFocus={focus} onBlur={blur} onChange={changeInput} value={form.brand.val} autoComplete="off"/>
                        <i className="fas fa-car label-icono info-input"></i>
                        <span className={ `label-text ${form.brand.focus && "label-text-focused"}`}><i className="fas fa-check-circle"></i> <b>Marca</b> (ej: DINA D400 2 Ejes)</span>
                        { form.brand.error && <span className="msg-error">Obligatorio</span> }
                    </div>
                    <div className="col-md-6 group-input">
                        <input type="text" className={`form-control-custome ${form.model.checked && "form-checked"}`} name="model" onFocus={focus} onBlur={blur} onChange={changeInput} value={form.model.val} autoComplete="off"/>
                        <i className="fas fa-tag label-icono info-input"></i>
                        <span className={ `label-text ${form.model.focus && "label-text-focused"}`}><i className="fas fa-check-circle"></i> <b>Modelo</b> (ej: 2021)</span>
                        { form.model.error && <span className="msg-error">Obligatorio</span> }
                    </div>
                    <div className="col-md-6 group-input">
                        <input type="text" className={`form-control-custome ${form.plates.checked && "form-checked"}`} name="plates" onFocus={focus} onBlur={blur} onChange={changeInput} value={form.plates.val} autoComplete="off"/>
                        <i className="fas fa-hashtag label-icono info-input"></i>
                        <span className={ `label-text ${form.plates.focus && "label-text-focused"}`}><b>Placas</b> (ej: 35AT5U)</span>
                    </div>
                    <div className="col-md-6 group-input">
                        <input type="text" className={`form-control-custome ${form.serie.checked && "form-checked"}`} name="serie" onFocus={focus} onBlur={blur} onChange={changeInput} value={form.serie.val} autoComplete="off"/>
                        <i className="fas fa-passport label-icono info-input"></i>
                        <span className={ `label-text ${form.serie.focus && "label-text-focused"}`}><b>Serie</b> (ej: LZGJLMR45MX081222)</span>
                    </div>
                    <div className="col-md-6 group-input">
                        <input type="text" className={`form-control-custome ${form.engine_number.checked && "form-checked"}`} name="engine_number" onFocus={focus} onBlur={blur} onChange={changeInput} value={form.engine_number.val} autoComplete="off"/>
                        <i className="fas fa-passport label-icono info-input"></i>
                        <span className={ `label-text ${form.engine_number.focus && "label-text-focused"}`}><b>No. motor</b> (ej: 1621D038387)</span>
                    </div>
                </div> 

                <div className="row">
                    <div className="col-md-6 mt-3">
                        <div className="card card-cropper">
                            <div className ="card-body card-cropper">
                                <CropperComponent setImages={setImages} imgDefault={defaultSrcCropper} resetCropper={resetCropper.current}/>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 mt-3">
                        <div className="card">
                            <div className ="card-body card-swiper">
                                <SwiperComponent images={images} setImages={setImages} imgDefault={imgDefault}/>
                            </div>
                        </div>
                    </div>
                </div> 
                
                <div className="d-flex justify-content-center mt-5">
                    <button type="submit" className="btn btn-lg btn-outline-success me-4" ><i className="fas fa-check"></i>{type === "update" ? "Actualizar" : "Guardar"}</button>
                    <button type="button" className="btn btn-lg btn-outline-danger" onClick={resetForm}><i className="fa fa-remove"></i> Cancelar</button>
                </div>

                <hr  className="mt-5"/>

                <div className="col-12">
                    <p style={{fontSize:"18px"}}><i className="fa fa-check-circle mr-2"></i> Campos obligatorios</p>
                </div>

            </form>
        </>
    )
}