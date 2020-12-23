import React from 'react';
import 'tachyon'
 
//Debut de menu de navigation
const Navigation = ({onRouteSignin, isSignIn}) =>{
    if (isSignIn) { //si l'utilisateur est connecté cette barre s'affiche
        return(
        <nav style = {{display : 'flex',justifyContent : 'flex-end'}}>
            <p onClick = {() => onRouteSignin('signout')} className = 'f3 link dim black underline pointer pa3'>Se deconnecter</p>
        </nav>
        );
    }else{ //ici je lui dis de se connecter
        return(
            <nav style = {{display : 'flex',justifyContent : 'flex-end'}}>
                <p onClick = {() => onRouteSignin('signin')} className = 'f3 link dim black underline pointer pa3'>Se connecter</p>
                <p onClick = {() => onRouteSignin('register')} className = 'f3 link dim black underline pointer pa3'>S'enregistrer</p>
            </nav>
        ) ;
    }
}
export default Navigation;