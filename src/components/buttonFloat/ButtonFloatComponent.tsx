import React from 'react';
import './buttonFloat.css';


export const ButtonFloat = ({hight=700}:{hight : number})=>{

    const [scrollPosition, setScrollPosition] = React.useState(0);
    const timer = React.useRef<NodeJS.Timeout>();
    const [y,setY] = React.useState(10);

    const goTop = ()=>{

        if(window.pageYOffset === 0){
            clearTimeout(timer.current);
            return;
        }

        if(timer.current)
            clearTimeout(timer.current);

        timer.current = setInterval(()=>{
            const newPosition = window.pageYOffset-150;
            setY(newPosition)
            window.scrollTo({top: newPosition, behavior: 'smooth'});
        },20)
       
    }

    React.useEffect(()=>{
        timer.current &&
        goTop();
    },[y])

    React.useEffect(() => {//Guardamos la posición del scroll cuando veamos el detalle de un vehículo para que al retornar a vehiculos nos deje en la misma posición

        function updatePosition() {
            setScrollPosition(window.pageYOffset);
        }

        window.addEventListener('scroll', updatePosition);
        updatePosition();

        return () => window.removeEventListener('scroll', updatePosition);

    }, [scrollPosition]);

    return (
        scrollPosition > hight ? 
        <button type="button" className="btn btn-outline-warning buttonFloat" onClick={goTop}><i className="fas fa-arrow-up fa-2x"></i></button> :
        <></>
    )
}
