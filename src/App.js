import { Card, CardContent, FormControl, MenuItem, Select} from '@material-ui/core';
import { useEffect, useState } from 'react';
import './App.css';
import InfoBox from './InfoBox';
import LineGraph from './LineGraph';
import Map from './Map';
import Table from './Table'
import { prettier, sortData } from './util';
import 'leaflet/dist/leaflet.css';

function App() {

  const [countries , setCountries] = useState([])
  const [selectedCountry , setSelectedCountry] = useState('worldwide')
  const [countryInfo , setCountryInfo] = useState({})
  const [tableData , setTableData] = useState([])
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(2);
  const [mapCountries , setMapCountries] = useState([])
  const [casesType , setCasesType] = useState('cases')
  const [darkMode , setDarkMode] = useState(false)

  //https://disease.sh/v3/covid-19/countries to get country by country

  useEffect(() => {

    // get response -> get only json data of response -> 

    const getCountriesData = async () => {
      await fetch('https://disease.sh/v3/covid-19/countries')
      .then((response) => response.json())
      .then((data) => {
        const countriesData = data.map((country) => ({
          name  : country.country ,
          value : country.countryInfo.iso2
        }))

        const sortedData = sortData(data)
        setTableData(sortedData)
        setCountries(countriesData)
        setMapCountries(data)

       })
    }

    getCountriesData()

  } , [])

  useEffect(() => {
    fetch('https://disease.sh/v3/covid-19/all')
    .then(response => response.json())
    .then(data => {
      setCountryInfo(data)
    })
  },[])

  const onCountryChange = async (event) => {
    const countryCode = event.target.value
    
   //https://disease.sh/v3/covid-19/all
   //https://disease.sh/v3/covid-19/countries/{country_code}
    const url = countryCode === 'worldwide' ? 'https://disease.sh/v3/covid-19/all' : `https://disease.sh/v3/covid-19/countries/${countryCode}`
    await fetch(url)
    .then((response) => response.json())
    .then((data) => {
        //console.log('dataaaaaaaaaaaaa' , data)
        setSelectedCountry(countryCode)
        setCountryInfo(data) 
        if (countryCode != 'worldwide'){
        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(5);
        }
        else{
          setMapCenter({lat: 34.80746, lng: -40.4796})
          setMapZoom(2);
        }

        console.log(mapCenter)
    })

    console.log(countryInfo)
  }

  return (
    <div className= {`app ${darkMode && 'appDark'}`}>

      <div className = 'app_left'>
      <div className =  {`app_header ${darkMode && 'app_headerDark'}`}>
     <h1>COVID-19 TRACKER</h1>
     <div className = 'app_darkMode'>
     <label className= {`label ${darkMode && 'label_dark'}`}>
       <div className = {`toggle ${darkMode && 'toggle_dark'}`}>    
           <input onChange = {(event) => setDarkMode(!darkMode)} class="toggle-state" type="checkbox" name="check" value="check" />
          <div class={`indicator ${darkMode && 'indicator_dark'}`}></div>
          </div> 
</label>

     </div>

     <FormControl className = 'app_dropdown'>
       <Select variant = 'outlined' value = {selectedCountry} onChange = {onCountryChange}>
           <MenuItem value = 'worldwide'>Worldwide</MenuItem>
           {
           countries.map((country) => (
             <MenuItem value = {country.value}>{country.name}</MenuItem>
           ))
         }
       </Select>
     </FormControl>
     </div>

     <div className = 'app_stats'>
      <InfoBox darkMode ={darkMode} isRed active = {casesType == 'cases'} onClick = {(event) => setCasesType('cases')} title = 'Coronavirus Cases' cases = {prettier(countryInfo.todayCases)} total = {countryInfo.cases}/>
      <InfoBox darkMode ={darkMode} active = {casesType == 'recovered'} onClick = {(event) => setCasesType('recovered')} title = 'Recovered' cases = {prettier(countryInfo.todayRecovered)} total = {countryInfo.recovered}/>
      <InfoBox darkMode ={darkMode} isRed active = {casesType == 'deaths'} onClick = {(event) => setCasesType('deaths')} title = 'Deaths' cases = {prettier(countryInfo.todayDeaths)} total = {countryInfo.deaths}/>
     </div>

     <Map darkMode ={darkMode} casesType = {casesType} countries = {mapCountries} center={mapCenter} zoom={mapZoom}/>
     </div>

     <Card className = {`app_right ${darkMode && 'app_right_dark'}`}>
       <CardContent>
         <h3 className = {`${darkMode && 'h3_dark'}`}>Live Cases by Country</h3>
         <Table darkMode = {darkMode} countries = {tableData} />

         <h3 className = {`app_graphTitle ${darkMode && 'app_graphTitle_dark'}`}>Worldwide New {casesType}</h3>
         <LineGraph darkMode = {darkMode} casesType = {casesType} />
       </CardContent>
     </Card>

    </div>
  );
}

export default App;
