import { Lazy, Navigation, Pagination, Scrollbar } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ImagesCarrousel } from './FormComponent';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

interface Props{
    setImages : React.Dispatch<React.SetStateAction<ImagesCarrousel[]>>,
    images : ImagesCarrousel[],
    imgDefault : ImagesCarrousel
}

export const SwiperComponent = ( {images,setImages,imgDefault} : Props)=>{

    const delImg = (id : string)=>{
        
        setImages([
            ...images.filter(img => img.id !== id)
        ]);

        if(images.length-1 < 1)
            setImages([imgDefault]);

    }

    const items =  images.map( (img : ImagesCarrousel,index : number) =>
        <SwiperSlide key={img.url+index} style={{maxHeight: "330px", width: "100%"}}>
            <img
                src={img.url}
                className="swiper-lazy"
                alt={img.url}
            />
            {
                img.id !== "default" 
                && <button type="button" className="btn btn-lg btn-outline-danger me-4" onClick={()=>delImg(img.id)} style={{position:'absolute',top:'0',right:'10px'}}><i className="fas fa-trash-alt"></i></button>
            }
            <div className="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
        </SwiperSlide> 
    )

    return (
        <Swiper
            spaceBetween={20}
            lazy={true}
            pagination={{clickable: true,}}
            navigation={true}
            modules={[Lazy, Pagination, Navigation, Scrollbar ]}
            scrollbar={{ draggable: true }}
            className="mySwiper"
        >
            {
                items
            }
        </Swiper>
            
    )
}