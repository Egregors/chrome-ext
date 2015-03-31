$(function() {
    // CONST

    // Price by ton
    var fuel_brands = [
        {'id' : 84, 'price' : 3790.83},
        {'id' : 39, 'price' : 27689.00},
        {'id' : 33, 'price' : 21930.00},
        {'id' : 108, 'price' : 49707.00},
    ]

    // FINAL
    fuel_brand_id = $('#FuelBrandId').val();
    ttn = $('#DocNo').val();

    // MAIN
    // set the price
    for (var i = 0; i < fuel_brands.length; i++) {
        if (fuel_brands[i].id == fuel_brand_id) {
            $("#AmountNds").val(fuel_brands[i].price.toFixed(2));
            $("#AmountNds").addClass('changed');
            $('#AmountNds').after(' -- ADDED')
        }
    }

    // check ttn, contract and consignor
    if (fuel_brand_id == fuel_brands[0].id) {
        check_ttn(ttn, 'tkt');
        check_consignor('tkt');
        check_contract('tkt');
    } else {
        check_ttn(ttn, 'zkt');
        check_consignor('zkt');
        check_contract('zkt');
    }

    // check fuel quality
    check_fuel_quality();

    // check driver name
    check_driver_name();

});

function check_driver_name () {
    var re = /[А-Я][а-я]+ [А-Я].[А-Я]./g
    driver = $('#Driver').val();
    if (re.test(driver)) {
        $('#Driver').addClass('ok');
        $('#Driver').after(' -- OK');
    } else if (driver.split(".").length - 1 == 2) {
        // try to fix
        // must include 2 dots
        clear = driver.replace(/ /g,'');
        log(clear);

        s = clear.split(".");
        log('clear: ' + s);

        first_letter = s[0][0].toUpperCase();
        log('First letter: ' + first_letter);

        middle = s[0];
        middle = middle.substring(1, middle.length);
        middle = middle.substring(0, middle.length - 1);
        log('Middle: ' + middle);

        name = s[0][s[0].length - 1].toUpperCase();
        log('name: ' + name);

        second_name = s[1][0].toUpperCase();
        log('second name: ' + second_name);

        var res = first_letter + middle + ' ' + name + '.' + second_name + '.'
        
        $('#Driver').val(res);
        $('#Driver').addClass('changed');
        $('#Driver').after(' -- CHANGED');
    }
}

function check_consignor (fuel_type) {
    var sel = $('#ConsignorId');
    $('#s2id_ConsignorId').remove();
    sel.select2({allowClear: true});
    if (fuel_type == 'zkt') {
        sel.select2('val', 2554);
    } else if (fuel_type == 'tkt') {
        sel.select2('val', 2596);
    }
    sel.after(' -- CHANGED'); 
}

function check_contract (fuel_type) {
    var sel = $('#ContractId');
    $('#s2id_ContractId').remove()
    sel.select2();
    if (sel.select2('val') == '') {
        if (fuel_type == 'zkt') {
            sel.select2('val', 120);
        } else if (fuel_type == 'tkt') {
            sel.select2('val', 163);
        }
        sel.after(' -- CHANGED');
    } else {
        sel.after(' -- OK');
    }
}

function check_fuel_quality () {
    var sel = $('#FuelMovementIncomeQualityTypeId');
    $('#s2id_FuelMovementIncomeQualityTypeId').remove()
    sel.select2();
    if (sel.select2('val') == '') {
        sel.select2('val', 1);
        sel.after(' -- CHANGED');
    } else {
        sel.after(' -- OK');
    }
}

function check_ttn (ttn, fuel_type) {
    if (fuel_type == 'zkt') {
        // check ttn
        var re = /(\d+)\/(\d+)-(\d+)\/[А-Я]+-(\d+)/g;
        if (re.test(ttn)) {
            $('#DocNo').addClass('ok');
            $('#DocNo').after(' -- OK');
        } else {
            // try to fix
            result = ttn.toUpperCase();

            if (re.test(result)) {
                $('#DocNo').val(result);
                $('#DocNo').addClass('changed');
                $('#DocNo').after(' -- CHANGED');
            } else {
                $('#DocNo').addClass('fail');
                $('#DocNo').after(' -- FAIL');
            }
        }
    } else if (fuel_type == 'tkt') {
        // check ttn
        var re = /[А-Я]+-\d+/g;
        if (re.test(ttn)) {
            $('#DocNo').addClass('ok');
            $('#DocNo').after(' -- OK');
        } else {
            // try to fix
            n = ttn.match(/\d+$/)[0];
            var result = '';
            result = ttn[0] + ttn[1] + '-' + n;
            result = result.toUpperCase();

            $('#DocNo').val(result);
            $('#DocNo').addClass('changed');
            $('#DocNo').after(' -- CHANGED')
        }
    }
}

function log (msg) {
    console.log(msg);
}