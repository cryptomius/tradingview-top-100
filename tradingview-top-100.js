var pairing = prompt('What pairing would you like? USD / BTC', 'USD') || 'USD';
var exchange = prompt('Which exchange would you like? i.e. BITFINEX or leave blank', '') || '';

(async () => {
  const rawResponse = await fetch('https://scanner.tradingview.com/crypto/scan', {
    method: 'POST',
    headers: {
      'Accept': 'text/plain, */*; q=0.01',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    body: JSON.stringify({"filter":[{"left":"market_cap_calc","operation":"nempty"},{"left":"sector","operation":"nempty"},{"left":"name","operation":"match","right":pairing+"$"},{"left":"exchange","operation":"match","right":exchange.toUpperCase().trim()}],"symbols":{"query":{"types":[]},"tickers":[]},"columns":["crypto_code","sector","market_cap_calc","market_cap_diluted_calc","close","total_shares_outstanding","total_shares_diluted","total_value_traded","change","pricescale","minmov","fractional","minmove2"],"sort":{"sortBy":"market_cap_calc","sortOrder":"desc"},"options":{"lang":"en"},"range":[0,100]})
  });
  const content = await rawResponse.json();
  var pairsText = [];
  var todayDate = new Date().toISOString().slice(0,10);
  var pairs=''; 
  content.data.forEach(function(element){
    pairsText.push(element.s);
  });
  pairs = pairsText.join(',');
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(pairs));
  element.setAttribute('download', 'Top 100 ' + exchange + ' ' + pairing + ' (' + todayDate + ').txt');
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
})();