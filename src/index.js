import './assets/style.css'

document.querySelector('#app').innerHTML = `
  <div>
    <header>
      <nav>this is nav</nav>
    </header>
    <main>
      <h1>This is main content</h1>
    </main>
    <footer></footer>
  </div>
`

setupCounter(document.querySelector('#counter'))
