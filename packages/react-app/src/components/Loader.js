import React from 'react'
import styles from '../styles'
import { ethereumLogo } from '../assets'

function Loader({ title }) {
    return (
        <div className={styles.loader}>
            <img
                src={ethereumLogo}
                alt='eth logo'
                className={styles.loaderImg} />
            <p className={styles.loaderText}>{title}</p>
        </div>
    )
}

export default Loader