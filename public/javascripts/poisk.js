 var lastResFind=""; // последний удачный результат
var copy_page=""; // копия страницы в ихсодном виде
function TrimStr(s) {
      s = s.replace( /^\s+/g, '');
   return s.replace( /\s+$/g, '');
 }
 function FindOnPage(inputId) {//ищет текст на странице, в параметр передается ID поля для ввода
  var obj = window.document.getElementById(inputId);
   var textToFind;
  
   if (obj) {
     textToFind = TrimStr(obj.value);//обрезаем пробелы
  } else {
     alert("Введенная фраза не найдена");
     return;
   }
   if (textToFind == "") {
     alert("Вы ничего не ввели");
	   return;
   }
   var f =  document.getElementsByClassName("container body-content")[0];

   if (!f) {
    alert("Где-то ошибка");
    return;
  }
  
   
  if(f.innerHTML.indexOf(textToFind)=="-1")
  alert("Ничего не найдено, проверьте правильность ввода!");
  
  if(copy_page.length>0)
        f.innerHTML=copy_page;
  else copy_page=f.innerHTML;

  
  f.innerHTML = f.innerHTML.replace(eval("/name="+lastResFind+"/gi")," ");//стираем предыдущие якори для скрола
 f.innerHTML = f.innerHTML.replace(eval("/"+textToFind+"/gi"),"<a href='javascript:window.location.reload()' name="+textToFind+" style='background:red'>"+textToFind+"</a>"); //Заменяем найденный текст ссылками с якорем;
  lastResFind=textToFind; // сохраняем фразу для поиска, чтобы в дальнейшем по ней стереть все ссылки
 window.location = '#'+textToFind;//перемещаем скрол к последнему найденному совпадению
} 
