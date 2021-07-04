const { default: fetch } = require("node-fetch")
const openSocket = require('socket.io-client');

const populateList = () => {
    const nameList = document.getElementById('nameList')

    fetch('/fetchAll')
    .then(res => res.json())
    .then(data => {
        while(nameList.firstChild) nameList.firstChild.remove()

        for (const avenger of data.avengers) {
            const li = document.createElement('li')
            li.appendChild(document.createTextNode(avenger.name))
            nameList.appendChild(li)
        }
        openSocket('http://localhost:5000')
    })
    .catch(err => {
        console.error(err)
    })
}

const submitName = () => {
    const newName = document.getElementById('newName').value

    fetch('/insertName', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ newName })
    })
        .then(res => {
            document.getElementById('newName').value = ''

            populateList()
        })
        .catch(err => {
            document.getElementById('newName').value = ''
            console.log(err)
        })
}

populateList()