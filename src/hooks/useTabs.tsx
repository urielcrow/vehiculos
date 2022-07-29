import React from 'react';

export const useTabs = ( stateInit : object , start : string)=> {
   
    const [state, setState] = React.useState({
        ...stateInit,
        [start] : "active"
    });

    const changeState = (tabActive : string)=>{
        setState({
            ...stateInit,
            [tabActive] : "active"
        });
    }

    return{
        state,
        changeState
    }
    
}
