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
function row(x){return `<div class="cartRow"><span>${x.name} ×${x.qty}</span><span>€${(x.price*x.qty).toFixed(2)} <button class="qtyBtn" onclick="changeQty(${x.id},-1)">−</button><b>${x.qty}</b><button class="qtyBtn" onclick="changeQty(${x.id},1)">+</button><button class="deleteBtn" onclick="removeItem(${x.id})">🗑️</button></span></div>`}
function changeQty(id,delta){let x=cart.find(x=>x.id===id);if(!x)return;x.qty+=delta;if(x.qty<=0)removeItem(id);else{save();render()}}
function render(){let n=cart.reduce((a,x)=>a+x.qty,0),t=cart.reduce((a,x)=>a+x.price*x.qty,0);document.getElementById('count').textContent=n;document.getElementById('miniCount').textContent=n;document.getElementById('total').textContent=`€${t.toFixed(2)}`;let h=cart.length?cart.map(row).join(''):'<p>Няма добавени продукти.</p>';document.getElementById('cartItems').innerHTML=h;document.getElementById('modalItems').innerHTML=h;renderCheckoutTotal()}
function renderCheckoutTotal(){let t=cart.reduce((a,x)=>a+x.price*x.qty,0),d=parseFloat(document.getElementById('delivery')?.value||0),all=t+d;document.getElementById('modalProductsTotal').textContent=`€${t.toFixed(2)}`;document.getElementById('deliveryTotal').textContent=`€${d.toFixed(2)}`;document.getElementById('modalTotal').textContent=`€${all.toFixed(2)}`}
function openCart(){document.getElementById('modal').classList.add('show');render()}function closeCart(){document.getElementById('modal').classList.remove('show')}function toggleMenu(){let n=document.querySelector('nav');n.style.display=n.style.display==='flex'?'none':'flex'}
function checkout(){if(!cart.length){alert('Количката е празна.');return}let name=document.getElementById('customerName').value.trim(),phone=document.getElementById('customerPhone').value.trim(),address=document.getElementById('customerAddress').value.trim();if(!name||!phone||!address){alert('Моля, попълни име, телефон и адрес.');return}let payment=document.getElementById('payment').selectedOptions[0].text,delivery=document.getElementById('delivery').selectedOptions[0].text;alert(`Поръчката е подготвена!\n\nИме: ${name}\nТелефон: ${phone}\nАдрес: ${address}\nДоставка: ${delivery}\nПлащане: ${payment}\n\nЗа реално изпращане на поръчките ще свържем формата с имейл, WhatsApp или друга система.`)}
renderProducts();render();
