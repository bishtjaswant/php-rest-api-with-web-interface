window.addEventListener("DOMContentLoaded", DOMloaded);

function DOMloaded(event) {
    // initialized  Modal
    var elems1 = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems1);


    // load the data from server
    dataLoad();
// fetch data from server and show thatt data to modal;
   loadDataToModal();
}


// add form data to  server
document.forms['eform'].addEventListener("submit",function (e) { 
    e.preventDefault();
    let data={
     ename:  document.querySelector("#ename").value,
     eemail:  document.querySelector("#eemail").value,
     ephone:  document.querySelector("#ephone").value,
    };
    

    
    
    fetch('http://localhost/restapi2020/api/add-employee.php',{
        method: 'POST', // Method itself
        headers: {
        'Content-type': 'application/json; charset=UTF-8' 
        },
        body:JSON.stringify(data)
    })
    .then(result=>result.json()  )
    .then((data) => {
        //    console.log(data);
        if (    data.status===true   ) {
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: data.message,
                showConfirmButton: false,
                timer: 2000
            });
             // empty  all form data afttet submitted
             document.querySelector("#ename").value=''
             document.querySelector("#eemail").value=''
             document.querySelector("#ephone").value=''
   
        } else  if(data.status===false) {
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: data.message,
                showConfirmButton: false,
                timer: 1500
            })
        }

        // reload again with neew data
        dataLoad();
        
    }).catch((err) => {
            console.error(err);
        
    });



 })


function dataLoad( ) {
    fetch("http://localhost/restapi2020/api/employees.php",{
        method:"GET",
        mode:'no-cors',
        redirect:'follow'
    })
    .then(result=>result.json())
    .then((data) => {
        // console.log(data);
        let load = document.querySelector('#load');
          let html='';
        
        
          if ( data.status==true ) {
            data.data.forEach(element => {
                html+=`  
              <tr class="row">
                <td> <label> <input value=${element.id} id="indeterminate-checkbox" class="multiDelIDs" type="checkbox" /> <span></span> </label> </td>
                <td> ${element.name} </td>
                <td> ${element.email} </td> 
                <td> ${element.phone} </td>
                <td colspan="3">
                  <button type="button" data-target="modal-edit" class="btn edit modal-trigger" data-edit_id=${element.id} >edit</button>    
                  
                  <a href="#delete-modal"  class="delete waves-effect waves-light btn modal-trigger red " data-del_id=${element.id} >delete</a>    
                </td>
            </tr>
                `;
            });
        
        }
         else{
             html+=`
             <tr> <td colspan='6'>no record found</td> </tr>
             `;
         }
        
    load.innerHTML= html;


    }).catch((err) => {
       console.error(err); 
    });
}


// hide delete-all button when there are no list to delete;
// let numsOfCheckboxes=document.querySelectorAll('#load') ;
// console.log(numsOfCheckboxes);






// fetch data from server and show thatt data to modal;
function loadDataToModal() {
   let load= document.querySelector('#load');

   load.addEventListener('click',function (e) { 
    
       
         if ( e.target.classList[1]=='edit' ) {
            e.target.getAttribute('data-edit_id')
            let edit_id= e.target.getAttribute('data-edit_id');

            fetch("http://localhost/restapi2020/api/single-employee.php",{
                method:"POST",
                body:JSON.stringify( {edit_id} )
            })
            .then(result=>result.json())
            .then(data => {
              // data fetched
                // now append thhis data to modal
                 // setting name value
                 document.getElementById('modal-name').setAttribute('value',data.data.name)
                  // setting phone value
                  document.getElementById('modal-phone').setAttribute('value',data.data.phone.toString())
                  // setting email value
                  document.getElementById('modal-email').setAttribute('value',data.data.email)
                

                //   now update record with new data
          document.forms['uForm'].addEventListener('submit',function (e) { 
            e.preventDefault();
            let data={
             ename:  document.querySelector("#modal-name").value,
             eemail:  document.querySelector("#modal-email").value,
             ephone:  document.querySelector("#modal-phone").value,
             eid:  edit_id,
            };
            

        fetch('http://localhost/restapi2020/api/update-employee.php',{
              method:"PUT",
              headers: {
              'Content-type': 'application/json; charset=UTF-8' 
              },
              body:JSON.stringify(data)
          })
          .then(result=>result.json()  )
          .then((data) => {
              //    console.log(data);
              if (    data.status===true   ) {
                  Swal.fire({
                      position: 'top-end',
                      icon: 'success',
                      title: data.message,
                      showConfirmButton: false,
                      timer: 2000
                  });
                   // empty  all form data afttet submitted
                   document.querySelector("#ename").value=''
                   document.querySelector("#eemail").value=''
                   document.querySelector("#ephone").value=''
         
              } else  if(data.status===false) {
                  Swal.fire({
                      position: 'top-end',
                      icon: 'success',
                      title: data.message,
                      showConfirmButton: false,
                      timer: 1500
                  });
              }
      
              // reload again with neew data
              dataLoad();
              
          }).catch((err) => {
                  console.error(err);
              
          });


           });

              }).catch((err) => {
               console.error(err); 
            });
         }
         
    })
   
}

