let axios = require("axios");

let page = async () => {
    return await axios('http://www.etionic.com/')
}

page()
  .then((resp) => {
      const etionic_page = resp.data
      const body_start_index = etionic_page.search(/^<body>$/gim)
      const body_end_index = etionic_page.search(/^<\/body>$/gim)
      const body_etionic_page = etionic_page.slice(body_start_index, body_end_index + 7)

      console.log('Etionic page has ' + etionic_page.match(/\bETIONIC\b/g).length + ' \"ETIONIC\" words')
      console.log('Etionic body has ' + body_etionic_page.match(/\bETIONIC\b/g).length + ' \"ETIONIC\" words')
  })