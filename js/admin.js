// admin.js
import { getUsers, addUser, updateUser, deleteUser } from './users.js';

document.addEventListener('DOMContentLoaded', function() {
    initializeAdminPanel();
});

function initializeAdminPanel() {
    renderUserTable();
    document.getElementById('add-user-btn').onclick = showAddUserModal;
}

function renderUserTable() {
    const users = getUsers();
    const userTableBody = document.getElementById('user-table-body');
    userTableBody.innerHTML = '';

    users.forEach(user => {
        if (user.username !== 'admin') { // Exclude admin user
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.name}</td>
                <td>${user.username}</td>
                <td>${user.role}</td>
                <td>
                    <button onclick="editUser('${user.username}')">Edit</button>
                    <button onclick="deleteUser('${user.username}')">Delete</button>
                </td>
            `;
            userTableBody.appendChild(row);
        }
    });
}

function showAddUserModal() {
    document.getElementById('add-user-modal').classList.add('show');
}

function addUserHandler() {
    const name = document.getElementById('new-user-name').value;
    const username = document.getElementById('new-user-username').value;
    const role = document.getElementById('new-user-role').value;
    const password = document.getElementById('new-user-password').value;
    const phone = document.getElementById('new-user-phone').value;

    addUser({ name, username, role, password, phone });
    renderUserTable();
    closeAddUserModal();
}

function closeAddUserModal() {
    document.getElementById('add-user-modal').classList.remove('show');
}

function editUser(username) {
    const user = getUsers().find(u => u.username === username);
    if (user) {
        document.getElementById('edit-user-name').value = user.name;
        document.getElementById('edit-user-username').value = user.username;
        document.getElementById('edit-user-role').value = user.role;
        document.getElementById('edit-user-modal').classList.add('show');
    }
}

function updateUserHandler() {
    const name = document.getElementById('edit-user-name').value;
    const username = document.getElementById('edit-user-username').value;
    const role = document.getElementById('edit-user-role').value;

    updateUser({ name, username, role });
    renderUserTable();
    closeEditUserModal();
}

function closeEditUserModal() {
    document.getElementById('edit-user-modal').classList.remove('show');
}

function deleteUser(username) {
    if (confirm('Are you sure you want to delete this user?')) {
        deleteUser(username);
        renderUserTable();
    }
}