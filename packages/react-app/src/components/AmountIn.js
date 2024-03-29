import React, { useEffect, useRef, useState } from 'react'


import { chevronDown } from '../assets'
import styles from '../styles'
import { useOnClickOutside } from '../utils'


function AmountIn({
    value,
    onChange,
    currencyValue,
    onSelect,
    currencies,
    isSwapping
}) {

    const [showList, setShowList] = useState(false)
    const [activeCurrency, setActiveCurrency] = useState("Select");
    const ref = useRef();

    useOnClickOutside(ref, () => setShowList(false))

    useEffect(() => {
        if (Object.keys(currencies).includes(currencyValue)) {
            setActiveCurrency(currencies[currencyValue])
        } else {
            setActiveCurrency("Select")
        }
    }, [currencies, currencyValue])

    return (
        <div className={styles.amountContainer}>
            <input
                placeholder='0.0'
                type='number'
                value={value}
                disabled={isSwapping}
                onChange={(e) => typeof onChange === "function" && onChange(e.target.value)}
                className={styles.amountInput}
            />

            <div className='relative' onClick={() => setShowList(prev => !prev)}>
                <button className={styles.currencyButton}>
                    {activeCurrency}
                    <img src={chevronDown} alt='chevron down'
                        className={`w-4 h-4 object-contain ml-2 ${showList ? 'rotate-180' : 'rotate-0'}`} />
                </button>

                {showList && (
                    <ul ref={ref} className={styles.currencyList}>
                        {
                            Object.entries(currencies)
                                .map(([token, tokenName], i) => (
                                    <li key={i}
                                        // className={`${styles.currencyListItem} ${activeCurrency === tokenName ? 'bg-site-dim2' : ''} cursor-pointer`}
                                        className={styles.currencyListItem}
                                        onClick={() => {
                                            if (typeof onSelect === "function") { onSelect(token) };
                                            setShowList(false)
                                            setActiveCurrency(tokenName)
                                        }}
                                    >{tokenName}</li>
                                ))
                        }
                    </ul>
                )}
            </div>
        </div>
    )
}

export default AmountIn