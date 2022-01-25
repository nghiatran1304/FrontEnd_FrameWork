const modalWrapper = document.querySelector('.modal-wrapper');
// modal add
const addModal = document.querySelector('.add-modal');
const addModalForm = document.querySelector('.add-modal .form');

// modal edit
const editModal = document.querySelector('.edit-modal');
const editModalForm = document.querySelector('.edit-modal .form');

const editModalResult = document.querySelector('.edit-modal-result');
const editModalFormResult = document.querySelector('.edit-modal-result .form');


const btnAdd = document.querySelector('.btn-add');


const tableUsers = document.querySelector('.table-users');
const tableCourses = document.querySelector('.table-course');
let id;
let idcourse;

const emaillogged = localStorage.getItem('name');
console.log(emaillogged);
if (emaillogged === null) {
  alert("Bạn chưa đăng nhập!!!");
  window.location.href = 'login.html';
}
// Create element and render users
// <button class="btn btn-delete">Delete</button>
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


  // Click edit user
  const btnEdit = document.querySelector(`[data-id='${doc.id}'] .btn-edit-info`);
  btnEdit.addEventListener('click', () => {
    console.log("Test ở chỗ này");
    editModal.classList.add('modal-show');

    id = doc.id;
    editModalForm.fullname.value = doc.data().fullname;
    editModalForm.password.value = doc.data().password;
    editModalForm.email.value = doc.data().email;
  });

  // Click delete user
  // const btnDelete = document.querySelector(`[data-id='${doc.id}'] .btn-delete`);
  // btnDelete.addEventListener('click', () => {
  //   db.collection('users').doc(`${doc.id}`).delete().then(() => {
  //     console.log('Document succesfully deleted!');
  //   }).catch(err => {
  //     console.log('Error removing document', err);
  //   });
  // });
}


// Click delete user
// const btnDelete = document.querySelector(`[data-id='${doc.id}'] .btn-delete`);
// btnDelete.addEventListener('click', () => {
//   db.collection('users').doc(`${doc.id}`).delete().then(() => {
//     console.log('Document succesfully deleted!');
//   }).catch(err => {
//     console.log('Error removing document', err);
//   });
// });


// Create element and render course result
// <td>${doc.data().username}</td>
const renderCourse = doc => {
  const tr = `
    <tr data-id='${doc.id}'>
      <td style="font-style: italic; font-size: 20px;">${doc.data().course}</td>
      <td style="color: blue; font-size: 20px;">${doc.data().mark}</td>
    </tr>
  `;
  tableCourses.insertAdjacentHTML('beforeend', tr);

  // Edit course result
  // const btnEdit = document.querySelector(`[data-id='${doc.id}'] .btn-edit-course`);
  // btnEdit.addEventListener('click', () => {
  //   console.log('Document succesfully edited!');
  //   editModalResult.classList.add('modal-show');

  //   id = doc.id;
  //   editModalFormResult.username.value = doc.data().username;
  // });

  // Delete course result
  // const btnDeleteC = document.querySelector(`[data-id='${doc.id}'] .btn-delete-course`);
  // btnDeleteC.addEventListener('click', () => {
  //   db.collection('course').doc(`${doc.id}`).delete().then(() => {
  //     console.log('Document succesfully deleted!');
  //   }).catch(err => {
  //     console.log('Error removing document', err);
  //   });
  // });
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

// db.collection('course').get().then(querySnapshot => {
//   querySnapshot.forEach(doc => {
//     renderCourse(doc);
//   })
// });


db.collection("course")
  .where("email", "==", emaillogged).onSnapshot(snapshot => {
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

// Click submit in add modal
// addModalForm.addEventListener('submit', e => {
//   e.preventDefault();
//   db.collection('users').add({
//     username: addModalForm.username.value,
//     password: addModalForm.password.value,
//     email: addModalForm.email.value,
//   });
//   modalWrapper.classList.remove('modal-show');
// });

// Edit info
editModalForm.addEventListener('submit', e => {
  e.preventDefault();
  db.collection('users').doc(id).update({
    fullname: editModalForm.fullname.value,
    password: editModalForm.password.value,
    email: editModalForm.email.value,
  });
  editModal.classList.remove('modal-show');

});

// Click submit in edit modal
// editModalForm.addEventListener('submit', e => {
//   e.preventDefault();
//   db.collection('course').add({
//     username: editModalForm.username.value,
//     course: editModalForm.course.value,
//     mark: editModalForm.mark.value,
//   });
//   editModal.classList.remove('modal-show');
// });

// editModalFormResult.addEventListener('submit', e => {
//   e.preventDefault();
//   console.log("Update");
//   db.collection('course').doc(id).update({
//     fullname: editModalFormResult.fullname.value,
//     course: editModalFormResult.course.value,
//     mark: editModalFormResult.mark.value,
//   });
//   editModalResult.classList.remove('modal-show');
// });

// Click anyware outside the modal Result
window.addEventListener('click', e => {
  if (e.target === editModalResult) {
    editModalResult.classList.remove('modal-show');
  }
});
