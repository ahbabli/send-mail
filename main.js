const form = document.querySelector("form"),
statusTxt = form.querySelector(".button-area span");


form.onsubmit = (e)=>{
    e.preventDefault();
    statusTxt.style.color="rgb(79, 133, 135)";
    statusTxt.style.display="block";

    let xhr = new XMLHttpRequest(); //creating new xml object
    xhr.open("POST","message.php",true); //sending post request to message.php file
    xhr.onload = ()=>{
        if(xhr.readyState == 4 && xhr.status == 200){
            let response = xhr.response;
            if(response.indexOf("Email and message field is required...")!= -1 || response.indexOf("Enter a valid email adress!") || response.indexOf("Sorry! failed to send your message .")){
                statusTxt.style.color="red";
            }else{
                form.reset();
                setTimeout(()=>{
                    statusTxt.style.display="none";
                }, 3000);
            }
            console.log(response);
            statusTxt.innerHTML=response;

        }
    }
    let formData = new FormData(form);
    xhr.send(formData);
}