import chrome from 'chrome'
import config from '@/assets/js/config'

const {nameSpace, defaultData} = config

class Storage {
    constructor() {
        this.nameSpace = nameSpace
        this.defaultData = defaultData
    }

    checkStorage = () => {
        if(chrome && chrome.storage) {
            return true
        } else {
            console.error('chrome.storage must be use in extension')
        }
    }

    initial() {
        return this.saveStorage(defaultData)
    } 

    saveStorage(obj) {
        const data = JSON.stringify(obj)
        return new Promise(resolve => {
            if(this.checkStorage()) {
                // chrome storage api
                // https://developer.chrome.com/extensions/storage
                chrome.storage.sync.set({[nameSpace]: data}, (...args) => {
                    resolve(...args)
                })
            }
        })
    } 

    getStorage() {
        return this._getStorage()
            .then(value => {
                if(value) {
                    return value
                } else {
                    return this.initial()
                }
            })
            .catch(e => {
                console.error(e)
            })
    }
    
    _getStorage() {
        return new Promise((resolve, rejected) => {
            if(this.checkStorage()) {
                // https://developer.chrome.com/extensions/storage
                chrome.storage.sync.get(nameSpace, results => {
                    const value = results[nameSpace] || null
                    try {
                        resolve(JSON.parse(value))     
                    } catch(e) {
                        rejected(e)
                    }
                })
            }
        })
    }

}

export default new Storage()