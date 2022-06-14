import React, { useEffect, useState } from 'react'
import './App.css'

import { explorer, Contract, Script } from '@alephium/web3'
import contractJson from './artifacts/greeter.ral.json'
import scriptJson from './artifacts/greeter_main.ral.json'

import WalletConnectClient from '@walletconnect/client'

function Dashboard() {
    const api = new explorer.Api<null>({ baseUrl: 'https://mainnet-backend.alephium.org' })
    const contract = Contract.fromJson(contractJson).toString()
    const script = Script.fromJson(scriptJson).toString()
    const [blocks, setBlocks] = useState('')

    async function walletConnectCallback() {
        const walletConnect = await WalletConnectClient.init({
            projectId: '6e2562e43678dd68a9070a62b6d52207',
            relayUrl: 'wss://relay.walletconnect.com',
            metadata: {
                name: 'Alphium NFT',
                description: 'Alpephium NFT Marketplace',
                url: 'https://walletconnect.com/',
                icons: ['https://walletconnect.com/walletconnect-logo.png']
            }
        })

        console.log(walletConnect)
    }

    useEffect(() => {
        async function fetchBlocks() {
            const blocks = (await api.blocks.getBlocks({ page: 1 })).total
            setBlocks(JSON.stringify(blocks))
        }

        fetchBlocks()
    })

    return (
        <div>
            <p>blocks: {blocks}</p>
            <p>contract: {contract}</p>
            <p>script: {script}</p>
        </div>
    )
}

function App() {
    return (
        <div className='App'>
            <header className='App-header'>
                <Dashboard />
            </header>
        </div>
    )
}

export default App
