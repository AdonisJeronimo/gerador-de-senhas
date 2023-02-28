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
    const symbolChars = "?!@&*()[]" // 

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

    inputEl.value = password // 

    calculateQuality()
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
}

function copy() {
    navigator.clipboard.writeText(inputEl.value)
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

generatePassword()