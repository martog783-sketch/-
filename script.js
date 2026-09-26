const products=[
 {id:1,name:"Свещ",price:3.50,icon:"🔩"},
 {id:2,name:"Масло за поддръжка",price:15.00,icon:"🛢️"},
 {id:3,name:"Карбуратор",price:21.00,icon:"⚙️"},
 {id:4,name:"Накладки за спирачки",price:12.00,icon:"🛞"},
 {id:5,name:"Дисплей",price:20.00,icon:"📟"},
 {id:6,name:"Контролер",price:25.00,icon:"🔋"}
];
let cart=JSON.parse(localStorage.getItem("escooterCart")||"[]");
function renderProducts(){
 const el=document.getElementById("products");
 el.innerHTML=products.map(p=>`<article class="product"><div class="product-img">${p.icon}</div><h3>${p.name}</h3><div class="price">€${p.price.toFixed(2)}</div><button class="btn" onclick="addToCart(${p.id})">Добави в количката</button></article>`).join("");
}
function addToCart(id){const p=products.find(x=>x.id===id);const old=cart.find(x=>x.id===id);old?old.qty++:cart.push({...p,qty:1});save();renderCart();}
function removeFromCart(id){cart=cart.filter(x=>x.id!==id);save();renderCart();}
function save(){localStorage.setItem("escooterCart",JSON.stringify(cart));}
function renderCart(){
 const count=cart.reduce((s,x)=>s+x.qty,0),total=cart.reduce((s,x)=>s+x.price*x.qty,0);
 document.getElementById("cartCount").textContent=count;document.getElementById("cartMiniCount").textContent=count;document.getElementById("cartTotal").textContent=`€${total.toFixed(2)}`;
 const html=cart.length?cart.map(x=>`<div class="cart-row"><span>${x.name} ×${x.qty}</span><span>€${(x.price*x.qty).toFixed(2)} <button onclick="removeFromCart(${x.id})" style="background:none;border:0;color:#39ff14;cursor:pointer">×</button></span></div>`).join(""):'<p class="empty">Няма добавени продукти.</p>';
 document.getElementById("cartItems").innerHTML=html;document.getElementById("modalItems").innerHTML=html;document.getElementById("modalTotal").textContent=`€${total.toFixed(2)}`;
}
function openCart(){document.getElementById("cartModal").classList.add("show");renderCart()}
function closeCart(){document.getElementById("cartModal").classList.remove("show")}
function toggleMenu(){const n=document.querySelector("nav");n.style.display=n.style.display==="flex"?"none":"flex";if(innerWidth<=900){n.style.position="absolute";n.style.top="68px";n.style.left="0";n.style.right="0";n.style.background="#030503";n.style.padding="15px";n.style.flexDirection="column"}}
function checkout(){if(!cart.length){alert("Количката е празна.");return}alert("Поръчката е готова за изпращане. Свържи този бутон с твоя телефон, WhatsApp или форма за поръчки.");}
renderProducts();renderCart();