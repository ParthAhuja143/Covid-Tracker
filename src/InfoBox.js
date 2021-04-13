import { Card, CardContent, Typography } from '@material-ui/core'
import React from 'react'
import './InfoBox.css'

function InfoBox({title , cases , total , onClick ,active ,isRed ,darkMode}) {
    return (
        <Card className = {`infoBox  ${active && 'infoBox-selected'} ${isRed && 'infoBox-red'} ${darkMode && 'infoBox_dark'}`} onClick = {onClick}>
            <CardContent>
                <Typography className = {`infoBox_title ${darkMode && 'infoBox_title_dark'}`} color = 'textSecondary'>
                    {title}
                </Typography>

                <h2 className = {`infoBox_cases ${!isRed && 'infoBox_cases-green'}`}>{cases}</h2>

                <Typography className = {`infoBox_total ${darkMode && 'infoBox_total_dark'}`} color = 'textSecondary'>
                    {total} Total
                </Typography>

            </CardContent>
        </Card>
    )
}

export default InfoBox
