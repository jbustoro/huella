document.addEventListener("DOMContentLoaded", function () {
    addRemoveEvent();
    addEditEvent();
}, false);

function addRemoveEvent() {
    for (element of document.querySelectorAll("[data-action=\"delete\"]")) {
        element.addEventListener("click", deleteBuilding, false);
    }
}

function addEditEvent() {
    for (element of document.querySelectorAll("[data-action=\"edit\"]")) {
        element.addEventListener("click", editBuilding, false);
    }
}

function deleteBuilding() {
    swal({
        title: "Eliminar edificio",
        text: "Esta accción no puede ser revertida, ¿deseas continuar?",
        icon: "warning",
        dangerMode: true,
        buttons: {
            cancel: "No, cancelar",
            confirm: {
                text: "Si, eliminar"
            }
        }
    }).then((value) => {
        if (value) {
            this.parentNode.getElementsByTagName("form")[0].submit();
        }
    });
}

function editBuilding() {
    let row = this;
    while(row.tagName != "TR") {
        row = row.parentNode;
    }

    document.getElementById("id").value = row.getElementsByClassName("id")[0].innerText;
    document.getElementById("name").value = row.getElementsByClassName("name")[0].innerText;
    document.getElementById("description").value = row.getElementsByClassName("description")[0].innerText;
    let country = document.getElementById("country_id").options;
    let countryId = row.getElementsByClassName("country")[0].getAttribute("data-id");
    for (let i = 0; i < country.length; i++) {
        if (country[i].value == countryId) {
            country[i].selected = true;
            break;
        }
    }
    let region = document.getElementById("region_id").options;
    let regionId = row.getElementsByClassName("region")[0].getAttribute("data-id");
    for (let i = 0; i < region.length; i++) {
        if (region[i].value == regionId) {
            region[i].selected = true;
            break;
        }
    }
    document.getElementById("postcode").value = row.getElementsByClassName("postcode")[0].innerText;
    document.getElementById("address").value = row.getElementsByClassName("address")[0].innerText;

    $("#editBuildingModal").modal("show");
}

$(function () {
    $('#addBuildingModal').on('shown.bs.modal', function () {
        $('#addBuildingModal input:not([type="hidden"])').first().trigger('focus');
    });

    $('#editBuildingModal').on('shown.bs.modal', function () {
        $('#editBuildingModal input:not([type="hidden"])').first().trigger('focus');
    });
});
