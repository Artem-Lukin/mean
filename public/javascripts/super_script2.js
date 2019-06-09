// сброс формы
function resetTF() {
    $("#tarifForm")[0].reset();
    $("#tarifForm input[name=id]").val(0);
}

// Получение всех тарифов
function GetTarifs() {
    $.ajax({
        url: "/tarif",
        type: "GET",
        contentType: "application/json",
        success: function (tarif) {
            var rows = "";
            $.each(tarif, function (index, tarif) {
                // добавляем полученные элементы в таблицу
                rows += row(tarif);
            })
            $("table tbody").append(rows);
         }
    });
}
// Получение одного тарифа
function GetTarif(id) {
    $.ajax({
        url: "/tarif/"+id,
        type: "GET",
        contentType: "application/json",
        success: function (tarif) {
            var form = document.forms["tarifForm"];
             form.elements["id"].value = tarif._id;
             form.elements["name"].value = tarif.name;
             form.elements["speed"].value = tarif.speed;
             form.elements["price"].value = tarif.price;
        }
    });
}
// Добавление тарифа
function CreateTarif(TarifName, TarifSpeed, TarifPrice) {
    $.ajax({
        url: "/tarif",
        contentType: "application/json",
        method: "POST",
        data: JSON.stringify({
            name: TarifName,
            speed: TarifSpeed,
            price: TarifPrice,
           
        }),
        success: function (tarif) {
            resetTF();
            $("table tbody").append(row(tarif));
        }
    })
}
// Изменение тарифа
function EditTarif(TarifName, TarifSpeed, TarifPrice) {
    $.ajax({
        url: "/tarif",
        contentType: "application/json",
        method: "PUT",
        data: JSON.stringify({
            id: TarifId,
            name: TarifName,
            speed: TarifSpeed,
            price: TarifPrice,
        }),
        success: function (tarif) {
            resetTF();
            console.log(tarif);
            $("tr[data-rowid='" + tarif._id + "']").replaceWith(row(tarif));
        }
    })
}

// Удаление тарифа
function DeleteTarif(id) {
    $.ajax({
        url: "/tarif/"+id,
        contentType: "application/json",
        method: "DELETE",
        success: function (tarif) {
            console.log(tarif);
            $("tr[data-rowid='" + tarif._id + "']").remove();
        }
    })
}
// создание строки для таблицы
var row = function (tarif) {
    return "<tr data-rowid='" + tarif._id + "'>" +
           "<td>" + tarif.name + "</td> <td>" + tarif.speed + "</td>" +
           "<td>" + tarif.price + "</td> " + 
           "<td><a class='editLink' data-id='" + tarif._id + "'>Изменить</a> | " +
            "<a class='removeLink' data-id='" + tarif._id + "'>Удалить</a></td></tr>";
}

function init()
{
        // сброс значений формы
    $("body").on("click", "#reset", function (e) {
        e.preventDefault();
        resetTF();
    })

    // нажимаем на ссылку Изменить
    $("body").on("click", ".editLink", function () {
        var id = $(this).data("id");
        GetTarif(id);
    })
    // нажимаем на ссылку Удалить
    $("body").on("click", ".removeLink", function () {
        var id = $(this).data("id");
        DeleteTarif(id);
    })
    GetTarifs();

    // отправка формы
    $(document).on('submit','#tarifForm',function(e){
        e.preventDefault();
        var TarifId = this.elements["id"].value;
        var TarifName = this.elements["name"].value;
        var TarifSpeed = this.elements["speed"].value;
        var TarifPrice = this.elements["price"].value;

        if (TarifId == 0)
            CreateTarif(TarifName,TarifSpeed,TarifPrice);
        else
            EditTarif(TarifName,TarifSpeed,TarifPrice);
    });
}
function tarifs_init()
{
	$( document ).ready(function() {
		init();   
	});
}