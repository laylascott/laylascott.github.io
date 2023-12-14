const typed = new Typed('.com', {
    strings : ['Your Dream,', 'My Code,', 'Our Future!'],
    typeSpeed:100,
    backSpeed:100,
    backDelay:1000,
    loop:true
} );
const hamburger = document.querySelector('.hamburger');
const navList = document.querySelector('nav ul');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navList.classList.toggle('active');
})
