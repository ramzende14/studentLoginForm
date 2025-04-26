var jpdbBaseURL = "http://api.login2explore.com:5577";
var jpdbIRL = "/api/irl";
var jpdbIML = "/api/iml";
var studDBName = "SCHOOL-DB";
var studRelationName = "Stud_Table";
var connToken = "90934734|-31949208831330880|90955828";

$("#studid").focus();

function saveRecNo2LS(jsonObj) {
    var lvData = JSON.parse(jsonObj.data);
    localStorage.setItem("recno", lvData.rec_no);
}

function getStudIdAsJsonObj() {
    var studid = $("#studid").val();
    var jsonStr = {
        id: studid
    };
    return JSON.stringify(jsonStr);
}

function fillData(jsonObj) {
    saveRecNo2LS(jsonObj);
    var record = JSON.parse(jsonObj.data).record;

    $("#studname").val(record.name); // Full Name
    $("#studclass").val(record.class); // Class
    $("#dob").val(record.dob); // Date of Birth
    $("#address").val(record.address); // Address
    $("#enrollmentDate").val(record.enrollmentDate); // Enrollment Date
}

function resetForm() {
    $("#studid").val("");
    $("#studname").val("");
    $("#studclass").val("");
    $("#dob").val("");
    $("#address").val("");
    $("#enrollmentDate").val("");
    $("#studid").prop("disabled", false);
    $("#save").prop("disabled", true);
    $("#change").prop("disabled", true);
    $("#reset").prop("disabled", true);
    $("#studid").focus();
}

function validateData() {
    var studid, studname, studclass, dob, address, enrollmentDate;
    studid = $("#studid").val();
    studname = $("#studname").val();
    studclass = $("#studclass").val();
    dob = $("#dob").val();
    address = $("#address").val();
    enrollmentDate = $("#enrollmentDate").val();

    if (studid === "") {
        alert("Roll No is a Required Field");
        $("#studid").focus();
        return "";
    }

    if (studname === "") {
        alert("Full Name is a Required Field");
        $("#studname").focus();
        return "";
    }

    if (studclass === "") {
        alert("Class is a Required Field");
        $("#studclass").focus();
        return "";
    }

    if (dob === "") {
        alert("Date of Birth is a Required Field");
        $("#dob").focus();
        return "";
    }

    if (address === "") {
        alert("Address is a Required Field");
        $("#address").focus();
        return "";
    }

    if (enrollmentDate === "") {
        alert("Enrollment Date is a Required Field");
        $("#enrollmentDate").focus();
        return "";
    }

    var jsonStrObj = {
        id: studid,
        name: studname,
        class: studclass,
        dob: dob,
        address: address,
        enrollmentDate: enrollmentDate
    };
    return JSON.stringify(jsonStrObj);
}

function getStud() {
    var studIdJsonObj = getStudIdAsJsonObj();
    var getRequest = createGET_BY_KEYRequest(connToken, studDBName, studRelationName, studIdJsonObj);

    jQuery.ajaxSetup({ async: false });
    var resJsonObj = executeCommandAtGivenBaseUrl(getRequest, jpdbBaseURL, jpdbIRL);
    jQuery.ajaxSetup({ async: true });

    if (resJsonObj.status === 400) {
        $("#save").prop("disabled", false);
        $("#reset").prop("disabled", false);
        $("#studname").focus();
    } else if (resJsonObj.status === 200) {
        $("#studid").prop("disabled", true);
        fillData(resJsonObj);
        $("#change").prop("disabled", false);
        $("#reset").prop("disabled", false);
        $("#studname").focus();
    }
}

function saveData() {
    var jsonStrObj = validateData();
    if (jsonStrObj === "") {
        return;
    }

    var putRequest = createPUTRequest(connToken, jsonStrObj, studDBName, studRelationName);

    jQuery.ajaxSetup({ async: false });
    var resJsonObj = executeCommandAtGivenBaseUrl(putRequest, jpdbBaseURL, jpdbIML);
    jQuery.ajaxSetup({ async: true });
    resetForm();
    $("#studid").focus();
}

function changeData() {
    $("#change").prop("disabled", true);
    var jsonChg = validateData();
    if (jsonChg === "") {
        return;
    }

    var updateRequest = createUPDATERecordRequest(connToken, jsonChg, studDBName, studRelationName, localStorage.getItem("recno"));

    jQuery.ajaxSetup({ async: false });
    var resJsonObj = executeCommandAtGivenBaseUrl(updateRequest, jpdbBaseURL, jpdbIML);
    jQuery.ajaxSetup({ async: true });
    console.log(resJsonObj);
    resetForm();
    $("#studid").focus();
}