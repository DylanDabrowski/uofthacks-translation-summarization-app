import { ToggleButtonGroup, ToggleButton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import styles from "../styles/summary.module.css"


export default function Summary({setShowOutput, summarizedText1, summarizedText2}) {
    const [summaryType, setSummaryType] = useState("brief")

    const handleChange = (
        event,
        newType,
      ) => {
        setSummaryType(newType);
      };

    return (
        <div className={styles.container}>
            <button onClick={() => {setShowOutput(false)}}>X</button>
            <div className={styles.selector_container}>
            <ToggleButtonGroup
                color="primary"
                value={summaryType}
                exclusive
                onChange={handleChange}
                aria-label="Platform"
            >
                <ToggleButton value="brief">Brief Summary</ToggleButton>
                <ToggleButton value="indepth">In-depth Summary</ToggleButton>
            </ToggleButtonGroup>
            </div>
            <p className={styles.text}>This text is about ...</p>
            {summaryType == "indepth" ? <p className={styles.text}>{summarizedText2}</p> : <p className={styles.text}>{summarizedText1}</p>}
            
        </div>
    )
}
