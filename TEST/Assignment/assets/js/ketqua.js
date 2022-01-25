app.controller("ketquaCtrl", function ($scope, $http, $routeParams, $timeout, $window) {
    var currentUser = localStorage.getItem('name');

    const modalWrapper = document.querySelector('.modal-wrapper');
    const addModal = document.querySelector('.add-modal');
    const addModalForm = document.querySelector('.add-modal .form');

    const editModal = document.querySelector('.edit-modal');
    const editModalForm = document.querySelector('.edit-modal .form');

    const editModalResult = document.querySelector('.edit-modal-result');
    const editModalFormResult = document.querySelector('.edit-modal-result .form');

    const btnAdd = document.querySelector('.btn-add');

    const detailModal = document.querySelector('.detail-modal');

    const tableUsers = document.querySelector('.table-users');
    const tableCourses = document.querySelector('.table-course');
    let id;
    let idcourse;

    $scope.idmonhoc
    const emaillogged = localStorage.getItem('name');
    if (emaillogged === null) {
        window.location.href = '#!login';
        Swal.fire('Bạn chưa đăng nhập!!');
    }

    const renderUser = doc => {
        const tr = `
    <tr data-id='${doc.id}'>
      <td>${doc.data().fullname}</td>
      <td>${doc.data().password}</td>
      <td>${doc.data().email}</td>
      <td>
        <button class="btn btn-edit-info" style="color: white;border-radius: 20px; width: 70px; padding-right: 60px;">Edit</button>
      </td>
    </tr>
  `;
        tableUsers.insertAdjacentHTML('beforeend', tr);


        const btnEdit = document.querySelector(`[data-id='${doc.id}'] .btn-edit-info`);
        btnEdit.addEventListener('click', () => {
            editModal.classList.add('modal-show');

            id = doc.id;
            editModalForm.fullname.value = doc.data().fullname;
            editModalForm.password.value = doc.data().password;
            editModalForm.email.value = doc.data().email;
        });

    }

    const renderCourse = doc => {
        const tr = `
    <tr data-id='${doc.id}'>
      <td style="font-style: italic; font-size: 20px;">${doc.data().course}</td>
      <td style="color: blue; font-size: 20px;">${doc.data().mark}</td>
      <td>
        <button class="btn btn-detail" style="background-color: aqua; color: white;border-radius: 20px; width: 120px; padding-right: 80px;">Chi Tiết</button>
      </td>
    </tr>
  `;
        tableCourses.insertAdjacentHTML('beforeend', tr);

        const btnDetail = document.querySelector(`[data-id='${doc.id}'] .btn-detail`);
        btnDetail.addEventListener('click', () => {
            $scope.cauhoi = [];
            $scope.idmonhoc = "";
            $scope.tenmonhoc = "";
            $scope.cautraloi = [];
            $scope.listcautraloi = [];
            detailModal.classList.add('modal-show');
            db.collection('course').where('__name__', '==', doc.id).get().then(snapshot => {
                snapshot.forEach(function (doc) {
                    $scope.idmonhoc = doc.data().idMH;
                    $scope.tenmonhoc = doc.data().course;
                });
            }).then(function () {
                $scope.idmonhoc = doc.data().idMH;
                $http.get("assets/db/Quizs/" + $scope.idmonhoc + ".js").then(
                    function (d) { $scope.cauhoi = d.data; }).then(function () {
                        db.collection('details').where("Idmonhoc", "==", $scope.idmonhoc).get().then(snapshot => {
                            snapshot.forEach(function (doc) {
                                for (var i = 0; i < $scope.cauhoi.length; i++) {
                                    if ($scope.cauhoi[i].Text === doc.data().cauhoi && doc.data().email === emaillogged) {
                                        $scope.listcautraloi = $scope.cauhoi[i];
                                        angular.forEach($scope.listcautraloi, function (eachObj) {
                                            if (eachObj === "Để khởi động và dừng SQL Server sử dụng công cụ nào dưới đây:") {
                                                eachObj.Cautraloi = "A";
                                            }
                                            console.log(eachObj);
                                        });
                                    }
                                }
                            });
                        })
                    });
            });
        });
    }



    // Click add user button
    btnAdd.addEventListener('click', () => {
        addModal.classList.add('modal-show');

        addModalForm.username.value = '';
        addModalForm.password.value = '';
        addModalForm.email.value = '';
    });

    // User click anyware outside the modal
    window.addEventListener('click', e => {
        if (e.target === addModal) {
            addModal.classList.remove('modal-show');
        }
        if (e.target === editModal) {
            editModal.classList.remove('modal-show');
        }
        if (e.target === detailModal) {
            detailModal.classList.remove('modal-show');
        }
    });


    // Real time listener
    db.collection('users').where("email", "==", emaillogged).onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {

            if (change.type === 'added') {
                renderUser(change.doc);
            }
            if (change.type === 'removed') {
                let tr = document.querySelector(`[data-id='${change.doc.id}']`);
                let tbody = tr.parentElement;
                tableUsers.removeChild(tbody);
            }
            if (change.type === 'modified') {
                let tr = document.querySelector(`[data-id='${change.doc.id}']`);
                let tbody = tr.parentElement;
                tableUsers.removeChild(tbody);
                renderUser(change.doc);
            }
        })
    });



    db.collection("course").where("email", "==", emaillogged).onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
            if (change.type === 'added') {
                renderCourse(change.doc);
            }
            if (change.type === 'removed') {
                let tr = document.querySelector(`[data-id='${change.doc.id}']`);
                let tbody = tr.parentElement;
                tableCourses.removeChild(tbody);
            }
            if (change.type === 'modified') {
                let tr = document.querySelector(`[data-id='${change.doc.id}']`);
                let tbody = tr.parentElement;
                tableCourses.removeChild(tbody);
                renderCourse(change.doc);
            }
        })
    });


    editModalForm.addEventListener('submit', e => {
        e.preventDefault();

        db.collection('users').doc(id).update({
            fullname: editModalForm.fullname.value,
            password: editModalForm.password.value,
            email: editModalForm.email.value,
        });
        Swal.fire({
            text: 'Thay đổi thông tin thành công',
            icon: 'success',
            timer: 1500
        }).then(function () {
            editModal.classList.remove('modal-show');
        });
    });

    window.addEventListener('click', e => {
        if (e.target === editModalResult) {
            editModalResult.classList.remove('modal-show');
        }
    });


});