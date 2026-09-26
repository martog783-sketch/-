const products=[
{id:1,name:'Гума за електрически скутер',price:18,icon:'🛞'},
{id:2,name:'Накладки за спирачки',price:12,icon:'🛑'},
{id:3,name:'Контролер',price:25,icon:'⚡'},
{id:4,name:'LED фар',price:14,icon:'💡'},
{id:5,name:'Дисплей',price:20,icon:'📟'},
{id:6,name:'Зарядно устройство',price:28,icon:'🔌'},
{id:7,name:'Камера за гума',price:8,icon:'⭕'},
{id:8,name:'Комплект ръкохватки',price:10,icon:'🛴'}];
let cart=JSON.parse(localStorage.getItem('escooterCart')||'[]');
function renderProducts(){document.getElementById('products').innerHTML=products.map(p=>`<article class="product"><div class="pic">${p.icon}</div><h3>${p.name}</h3><div class="price">€${p.price.toFixed(2)}</div><button class="btn" onclick="add(${p.id})">Добави в количката</button></article>`).join('')}
function add(id){let p=products.find(x=>x.id===id),x=cart.find(x=>x.id===id);x?x.qty++:cart.push({...p,qty:1});save();render()}
function removeItem(id){cart=cart.filter(x=>x.id!==id);save();render()}
function save(){localStorage.setItem('escooterCart',JSON.stringify(cart))}
function render(){let n=cart.reduce((a,x)=>a+x.qty,0),t=cart.reduce((a,x)=>a+x.price*x.qty,0);document.getElementById('count').textContent=n;document.getElementById('miniCount').textContent=n;document.getElementById('total').textContent=`€${t.toFixed(2)}`;let h=cart.length?cart.map(x=>`<div class="cartRow"><span>${x.name} ×${x.qty}</span><span>€${(x.price*x.qty).toFixed(2)} <button onclick="removeItem(${x.id})">×</button></span></div>`).join(''):'<p>Няма добавени продукти.</p>';document.getElementById('cartItems').innerHTML=h;document.getElementById('modalItems').innerHTML=h;document.getElementById('modalTotal').textContent=`€${t.toFixed(2)}`}
function openCart(){document.getElementById('modal').classList.add('show');render()}function closeCart(){document.getElementById('modal').classList.remove('show')}function toggleMenu(){let n=document.querySelector('nav');n.style.display=n.style.display==='flex'?'none':'flex'}function checkout(){alert(cart.length?'Поръчката е готова. Следва да свържем бутона с реална форма/WhatsApp.':'Количката е празна.')}
renderProducts();render();
