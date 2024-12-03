
const main = document.querySelector('main')
const code = document.querySelector('canvas')
const a = document.querySelector('a')

// initial value
const initialValue = new URLSearchParams(document.location.search).get('t') || sessionStorage.getItem('current')
if (initialValue) {
    main.textContent = initialValue

    update()

    // clear the search params
    const url = new URL(document.location)
    url.search = ''
    history.replaceState(null, '', url)

}


main.addEventListener('input', () => update())

async function update() {
    const url = new URL(document.location)
    url.search = new URLSearchParams({ t: main.innerText })
    a.href = url

    sessionStorage.setItem('current', main.innerText)

    const { default: QRious } = await import("https://esm.sh/qrious")

    new QRious({ value: url.toString(), element: code })
}
