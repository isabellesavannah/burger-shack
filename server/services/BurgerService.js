import {MOCKDB} from "../db/MOCKDB"

let id = 2
class BurgerService {
    getAll(){
        return MOCKDB.burgers
    }
    getOne(id){
        const foundBurger = findBurger(id)
        return foundBurger
    }
    create(newBurger){
        newBurger.id = id++
        MOCKDB.burgers.push(newBurger)
        return newBurger
    }
    delete(id){
        findBurger(id)
        MOCKDB.burgers = MOCKDB.burgers.filter(b=> b.id != id)
    }
    edit(editedBurger, id){
        const foundBurger = findBurger(id)
        Object.keys(editedBurger).forEach(key => {
            foundBurger[key]= editedBurger[key]
        })
        return foundBurger
    }
}
function findBurger(id){
    let foundBurger = MOCKDB.burgers.find(c=> c.id == id)
    if (!foundBurger){throw new Error("invalid Id")}
    return foundBurger
}

export const burgerService = new BurgerService();