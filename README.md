# AzureSASGenerator
Small webpage to generate the Shared Access Signatures for accessing the Azure Rest APIs and Azure Service Bus including Notification Hub usage.
See [Azure - Service Bus SAS](https://docs.microsoft.com/en-gb/azure/service-bus-messaging/service-bus-sas) documentation for more details of security mechanism.

# Requirements
* Single webpage the javascript magic in `public_html/app.js`
* Uses the [cypto-js package](https://azure-sas-generator.herokuapp.com/) for handling the HmacSHA256 generation

A version is currently deployed to heroku using the static buildpack:
`https://azure-sas-generator.herokuapp.com/`

## Usage

To use with Azure Rest API requests - add an 'Authorization' header to your request, right click on the value and select "Extensions > Azure Shared Access Signature Auth".

You will need to configure three values in the window to setup the header value:
* Resource URI - URI of the resource being accessed in the request
* Azure SharedAcessKeyName - The name of the Azure authorization rule to use
* Azure SharedAcessKey - The value of the signing key of the SAS

In the Azure console you can find the values needed for Notification Hub requests in the 'Managed -> Access Policies' section.
The connection string of the form `Endpoint=sb://<namespace>.servicebus.windows.net/;SharedAccessKeyName=DefaultFullSharedAccessSignature;SharedAccessKey=<KeyValue>` can be used, simply take the three values from this string as follows:
* Resource URI: `<namespace>.servicebus.windows.net/`
* SharedAcessKeyName: `DefaultFullSharedAccessSignature`
* SharedAcessKey: `<KeyValue>`

Note:
* You may also need `x-ms-version: 2015-01` header in your request
* You may also need `api-version=2015-01` URL parameter
* Each token is set to 60 minute expiry
* Its not recommeneded to use the `DefaultFullSharedAccessSignature` in your actual application
