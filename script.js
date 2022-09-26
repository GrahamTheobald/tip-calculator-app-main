const INPUT_MAP = {
    bill: {
        value: 0,
        regex: /^\d+(\.\d{2})?$/,
    },
    people: {
        value: 0,
        regex: /^[1-9]\d*$/,
    },
    percent: {
        value: 0,
        regex: /^\d+(\.\d+)?$/,
    }
}

const inputs = document.querySelectorAll("[data-input]")
const resetButton = document.querySelector(".reset")
const percentButtons = document.querySelectorAll("[data-percent]")

const tipDisplay = document.querySelector("[data-tip]")
const totalDisplay = document.querySelector("[data-total]")


inputs.forEach(input => {
    input.addEventListener("input", e => {
        validateInput(input)
        calculateTip()
    })
})

resetButton.addEventListener("click", () => {
    reset()
})

percentButtons.forEach(button => {
    button.addEventListener("click", ()=> {
        INPUT_MAP.percent.value = button.dataset.percent
        calculateTip()
    })
})

function calculateTip() {
    if (INPUT_MAP.people.value == 0) return
    const tip = (INPUT_MAP.bill.value * (INPUT_MAP.percent.value / 100)) / INPUT_MAP.people.value
    const total = (INPUT_MAP.bill.value + tip) / INPUT_MAP.people.value
    tipDisplay.innerText = new Intl.NumberFormat("en-US", {style: "currency", currency: "USD"}).format(tip)
    totalDisplay.innerText = new Intl.NumberFormat("en-US", {style: "currency", currency: "USD"}).format(total)
    resetButton.classList.add("not-empty")
}

function reset() {
    inputs.forEach(input => {
        input.value = ''
        input.classList.remove("error")
        input.classList.remove("active")
    })
    Object.entries(INPUT_MAP).forEach(([key, obj]) => {
        obj.value = 0
    })
    document.querySelectorAll(".error-message").forEach(message => message.classList.remove("reveal"))
    resetButton.classList.remove("not-empty")
    tipDisplay.innerText = '$0.00'
    totalDisplay.innerText = '$0.00'
}

function validateInput(input) {
    if (INPUT_MAP[input.dataset.input].regex.test(input.value)) {
        input.classList.remove("error")
        input.closest(".error-container")?.querySelector(".error-message").classList.remove("reveal")
        INPUT_MAP[input.dataset.input].value = parseFloat(input.value)
    }
    else {
        input.classList.add("error")
        input.closest(".error-container")?.querySelector(".error-message").classList?.add("reveal")
        INPUT_MAP[input.dataset.input].value = 0
    }

}