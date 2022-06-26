import { setup } from "../../deps.ts";
import { getStyleTag, virtualSheet } from "../../deps.ts";

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


const sheet = virtualSheet();

setup({
  sheet,
});

function renderBody() {
  return `
  <body style="position:relative; height:100%; width:100%;">
    <h1 style="text-align:center; font-size: xx-large; font-weight:bold;">NC Farmer's Markets</h1>
    <div style="display: flex; flex-flow: row wrap; padding: 50px;">${data.map(x => renderTile(x)).join("")}</div>
    <footer style="position:fixed; background-color: gray; height: 5vh; width: 100vw; bottom: 0px; padding: 2px;">
      <p style="position:absolute;">By <a href="https://zach.sexy">zja</a></p>
      <a style="position:absolute;" href="https://github.com/zachauten">Source</a>
    </footer>
  </body>
  `;
}

function renderTile(market: Market) {
  return `<div style="position:relative; box-shadow: 0px 0px 10px 10px gray; text-align: center; border-radius:10%; height:200px; width:200px; margin:4px">
  <a href="${market.url}">${market.name}</a>
  <button style="position:absolute; font-size:xxx-large; bottom: 0px; left: 0px;" onclick="alert('download ics!')">📅</button>
  <a style="position:absolute; font-size:xxx-large; bottom:0px; right: 0px;" href="http://maps.apple.com/?address=${market.address}">🗺</a>
</div>`
}

export function ssr() {
  sheet.reset();
  const body = renderBody();
  const styleTag = getStyleTag(sheet);

  return `<!DOCTYPE html>
    <html lang="en" style="height: 100%; width: 100%;">
      <head>
        <meta name="description" content="A site for North Carolina's Farmer's Markets">
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>NC Farmer's Markets</title>
        ${styleTag}
      </head>
      ${body}
    </html>`;
}