// load delete data to Modal
let deletetBtn = document.getElementById("load");
deletetBtn.addEventListener('click',deleteQuery);
function deleteQuery(e) {
        if(e.target.classList[0]==='delete'){
            let del_id= e.target.getAttribute('data-del_id');
            fetch('http://localhost/restapi2020/api/single-employee.php',{
                method:'POST',
                body:JSON.stringify({edit_id:del_id})
            })
            .then(res=>res.json() )
            .then((data) => {
                // console.log(data);
                // let render=document.getElementById('render');
                let deleteModel=document.getElementById("delete-modal");
                deleteModel.innerHTML=`
                
                <div class="modal-content">
                <strong  style="font-size: 25px;font-weight: 700;" class="z-depth-2">Are you sure want to delete this record ${data.data.name}?</strong>
                <p class="grey-text">this action will delete following record below permanatily</p>
                <div>
                        <strong>Name:</strong> ${data.data.name}  <strong>Emai:</strong> ${data.data.email}
                 </div>
              </div>
              <div class="modal-footer">
              <strong>type DELETE to confirm</strong> <input style="width: 100px;padding: 0px;margin: 0px;outline: none;font-weight: 900;"  type="text" name="" placeholder="DELETE" id="deleteModal">  <button type="button" class="modal-close  btn z-depth-1  red" disabled>Delete</button>
              </div>               
                `

                let delele_btn=document.querySelector("#deleteModal");
                delele_btn.addEventListener("input",function (e) { 
                    let delele_value= e.target.value.toUpperCase();
                    if ( delele_value==='DELETE' ) {
                        e.target.setAttribute("disabled",true);
                        e.target.nextElementSibling.removeAttribute('disabled')
                        e.target.nextElementSibling.addEventListener('click',function (e) {
                                fetch('http://localhost/restapi2020/api/delete-employee.php',{
                                    method: 'DELETE', // Method itself
                                    headers: {
                                    'Content-type': 'application/json; charset=UTF-8' 
                                    },
                                    body:JSON.stringify({eid:del_id})
                                })
                                .then(result=>result.json()  )
                                .then((data) => {
                                    //    console.log(data);
                                    if (    data.status===true   ) {
                                        Swal.fire({
                                            position: 'top-end',
                                            icon: 'success',
                                            title: data.message,
                                            showConfirmButton: false,
                                            timer: 2000
                                        })
                                    } else  if(data.status===false) {
                                        Swal.fire({
                                            position: 'top-end',
                                            icon: 'success',
                                            title: data.message,
                                            showConfirmButton: false,
                                            timer: 1500
                                        })
                                    }

                                    // reload again with neew data
                                    dataLoad();
                                    
                                }).catch((err) => {
                                        console.error(err);
                                    
                                });
                          })
                          
                    }
                    
                 })
                
            }).catch((err) => {
            console.error(err);
                           
            });             
        }
}

// search  engine implementation
let search=document.querySelector('#search')
search.addEventListener('input',search_engine);
function search_engine(e) {
        let keyword =e.target.value.toUpperCase();
        
        fetch('http://localhost/restapi2020/api/search-employee.php',{
        method:'POST',
        headers:{
            'Content-type':"application/json"
        },
        body:JSON.stringify({keyword})
        })
        .then(result=>result.json())
        .then((data) => {
             console.log(data)
             let load = document.querySelector('#load');
             let html='';
               
             if ( data.status==true ) {
               data.data.forEach(element => {
                   html+=`
                   <tr>
                   <td> ${element.name} </td>
                   <td> ${element.email} </td> 
                   <td> ${element.phone} </td>
                   <td colspan="3">
                     <button type="button" data-target="modal-edit" class="btn edit modal-trigger" data-edit_id=${element.id} >edit</button>    
                     
                     <a href="#delete-modal"  class="delete waves-effect waves-light btn modal-trigger red " data-del_id=${element.id} >delete</a>    
                   </td>
               </tr>
                   `;
               });
                   } else if ( data.data==null) {
                     html+=`
                     <tr>
                        <td colspan="4" class="center-align"> ${data.message} </td>
                     </tr>
                     `     
                   }
   
           load.innerHTML= html;
   
        }).catch((err) => {
           console.error(err);           
        });   
}



// multi delete functionality
let multiDel= document.querySelector("#delete-all");
multiDel.addEventListener("click",deleteAll);

function deleteAll(e) {
  let multiDelIDs=[];
  
      Array.from(document.querySelectorAll('.multiDelIDs:checked') ).forEach(ele => {
        multiDelIDs.push(ele.value)
          
      });
        
    //   atleast once selected
           if (  multiDelIDs.length==0) {
                                        
                        Swal.fire({
                            position: 'top-end',
                            icon: 'error',
                            title: 'you have not selected any checkboxes to delete.  please select atleast one checkbox',
                            showConfirmButton: false,
                            timer: 4000
                        });
           } else {
              
                if ( confirm("ARE YOU SURE TO DELETE SELECTED RECORDS")===true) {
                    
                
                    fetch('http://localhost/restapi2020/api/all-delete-employees.php',{
                        method: 'POST', // Method itself
                        headers: {
                        'Content-type': 'application/json; charset=UTF-8' 
                        },
                        body:JSON.stringify(multiDelIDs)
                    })
                     .then( data=>data.json()  )
                    .then((result) => {
                        console.log(result);
                           if (result.status==true) {
                            Swal.fire({
                                icon: 'success',
                                position:'top-end',
                                title: 'Great...',
                                text: result.message,
                                footer: '<p>cool developer</p>'
                              })
                           }
                           dataLoad();
                    }).catch((err) => {
                        console.error(err);
                        
                    });
                }
                    
              
           }
          
}