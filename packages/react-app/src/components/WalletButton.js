import { shortenAddress, useEthers, useLookupAddress } from '@usedapp/core'
import React, { useEffect, useState } from 'react'
import styles from '../styles'

function WalletButton() {
    const [accountAddress, setAccountAddress] = useState('')
    const { ens } = useLookupAddress()
    const { account, activateBrowserWallet, deactivate } = useEthers()

    useEffect(() => {
        if (ens) {
            setAccountAddress(account)
        } else if (account) {
            setAccountAddress(shortenAddress(account))
        } else {
            setAccountAddress('')
        }
    }, [account, ens, accountAddress])

    return (
        <button onClick={() => {
            if (!account) {
                activateBrowserWallet();
            } else {
                deactivate();
            }
        }}
            className={styles.walletButton}
        >
            {accountAddress || "Connect Wallet"}
        </button>
    )
}

export default WalletButton