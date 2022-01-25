// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD_URRYkljwhfUv2UXSpw2dOnAzUr2tLnc",
    authDomain: "ps14692assignment.firebaseapp.com",
    databaseURL: "https://ps14692assignment-default-rtdb.firebaseio.com",
    projectId: "ps14692assignment",
    storageBucket: "ps14692assignment.appspot.com",
    messagingSenderId: "38103395762",
    appId: "1:38103395762:web:70dfac8ea103f84dadc8ab",
    measurementId: "G-CZW0H278HE"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const btnLogin = document.querySelector('.btn-login');
		const modalWrapper = document.querySelector('.modal-wrapper');
		const addModal = document.querySelector('.modal');
		const addModalForm = document.querySelector('.modal .form');

		const btnAdd = document.querySelector('.btn-add');
		// Get all courses
		var emailinput;
		var passwordinput;

		btnLogin.addEventListener('click', () => {
			emailinput = document.querySelector('#inputEmail').value;
			passwordinput = document.querySelector('#inputPassword').value;
			if (emailinput === "" || passwordinput === "") {
				alert("Vui lòng nhập tên đăng nhập và mật khẩu");
				return;
			} else {
				console.log(emailinput);
				console.log(passwordinput);
			}

			const account = [];

			db.collection('users').where("email", "==", emailinput).get().then((snapshot) => {
				snapshot.docs.forEach(doc => {
					account.push(doc.data());
					console.log(doc.data().username);
					console.log(doc.data().password);
					console.log(account);
					var i;
					if (emailinput === doc.data().email) {
						if (passwordinput === doc.data().password) {
							alert("Đăng nhập thành công");
							localStorage.setItem('name', doc.data().email);
							window.location.href = 'index.html';
						} else {
							alert("Sai mật khẩu!");
						}
					} else {
						alert("Email không chính xác!");
					}
				})
			});
		});

		function onSignIn(googleUser) {
			var profile = googleUser.getBasicProfile();
			console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
			console.log('Name: ' + profile.getName());
			console.log('Image URL: ' + profile.getImageUrl());
			console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.

			var accounts = [];
			localStorage.setItem('name', profile.getEmail());
			db.collection('users').where("email", "==", profile.getEmail()).get().then((snapshot) => {
				console.log(snapshot.docs.length);
				if (snapshot.docs.length != 0) {
					window.location.href = 'index.html';
				} else {
					db.collection('users').add({
						fullname: profile.getName(),
						password: "Passwordwashexed",
						email: profile.getEmail(),
					}).then(function () {
						window.location.href = 'index.html';
					});
				}
			});
		}