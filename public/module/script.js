import { searchCountries, getDataCountries, getDataGeneral } from './api.js'

const relDiff = (a, b) => {
  return 100 * Math.abs((a - b) / ((a + b) / 2));
}

const convertArrayNameOfCaseGeneral = (i, dados) => {
  const confirmados = parseInt(dados[0])
  const recuperados = parseInt(dados[1])
  const mortes = parseInt(dados[2])

  let calc1 = relDiff(confirmados, recuperados)
  let calc2 = relDiff(confirmados, mortes) / 10
  if (i === 0)
    return `casos confirmados`
  else if (i === 1)
    return `casos recuperados <span>(${calc1.toFixed(2)}%)</span>`
  else return `mortes <span>(${calc2.toFixed(2)}%)</span>`
}


let selectEl = document.querySelector('.select-country')

async function getArrayCountries() {

  let arrayContries = await searchCountries()
  let optionEl = document.createElement('option')
  optionEl.value = ''
  optionEl.innerHTML = 'Selecione o país'
  selectEl.appendChild(optionEl)  


  arrayContries.forEach(country => {
    let optionEl = document.createElement('option')
    optionEl.value = country
    optionEl.innerHTML = country

    selectEl.appendChild(optionEl)
  })
}
getArrayCountries()

// *************


let general = document.querySelector('.general')
let update_general = document.querySelector('.last-update-general')
let generalInformations = ['general_confirmados', 'general_recuperados', 'general_mortes']

let update = document.querySelector('.last-update')
let data = document.querySelector('.data')
let showInformations = ['Confirmados', 'Recuperados', 'Mortes']

generalInformations.forEach((el, i) => {
  let paragraphEl = document.createElement('p')
  let divEl = document.createElement('div')

  divEl.classList.add(el)
  paragraphEl.classList.add('qtd_general')
  paragraphEl.innerHTML = '-'

  divEl.appendChild(paragraphEl)
  general.appendChild(divEl)
});

showInformations.forEach((el, index) => {
  let paragraph1El = document.createElement('p')
  let paragraph2El = document.createElement('p')
  let divEl = document.createElement('div')

  paragraph1El.innerHTML = '-'
  divEl.classList.add(el)
  paragraph2El.innerHTML = el

  paragraph1El.classList.add('quantidades')

  divEl.appendChild(paragraph1El)
  divEl.appendChild(paragraph2El)
  data.appendChild(divEl)

})

// *************

let buttonEl = document.querySelector('.btn-search')
let countrySelected = document.querySelector('.select-country')
let paragraph1El = document.createElement('p')
let spanEl = document.createElement('span')

buttonEl.addEventListener('click', event => {
  if (countrySelected.value === '') return;
  let country = countrySelected.value
  getData(country)
})

countrySelected.addEventListener('change', event => {
  if (update.children.length >= 1) update.removeChild(update.firstChild)
  document.querySelectorAll('.quantidades').forEach((item, index) => {
      item.innerHTML = '-'
  });
})

async function getData(country) {
  try {
    let informationsResponse = await getDataCountries(country)
    let result = await informationsResponse

    let { confirmed, recovered, deaths, lastUpdate } = result
    let data = [confirmed.value, recovered.value, deaths.value]

    let day = lastUpdate.slice(0, 10)
    paragraph1El.innerHTML = ''
    paragraph1El.innerHTML = `Última atualização: ${day}`
    update.appendChild(paragraph1El)

    document.querySelectorAll('.quantidades').forEach((item, index) => {
      item.innerHTML = data[index].toLocaleString("de-DE")
    })

    return result
  } catch (error) {
    console.log(error);
  }
}

async function getDataG() {
  try {
      let informationsResponse = await getDataGeneral()
      let result = await informationsResponse

      if (!result) return;

      let { confirmed, recovered, deaths, lastUpdate } = result
      let data = [confirmed.value, recovered.value, deaths.value]

      const d = new Date(lastUpdate)

      let day = d.toLocaleString('pt-BR')
      spanEl.innerHTML = ''
      spanEl.innerHTML = `Última atualização: ${day}`
      update_general.appendChild(spanEl)

      document.querySelectorAll('.qtd_general').forEach((item, index) => {
          item.innerHTML = `- ${data[index].toLocaleString("de-DE")} <b>${convertArrayNameOfCaseGeneral(index, data)}</b>`
      })

      return result;
  } catch (error) {
      console.log(error);
  }
}
getDataG();