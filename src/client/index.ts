import { setup, tw } from "../../deps.ts";
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
  <body class="${tw`relative h-screen w-screen`}">
    <h1 class="${tw`text-3xl font-bold text-center`}">NC Farmer's Markets</h1>
    <div class="${tw`m-10 flex flex-auto flex-row flex-wrap`}">${data.map(x => renderTile(x)).join("")}</div>
    <footer class="${tw`fixed bg-gray-200 h-10 inset-x-0 bottom-0 p-2`}">
      <p class="${tw`absolute center`}">By <a class="${tw`underline text-blue-600 visited:text-violet-700`}"href="https://zach.sexy">zja</a></p>
      <a class="${tw`absolute right-1 underline text-blue-600 visited:text-violet-700`}"href="https://github.com/zachauten">Source</a>
    </footer>
  </body>
  `;
}

function renderTile(market: Market) {
  return `<div class="${tw`relative shadow-md text-center rounded-md h-40 w-40 m-4`}">
  <a class="${tw`underline text-blue-600 visited:text-violet-700`}" href="${market.url}">${market.name}</a>
  <button class="${tw`text-3xl absolute bottom-1 left-1`}" onclick="alert('download ics!')">📅</button>
  <a class="${tw`text-3xl absolute bottom-1 right-1`}" href="http://maps.apple.com/?address=${market.address}">🗺</a>
</div>`
}

export function ssr() {
  sheet.reset();
  const body = renderBody();
  const styleTag = getStyleTag(sheet);

  return `<!DOCTYPE html>
    <html lang="en">
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
