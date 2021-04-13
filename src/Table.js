import React from 'react'
import './Table.css'
import numeral from 'numeral'
import { dark } from '@material-ui/core/styles/createPalette'

function Table({countries ,darkMode}) {
    return (
        <div className = 'table'>
            {
                countries.map(country => (
                    <tr className = {`table_row ${darkMode && 'table_rowDark'}`}>
                        <td className = {`table_name ${darkMode && 'table_nameDark'}`}>{country.country}</td>
                        <td className = 'table_data'><strong>{numeral(country.cases).format('0,0')}</strong></td>
                    </tr>
                ))
            }
        </div>
    )
}

export default Table
