'use strict'

 // Datos necesarios de Firebase
const firebaseConfig = {

apiKey: "AIzaSyBUOELsDUp1EH9MpeyFA5kkQVNKDXQVZ2A",

authDomain: "poryectoweb-c3cee.firebaseapp.com",

projectId: "poryectoweb-c3cee",

storageBucket: "poryectoweb-c3cee.appspot.com",

messagingSenderId: "966710555226",

appId: "1:966710555226:web:0e0c7fc2916c2d90701e63",

measurementId: "G-V2PELX88QN"

};

//Incializar FireBase
firebase.initializeApp(firebaseConfig);

let db = firebase.firestore();



class Mensaje  {
  
  constructor(email,textarea){

  this.email=email;
  this.textarea=textarea;

  }
}


// Incluir datos
function Registra(){
   let email = document.getElementById("Email").value;
   let textarea = document.getElementById("textarea").value;

   let ref=db.collection("Mensaje").doc();  //Personas de firebase
   ref.set({email:email,textarea:textarea})
   
   document.getElementById("form").reset();    //para que borre los datos del formulario
   
   
}

 function lee(){
      borraClientes();
      db.collection("Mensaje").get().then((querySnapshot) => {   // personas de firebase
        querySnapshot.forEach((doc) => {
            
            var mensaje = new Mensaje(
                doc.data().email,
                doc.data().textarea,
                
            )
        
            nuevoMensaje(mensaje);
        })
      })
    }


  function nuevoMensaje(mensaje){
    let div = document.getElementById("contenedorMensaje");
    let p = document.createElement("p");
    /*p.innerHTML = "El nombre de la persona es: "+ persona.nombre + ", email: " + persona.email + ",  móvil: "
     + persona.telefono + ",  y el mensaje: " + persona.mensaje;*/
    div.appendChild(p);
  }



  function borraMensajes(){
    let div = document.getElementById("contenedorMensaje");
    while (div.firstChild){
      div.removeChild(div.firstChild)
    }
  }


  // Listar datos en una tabla

function Recuperar(){
      
  db.collection("Mensaje").onSnapshot((querySnapshot) => {  
    listaMensajes.innerHTML= '';
       querySnapshot.forEach((doc) => {
       console.log(`${doc.id} => ${doc.data().email}`);
       listaMensajes.innerHTML +=` 
       <tr>
       <th scope="row">${doc.id}</th>
       <td>${doc.data().email}</td>
       <td>${doc.data().textarea}</td>
       
       </tr>`;
     });
    });
  }

