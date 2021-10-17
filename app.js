let shajs = require('sha.js')

class Blockchain {
    constructor() {
        let genesisBlock = this.createBlock('', '')
        this.chain = [genesisBlock]
    }
    
    addBlock(data) {
        let lastBlockHash = this.getLastBlockHash()
        let newBlock = this.createBlock(data, lastBlockHash)
        this.chain.push(newBlock)
    }

    createBlock(data, previousBlockHash) {
        let block = {
            data,
            previousBlockHash,
            timestamp: Date.now()
        }
        block.hash = this.hashMyData(JSON.stringify(block))
        return block;
    }

    hashMyData(data) {
        return shajs('sha256').update(data).digest('hex')
    }

    getLastBlockHash() {
        return this.chain[this.chain.length - 1].hash
    }

    validateBlockchain() {
        if (this.chain.length == 1)
            return true;

        let calculatedPreviousBlockHash = this.calculateBlockHash(0)
        for (let i = 1; i < this.chain.length; i++) {
            if (this.chain[i].previousBlockHash != calculatedPreviousBlockHash){
                console.log(`block ${i-1} was changed!`);
                return false;
            }
            calculatedPreviousBlockHash = this.calculateBlockHash(i)
        }
        return true;
    }

    calculateBlockHash(blockIndex) {
        let block = this.chain[blockIndex]
        let data = {
            data: block.data,
            previousBlockHash: block.previousBlockHash,
            timestamp: block.timestamp
        }
        return this.hashMyData(JSON.stringify(data))
    }
}

let myBlockchain = new Blockchain()

myBlockchain.addBlock('name:thiago; role:dev') // adiciona o primeiro bloco, depois do 'genesis block'
myBlockchain.addBlock('name:peter; role:manager') // adiciona um segundo bloco
console.log(myBlockchain.chain)
console.log('is blockchain valid: ' + myBlockchain.validateBlockchain()) // até aqui o estado da blockchain é válido 😎

myBlockchain.chain[1].data = 'name: thiago; role: manager' // dados de um dos blocos é alterado, mudando a 'role' de 'dev' pra 'manager' 👿
console.log('is blockchain valid: ' + myBlockchain.validateBlockchain()) // estado da blockchain se torna inválido 😒