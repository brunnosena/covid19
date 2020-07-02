export async function searchCountries () {
    let arrayContries = []

    try {
        let contriesResponse = await fetch(`https://covid19.mathdro.id/api/countries`)
        let result = await contriesResponse.json()

        for (const key in result.countries) {
            let countryName = result.countries[key].name

            arrayContries.push(countryName)

        }
        return arrayContries

    } catch (error) {
        console.log(error)
    }
}

export async function getDataCountries(country) {
    try {
        let informationsResponse = await fetch(`https://covid19.mathdro.id/api/countries/${country}`)
        let result = await informationsResponse.json()

        return result
        
    } catch (error) {
        console.log(error);
    }
}

export async function getDataGeneral() {
    try {
        let informationsResponse = await fetch('https://covid19.mathdro.id/api')
        let result = await informationsResponse.json()

        return result
        
    } catch (error) {
        console.log(error);
    }
}