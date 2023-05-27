
import {initializeApp} from  "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import {getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://real-time-database-6c9a3-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app) 
const massegeListInDB = ref(database, "massegeList")

const inputFieldEl = document.getElementById("input-field")
const buttonEl = document.getElementById("Publish-button")
const massegeListEl = document.getElementById("massege-list")



buttonEl.addEventListener("click", function(){
    let inputValue = inputFieldEl.value

    push(massegeListInDB, inputValue)
    
    ClearFieldElFactor()
    
    })

onValue(massegeListInDB, function(snapshot){
    
if(snapshot.exists()){
     let itemArray = Object.entries(snapshot.val())
    
    clearMassegeListEl()
    for(let i = 0; i < itemArray.length; i++){
        let currentItem = itemArray[i]
        let currentItemID = currentItem[0]
        let currentItemValue = currentItem[1]
        apppendMassegeFromInnerEl(currentItem )

    } 
    }else {
        massegeListEl.innerHTML = "No anymore meassges are there...yet!"
}
    
    
   

})

function clearMassegeListEl(){
        massegeListEl.innerHTML = ""

}



function ClearFieldElFactor(){
    inputFieldEl.value = ""
}

function apppendMassegeFromInnerEl(item){
    let itemID = item[0]
    let itemValue = item[1]    
    let freshEl = document.createElement("li")
    freshEl.textContent = `${itemValue}`
    
    freshEl.addEventListener("click", function(){
      let exactLocationOfItemInDB = ref(database, `massegeList/${itemID}`)
      remove(exactLocationOfItemInDB)
    })
    
    massegeListEl.append(freshEl)
}