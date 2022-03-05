let preloader = document.querySelector('.preloader');


setTimeout(() => {
    preloader.classList.add('preloader-remove');
}, 2000);

function resetLoader() {
    preloader.classList.remove('preloader-remove');
}



const users = [{
        email: "owoadeanuoluwapo2@gmail.com",
        password: "owoadeanuoluwapo2",
        fullname: "Owoade Anuoluwapo",
        firstname: "Anuoluwapo",
        balance: 23020.50
    },
    {
        email: "lanremalumi@gmail.com",
        password: "codytee",
        fullname: "Olanrewaju Malumi",
        firstname: "Olanrewaju",
        balance: 2102.02
    },
    {
        email: "htechstudio@gmail.com",
        password: "htech",
        fullname: "Tinuosho Huzain",
        firstname: "Huzain",
        balance: 3106.67
    }
];

let active = false;
let login_btn_1 = document.querySelector('.btn-login'),
    login_btn_2 = document.querySelector('.login-btn'),
    logout_btn = document.querySelector('.btn-logout'),
    firstname = document.querySelector('.firstname'),
    fullname = document.querySelector('.full-name'),
    balance = document.querySelector('.balance'),
    username = document.querySelector('.email'),
    password = document.querySelector('.password'),
    popup = document.querySelector('.pop-ups'),
    cancel_btn = document.querySelector('.cancel-btn'),
    logged_in_state = document.querySelectorAll('.logged-in-state'),
    index_state = document.querySelectorAll('.index-state');
console.log(password.value);
userInactive();
login_btn_1.addEventListener('click', () => {
    popup.classList.add('pop-up-show');
});
cancel_btn.addEventListener('click', () => {
    popup.classList.remove('pop-up-show');
});


function userActive() {
    index_state.forEach(each => {
        each.classList.add('element-hide');
    })
    document.querySelector('footer').style.backgroundColor = 'rgb(34, 34, 34)';
    fullname.textContent = `Active user: ${localStorage.getItem('user-fullname')}`;
    balance.textContent = `$${localStorage.getItem('user-balance')}`;
    firstname.textContent = localStorage.getItem('user-firstname');
}

function userInactive() {
    logged_in_state.forEach(each => {
        each.classList.add('element-hide');
    });
    document.querySelector('footer').style.backgroundColor = 'unset';
    fullname.textContent = localStorage.getItem('user-fullname');
};



function reset() {
    logged_in_state.forEach(each => {
        each.classList.remove('element-hide');
    })
    index_state.forEach(each => {
        each.classList.remove('element-hide');
    })
}

function logginSystem() {
    this.active = active;
    this.users = users;
    this.username = username.value;
    this.password = password.value;

    this.validate = function() {
        let match = this.users.filter(each => {
            return each.email === this.username;
        });

        if (match[0].password === this.password & match.length !== 0) {
            revealCaptcha(function(){
             this.activeUser = match[0];
            active = true;
            localStorage.setItem('user-active', 'true');
            popup.classList.remove('pop-up-show');
            localStorage.setItem('user-active', 'true');
            localStorage.setItem('user-firstname', `${match[0].firstname}`);
            localStorage.setItem('user-fullname', `${match[0].fullname}`);
            localStorage.setItem('user-balance', `${match[0].balance}`);
            fullname.textContent = `Active user: ${localStorage.getItem('user-fullname')}`;
            balance.textContent = `$${localStorage.getItem('user-balance')}`;
            firstname.textContent = match[0].firstname;
            reset();
            userActive();
            
            })
            
           

        } else {
            alert("Incorrect input. Please Try again");
        }
    }
    this.validate();
}

login_btn_2.addEventListener('click', () => {
    resetLoader();
    setTimeout(() => {
        preloader.classList.add('preloader-remove');
        let user = new logginSystem();
        console.log(user);
    }, 2000);
})
if (localStorage.getItem('user-active') === "true") {
    reset();
    userActive();
} else {
    localStorage.setItem('user-fullname', 'You are not logged in');
    reset();
    userInactive();
}
logout_btn.addEventListener('click', () => {
    resetLoader();
    setTimeout(() => {
        preloader.classList.add('preloader-remove');
        localStorage.setItem('user-fullname', 'You are not logged in');
        localStorage.setItem('user-active', 'false');
        reset();
        userInactive();
    }, 2000)
});
// Carting System
let cart_btn = document.querySelector('.cart'),
    cart_container = document.querySelector('.Cart'),
    cart_close = document.querySelector('.cart-close'),
    cart_items = document.querySelector('.cart-items'),
    footwears = document.querySelectorAll('.footwear'),
    purchase_btn = document.querySelector('.purchase-btn'),
    total_price = document.querySelector('.total-price'),
    buy_btn = document.querySelectorAll('.Buy');
