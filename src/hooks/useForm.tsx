import { useState } from 'react';

type TypesInputs = "text" | "alphanumeric" | "numeric";

interface ParamsConfigInput{
    type : TypesInputs,
    val? : string | null,
    required? : boolean,
    focus? : boolean,
    error? : boolean,
    max?:number | string,
    checked? : boolean
}

export const useForm = (initialState : any = {}  ) => {

    const [form, setForm] = useState(initialState);

    const changeInput = ( e : React.ChangeEvent<HTMLInputElement> )=>{

        const val =  e.target.value;
        const name = e.target.name;
        const max = form[name].max;

        //Validar cada que el usuario escribe
        switch (form[name].type) {
            case "text":
                if( validateInput(name,val,max,"text") )
                   return;
            break;
            case "alphanumeric":
                if( validateInput(name,val,max,"alphanumeric") )
                   return;
            break;
            case "numeric":
                if( validateInput(name,val,max,"numeric") )
                   return;
            break;
            default:
            break;
        }

        setForm({
            ...form,
            [name]:{
                ...form[name],
                val
            } 
        });
    }

    const focus = (e : React.ChangeEvent<HTMLInputElement>)=>{
        setForm({
            ...form,
            [e.target.name]:{
                ...form[e.target.name],
                focus: true,
                error:false
            }
        });
    }

    const blur = (e  : React.ChangeEvent<HTMLInputElement>)=>{
        if(e.target.value.trim() !== "")
            return;
        
        setForm({
            ...form,
            [e.target.name]:{
                ...form[e.target.name],
                focus: false
            }
        });
    }

    const validateForm = ()=>{

        let errores = false;
        let formTemp = {
            ...form
        };

        Object.keys(formTemp).forEach( (name : string) =>{

            formTemp[name].error = false;
            const val = formTemp[name].val.trim();
            const max = formTemp[name].max;

            if( val === "" && formTemp[name].required ){
                formTemp[name].error = true;
                errores = true;
                return;
            }

            switch (formTemp[name].type) {
                case "text":
                    if( validateInput(name,val,max,"text")  ){
                        formTemp[name].error = true;
                        errores = true;
                    }
                break;
                case "alphanumeric":
                    if( validateInput(name,val,max,"alphanumeric")  ){
                        formTemp[name].error = true;
                        errores = true;
                    }
                break;
                case "numeric":
                    if( validateInput(name,val,max,"numeric")  ){
                        formTemp[name].error = true;
                        errores = true;
                    }
                break;

                default:
                break;
            }
        });

       if(errores){
            setForm(formTemp);
       }

        return errores;
    }

    const validateInput = (name: string, val : string, max : number, type : TypesInputs)=>{
        let flag = false;
        let exp = "";

        switch (type) {
            case "text":
                exp = "[a-zA-Z0-9-_,.\\s]";
            break;
            case "alphanumeric":
                exp = "[a-zA-Z0-9]";
            break;
            case "numeric":
                exp = "[0-9]";
            break;
        
            default:
            break;
        }

        if( val !== "" && !val.match(new RegExp("^(" + exp +"{0," + max + "})$")) )
            flag = true;

        if(max)//Si se establece un máximo
            form[name].checked = val.match(new RegExp("^(" + exp + "{" + max + "})$")) ? true : false;//validamos que se cumpla el máximo de dígitos
        else
            form[name].checked = val !== "" ? true : false;
        
        return flag;
    }

    const reset = ()=>{
        setForm(initialState);
    }

    return {form,changeInput,focus,blur,validateForm,reset};
}


export const configInput = (params : ParamsConfigInput)=>{
    const {
        val = "",
        type = "text",
        required = false,
        focus = false,
        error = false,
        max = "",
        checked = false
    }  =  params;

    return{
        val,
        type,
        required,
        focus,
        error,
        max,
        checked
    }
}

