const inputEl = document.querySelector("#password")
const upperCaseCheckEL = document.querySelector("#uppercase-check")
const numberCheckEL = document.querySelector("#number-check")
const symbolCheckEL = document.querySelector("#symbol-check")
const securityIndicatorBarEl = document.querySelector("#security-indicator-bar")

let passwordLength = 16

function generatePassword() {
    let chars = "abcdefghjkmnopqrstuvwxyz"

    const upperCaseChars = "ABCDEFGHJKMNOPQRSTUVWXYZ"
    const numberChars = "123456789"
    const symbolChars = "?!@&*()[]"

    if (upperCaseCheckEL.checked) {
        chars += upperCaseChars
    }

    if (numberCheckEL.checked) {
        chars += numberChars
    }

    if (symbolCheckEL.checked) {
        chars += symbolChars
    }

    let password = ""

    for (let i = 0; i < passwordLength; i++) {
        const randomNumber = Math.floor(Math.random() * chars.length)
        password += chars.substring(randomNumber, randomNumber + 1)
    }

    inputEl.value = password 

    calculateQuality()
    calculateFontSize()
}

function calculateQuality() {
    const percent = Math.round((passwordLength / 64) * 25 +
        (upperCaseCheckEL.checked ? 15 : 0) +
        (numberCheckEL.checked ? 25 : 0) +
        (symbolCheckEL.checked ? 35 : 0)
    )

    securityIndicatorBarEl.style.width = `${percent}%`

    if (percent > 69) {
        //safe
        securityIndicatorBarEl.classList.remove("critical")
        securityIndicatorBarEl.classList.remove("warning")
        securityIndicatorBarEl.classList.add("safe")
    } else if (percent > 50) {
        //warning
        securityIndicatorBarEl.classList.remove("critical")
        securityIndicatorBarEl.classList.add("warning")
        securityIndicatorBarEl.classList.remove("safe")

    } else {
        //critical
        securityIndicatorBarEl.classList.add("critical")
        securityIndicatorBarEl.classList.remove("warning")
        securityIndicatorBarEl.classList.remove("safe")
    }

    if (percent >= 100){
        securityIndicatorBarEl.classList.add("completed")
    }else{
        securityIndicatorBarEl.classList.remove("completed")
    }
}

function calculateFontSize(){
    if( passwordLength > 45){
        inputEl.classList.remove("font-sm")
        inputEl.classList.remove("font-xs")
        inputEl.classList.add("font-xxs")
    }else if (passwordLength > 32){
        inputEl.classList.remove("font-sm")
        inputEl.classList.add("font-xs")
        inputEl.classList.remove("font-xxs")
    }else if (passwordLength >22){
        inputEl.classList.add("font-sm")
        inputEl.classList.remove("font-xs")
        inputEl.classList.remove("font-xxs")
    }else{
        inputEl.classList.remove("font-sm")
        inputEl.classList.remove("font-xs")
        inputEl.classList.remove("font-xxs")
    }
}

function copy() {
    navigator.clipboard.writeText(inputEl.value)
    alert("Anote sua senha, qualquer modificação irá gerar uma nova combinação.")
}

const passwordLengthEl = document.querySelector("#password-length")
passwordLengthEl.addEventListener("input", function () {
    passwordLength = passwordLengthEl.value
    document.querySelector("#password-length-text").innerText = passwordLength
    generatePassword()
})
upperCaseCheckEL.addEventListener("click", generatePassword)
numberCheckEL.addEventListener("click", generatePassword)
symbolCheckEL.addEventListener("click", generatePassword)

document.querySelector("#copy-1").addEventListener("click", copy)
document.querySelector("#copy-2").addEventListener("click", copy)
document.querySelector("#refresh").addEventListener("click",generatePassword)

generatePassword()