import React,{useEffect} from 'react';
import { v4 as uuidv4 } from 'uuid';
import Cropper from "react-cropper";
import {alert} from '../helpers/swal';
import { ImagesCarrousel } from './FormComponent';
import "cropperjs/dist/cropper.css";

interface Props{
  setImages : React.Dispatch<React.SetStateAction<ImagesCarrousel[]>>
  imgDefault : string,
  resetCropper : boolean
}

export const CropperComponent = ( {setImages,imgDefault,resetCropper} : Props)=>{

    const [imageCropper, setImageCropper] = React.useState(imgDefault);
    const cropperRef = React.useRef<any>();
    const inputFile = React.useRef<any>(null);

    useEffect(() => {
      setImageCropper(imgDefault);
    }, [resetCropper,imgDefault])

    const onChange = (e: any) => {
      e.preventDefault();
      let file = e.target.files[0];
      if (/\.(?=jpg|jpeg)/gi.test(file.name.toLowerCase())) {
        const reader = new FileReader();
        reader.onload = () => {
          setImageCropper(reader.result as any);
        };
        reader.readAsDataURL(file);
      }
      else
        alert('error','Sólo se permiten imagenes .jpg');
    };
    
		const clickInputFile = ()=>{
			inputFile.current.click()
		}
  
    const getCropData = async() => {
      if (typeof cropperRef.current !== "undefined") {

        const newImage = cropperRef.current.cropper.getCroppedCanvas({
            width: 1280,//podemos establecer un tamaño fijo en la imagen final en este caso manejamos la relación 16 / 9
            height: 720,
            fillColor: '#fff'
          })
          .toDataURL("image/jpeg",0.7);//bajamos la calidad para disminuir considerablemente el peso sin afectar la calidad

          const blob = await fetch(newImage).then(temp => temp.blob());//con la imagen resultante creamos un blob
          const temp = new File([blob], "temporal.jpg", {type: blob.type});//hecho el blob creamos el archivo

          const newElement = {
            url:newImage,
            id:uuidv4(),
            file: temp
          }

          setImages((imgs:ImagesCarrousel[])=>[
            ...imgs.filter( img => img.id !== "default"),
            newElement
          ]);
       
          setImageCropper(imgDefault);//Establecemos al cropper la imagen por defecto
          
      }

    };

    const act = ()=>{
      cropperRef.current.cropper.enable();
    }

    const des = ()=>{
      cropperRef.current.cropper.disable();
    }

    const clear_ = ()=>{

      cropperRef.current.cropper.getCroppedCanvas({
        width: 500,
        height: 140,
        minWidth: 256,
        minHeight: 256,
      });
      
      cropperRef.current.cropper.reset();
      
    }
  
    return(
        <>
					<Cropper
            ref={cropperRef}
            src={imageCropper}
            style={{ maxHeight: 330,width: "100%"}}
            initialAspectRatio={16 / 9}
            cropBoxResizable={false}
            dragMode = 'move'
            guides={false}
					/>
						<input ref={inputFile} type="file" onChange={onChange} style={{display:'none'}}/>
						<button type="button" className="btn btn-success me-4 btn-cropper-save" onClick={getCropData} disabled={imageCropper === imgDefault} ><i className="fas fa-plus"></i> Añadir</button>
						<button type="button" className="btn btn-primary me-4 btn-cropper-load" onClick={clickInputFile}><i className="fas fa-file-upload"></i> Cargar Imagen</button>

            <button type="button" onClick={()=>des()}>Desactivar</button>
            <button type="button" onClick={()=>act()}>activar</button>
            <button type="button" onClick={()=>clear_()}>Limpiar</button>
        </>
    )
}