import countDown from "./countDown.js";

export default function Verifier() {
  const btnContagem = document.querySelector('[type="submit"]');
  btnContagem.addEventListener('click',(e)=>{
    e.preventDefault();
    let novaData = '';   
    const isDate = new RegExp('[0-9][0-9]\/[0-9][0-9]\/[0-9][0-9][0-9][0-9]');
    const dataInput = document.querySelector('input[type="text"]');
    const resultado = isDate.test(dataInput.value);  
    if(resultado){
      const [dia, mes, ano] = dataInput.value.split('/');
      const data = `${ano}-${mes}-${dia}`;
      novaData = new countDown(data + " GMT-0300");
      console.log(novaData); 
      if (novaData._timeStampDiff){
        const h1Dia = document.querySelector('#contadorLayout main>h1:last-child');
        h1Dia.innerText = `Para o dia ${dataInput.value}`;
                
        const mainLayout = document.querySelector('#main-layout');
        mainLayout.classList.remove('ativo');
        mainLayout.classList.add('inativo');
        
        const contadorLayout = document.querySelector('#contadorLayout');
        contadorLayout.classList.remove('inativo');
        contadorLayout.classList.add('ativo');
        dataInput.value = '';

        const contadorInterval = setInterval(() =>{
          if(novaData._timeStampDiff > 0){
            const resultadoData = novaData.total;
            const contadorDia = document.querySelector('.days');      
            const contadorHours = document.querySelector('.hours');
            const contadorMinutes = document.querySelector('.minutes');
            const contadorSeconds = document.querySelector('.seconds');
            contadorDia.innerText = resultadoData.days;
            contadorHours.innerText = resultadoData.hours;
            contadorMinutes.innerText = resultadoData.minutes;
            contadorSeconds.innerText = resultadoData.seconds;
          } else {
            clearInterval(contadorInterval);
          }
        },1000)
        const btnResetar = ".restart";
        resetar(btnResetar,contadorInterval, novaData, contadorLayout, mainLayout);
      }            
    } else {
      const mainLayout = document.querySelector('#main-layout main');
      const areaInfo = document.createElement('div');
      areaInfo.innerText = "Formato de data inválido";
      areaInfo.classList.add('areaInfoClass');
      areaInfo.style.opacity = 0;
      mainLayout.appendChild(areaInfo);
      setTimeout(()=>{
        areaInfo.style.opacity = 1;
        setTimeout(()=>{
          areaInfo.style.opacity = 0;
          setTimeout(()=>{
            mainLayout.removeChild(areaInfo);
          },600)
        },3000)
      },500)
    }
  })
}

function resetar(botao,intervalo, novaData, contadorLayout, mainLayout){
  const btnReset = document.querySelector(botao);
  btnReset.addEventListener('click',(e)=>{
    e.preventDefault();
    clearInterval(intervalo);
    novaData = '';   
    contadorLayout.classList.remove('ativo');
    contadorLayout.classList.add('inativo');
    mainLayout.classList.remove('inativo');
    mainLayout.classList.add('ativo');
    const contadorDia = document.querySelector('.days');      
    const contadorHours = document.querySelector('.hours');
    const contadorMinutes = document.querySelector('.minutes');
    const contadorSeconds = document.querySelector('.seconds');
    contadorDia.innerText = '00';
    contadorHours.innerText = '00';
    contadorMinutes.innerText = '00';
    contadorSeconds.innerText = '00';
  })
}