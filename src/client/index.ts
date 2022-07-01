const data: Market[] = [
  {
    name: "Durham Farmer's Market",
    url: "https://durhamfarmersmarket.com",
    address: "501,Foster+Street,Durham,NC",
  },{
    name: "South Durham Farmer's Market", 
    url: "https://southdurhamfarmersmarket.com",
    address: "5410,NC-55,Durham,NC",
  },
  {
    name: "Carrboro Farmer's Market",
    url: "http://www.carrborofarmersmarket.com",
    address: "301,W+Main+St,Carrboro,NC",
  },
  {
    name: "Pluck Farm Farmer's Market",
    url: "https://steelstringbrewery.com/pluckfarm",
    address: "106,S+Greensboro+St,Carrboro,NC",
  }
];

interface Market {
  name: string,
  url: string,
  address: string
}

data.push( {name: "Foo Bar Farmer's Market", address: "Durham,NC", url: "http://example.net"} );
data.push( {name: "Example Farmer's Market", address: "Durham,NC", url: "http://example.net"} );
data.push( {name: "Another Example Farmer's Market", address: "Durham,NC", url: "http://example.net"} );
data.push( {name: "Test Farmer's Market", address: "Durham,NC", url: "http://example.net"} );

function renderBody() {
  return `
  <body style="position:relative; height:100%; width:100%; margin: 0px; padding: 0px;">
    <h1 style="text-align:center; font-size: xx-large; font-weight:bold;">NC Farmer's Markets</h1>
    <div style="display: flex; flex-flow: row wrap; padding: 50px;">${data.map(x => renderTile(x)).join("")}</div>
    ${renderFooter()}
  </body>
  `;
}

function renderFooter() {
  return `<footer style="position:fixed; display:flex; flex-flow:row wrap; justify-content:center; align-content:center; background-color:lightgray; height:3em; width:100%; bottom:0%">
      <span style="margin-right:10px;">By <a href="https://zach.sexy">zja</a></span>
      <a style="margin-rigth:10px;"href="https://github.com/zachauten">Source</a>
  </footer>
  `;
}

function renderTile(market: Market) {
  return `<div style="position:relative; border-style: outset; box-shadow: 0 4px 8px 0 rgb(0 0 0 / 20%); text-align: center; height:150px; width:150px; margin:4px">
  <a href="${market.url}">${market.name}</a>
  <a style="position:absolute; font-size:xx-large; bottom: 0px; left: 0px; margin: 0px;" onclick="alert('download ics!')">📅</a>
  <a style="position:absolute; font-size:xx-large; text-decoration: none; bottom:0px; right: 0px; margin: 0px;" href="http://maps.apple.com/?address=${market.address}">🗺</a>
</div>`
}

export function ssr() {
  const body = renderBody();

  return `<!DOCTYPE html>
    <html lang="en" style="height: 100%; width: 100%;">
      <head>
        <meta name="description" content="A site for North Carolina's Farmer's Markets">
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>NC Farmer's Markets</title>
        <style>
        * {
          box-sizing: border-box;
        }
        </style>
      </head>
      ${body}
    </html>`;
}
