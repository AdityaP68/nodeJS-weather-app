

const APIconnect = (location, resultCallback) =>{
    const url = '/weather?search='+location;
    fetch(url).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                resultCallback(data.error);
            }
            else{
                resultCallback(data);
            }
        })
    })
}

const form = document.querySelector('form');
const input = document.querySelector('input');
const ms1 = document.querySelector('#ms1');
const ms2 = document.querySelector('#ms2');
const ms3 = document.querySelector('#ms3');
console.log('non')
//ms1.textContent =' ';

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const search = input.value;
    ms1.textContent = 'Please wait...';
    APIconnect(search,(APIresponse)=>{
        ms1.textContent = `The current temperature of ${search} is: `+APIresponse.temperature;
        ms2.textContent = `The probability of having a rain is: `+APIresponse.precipitation + '%';
        ms3.textContent = `The name of the region is: `+ APIresponse.location;
        console.log(APIresponse);
    })
})