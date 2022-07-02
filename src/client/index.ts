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

const style = `
  * {
    box-sizing: border-box;
  }

  body {
    display: grid; 
    grid-template-rows: auto 1fr auto; 

    background-color: antiquewhite;

    height: 100%;
    width: 100%;

    margin: 0px;
    padding: 0px;
  }

  body h1 {
    text-align: center;
    font-size: xx-large;
    font-weight: bold;
  }

  .tile-container {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;

    padding: 50px;
  }

  .tile {
    display: grid;
    grid-template: 2fr 1fr / 1fr 1fr;

    background-color: white;

    border-style: outset;
    border-radius: 0%;
    box-shadow: 0 4px 8px 0 rgb(0 0 0 / 20%);

    text-align: center;
    height: 150px;
    width: 300px;
    margin: 20px;
  }

  .tile-button {
    position: relative;

    border-width: unset;
    border-style: unset;
    border-top-style: solid;
    border-color: black;

    background-color: unset;
    padding: 0px;
    cursor: pointer;
    font: unset;
  }

  .tile-button:focus {
    outline: blue 5px auto;
  }

  svg {
    position: absolute;
    color: black;
    top: 50%;
    left: 50%;
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);  
  }

  footer {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    align-content: center;
    
    height:3em;
    width:100%;
    bottom:0%;
  }

  .footer-item {
    margin-right:10px;
  }
`;

function renderBody() {
  return `
  <body>
    <h1>NC Farmer's Markets</h1>
    <div class="tile-container">${data.map(x => renderTile(x)).join("")}</div>
    ${renderFooter()}
  </body>
  `;
}

function renderFooter() {
  return `<footer style="">
      <span class="footer-item">By <a href="https://zach.sexy">zja</a></span>
      <a class="footer-item" href="https://github.com/zachauten">Source</a>
  </footer>
  `;
}

// SVGs from https://tabler-icons.io/
function renderTile(market: Market) {
  return `<div class="tile">
  <div style="grid-column: 1 / 3">
    <a href="${market.url}">${market.name}</a>
  </div>
  <button class="tile-button" onclick="alert('foo')">
    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-calendar-event" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
    <rect x="4" y="5" width="16" height="16" rx="2"></rect>
    <line x1="16" y1="3" x2="16" y2="7"></line>
    <line x1="8" y1="3" x2="8" y2="7"></line>
    <line x1="4" y1="11" x2="20" y2="11"></line>
    <rect x="8" y="15" width="2" height="2"></rect>
    </svg>
  </button>
  <a class="tile-button" style="border-left-style: solid" href="http://maps.apple.com/?address=${market.address}">
    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-map-2" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
    <line x1="18" y1="6" x2="18" y2="6.01"></line>
    <path d="M18 13l-3.5 -5a4 4 0 1 1 7 0l-3.5 5"></path>
    <polyline points="10.5 4.75 9 4 3 7 3 20 9 17 15 20 21 17 21 15"></polyline>
    <line x1="9" y1="4" x2="9" y2="17"></line>
    <line x1="15" y1="15" x2="15" y2="20"></line>
    </svg>
  </a>
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
        ${style}
        </style>
      </head>
      ${body}
    </html>`;
}
