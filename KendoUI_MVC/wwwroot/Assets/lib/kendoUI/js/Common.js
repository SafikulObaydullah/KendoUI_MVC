
//API URL Link

var bUrl = '';


//var bUrl = '/DMS';











































// ~~~~~~~~~~Using table: ht_maxsl_t in DCTL_STORE ~~~~~~~~~~ //

function AddPrefix(type, str) {
    var max = 0;
    var prefix = '';
    var docType = '';
    var hasPrefix = false;
    var code = str;

    str = str.toString();

    switch (type) {
        case 1:
            docType = 'Job Code';
            prefix = 'J';
            hasPrefix = str.toUpperCase().includes(prefix);
            max = 10;
            break;
        case 2:
            docType = 'Cost Sheet';
            prefix = 'CST';
            hasPrefix = str.toUpperCase().includes(prefix);
            max = 8;
            break;

        case 3:
            docType = 'Purchase Requisition';
            prefix = 'PR';
            hasPrefix = str.toUpperCase().includes(prefix);
            max = 6;
            break;
        case 4:
            docType = 'Fabric Booking';
            prefix = 'FB';
            hasPrefix = str.toUpperCase().includes(prefix);
            max = 6;
            break;
        case 5:
            docType = 'Block Order';
            prefix = 'BL';
            hasPrefix = str.toUpperCase().includes(prefix);
            max = 7;
            break;
        case 6:
            docType = 'Yarn Booking';
            prefix = 'BK';
            hasPrefix = str.toUpperCase().includes(prefix);
            max = 8;
            break;
        case 7:
            docType = 'Accessories Booking';
            prefix = 'BK';
            hasPrefix = str.toUpperCase().includes(prefix);
            max = 8;
            break;
        case 8:
            docType = 'Buyer Order';
            prefix = 'B';
            hasPrefix = str.toUpperCase().includes(prefix);
            max = 7;
            break;
        default:
            docType = 'Type Not Found';
            prefix = '';
            max = 0;
            break;
    }

    if (!hasPrefix) {
        str = addZeros(str, max);
        code = prefix + str;
    }


    return code;
}

function addZeros(str, max) {
    str = str.toString();
    return str.length < max ? addZeros("0" + str, max) : str;
}