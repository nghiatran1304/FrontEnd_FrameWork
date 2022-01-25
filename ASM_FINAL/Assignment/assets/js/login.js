app.controller("loginCtrl", function ($scope) {

	// Get all courses
	var emailinput;
	var passwordinput;

	$scope.login = function () {
		emailinput = document.querySelector('#inputEmail').value;
		passwordinput = document.querySelector('#inputPassword').value;
		if (emailinput === "" || passwordinput === "") {
			Swal.fire({
				text: "Vui lòng không để trống thông tin đăng nhập!",
				icon: 'warning',
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
			  });
			return;
		} else {

		}

		const account = [];



		// Lấy database từ bảng users, với điều kiện trường email == với email nhập vào
		db.collection('users').where("email", "==", emailinput).get().then((snapshot) => {
			// Kiểm tra dữ liệu tra về có hay không
			if (snapshot.docs.length > 0) {
				snapshot.docs.forEach(doc => {
					account.push(doc.data());
					var i;

					if (emailinput === doc.data().email) {
						if (passwordinput === doc.data().password) {
							Swal.fire({
								text: "Đăng nhập thành công!",
								icon: 'success',
								confirmButtonColor: '#3085d6'
							}).then(function () {
								localStorage.setItem('name', doc.data().email);
								window.location.reload();
							});
						} else {
							Swal.fire({
								text: "Sai mật khẩu!",
								icon: 'question',
								confirmButtonColor: '#3085d6'
							});
						}
					}
				});
			} else {
				Swal.fire({
					text: "Email không tồn tại!",
					icon: 'question',
					confirmButtonColor: '#3085d6'
				});
			}
		});
	};


	gapi.load('auth2', function () { // Loads the auth2 component of gapi
		gapi.auth2.init({ // initialize the auth2 using your credentials
			// client_id: "38103395762-a03gvbvshdtca3gkcu93hro5gajsr94e.apps.googleusercontent.com"
			client_id: "830102791057-uh6nd15bhc6laq6h21lkc1gfuu6tpdke.apps.googleusercontent.com"
		}).then(function onInit() { // on complete of init
			gapi.signin2.render("g-signin2", { // render the HTML button on the screen providing the ID of the element (g-signin2)
				'scope': 'profile email',
				'width': 460,
				'height': 40,
				'longtitle': true,
				'theme': 'dark',
				'onsuccess': function (googleUser) { // This executes when a user successfully authorizes you to their data by clicking the button and selecting their account.
					var profile = googleUser.getBasicProfile();
					console.log("gapi.load -> login.js"); 
					console.log('ID: ' + profile.getId());
					console.log('Name: ' + profile.getName());
					console.log('Image URL: ' + profile.getImageUrl());
					console.log('Email: ' + profile.getEmail());
					var accounts = [];
					localStorage.setItem('name', profile.getEmail());
					db.collection('users').where("email", "==", profile.getEmail()).get().then((snapshot) => {
						console.log(snapshot.docs.length);
						if (snapshot.docs.length != 0) {
							window.location.reload();
						} else {
							db.collection('users').add({
								fullname: profile.getName(),
								password: "Passwordwashexed",
								email: profile.getEmail(),
							}).then(function () {
								window.location.reload();
							});
						}
					});
				}
			});
		});
	});
})