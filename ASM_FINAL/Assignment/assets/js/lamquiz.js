app.controller("lamquizCtrl", function ($scope, $http, $routeParams, $timeout, $window) {
    const emaillogged = localStorage.getItem('name');
    console.log(emaillogged);
    if (emaillogged === null) {
        Swal.fire({
            title: 'Bạn chưa đăng nhập!',
            text: 'Vui lòng đăng nhập!',
            icon: 'warning',
            confirmButtonText: 'Đăng Nhập'
        });
        window.location.href = '#!login';
    }

    let id;

    $scope.index = 1;
    $scope.length;
    $scope.length1;

    $scope.begin = 0;

    $scope.indexQ = 0;

    $scope.listcauhoi = [];
    $scope.random15 = [];
    $scope.random = [];

    $scope.idMH = $routeParams.idMH;

    $http.get("assets/db/Quizs/" + $scope.idMH + ".js").then(
        function (d) {
            $scope.listcauhoi = d.data;
            $scope.length = $scope.listcauhoi.length - 1;

            while ($scope.random.length < 15) {
                var r = Math.floor(Math.random() * $scope.length);
                if ($scope.random.indexOf(r) === -1) $scope.random.push(r);
            }

            for (var i = 0; i < 15; i++) {
                $scope.random15[i] = $scope.listcauhoi[$scope.random[i]];
            }
            $scope.length1 = $scope.random15.length;
        },
        function (d) { alert("Lỗi rồi bạn!"); });

    $scope.prev = function () {
        $scope.index--;
        if ($scope.index < 1) {
            $scope.index = 1;
            return;
        }
        $scope.begin--;
    };
    $scope.mark;

    $scope.next = function () {
        $scope.index++;
        if ($scope.index > $scope.length1) {
            $scope.index = $scope.length1;
            return;
        }
        $scope.begin++;
    };

    $scope.listpa = [];
    $scope.tenMH;
    $scope.subjects = [];
    $http.get("assets/db/Subjects.js").then(function (d) { $scope.subjects = d.data; });


    $scope.done = function () {
        $timeout.cancel(mytimeout);
        $scope.indexFS;
        $scope.checkmh1 = false;
        $scope.checkmh2 = false;
        $scope.diem = 0;
        for (var i = 0; i < $scope.listpa.length; i++) {
            if ($scope.listpa[i].Cautraloi === $scope.listpa[i].Caudung) {
                $scope.diem++;
            }
        }

        for (var i = 0; i < $scope.subjects.length; i++) {
            if ($scope.idMH === $scope.subjects[i].Id) {
                $scope.tenMH = $scope.subjects[i].Name;
            }

        }

        $scope.mark = ($scope.diem * 10 / 15).toFixed(2);

        $scope.docid;

        db.collection('course').where("combine", "==", emaillogged + "/" + $scope.tenMH).get().then(snapshot => {
            snapshot.forEach(function (doc) {
                $scope.docid = doc.id;
            });
            if (snapshot.docs.length > 0) {
                console.log("Đã có");
                db.collection('course').doc($scope.docid).update({
                    combine: emaillogged + "/" + $scope.tenMH,
                    course: $scope.tenMH,
                    mark: $scope.mark,
                    email: emaillogged,
                    idMH: $scope.idMH
                }).then(function () {
                    Swal.fire({
                        title: 'Bạn có muốn kết thúc phần thi không?',
                        showCancelButton: true,
                        icon: 'warning',
                        confirmButtonText: 'Kết Thúc',
                        cancelButtonText: 'Làm Tiếp'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.reload();
                        } else {
                            Swal.DismissReason.cancel;
                            var mytimeout = $timeout($scope.onTimeout, 600);

                        }
                    });
                });
            } else {
                console.log("Chưa có");
                db.collection('course').add({
                    combine: emaillogged + "/" + $scope.tenMH,
                    course: $scope.tenMH,
                    mark: $scope.mark,
                    email: emaillogged,
                    idMH: $scope.idMH
                }).then(function () {
                    Swal.fire({
                        title: 'Bạn có muốn kết thúc phần thi không?',
                        showCancelButton: true,
                        icon: 'warning',
                        confirmButtonText: 'Kết Thúc',
                        cancelButtonText: 'Làm Tiếp'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.reload();
                        } else {
                            Swal.DismissReason.cancel;
                            var mytimeout = $timeout($scope.onTimeout, 600);

                        }
                    });
                });
            }
        });
    };

    $scope.check1;
    $scope.check2;
    $scope.getPA = function (a, b, c) {
        if ($scope.listpa.length > 0) {
            $scope.check1 = false;
        } else {
            $scope.check1 = true;
        }

        for (var i = 0; i < $scope.listpa.length; i++) {
            if ($scope.listpa[i].Cauhoi == b) {
                $scope.check2 = true;
                break;
            } else {
                $scope.check2 = false;
            }
        }

        if ($scope.check1 == true) {
            $scope.listpa.push({ "Cauhoi": b, "Cautraloi": a, "Caudung": c });
        } else if ($scope.check2 == false) {
            $scope.listpa.push({ "Cauhoi": b, "Cautraloi": a, "Caudung": c });
        } else {
            $scope.listpa.forEach(function (v) {
                if (v.Cauhoi == b) v.Cautraloi = a;
            });
        }

        db.collection('details').where("key", "==", emaillogged + "/" + b).get().then(snapshot => {
            snapshot.forEach(function (doc) {
                $scope.docid = doc.id;
            });
            if (snapshot.docs.length > 0) {
                console.log("Đã có chi tiết");
                db.collection('details').doc($scope.docid).update({
                    key: emaillogged + "/" + b,
                    email: emaillogged,
                    dapanchon: a,
                    cauhoi: b,
                    Idmonhoc: $scope.idMH,
                });
            } else {
                console.log("Chưa có chi tiết");
                db.collection('details').add({
                    key: emaillogged + "/" + b,
                    email: emaillogged,
                    dapanchon: a,
                    cauhoi: b,
                    Idmonhoc: $scope.idMH,
                });
            }
        });

    }



    $scope.min = 10;
    $scope.sec = 0;
    $scope.onTimeout = function () {
        $scope.sec--;
        mytimeout = $timeout($scope.onTimeout, 600);
        if ($scope.sec < 0) {
            $scope.min--;
            $scope.sec = 59;
        }
        if ($scope.min === 0 && $scope.sec === 0) {
            alert("Đã hết giờ làm bài!");
            $timeout.cancel(mytimeout);

        }
    }
    var mytimeout = $timeout($scope.onTimeout, 600);

    $scope.stop = function () {
        $timeout.cancel(mytimeout);
    }
});