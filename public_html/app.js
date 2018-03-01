function calculateExpiryTimestamp(expiryInMins) {
    const now = new Date();
    const expiryDate = new Date(now.getTime() + (expiryInMins * 60 * 1000));
    return Math.round(expiryDate.getTime() /  1000)
}

// Custom encodeURIComponent due to C# requiring lower-case escape encodings
function lowercaseEncodeURIComponent(stringToEscape) {

    const replacmentDict = {
        "/": "%2f",
        "+": "%2b",
        "@": "%40",
        "?": "%3f",
        "=": "%3d",
        ":": "%3a,",
        "#": "%23",
        ";": "%3b",
        ",": "%2c",
        "$": "%24",
        "&": "%26",
        " ": "%20",
        "%": "%25",
        "^": "%5e",
        "[": "%5b",
        "]": "%5d",
        "{": "%7b",
        "}": "%7d",
        "<": "%3c",
        "\"": "%22",
        ">": "%3e",
        "\\": "%5c",
        "|": "%7c",
        "\`": "%60"
    }

    const string = stringToEscape + ''
    const encodedString = string
        .split("")
        .map(function(x) {
            var replacment = replacmentDict[x]
            if (replacment != null) {
                return replacment
            } else {
                return x
            }
        })
        .join("")
    return encodedString
}

function generateSAS(resourceUri, keyName, signingKey, expiry) {

    const encodedUri = lowercaseEncodeURIComponent(resourceUri);
    const stringToSign = encodedUri + "\n" +  expiry;
    const signature = CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA256(stringToSign, signingKey));
    const encodedSig = lowercaseEncodeURIComponent(signature);

    const sas = "SharedAccessSignature sr=" + encodedUri + "&sig=" + encodedSig + "&se=" + expiry + "&skn=" + keyName;
    return sas
}

function generateSASClicked() {
    const uri = document.getElementById('uri-value').value
    const keyName = document.getElementById('key-name-value').value
    const signingKey = document.getElementById('key-value').value
    const expiry = calculateExpiryTimestamp(60);
    var sas = generateSAS(uri, keyName, signingKey, expiry);
    document.getElementById('sas-value').value = sas
}
