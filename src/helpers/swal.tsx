import Swal,{SweetAlertIcon} from 'sweetalert2';


export const alertMixin = (icon : SweetAlertIcon , title : string)=>{
    Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast : any) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    }).fire({
        icon,
        title
    });
}

export const alert = (icon : SweetAlertIcon , title : string)=>{
    Swal.fire({
        position: 'center',
        icon,
        title,
        showConfirmButton: true,
        confirmButtonColor: '#d33',
        timer: 30000
    });
}

export const alertImg = (imageUrl: string,callback: (resp:boolean)=>void)=>{
    Swal.fire({
        title: '¿Eliminar imagen?',
        text: '',
        imageUrl,
        imageWidth: 400,
        imageHeight: 300,
        imageAlt: 'Custom image',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'No',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
    }).then((result) => {
        result.isConfirmed ? callback(true) : callback(false);
    });
}

export const deleteConfirmate = (key:string,title:string,callback:(resp:boolean)=>void)=>{
    Swal.fire({
        title,
        input: 'text',
        inputAttributes: {
          autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        confirmButtonColor: '#3085d6',
        showLoaderOnConfirm: true,
        preConfirm: (login) => {
            login === key ? callback(true) : callback(false);
        }
      });
}
