const form = document.getElementById('osForm')
let orders = JSON.parse(localStorage.getItem('orders')) || []

function updateDashboard() {
  totalOs.innerText = orders.length

  const open = orders.filter(order => order.status === 'Aberta')
  openOs.innerText = open.length

  const done = orders.filter(order => order.status === 'Concluída')
  doneOs.innerText = done.length
}

function renderOrders() {
  ordersContainer.innerHTML = ''

  orders.reverse().forEach(order => {

    const card = document.createElement('div')
    card.classList.add('order-card')

    card.innerHTML = `
      <h3>${order.client}</h3>
      <p><strong>Equipamento:</strong> ${order.equipment}</p>
      <p><strong>Técnico:</strong> ${order.technician}</p>
      <p><strong>Defeito:</strong> ${order.problem}</p>
      <p><strong>Endereço:</strong> ${order.address}</p>

      <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(order.address)}" target="_blank">
        Abrir GPS
      </a>

      <br><br>

      <button onclick="finishOrder('${order.id}')">
        Finalizar
      </button>

      <div class="priority">${order.priority}</div>
    `

    ordersContainer.appendChild(card)
  })

  updateDashboard()
}

form.addEventListener('submit', (e) => {
  e.preventDefault()

  const newOrder = {
    id: Date.now().toString(),
    client: document.getElementById('client').value,
    equipment: document.getElementById('equipment').value,
    address: document.getElementById('address').value,
    technician: document.getElementById('technician').value,
    priority: document.getElementById('priority').value,
    problem: document.getElementById('problem').value,
    status: 'Aberta',
    createdAt: new Date().toLocaleString()
  }

  orders.push(newOrder)

  localStorage.setItem('orders', JSON.stringify(orders))

  form.reset()

  renderOrders()
})

function finishOrder(id) {
  orders = orders.map(order => {
    if (order.id === id) {
      return {
        ...order,
        status: 'Concluída'
      }
    }

    return order
  })

  localStorage.setItem('orders', JSON.stringify(orders))

  renderOrders()
}

renderOrders()
