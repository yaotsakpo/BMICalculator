
bmi_choosed=0;
function initialize() {

document.getElementById('ecran').value='';
document.getElementById('Height').value='';
document.getElementById('Weight').value='';
document.getElementById('Height').disabled=true;
document.getElementById('Weight').disabled=true;
document.getElementById('passe').disabled=true;
document.getElementById('interpretation').innerText="";

}
function standard() {
    document.getElementById('ecran').value='BMI standard: Please enter your Height...';
    document.getElementById('Height').disabled=false;
    document.getElementById('Height').focus();
    document.getElementById('Weight').disabled=true;
    document.getElementById('passe').disabled=false;
    bmi_choosed=1;    
}

function metric() {
    document.getElementById('ecran').value='BMI metric: Please enter your Height...';
    document.getElementById('Height').disabled=false;
    document.getElementById('Height').focus();
    document.getElementById('Weight').disabled=true;
    document.getElementById('passe').disabled=false;
    bmi_choosed=2;    
}



function Height() {
    document.getElementById('Weight').disabled=true;
    initial = document.getElementById('ecran').value;
    document.getElementById('ecran').value +=' Your Height: ';
}

function Weight() {
    document.getElementById('Height').disabled=true;
    initial = document.getElementById('ecran').value;
    document.getElementById('ecran').value +='Your Weight: ';
}



function passe() {
    if(document.getElementById('Height').disabled==false)
    {
        document.getElementById('Height').disabled=true;
        document.getElementById('Weight').disabled=false;
        document.getElementById('Weight').focus();

        if(bmi_choosed==1)
        {
            document.getElementById('ecran').value='BMI standard: Please enter your Weight...';
        }else
        {
            document.getElementById('ecran').value='BMI metric: Please enter your Weight...';
        }

    }else
    {
        document.getElementById('Height').disabled=false;
        document.getElementById('Height').focus();
        document.getElementById('Weight').disabled=true;
        if(bmi_choosed==1)
        {
            document.getElementById('ecran').value='BMI standard: Please enter your Height...';
        }else
        {
            document.getElementById('ecran').value='BMI metric: Please enter your Height...';
        }
    }
}


var BMI = document.querySelector('#ecran');
var Height_value= document.querySelector('#Height');
var Weight_value = document.querySelector('#Weight');
bmi_valeur=0;
BMI_DB={};
temp=[];

function HistoryAppend(BMI_DB,nom) {
    $(`<div class="body table-responsive">
    <h4>${nom}</h4>
        <table class="table" >
            <tbody>
                <tr>
                    <th scope="row">Type BMI</th>
                    <td>${BMI_DB[nom].Type_BMI}</td>
                </tr>
                <tr>
                    <th scope="row">BMI </th>
                    <td>${BMI_DB[nom].bmi}</td>
                    
                </tr>
                <tr>
                    <th scope="row">Interpretation</th>
                    <td> ${BMI_DB[nom].interpretation }</td>
                </tr>
                <tr>
                    <th scope="row">Calculation paramaters</th>
                    <td>Height: ${BMI_DB[nom].Height} Weight: ${BMI_DB[nom].Weight} </td>
                </tr>
            </tbody>
        </table>
    </div>`).appendTo("#history");

}

function ConfirmDialog(message){
  $(`<div class="modal fade" id="myModal" role="dialog"> 
     <div class="modal-dialog"> 
       <!-- Modal content--> 
        <div class="modal-content"> 
           <div class="modal-body" style="padding:10px;"> 
             <h4 class="text-center">${message}</h4> 
             <input type="text" class="form-control" id="firstname" placeholder="firstname" autocomplete="off">
             <br>
             <input type="text" class="form-control" id="name" placeholder="name" autocomplete="off">
             <div class="text-center"> 
               <a class="btn btn-danger btn-yes">yes</a> 
               <a class="btn btn-default btn-no">no</a> 
             </div> 
           </div> 
       </div> 
    </div> 
  </div>`).appendTo('body'); //Trigger the modal

  $("#myModal").modal({
     backdrop: 'static',
     keyboard: false
  });
  
   //Pass true to a callback function
   $(".btn-yes").click(function () {
       firstname= document.getElementById('firstname').value;
       name= document.getElementById('name').value;
       if(firstname != "" && name != "")
      {
       $("#myModal").modal("hide");
       temp['firstname']=firstname;
       temp['name']=name;
       temp['Height']=Height_value.value;
       temp['Weight']=Weight_value.value;
       temp['bmi']=bmi_valeur;
       if(bmi_choosed==1)
        {
            temp['Type_BMI']='BMI standard';
        }else
        {
            temp['Type_BMI']='BMI metric';
        }
        temp['interpretation']=document.getElementById('interpretation').textContent;

        BMI_DB[(firstname+' '+name).toLocaleLowerCase()]=temp;


        console.log(BMI_DB);

           HistoryAppend(BMI_DB, (firstname + ' ' + name).toLocaleLowerCase());


        initialize();
      }else
      {
        alert('please enter your firstname and name !');
      }
   });
    
   //Pass false to callback function
   $(".btn-no").click(function () {
       $("#myModal").modal("hide");
   });

   //Remove the modal once it is closed.
   $("#myModal").on('hidden.bs.modal', function () {
      $("#myModal").remove();
   });
}





function compute () {

if(Height_value.value != "" && Weight_value.value != "")
{
        if(bmi_choosed==1)
        {
            BMI.value ='BMI standard: '+( Number.parseFloat(( Weight_value.value / ( ((Height_value.value*12)+1) * ((Height_value.value*12)+1) ) ) * 703).toPrecision(3) );
            bmi_valeur=( Number.parseFloat(( Weight_value.value / ( ((Height_value.value*12)+1) * ((Height_value.value*12)+1) ) ) * 703).toPrecision(3) );

        }else
        {
            BMI.value ='BMI metric: '+ ( Number.parseFloat(Weight_value.value / ( (Height_value.value/100) * (Height_value.value/100) )).toPrecision(3) );
            bmi_valeur = ( Number.parseFloat(Weight_value.value / ( (Height_value.value/100) * (Height_value.value/100) )).toPrecision(3) );
        }


        if( bmi_valeur < 18.5){
            document.getElementById('interpretation').innerText="Interpretation: Underweight";
            document.getElementById('interpretation').className =" text-white bg-danger";
        }

        if( bmi_valeur >= 18.5 && bmi_valeur < 25 )
        {
            document.getElementById('interpretation').innerText="Interpretation: Normal weight";
            document.getElementById('interpretation').className =" text-white bg-success";

        }

        if(bmi_valeur < 30 && bmi_valeur >= 25)
        {
            document.getElementById('interpretation').innerText="Interpretation: Overweight";
            document.getElementById('interpretation').className =" text-white bg-warning";

        }

        if(bmi_valeur >= 30)
        {
            document.getElementById('interpretation').innerText="Interpretation: Obesity";
            document.getElementById('interpretation').className =" text-white bg-danger";

        }

        decision=confirm('BMI: '+bmi_valeur+' '+document.getElementById('interpretation').textContent+'\n'+' Press OK to save your BMI result ');

        decision ? ConfirmDialog('Enter please your firstname and name'):  ['compute new BMI with another informations' , initialize()];
}
else
{
        alert('please enter all informations for BMI computation ');
}

}

