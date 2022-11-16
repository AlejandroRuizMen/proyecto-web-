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



class Cliente  {
  
  constructor(nombre,email,password,secpassword){

  this.nombre=nombre;
  this.email=email;
  this.password=password;
  this.secpassword=secpassword;

  }
}


// Incluir datos
function Registra(){
  let nombre = document.getElementById("Nombre").value;
  let email = document.getElementById("Email").value;
  let password=document.getElementById("password").value;
  


  let ref=db.collection("Clientes").doc();  //Personas de firebase
  ref.set({nombre:nombre,email:email,password:password})
  
  document.getElementById("form").reset();    //para que borre los datos del formulario
}



 function lee(){
      borraClientes();
      db.collection("Clientes").get().then((querySnapshot) => {   // personas de firebase
        querySnapshot.forEach((doc) => {
            
            var cliente = new Cliente(
                doc.data().nombre,
                doc.data().email,
                doc.data().password,
                
            )
        
            nuevoCliente(cliente);
        })
      })
    }


  function nuevoCliente(cliente){
    let div = document.getElementById("contenedorClientes");
    let p = document.createElement("p");
    /*p.innerHTML = "El nombre de la persona es: "+ persona.nombre + ", email: " + persona.email + ",  móvil: "
     + persona.telefono + ",  y el mensaje: " + persona.mensaje;*/
    div.appendChild(p);
  }



  function borraClientes(){
    let div = document.getElementById("contenedorClientes");
    while (div.firstChild){
      div.removeChild(div.firstChild)
    }
  }



function ValidateEmail() {

 let email=document.getElementById("Email").value;
 var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

 if (email.match(validRegex)) {

   alert("Valid email address!");

   document.form1.text1.focus();

   return true;

 } else {

   alert("Invalid email address!");

   document.form1.text1.focus();

   return false;

 }

}


  
 



  // Listar datos en una tabla

function Recuperar(){
      
  db.collection("Clientes").onSnapshot((querySnapshot) => {  
    listaClientes.innerHTML= '';
       querySnapshot.forEach((doc) => {
       console.log(`${doc.id} => ${doc.data().nombre}`);
       listaClientes.innerHTML +=` 
       <tr>
       <th scope="row">${doc.id}</th>
       <td>${doc.data().nombre}</td>
       <td>${doc.data().email}</td>
       <td>${doc.data().password}</td>
       
       </tr>`;
     });
    });
  }