cart_btn.addEventListener('click', () => {

    if (localStorage.getItem('user-active') === "false") {
        alert('Cart is currently empty, log in to purchase items')
    } else if (cart_items.children.length === 0) {
        alert("Cart is currently empty.Purchase items to view cart");
    } else {
        cart_container.classList.add('cart-show');

    }
});
cart_close.addEventListener('click', () => {

    cart_container.classList.remove('cart-show');

});
buy_btn.forEach((each, index) => {
    each.addEventListener('click', (e) => {
        if (localStorage.getItem('user-active') === "false") {
            alert('You must log in first to purchase this item');
        } else {
            let r = confirm("Add this item to cart?");
            if (r === true) {
                let footwearIndex = index;
                cart_items.innerHTML += `<div class="cart-item"><img src="${footwears[index].children[0].src}"><span class="item-price">${footwears[index].children[1].textContent}</span> <span class="remove">Remove</span>  </div>`;
                console.log(footwears[index].children[0].src);
                sumPrice();
                let remove = document.querySelectorAll('.remove');
                remove.forEach((item, id) => {
                    item.addEventListener('click', () => {
                        if (cart_items.children.length > 1) {
                            cart_items.removeChild(cart_items.children[id]);
                            sumPrice();
                        } else {
                            cart_items.removeChild(cart_items.children[0]);
                            cart_container.classList.remove('cart-show');

                        }



                        console.log(id);
                    })
                })
            }
        }

    });
});


function sumPrice() {
    let cart_item = document.querySelectorAll('.cart-item'),
        net_price = 0;
    cart_item.forEach(each => {
        net_price += parseFloat(each.children[1].textContent.substring(1, each.children[1].textContent.length));
        console.log(net_price);
        total_price.textContent = `Total price: $${net_price}`;

    });

}

//Purchase System 
function cartingSystem() {
    this.balance = localStorage.getItem('user-balance');
    this.total_price = total_price;
    this.makePurchase = function() {
        let cart_item = document.querySelectorAll('.cart-item'),
            net_price = 0;
        cart_item.forEach(each => {
            net_price += parseFloat(each.children[1].textContent.substring(1, each.children[1].textContent.length));
            console.log(parseFloat(each.children[1].textContent.substring(1, each.children[1].textContent.length)));
            total_price.textContent = `Total price: $${net_price}`;
            if (parseFloat(localStorage.getItem('user-balance')) < total_price) {
                alert('Insufficient fund.');
            } else {
                this.new_balance = parseFloat(localStorage.getItem('user-balance')) - net_price;
            }

        });
    }
    this.deduct = function() {
        if (this.new_balance > 0) {
            let cart_item = document.querySelectorAll('.cart-item');
            cart_item.forEach((each, index) => {
                cart_items.removeChild(each);
                cart_container.classList.remove('cart-show');
            })

        }
    }

    this.makePurchase();
    this.deduct();
}

purchase_btn.addEventListener('click', () => {
    let purchase = confirm("Purchase all items in the cart?");
    if (purchase === true) {
        let newp = new cartingSystem();
        let target = newp.new_balance;
        let count = 1;
        let counter = +balance.textContent.substring(1, balance.textContent.length);

        function accelerate() {
            if (target > 0) {
                if (counter > target) {
                    counter -= count;
                    count += 10;
                    balance.textContent = `$${counter}`;
                    setTimeout(accelerate, 100);
                } else {
                    balance.textContent = `$${target.toString().substring(0,7)}`;
                }

                localStorage.setItem('user-balance', target.toString().substring(0, 7));
            } else {
                alert('Insufficient fund.');
            }

        }
        accelerate();
    }


});
let cart = new cartingSystem();
console.log(cart.new_balance);
