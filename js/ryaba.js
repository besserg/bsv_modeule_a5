const dataURL = "https://api.jsonbin.io/b/5e905926172eb643896166e7";
const skazkaDefaut = 
{
  "text":[
    "Жили-были {var1} да {var2}",
    "Была у них {var3}",
    "Снесла {var3} {var4}, не простое - золотое",
    "- {var1} бил, бил - не разбил",
    "- {var2} била, била - не разбила",
    "{var5} бежала, {var6} задела, {var4} упало и разбилось.",
    "{var1} плачет, {var2} плачет, а {var3} кудахчет:",
    "{speach}"
    ]
}


const btnCreate = $('.button-create');
const btnReplace = $('.button-replace');

let resultText = $('.result');

function getSkazkaAPI() {
  $.getJSON(dataURL, function( data ) {
      console.log(data.text);
      return data.text;
	});
}

let skazka_api = getSkazkaAPI();
let skazka;

//На момент выполнения задания строку через API получить не возможно
//Ошибка API Requests Quota is Exhausted
if (typeof skazka_api == "undefined") {
  skazka = JSON.stringify(skazkaDefaut)
}
else {
  skazka = JSON.stringify(skazka_api)
}

function PrintSkazka(str_skazka){
  if (typeof str_skazka == 'object')
    {skazka = JSON.stringify(str_skazka);}
  else {skazka = JSON.parse(str_skazka);}
    resultText.html(skazka.text);
}

function PrintNewSkazka(str_new_skazka){
  console.log(typeof str_new_skazka);
  const var1 = $("input[name=var1]")[0].value;
  const var2 = $("input[name=var2]")[0].value;
  const var3 = $("input[name=var3]")[0].value;
  const var4 = $("input[name=var4]")[0].value;
  const var5 = $("input[name=var5]")[0].value;
  const var6 = $("input[name=var6]")[0].value;
  const speach = $("input[name=speach]")[0].value;
  if (typeof str_new_skazka == 'object')
    {str_new_skazka = JSON.stringify(str_new_skazka)}
  let newSkazka = str_new_skazka.replace(/{var1}/g, var1)
    .replace(/{var2}/g, var2).replace(/{var3}/g, var3)
    .replace(/{var4}/g, var4).replace(/{var5}/g, var5)
    .replace(/{var6}/g, var6).replace(/{speach}/g, speach);
  newSkazka = JSON.parse(newSkazka);  
  resultText.html(newSkazka.text);
}


btnCreate.click(function(){
  console.log(skazka);
  PrintSkazka(skazka);
  console.log('skazka', skazka);
}
);

btnReplace.click(function () {
    PrintNewSkazka(skazka)    
   }
);