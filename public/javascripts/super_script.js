// сброс формы
function reset() {
    $("#claimForm")[0].reset();
    $("#claimForm input[name=id]").val(0);
}


// Получение всех пользователей
function GetClaims() {
    $.ajax({
        url: "/claims",
        type: "GET",
        contentType: "application/json",
        success: function (claims) {
            var rows = "";
            $.each(claims, function (index, claim) {
                // добавляем полученные элементы в таблицу
                rows += row(claim);
            })
            $("table tbody").append(rows);
         }
    });
}
// Получение одного пользователя
function GetClaim(id) {
    $.ajax({
        url: "/claims/"+id,
        type: "GET",
        contentType: "application/json",
        success: function (claim) {
            var form = document.forms["claimForm"];
             form.elements["id"].value = claim._id;
             form.elements["surname"].value = claim.surname;
             form.elements["name"].value = claim.name;
            form.elements["patronymic"].value = claim.patronymic;
            form.elements["adress"].value = claim.adress;
             form.elements["tariff"].value = claim.tariff;
             form.elements["phone"].value = claim.phone;
             form.elements["mail"].value = claim.mail;  
        }
    });
}
// Добавление пользователя
function CreateClaim(ClaimSurname, ClaimName, ClaimPatronymic, ClaimAdress, ClaimTariff, ClaimPhone, ClaimMail) {
    $.ajax({
        url: "/claims",
        contentType: "application/json",
        method: "POST",
        data: JSON.stringify({
            surname: ClaimSurname,
            name: ClaimName,
            patronymic: ClaimPatronymic,
            adress: ClaimAdress,
            tariff: ClaimTariff,
            phone: ClaimPhone,
            mail: ClaimMail,
        }),
        success: function (claim) {
            reset();
            $("table tbody").append(row(claim));
        }
    })
}
// Изменение пользователя
function EditClaim(ClaimId, ClaimSurname, ClaimName, ClaimPatronymic, ClaimAdress, ClaimTariff, ClaimPhone, ClaimMail) {
    $.ajax({
        url: "/claims",
        contentType: "application/json",
        method: "PUT",
        data: JSON.stringify({
            id: ClaimId,
            surname: ClaimSurname,
            name: ClaimName,
            patronymic: ClaimPatronymic,
            adress: ClaimAdress,
            tariff: ClaimTariff,
            phone: ClaimPhone,
            mail: ClaimMail,
        }),
        success: function (claim) {
            reset();
            console.log(claim);
            $("tr[data-rowid='" + claim._id + "']").replaceWith(row(claim));
        }
    })
}

// Удаление пользователя
function DeleteClaim(id) {
    $.ajax({
        url: "/claims/"+id,
        contentType: "application/json",
        method: "DELETE",
        success: function (claim) {
            console.log(claim);
            $("tr[data-rowid='" + claim._id + "']").remove();
        }
    })
}
// создание строки для таблицы
var row = function (claim) {
    return "<tr data-rowid='" + claim._id + "'>" +
           "<td>" + claim.surname + "</td> <td>" + claim.name + "</td>" +
           "<td>" + claim.patronymic + "</td> <td>" + claim.adress + "</td>" +
           "<td>" + claim.tariff + "</td> <td>" + claim.phone + "</td>" +
           "<td>" + claim.mail + "</td>" + 
           "<td><a class='editLink glyphicon glyphicon-pencil' data-id='" + claim._id + "'>Изменить</a> | " +
            "<a class='removeLink glyphicon glyphicon-remove' data-id='" + claim._id + "'>Удалить</a></td></tr>";
}

function init()
{
        // сброс значений формы
    $("body").on("click", "#reset", function (e) {
        e.preventDefault();
        reset();
    })

    // нажимаем на ссылку Изменить
    $("body").on("click", ".editLink", function () {
        var id = $(this).data("id");
        GetClaim(id);
    })
    // нажимаем на ссылку Удалить
    $("body").on("click", ".removeLink", function () {
        var id = $(this).data("id");
        DeleteClaim(id);
    })
    GetClaims();

    // отправка формы
    $(document).on('submit','#claimForm',function(e){
        e.preventDefault();
        var ClaimId = this.elements["id"].value;
        var ClaimSurname = this.elements["surname"].value;
        var ClaimName = this.elements["name"].value;
        var ClaimPatronymic = this.elements["patronymic"].value;
        var ClaimAdress = this.elements["adress"].value;
        var ClaimTariff = this.elements["tariff"].value;
        var ClaimPhone = this.elements["phone"].value;
        var ClaimMail = this.elements["mail"].value;
        if (ClaimId == 0)
            CreateClaim(ClaimSurname,ClaimName,ClaimPatronymic,ClaimAdress ,ClaimTariff,ClaimPhone , ClaimMail);
        else
            EditClaim(ClaimId,ClaimSurname,ClaimName,ClaimPatronymic,ClaimAdress ,ClaimTariff,ClaimPhone , ClaimMail);
    });
}
function claims_init()
{
	$( document ).ready(function() {
		init();   
	});
}