# Tableau Web Data Connector for Bitcoin data
This Tableau Web Data Connector retrieves historical data of Bitcoin (BTC) from the API of [CryptoCompare](https://min-api.cryptocompare.com/):

Information obtained:
* date
* highest_price
* lowest_price
* opening_price
* closing_price
* volume_btc
* volume_currency (USD)

The date field is given in unix timestamp - use the following calculation in Tableau to have the date in dd-mm-yyyy `DATEADD('second',[date],#1970-01-01#)`

## Web Data Connector URL
https://paoloferraiuoli.me/tableau-wdc-bitcoin/crypto.html
