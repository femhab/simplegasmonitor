
var addressList = [];

document.querySelector("#selected-address").textContent = addressList.toString();

async function addMoreAddress(){
    let newAddress = document.querySelector('input[id="new_address"]').value; 
    
    if(newAddress != null && newAddress.length == 42){
        addressList.push(newAddress);
        document.querySelector("#selected-address").textContent = addressList.toString();
        document.querySelector('input[id="new_address"]').value = null;
        return;
    }
    alert("invalid address entered"); 
    return;
}

function SubmitGasPriceRequest()
{
    let newAddress = document.querySelector('input[id="new_address"]').value; 
    if(addressList.length == 0 && (newAddress == null || newAddress.length !=42) ){
        alert("at least an address must be supplied")
        return;
    }
    // if(newAddress != null){
    //     addressList.push(newAddress);
    // }
    let noOfdays = document.querySelector('input[id="no_of_days"]').value; 
    if(noOfdays == null || noOfdays <= 0){
        alert("days must be greater than 0")
        return;
    }
    document.querySelector('input[id="no_of_days"]').value = null;
    document.querySelector('input[id="new_address"]').value = null;
    requestGasPriceData(addressList, parseInt(noOfdays));
}

function requestGasPriceData(addressList, noOfDays) {
    $.ajax({
        url: 'http://localhost:8082/api/monitor',
        type: 'POST',
        dataType: 'json',
        secure: true,
        headers: {'Access-Control-Allow-Origin': '*'},
        data: { address_list: addressList, no_of_days_ago: noOfDays },
        success: function (response) {
            console.log(response.gasUsed);
            if (response.gasUsed.length > 0) {
                for (var i = 0; i < response.gasUsed.length; i++) {
                    listView = `
                        <div class="cell" data-title="Address">
                            ${response.gasUsed[i].key}
                        </div>
                        <div class="cell" data-title="Gas_Used">
                            ${response.gasUsed[i].value}
                        </div>
                        `;
                        $("#appendView").append(listView);
                }
            }
            else {
                alert("request failed")
            }
            return;
        }, error: function () {
            alert("request Failed");
        }
    });
}



