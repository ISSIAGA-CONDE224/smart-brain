import React from 'react';
import './form.css'
const  ImageLinkForm = ({onInputChange, onButtonSubmit}) =>{
    return(
        <div >
            <p className = "f3">
                {'Application de detection de visages sur les images'}
            </p>

            <div className = "center">
                <div className = " arrier-plan center shadow-5 pa4 br3 form">
                    <input className ="f4 w-70 center pa2" type = "text" onChange = {onInputChange}/>
                     <button className = "w-30 grow pa2 f4 link ph3 pv2 dib white bg-light-purple"  onClick = {onButtonSubmit} >Detecter</button>
                </div>
            </div>
        </div>
    )
}
export default ImageLinkForm;